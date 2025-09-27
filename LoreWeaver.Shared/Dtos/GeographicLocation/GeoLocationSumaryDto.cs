using System.Linq.Expressions;
using LoreWeaver.Entities;
using LoreWeaver.Entities.Enum;

namespace LoreWeaver.Shared.Dtos;

public class GeoLocationSumaryDto
{
    public static Expression<Func<GeographicLocation, GeoLocationSumaryDto>> FromEntity =
        w => new GeoLocationSumaryDto
        {
            Id = w.Id,
            Name = w.Name,
            shortDescription = w.shortDescription,
            Created = w.Created,
            LastEdit = w.LastEdit
        };

    public int Id { get; set; }
    public GeographicType PoliticalType { get; set; }
    public string Name { get; set; }
    public string shortDescription { get; set; }
    public DateTime Created { get; set; }
    public DateTime? LastEdit { get; set; }
}