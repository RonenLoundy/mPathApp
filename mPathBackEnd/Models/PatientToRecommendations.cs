using System.ComponentModel.DataAnnotations;

namespace mPathLoginService.Models
{
    public class PatientsToRecommendations
    {
        [Key]
        public required int Id { get; set; }
        public required int PatientId { get; set; }
        public required int RecommendationId { get; set; }
        public required string RecommendationStatus { get; set; }

        public required Patients Patient { get; set; }
        public required Recommendations Recommendation { get; set; }
    }
}