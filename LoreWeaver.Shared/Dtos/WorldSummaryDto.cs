using System.Linq.Expressions;
using LoreWeaver.Entities;

namespace LoreWeaver.Shared.Dtos;

public class WorldSummaryDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string? Description { get; set; }
    public DateTime Created { get; set; }
    public DateTime? LastEdit { get; set; }
    
    public static Expression<Func<World, WorldSummaryDto>> FromEntity = 
        w => new WorldSummaryDto
        {
            Id = w.Id,
            Name = w.Name,
            Description = w.Description,
            Created = w.Created,
            LastEdit = w.LastEdit
        };
}