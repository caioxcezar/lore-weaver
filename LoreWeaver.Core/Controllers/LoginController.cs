using System.IdentityModel.Tokens.Jwt;
using System.Net.Mail;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using LoreWeaver.Entities;
using LoreWeaver.Entities.Enum;
using LoreWeaver.Shared.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace LoreWeaver.Core.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LoginController(AppDbContext context) : Controller
{
    [HttpPost]
    public IActionResult Login(UserAccessDto user)
    {
        var password = Hash(user.Password);
        var entity = context.Users.FirstOrDefault(u => u.Login == user.Login && u.Password == password);
        if (entity == null) return Unauthorized("User not found");
        var token = GenerateJwtToken(entity);
        return Ok(new { Token = token });
    }

    [HttpPost("create")]
    public async Task<ActionResult<UserDto>> Create(UserCreateDto user)
    {
        if (!IsValidEmail(user.Email)) return UnprocessableEntity("Invalid Email");
        var duplicated = context.Users.FirstOrDefault(u => u.Email == user.Email || u.Login == user.Login);
        if (duplicated != null)
        {
            var messages = new List<string>();
            if (duplicated.Email == user.Email) messages.Add("A user with this email already exists");
            if (duplicated.Login == user.Login) messages.Add("A user with this login already exists");
            return Conflict(string.Join("\n", messages));
        }

        var entity = new User
        {
            Login = user.Login,
            Password = Hash(user.Password),
            Email = user.Email,
            Name = user.Name,
            Created = DateTime.Now.ToUniversalTime(),
            Roles = [UserRole.User]
        };
        context.Users.Add(entity);
        await context.SaveChangesAsync();

        return UserDto.FromEntity(entity);
    }

    private string GenerateJwtToken(User user)
    {
        var key = Encoding.ASCII.GetBytes(Environment.GetEnvironmentVariable("JWT_KEY")!);
        var tokenHandler = new JwtSecurityTokenHandler();
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Role, string.Join(",", user.Roles)),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            }),
            Expires = DateTime.UtcNow.AddHours(1),
            Issuer = $"{Request.Scheme}://{Request.Host}",
            Audience = $"{Request.Scheme}://{Request.Host}",
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    private static string Hash(string password)
    {
        var salt = Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("SALT_PASS")!);
        var passBytes = new Rfc2898DeriveBytes(password, salt, 1000, HashAlgorithmName.SHA256).GetBytes(20);
        return Convert.ToBase64String(passBytes);
    }

    private static bool IsValidEmail(string emailaddress)
    {
        try
        {
            var _ = new MailAddress(emailaddress);
            return true;
        }
        catch (FormatException)
        {
            return false;
        }
    }
}