using System.ComponentModel.DataAnnotations;
using LoreWeaver.Entities;

namespace LoreWeaver.Shared.Dtos;

public class UserCreateDto
{
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public string Login { get; set; }
    [Required]
    public string Email { get; set; }
    [Required]
    public string Password { get; set; }
    [Required]
    public DateTime Created { get; set; }

    public User ToEntity() => new()
    {
        Id = Id,
        Name = Name,
        Login = Login,
        Email = Email,
        Created = Created,
        Password = Password
    };
}