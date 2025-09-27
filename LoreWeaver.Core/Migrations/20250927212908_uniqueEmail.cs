using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LoreWeaver.Migrations
{
    /// <inheritdoc />
    public partial class uniqueEmail : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                schema: "loreweaver",
                table: "Users",
                column: "Email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Users_Email",
                schema: "loreweaver",
                table: "Users");
        }
    }
}
