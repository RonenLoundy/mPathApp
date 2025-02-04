using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using mPathLoginService.Data;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
//Get the environmental variable for Angular Hosting
var allowedOrigin = builder.Configuration["Cors:AllowedOrigin"]
                    ?? Environment.GetEnvironmentVariable("AllowedOrigin")
                    ?? "http://localhost:4200"; // Fallback default value
// Allow Angular to connect to Backend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
        builder => builder.WithOrigins(allowedOrigin)
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});
//Check App Settings for Environmental Runtime Variables
builder.Configuration
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddEnvironmentVariables();

// Add JWT authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(options =>
{
#pragma warning disable CS8604 // Possible null reference argument.
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:SecretKey"])),
        RequireSignedTokens = true,
        RoleClaimType = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"

    };
    options.Events = new JwtBearerEvents
    {
        OnAuthenticationFailed = context =>
        {
            Console.WriteLine($"Authentication failed: {context.Exception.Message}");
            return Task.CompletedTask;
        },
        OnChallenge = context =>
        {
            Console.WriteLine($"Challenge: {context.Error}");
            return Task.CompletedTask;
        }
    };

#pragma warning restore CS8604 // Possible null reference argument.
});

// Add database Connections
builder.Services.AddDbContext<mPathDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add Controller Software
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<IConfiguration>(builder.Configuration);

// Add Testing Logging
builder.Services.AddLogging(options =>
{
    options.AddConsole();
    options.AddDebug();
});

//Build The Backend
var app = builder.Build();


app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "mPathBackendApi");
}
);

app.UseCors("AllowAngularApp");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
