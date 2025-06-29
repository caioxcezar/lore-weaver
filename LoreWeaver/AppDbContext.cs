using LoreWeaver.Entities;
using Microsoft.EntityFrameworkCore;

namespace LoreWeaver;

public class AppDbContext : DbContext
{
    public DbSet<World> Worlds { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
}
