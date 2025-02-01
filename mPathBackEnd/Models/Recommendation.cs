using System.ComponentModel.DataAnnotations;

namespace mPathLoginService.Models
{
    public class Recommendations
    {
        [Key]
        public required int RecommendationId { get; set; }
        public required string Recommendation { get; set; }

        public required ICollection<PatientsToRecommendations> PatientsToRecommendations { get; set; }

    }
}