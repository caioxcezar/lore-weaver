using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LoreWeaver.Entities;

public class Character
{
    [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    [Required]
    public int WorldId { get; set; }
    [Required, MaxLength(128)]
    public string Name { get; set; }
    [Required]
    public string shortDescription { get; set; }
    public string? Lore { get; set; }
    public string? Image { get; set; }
    public int Age { get; set; }
    public CharacterStatus CharacterStatus { get; set; }
    public int? BirthPlace { get; set; }
}

public enum CharacterStatus
{
    Alive,
    Deceased,
    Deposed,
    Exiled,
    Missing,
    Incapacitated
}