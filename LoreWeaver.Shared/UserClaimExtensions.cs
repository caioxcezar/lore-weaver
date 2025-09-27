using System.Security.Claims;

namespace LoreWeaver.Shared;

public static class UserClaimExtensions
{
    public static int GetId(this ClaimsPrincipal User) => int.Parse(User.Claims.First(c => c.Type == "nameid").Value);
}