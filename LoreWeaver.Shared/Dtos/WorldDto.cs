using System.Linq.Expressions;
using LoreWeaver.Entities;

namespace LoreWeaver.Shared.Dtos;

public class WorldDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string? Description { get; set; }
    public string? Map { get; set; }
    public DateTime Created { get; set; }
    public DateTime? LastEdit { get; set; }

    public World ToEntity() => new()
    {
        Id = Id,
        Name = Name,
        Description = Description,
        Created = Created,
        LastEdit = LastEdit,
    };

    public static WorldDto FromEntity(World entity) => new()
    {
        Id = entity.Id,
        Name = entity.Name,
        Description = entity.Description,
        Created = entity.Created,
        LastEdit = entity.LastEdit
    };
}