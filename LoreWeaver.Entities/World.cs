using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LoreWeaver.Entities;

public class World
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    [MaxLength(128)]
    public string Name { get; set; } = string.Empty;
    [MaxLength(512)]
    public string Description { get; set; } = string.Empty;
    public DateTime Created { get; set; } = new();
    public DateTime? LastEdit { get; set; }
}
