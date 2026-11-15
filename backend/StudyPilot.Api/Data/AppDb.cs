using Microsoft.EntityFrameworkCore;
using StudyPilot.Api.Models;
namespace StudyPilot.Api.Data;
public class AppDb : DbContext
{
    public AppDb(DbContextOptions<AppDb> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<ParentProfile> ParentProfiles => Set<ParentProfile>();
    public DbSet<StudentProfile> StudentProfiles => Set<StudentProfile>();
    public DbSet<ParentChild> ParentChildren => Set<ParentChild>();

    protected override void OnModelCreating(ModelBuilder b)
    {
        b.Entity<User>(e =>
        {
            e.HasIndex(u => u.NormalizedIdentifier).IsUnique();
            e.Property(u => u.Role).HasConversion<string>().HasMaxLength(20);
        });

        b.Entity<ParentProfile>(e =>
        {
            e.HasKey(p => p.UserId);
            e.HasOne(p => p.User)
             .WithOne(u => u.ParentProfile)
             .HasForeignKey<ParentProfile>(p => p.UserId)
             .OnDelete(DeleteBehavior.Cascade);
        });

        b.Entity<StudentProfile>(e =>
        {
            e.HasKey(p => p.UserId);
            e.HasOne(p => p.User)
             .WithOne(u => u.StudentProfile)
             .HasForeignKey<StudentProfile>(p => p.UserId)
             .OnDelete(DeleteBehavior.Cascade);
        });

        b.Entity<ParentChild>(e =>
        {
            e.HasKey(x => new { x.ParentUserId, x.StudentUserId });

            e.HasOne(x => x.Parent).WithMany()
             .HasForeignKey(x => x.ParentUserId)
             .OnDelete(DeleteBehavior.Restrict);

            e.HasOne(x => x.Student).WithMany()
             .HasForeignKey(x => x.StudentUserId)
             .OnDelete(DeleteBehavior.Restrict);
        });
    }
}