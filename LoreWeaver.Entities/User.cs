using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LoreWeaver.Entities;

public class User
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    [MaxLength(128), Required]
    public string Name { get; set; }
    [MaxLength(20), Required]
    public string Login { get; set; }
    [MaxLength(128), Required]
    public string Email { get; set; }
    [MaxLength(64), Required]
    public string Password { get; set; }
    public Role[] Roles { get; set; } = [];
    public ICollection<World>  Worlds { get; set; } = [];
    [Required]
    public DateTime Created { get; set; }
    public DateTime? LastEdit { get; set; }
}

public enum Role
{
    Admin,
    User
}