using System.ComponentModel.DataAnnotations;

namespace mPathLoginService.Models
{
    // Patient Model Equivalent to external patient database 
    public class Patients
    {
        [Key]
        public required int PatientId { get; set; }
        public required string FullName { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        // Used to connect Patients and Patient to Recommendation Table
        public required ICollection<PatientsToRecommendations> PatientToRecommendations { get; set; }

    }
}