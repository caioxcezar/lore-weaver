using System.ComponentModel.DataAnnotations;

namespace LoreWeaver.Shared.Dtos;

public class UserAccessDto
{
    [MaxLength(20), Required]
    public string Login { get; set; }
    [MaxLength(64), Required]
    public string Password { get; set; }
}