using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using mPathLoginService.Data;
using mPathLoginService.Models;
using System.Linq;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
//[Authorize] // Ensures authentication
public class PatientsController : ControllerBase
{
    private readonly mPathDbContext _context;

    public PatientsController(mPathDbContext context)
    {
        _context = context;
    }

    // GET: api/patients?search=John&page=1&pageSize=10
    [HttpGet]
    //[Authorize(Roles = "Provider")] // Restricts to Provider users
    public async Task<IActionResult> GetPatients([FromQuery] string? search, [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        if (page < 1 || pageSize < 1) return BadRequest("Invalid pagination parameters.");

        var query = _context.Patients.AsQueryable();

        // Apply search filter
        if (!string.IsNullOrEmpty(search))
        {
            query = query.Where(p => p.FullName.Contains(search) || p.PatientId.ToString().Contains(search));
        }

        // Get paginated result
        var totalPatients = await query.CountAsync();
        var patients = await query.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();

        return Ok(new
        {
            TotalCount = totalPatients,
            Page = page,
            PageSize = pageSize,
            Patients = patients
        });
    }
    [HttpGet("{id}")]
    //[Authorize(Roles = "Provider")]
    public async Task<IActionResult> GetPatientById(int id)
    {
        var patient = await _context.Patients
            .Include(p => p.PatientToRecommendations) // Include the related Recommendations
            .ThenInclude(ptr => ptr.Recommendation) // Include the actual Recommendation object
            .FirstOrDefaultAsync(p => p.PatientId == id);

        if (patient == null)
        {
            return NotFound("Patient not found.");
        }

        // Map recommendations with 'Completion' status
        var recommendations = patient.PatientToRecommendations
            .Select(ptr => new
            {
                ptr.Recommendation.Recommendation,
                ptr.RecommendationStatus // Use 'Completion' here instead of 'RecommendationStatus'
            }).ToList();

        return Ok(new
        {
            patient.PatientId,
            patient.FullName,
            patient.FirstName,
            patient.LastName,
            Recommendations = recommendations
        });
    }
    
    
    [HttpPut("patients/{patientId}/recommendations")]
    public async Task<IActionResult> MarkRecommendationAsComplete(int patientId, [FromBody] RecommendationUpdateModel model)
    {
        var patient = await _context.Patients
            .Include(p => p.PatientToRecommendations)
            .ThenInclude(ptr => ptr.Recommendation)
            .FirstOrDefaultAsync(p => p.PatientId == patientId);

        if (patient == null)
        {
            return NotFound("Patient not found.");
        }

        var patientRecommendation = patient.PatientToRecommendations
            .FirstOrDefault(ptr => ptr.Recommendation.Recommendation == model.Recommendation);

        if (patientRecommendation == null)
        {
            return NotFound("Recommendation not found for this patient.");
        }

        // Update the recommendation status
        patientRecommendation.RecommendationStatus = "Completed";
        await _context.SaveChangesAsync();

        return Ok();
    }

    public class RecommendationUpdateModel
    {
        public required string Recommendation { get; set; }
        public required string Status { get; set; }
    }
}