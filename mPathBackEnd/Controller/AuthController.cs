using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using mPathLoginService.Data;
using mPathLoginService.Models;
using Microsoft.EntityFrameworkCore;


[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _config;
    private readonly mPathDbContext _context;
    private readonly PasswordHasher<Users> _passwordHasher;

    public AuthController(IConfiguration config, mPathDbContext context)
    {
        _config = config;
        _context = context;
        _passwordHasher = new PasswordHasher<Users>();
    }

    /// <summary>
    /// Registers a new user with a hashed password.
    /// </summary>
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegistrationModel model)
    {
        if (_context.Users.Any(u => u.Username == model.Username))
        {
            return BadRequest("Username is already taken.");
        }

        var user = new Users
        {
            Username = model.Username,
            PasswordHash = "",
            Authority = "Provider"
        };
        user.PasswordHash = _passwordHasher.HashPassword(user, model.Password);
        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok(new { message = "User registered successfully!" });

    }

    /// <summary>
    /// Authenticates user and returns a JWT token.
    /// </summary>
    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginModel login)
    {
        var user = _context.Users.FirstOrDefault(u => u.Username == login.Username);
        if (user == null || !VerifyPassword(user, login.Password))
        {
            return Unauthorized("Invalid username or password.");
        }

        var token = GenerateJwtToken(user.Username);
        return Ok(new { Token = token });
    }

    /// <summary>
    /// Verifies the provided password against the stored hash.
    /// </summary>
    private bool VerifyPassword(Users user, string password)
    {
        var hashedPasswordFromDb = user.PasswordHash;
        var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, password);
        return result == PasswordVerificationResult.Success;
    }

    /// <summary>
    /// Generates a JWT token for authenticated users.
    /// </summary>
    private string GenerateJwtToken(string username)
    {
        var securityKey = _config["Jwt:SecretKey"];
        if (string.IsNullOrEmpty(securityKey))
        {
            throw new Exception("Null Security Key");
        }
        var user = _context.Users.FirstOrDefault(u => u.Username == username) ?? throw new Exception("User not found.");
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(securityKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, username),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(ClaimTypes.Role, user.Authority) // Ensure Authority is properly used
        };


        var token = new JwtSecurityToken(
            issuer: _config["JwtSettings:Issuer"],
            audience: _config["JwtSettings:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(30),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}

public class LoginModel
{
    public required string Username { get; set; }
    public required string Password { get; set; }
}
public class RegistrationModel
{
    public required string Username { get; set; }
    public required string Password { get; set; }
}
