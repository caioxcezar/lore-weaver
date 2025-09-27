using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using LoreWeaver.Entities.Enum;

namespace LoreWeaver.Entities;

public class PoliticalLocation : Location
{
    [Required]
    public PoliticalType PoliticalType { get; set; }
    public string GovernmentType { get; set; }
    public string Ruler { get; set; }
    public ICollection<GeographicLocation> GeographicTerritories { get; set; } = [];
}