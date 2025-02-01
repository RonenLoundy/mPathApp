using System.ComponentModel.DataAnnotations;

namespace mPathLoginService.Models
{
    // User Model Equivalent to external User database required for login and security 

    public class Users
    {
        [Key]
        public int Id { get; set; }

        public required string Username { get; set; }

        public required string PasswordHash { get; set; }
        public required string Authority { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    }
}
