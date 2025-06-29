using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LoreWeaver.Migrations
{
    /// <inheritdoc />
    public partial class UpdateWorldEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "Created",
                table: "Worlds",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "LastEdit",
                table: "Worlds",
                type: "datetime(6)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Created",
                table: "Worlds");

            migrationBuilder.DropColumn(
                name: "LastEdit",
                table: "Worlds");
        }
    }
}
