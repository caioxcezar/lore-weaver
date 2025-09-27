using LoreWeaver.Entities;
using Microsoft.EntityFrameworkCore;

namespace LoreWeaver.Core;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<World> Worlds { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<PoliticalLocation> PoliticalLocations { get; set; }
    public DbSet<GeographicLocation> GeographicLocations { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("loreweaver");
        modelBuilder.Entity<User>().HasIndex(x => x.Email).IsUnique();
    }
}