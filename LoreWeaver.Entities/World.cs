using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LoreWeaver.Entities;

public class World : Entity
{
    [MaxLength(128), Required]
    public string Name { get; set; }
    [MaxLength(512)]
    public string? Description { get; set; }
    public string? MapPath { get; set; }
    [Required, ForeignKey("UserId")]
    public User User { get; set; }
    public ICollection<PoliticalLocation> PoliticalLocations { get; set; } = [];
    public ICollection<GeographicLocation> GeographicLocations { get; set; } = [];
}
