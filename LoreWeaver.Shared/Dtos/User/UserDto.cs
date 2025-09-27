using System.ComponentModel.DataAnnotations;
using LoreWeaver.Entities;

namespace LoreWeaver.Shared.Dtos;

public class UserDto
{
    public int Id { get; set; }

    [Required] public string Name { get; set; }

    [Required] public string Login { get; set; }

    [Required] public string Email { get; set; }

    [Required] public DateTime Created { get; set; }

    public DateTime? LastEdit { get; set; }

    public static UserDto FromEntity(User user)
    {
        return new UserDto
        {
            Id = user.Id,
            Name = user.Name,
            Login = user.Login,
            Email = user.Email,
            Created = user.Created,
            LastEdit = user.LastEdit
        };
    }
}