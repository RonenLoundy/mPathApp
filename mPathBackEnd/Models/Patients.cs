using System.ComponentModel.DataAnnotations;

namespace mPathLoginService.Models
{
    public class Patients
    {
        [Key]
        public required int PatientId { get; set; }
        public required string FullName { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public required ICollection<PatientsToRecommendations> PatientToRecommendations { get; set; }

    }
}