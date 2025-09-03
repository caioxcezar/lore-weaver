using System.IdentityModel.Tokens.Jwt;
using System.Net.Mail;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using LoreWeaver.Entities;
using LoreWeaver.Shared.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace LoreWeaver.Core.Controllers;

[ApiController]
[Route("api")]
public class LoginController(AppDbContext context) : Controller
{
    [HttpPost("[controller]")]
    public IActionResult Login(UserAccessDto user)
    {
        var password = Hash(user.Password);
        var entity = context.Users.FirstOrDefault(u => u.Login == user.Login && u.Password == password);
        if (entity == null) return NotFound("User not found");
        var token = GenerateJwtToken(entity);
        return Ok(new { Token = token });
    }
    
    [HttpPost("[controller]/create")]
    public async Task<ActionResult<UserDto>> Create(UserCreateDto user)
    {
        if (!IsValidEmail(user.Email)) throw new Exception("Invalid Email");
        var duplicated = context.Users.FirstOrDefault(u => u.Email == user.Email || u.Login == user.Login);
        if (duplicated != null)
        {
            var messages = new List<string>();
            if (duplicated.Email == user.Email) messages.Add("A user with this email already exists");
            if (duplicated.Login == user.Login) messages.Add("A user with this login already exists");
            throw new Exception(string.Join("\n", messages));
        }
        
        user.Created = DateTime.Now.ToUniversalTime();
        var entity = user.ToEntity();
        entity.Roles = [Role.User];
        entity.Password = Hash(user.Password);
        context.Users.Add(entity);
        await context.SaveChangesAsync();
        
        return UserDto.FromEntity(entity);
    }

    private string Hash(string password)
    {
        var salt = Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("SALT_PASS")!);
        var passBytes = new Rfc2898DeriveBytes(password, salt, 1000, HashAlgorithmName.SHA256).GetBytes(20);
        return Convert.ToBase64String(passBytes);
    }
    
    private string GenerateJwtToken(User user)
    {
        var key = Encoding.ASCII.GetBytes(Environment.GetEnvironmentVariable("JWT_KEY")!);
        var tokenHandler = new JwtSecurityTokenHandler();
        var tokenDescriptor = new SecurityTokenDescriptor()
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Name, user.Login),
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
    
    private bool IsValidEmail(string emailaddress)
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