using System.ComponentModel.DataAnnotations;

namespace mPathLoginService.Models
{
    // PatientToRecommendation Model Equivalent to external PatientToRecommendation database 
    public class PatientsToRecommendations
    {
        [Key]
        public required int Id { get; set; }
        public required int PatientId { get; set; }
        public required int RecommendationId { get; set; }
        public required string RecommendationStatus { get; set; }
        // Used to connect  Patient to Recommendation and Patient Table

        public required Patients Patient { get; set; }
        // Used to connect  Patient to Recommendation and Recommendation Table
        public required Recommendations Recommendation { get; set; }
    }
}