using LoreWeaver.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LoreWeaver.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WorldsController(AppDbContext context) : Controller
{
    [HttpGet]
    public async Task<ActionResult<object>> GetWorlds(int page = 1, int size = 10)
    {
        var total = await context.Worlds.CountAsync();
        var totalPage = Math.Ceiling((double)total / page);
        var worlds = await context.Worlds.Skip((page - 1) * size).Take(size).ToListAsync();

        return new { total = totalPage, items = worlds };
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<World>> GetWorld(int id)
    {
        var world = await context.Worlds.FindAsync(id);
        if (world == null) return NotFound();
        return world;
    }

    [HttpPost]
    public async Task<ActionResult<World>> PostWorld(World world)
    {
        context.Worlds.Add(world);
        await context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetWorld), new { id = world.Id }, world);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutStudent(int id, World world)
    {
        if (id != world.Id) return BadRequest();

        context.Entry(world).State = EntityState.Modified;
        try
        {
            await context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!context.Worlds.Any(e => e.Id == id)) return NotFound();
            throw;
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteStudent(int id)
    {
        var world = await context.Worlds.FindAsync(id);
        if (world == null) return NotFound();

        context.Worlds.Remove(world);
        await context.SaveChangesAsync();

        return NoContent();
    }
}
