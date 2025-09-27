using LoreWeaver.Entities;
using LoreWeaver.Shared;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LoreWeaver.Core.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class PolLocationsController(AppDbContext context) : Controller
{
    [HttpGet]
    public async Task<ActionResult<object>> GetPoliticalLocations(int page = 1, int size = 10)
    {
        var userId = User.GetId();
        var total = await context.PoliticalLocations.CountAsync(l => l.World.User.Id == userId);
        var totalPage = Math.Ceiling((double)total / page);
        var worlds = context.PoliticalLocations.Where(l => l.World.User.Id == userId)
            .Select(PolLocationSumaryDto.FromEntity).Skip(page * size).Take(size);

        return new { total = totalPage, items = worlds };
    }

    [HttpPost]
    public async Task<ActionResult> PostPoliticalLocation(PolLocationCreateDto location)
    {
        var userId = User.GetId();
        var world = await context.Worlds.FirstAsync(w => w.User.Id == userId && w.Id == location.WorldId);
        var entity = new PoliticalLocation
        {
            Name = location.Name,
            shortDescription = location.ShortDescription,
            PoliticalType = location.PoliticalType,
            World = world,
            Coordinates = location.Coordinates,
            Area = location.Area,
            Population = location.Population,
            Climate = location.Climate,
            Created = DateTime.Now.ToUniversalTime(),
            ParentLocation = location.ParentLocation,
            Resources = location.Resources
        };
        context.PoliticalLocations.Add(entity);
        await context.SaveChangesAsync();

        return Ok();
    }

    [HttpPut]
    public async Task<ActionResult> PutPoliticalLocation(PolLocationEditDto location)
    {
        var userId = User.GetId();
        var world = await context.Worlds.FirstAsync(w => w.User.Id == userId && w.Id == location.WorldId);
        var entity =
            await context.PoliticalLocations.FirstAsync(l => l.Id == location.Id && l.World.User.Id == userId);

        entity.Name = location.Name;
        entity.shortDescription = location.ShortDescription;
        entity.PoliticalType = location.PoliticalType;
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
    public async Task<ActionResult> DeletePoliticalLocation(int id)
    {
        var userId = User.GetId();
        var entity =
            await context.PoliticalLocations.FirstAsync(l => l.Id == id && l.World.User.Id == userId);
        context.PoliticalLocations.Remove(entity);
        await context.SaveChangesAsync();
        return Ok();
    }
}