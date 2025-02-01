using Microsoft.EntityFrameworkCore;
using mPathLoginService.Models;
namespace mPathLoginService.Data
{
    public class mPathDbContext : DbContext
    {
        // Create .net connections to databases based on models
        public DbSet<Users> Users { get; set; }
        public DbSet<Patients> Patients { get; set; }
        public DbSet<PatientsToRecommendations> PatientsToRecommendations { get; set; }
        public DbSet<Recommendations> Recommendations { get; set; }
        public mPathDbContext(DbContextOptions<mPathDbContext> options) : base(options) { }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=localhost;Database=mPathDatabase;User Id=myAppLogin;Password=TestPassword;TrustServerCertificate=True;");
            }
        }
    }
}