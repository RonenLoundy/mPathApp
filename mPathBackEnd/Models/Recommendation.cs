using System.ComponentModel.DataAnnotations;

namespace mPathLoginService.Models
{
    // Recommendation Model Equivalent to external recommendation database 
    public class Recommendations
    {
        [Key]
        public required int RecommendationId { get; set; }
        public required string Recommendation { get; set; }
        // Used to connect Recommendation and Patient to Recommendation Table
        public required ICollection<PatientsToRecommendations> PatientsToRecommendations { get; set; }

    }
}