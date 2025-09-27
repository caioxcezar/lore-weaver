using LoreWeaver.Core.Services;
using LoreWeaver.Entities;
using LoreWeaver.Shared;
using LoreWeaver.Shared.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Supabase.Storage;
using FileOptions = Supabase.Storage.FileOptions;

namespace LoreWeaver.Core.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class WorldsController(AppDbContext context, ISupabaseService supabaseService) : Controller
{
    [HttpGet]
    public async Task<ActionResult<object>> GetWorlds(int page = 1, int size = 10)
    {
        var userId = User.GetId();
        var total = await context.Worlds.CountAsync(world => world.User.Id == userId);
        var totalPage = Math.Ceiling((double)total / page);
        var worlds = context.Worlds.Where(world => world.User.Id == userId).Select(WorldSummaryDto.FromEntity)
            .Skip((page - 1) * size).Take(size);

        return new { total = totalPage, items = worlds };
    }

    [HttpGet("{id}")]
    public async Task<ActionResult> GetWorld(int id)
    {
        var userId = User.GetId();
        var entity = await context.Worlds.Include(world => world.User)
            .FirstOrDefaultAsync(world => world.User.Id == userId && world.Id == id);
        if (entity == null) return NotFound();
        var world = new WorldEditDto
        {
            Id = entity.Id,
            Name = entity.Name,
            Description = entity.Description,
            Created = entity.Created,
            LastEdit = entity.LastEdit
        };
        if (entity.MapPath != null)
        {
            var image = await supabaseService.client.Storage.From("world-images")
                .Download($"user_{entity.User.Id}/world_{entity.Id}/world-map.webp", new TransformOptions());
            world.Map = ImageConverter.ConvertToBase64(image);
        }

        return Ok(world);
    }

    [HttpPost]
    public async Task<ActionResult> PostWorld(WorldCreateDto world)
    {
        var userId = User.GetId();
        var user = await context.Users.FirstAsync(u => u.Id == userId);
        var entity = new World
        {
            Name = world.Name,
            Description = world.Description,
            Created = DateTime.Now.ToUniversalTime(),
            User = user
        };
        context.Worlds.Add(entity);
        await context.SaveChangesAsync();

        if (world.Map != null)
        {
            var image = await ImageConverter.ConvertToWebP(world.Map);
            if (image != null)
            {
                entity.MapPath = $"user_{entity.User.Id}/world_{entity.Id}/world-map.webp";
                await supabaseService.client.Storage.From("world-images").Upload(image, entity.MapPath,
                    new FileOptions { ContentType = "image/webp" });
                await context.SaveChangesAsync();
            }
        }

        return NoContent();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutWorld(int id, WorldEditDto world)
    {
        if (id != world.Id) return UnprocessableEntity("Trying to change a world different from the informed");
        var userId = User.GetId();
        var entity = await context.Worlds.Include(w => w.User)
            .FirstOrDefaultAsync(w => w.User.Id == userId && w.Id == world.Id);
        if (entity is null) return NotFound();

        entity.LastEdit = DateTime.Now.ToUniversalTime();
        entity.Name = world.Name;
        entity.Description = world.Description;

        if (world.Map != null)
        {
            var image = await ImageConverter.ConvertToWebP(world.Map);
            if (image != null)
            {
                entity.MapPath = $"user_{entity.User.Id}/world_{entity.Id}/world-map.webp";
                await supabaseService.client.Storage.From("world-images").Update(image, entity.MapPath,
                    new FileOptions { ContentType = "image/webp", Upsert = true });
            }
        }

        await context.SaveChangesAsync();

        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteWorld(int id)
    {
        var userId = User.GetId();
        var entity = await context.Worlds.FirstOrDefaultAsync(world => world.User.Id == userId && world.Id == id);
        if (entity == null) return NotFound();

        context.Worlds.Remove(entity);
        await context.SaveChangesAsync();

        return Ok();
    }
}