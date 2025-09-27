using LoreWeaver.Entities;
using LoreWeaver.Entities.Enum;

namespace LoreWeaver.Shared;

public class PolLocationEditDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string ShortDescription { get; set; }
    public PoliticalType PoliticalType { get; set; }
    public int WorldId { get; set; }
    public ICollection<Coordinate> Coordinates { get; set; }
    public float Area { get; set; }
    public int Population { get; set; }
    public string Climate { get; set; }
    public List<string> Resources { get; set; }
    public Location? ParentLocation { get; set; }
}