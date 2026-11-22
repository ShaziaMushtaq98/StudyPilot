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
    public DbSet<DiaryScan> DiaryScans => Set<DiaryScan>();
    public DbSet<HomeWork> HomeWorks => Set<HomeWork>();

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
        // DiaryScan configuration
        b.Entity<DiaryScan>(e =>
        {
            e.HasKey(d => d.Id);

            e.HasOne(d => d.Student)
             .WithMany()
             .HasForeignKey(d => d.StudentUserId)
             .OnDelete(DeleteBehavior.Restrict);
        });

        // HomeWork configuration
        b.Entity<HomeWork>(e =>
        {
            e.HasKey(h => h.Id);

            e.HasOne(h => h.Student)
             .WithMany()
             .HasForeignKey(h => h.StudentUserId)
             .OnDelete(DeleteBehavior.Restrict);

            e.HasOne(h => h.DiaryScan)
             .WithMany()
             .HasForeignKey(h => h.DiaryScanId)
             .OnDelete(DeleteBehavior.SetNull);

            e.Property(h => h.Title).HasMaxLength(200).IsRequired();
            e.Property(h => h.Subject).HasMaxLength(100).IsRequired();
        });
    }
}