using LoreWeaver.Entities;
using Microsoft.EntityFrameworkCore;

namespace LoreWeaver.Core;

public class AppDbContext : DbContext
{
    public DbSet<World> Worlds { get; set; }
    public DbSet<User> Users { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
}
