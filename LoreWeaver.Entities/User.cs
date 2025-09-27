using System.ComponentModel.DataAnnotations;
using LoreWeaver.Entities.Enum;

namespace LoreWeaver.Entities;

public class User : Entity
{
    [MaxLength(128)] [Required] public string Name { get; set; }

    [MaxLength(20)] [Required] public string Login { get; set; }

    [MaxLength(128)] [Required] public string Email { get; set; }

    [MaxLength(64)] [Required] public string Password { get; set; }

    public ICollection<UserRole> Roles { get; set; } = [];
    public ICollection<World> Worlds { get; set; } = [];
}