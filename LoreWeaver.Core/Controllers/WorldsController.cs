using System.Security.Claims;
using LoreWeaver.Core.Services;
using LoreWeaver.Entities;
using LoreWeaver.Shared;
using LoreWeaver.Shared.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Supabase.Storage;

namespace LoreWeaver.Core.Controllers;

[ApiController]
[Route("api")]
[Authorize]
public class WorldsController(AppDbContext context, ISupabaseService supabaseService) : Controller
{
    private readonly string _storageName = "world-images";
    [HttpGet("[controller]")]
    public async Task<ActionResult<object>> GetWorlds(int page = 1, int size = 10)
    {
        var total = await context.Worlds.CountAsync();
        var totalPage = Math.Ceiling((double)total / page);
        var worlds = context.Worlds.Select(WorldSummaryDto.FromEntity).Skip((page - 1) * size).Take(size);

        return new { total = totalPage, items = worlds };
    }

    [HttpGet("[controller]/{id}")]
    public async Task<ActionResult<WorldDto>> GetWorld(int id)
    {
        var entity = await context.Worlds.FindAsync(id);
        if (entity == null) return NotFound();
        var world = WorldDto.FromEntity(entity);
        if (entity.MapPath != null)
        {
            var image = await supabaseService.client.Storage.From(_storageName).Download($"{entity.Id}/world-map.webp", new TransformOptions());
            world.Map = ImageConverter.ConvertToBase64(image);
        }
        
        return world;
    }

    [HttpPost("[controller]")]
    public async Task<ActionResult<WorldDto>> PostWorld(WorldDto world)
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        world.Created = DateTime.Now.ToUniversalTime();
        var entity = world.ToEntity();
        context.Worlds.Add(entity);
        await context.SaveChangesAsync();
        entity.MapPath = $"user_{userId}/world_{entity.Id}/world-map.webp";
        if (world.Map != null)
        {
            var image = await ImageConverter.ConvertToWebP(world.Map);
            if (image != null)
            {
                var y = await supabaseService.client.Storage.From(_storageName).Update(image, entity.MapPath, new() { ContentType = "image/webp" });
            }
        }

        await context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetWorld), new { id = world.Id }, world);
    }

    [HttpPut("[controller]/{id}")]
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

    [HttpDelete("[controller]/{id}")]
    public async Task<IActionResult> DeleteStudent(int id)
    {
        var world = await context.Worlds.FindAsync(id);
        if (world == null) return NotFound();

        context.Worlds.Remove(world);
        await context.SaveChangesAsync();

        return NoContent();
    }
}
