using LoreWeaver.Core.Services;
using LoreWeaver.Entities;
using LoreWeaver.Shared;
using LoreWeaver.Shared.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LoreWeaver.Core.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class GeoLocationsController(AppDbContext context, ISupabaseService supabaseService) : Controller
{
    [HttpGet]
    public async Task<ActionResult<object>> GetGeographicLocations(int worldId, int page = 1, int size = 10)
    {
        var userId = User.GetId();
        var total =
            await context.GeographicLocations.CountAsync(l => l.World.Id == worldId && l.World.User.Id == userId);
        var totalPage = Math.Ceiling((double)total / page);
        var worlds = context.GeographicLocations.Where(l => l.World.Id == worldId && l.World.User.Id == userId)
            .Select(GeoLocationSumaryDto.FromEntity).Skip(page * size).Take(size);

        return new { total = totalPage, items = worlds };
    }

    [HttpPost]
    public async Task<ActionResult> PostGeographicLocation(GeoLocationCreateDto location)
    {
        var userId = User.GetId();
        var world = await context.Worlds.FirstAsync(w => w.User.Id == userId && w.Id == location.WorldId);
        var entity = new GeographicLocation
        {
            Name = location.Name,
            shortDescription = location.ShortDescription,
            GeographicType = location.GeographicType,
            World = world,
            Coordinates = location.Coordinates,
            Area = location.Area,
            Population = location.Population,
            Climate = location.Climate,
            Created = DateTime.Now.ToUniversalTime(),
            ParentLocation = location.ParentLocation,
            Resources = location.Resources
        };
        context.GeographicLocations.Add(entity);
        await context.SaveChangesAsync();

        return Ok();
    }

    [HttpPut]
    public async Task<ActionResult> PutGeographicLocation(GeoLocationEditDto location)
    {
        var userId = User.GetId();
        var world = await context.Worlds.FirstAsync(w => w.User.Id == userId && w.Id == location.WorldId);
        var entity =
            await context.GeographicLocations.FirstAsync(l => l.Id == location.Id && l.World.User.Id == userId);

        entity.Name = location.Name;
        entity.shortDescription = location.ShortDescription;
        entity.GeographicType = location.GeographicType;
        entity.Coordinates = location.Coordinates;
        entity.Area = location.Area;
        entity.World = world;
        entity.Population = location.Population;
        entity.Climate = location.Climate;
        entity.LastEdit = DateTime.Now.ToUniversalTime();
        entity.ParentLocation = location.ParentLocation;
        entity.Resources = location.Resources;

        await context.SaveChangesAsync();

        return Ok();
    }

    [HttpDelete]
    public async Task<ActionResult> DeleteGeographicLocation(int id)
    {
        var userId = User.GetId();
        var entity =
            await context.GeographicLocations.FirstAsync(l => l.Id == id && l.World.User.Id == userId);
        context.GeographicLocations.Remove(entity);
        await context.SaveChangesAsync();
        return Ok();
    }
}