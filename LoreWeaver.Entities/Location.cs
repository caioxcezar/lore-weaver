using System.ComponentModel.DataAnnotations;

namespace LoreWeaver.Entities;

public class Location : Entity
{
    [Required] public World World { get; set; }

    [Required] [MaxLength(128)] public string Name { get; set; }

    [Required]
    [CoordinatesRange(ErrorMessage = "Length must be 1 or ≥3 (cannot be 2)")]
    public ICollection<Coordinate> Coordinates { get; set; } = [];

    [Required] public string shortDescription { get; set; }
    public float? Area { get; set; }
    public int? Population { get; set; }
    public string? Climate { get; set; }
    public List<string> Resources { get; set; } = [];
    public Location? ParentLocation { get; set; }
    public ICollection<Location> Subdivisions { get; set; } = [];
    public string? Lore { get; set; }
}