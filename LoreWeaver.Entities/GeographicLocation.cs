using System.ComponentModel.DataAnnotations;
using LoreWeaver.Entities.Enum;

namespace LoreWeaver.Entities;

public class GeographicLocation : Location
{
    [Required]
    public GeographicType GeographicType { get; set; }
    public ICollection<GeographicLocation> ConnectedAreas { get; set; } = [];
}