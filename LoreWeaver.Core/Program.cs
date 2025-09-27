using System.Text;
using DotNetEnv;
using LoreWeaver.Core;
using LoreWeaver.Core.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

Env.Load();

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost", policy =>
    {
        policy.WithOrigins("http://localhost:42248", "https://localhost:44375", "http://localhost:49534")
            .AllowCredentials()
            .AllowAnyHeader();
    });
});
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(jwtOptions =>
    {
        jwtOptions.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey =
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("JWT_KEY")!)),
            ValidAudiences = builder.Configuration.GetSection("Jwt:Audiences").Get<string[]>(),
            ValidIssuers = builder.Configuration.GetSection("Jwt:Issuers").Get<string[]>()
        };

        jwtOptions.MapInboundClaims = false;
    });
builder.Services.AddSingleton<ISupabaseService, SupabaseService>();
builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(dbOptions =>
    dbOptions.UseNpgsql(Environment.GetEnvironmentVariable("DB_CONNECTION_STRING"), options =>
    {
        options.EnableRetryOnFailure();
        options.CommandTimeout(300);
        options.MigrationsHistoryTable("__EFMigrationsHistory", "loreweaver");
    })
);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthorization();
builder.Services.AddControllers();

var app = builder.Build();

app.UseMiddleware<Middleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseHttpsRedirection();
}

app.UseCors("AllowLocalhost");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();