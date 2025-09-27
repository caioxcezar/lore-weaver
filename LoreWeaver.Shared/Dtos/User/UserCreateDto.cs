using System.ComponentModel.DataAnnotations;

namespace LoreWeaver.Shared.Dtos;

public class UserCreateDto
{
    [Required] public string Name { get; set; }

    [Required] public string Login { get; set; }

    [Required] public string Email { get; set; }

    [Required] public string Password { get; set; }
}