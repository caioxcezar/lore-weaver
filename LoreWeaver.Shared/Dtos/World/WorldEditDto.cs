namespace LoreWeaver.Shared.Dtos;

public class WorldEditDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string? Description { get; set; }
    public string? Map { get; set; }
    public DateTime Created { get; set; }
    public DateTime? LastEdit { get; set; }
}