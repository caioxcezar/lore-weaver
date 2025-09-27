using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace LoreWeaver.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "loreweaver");

            migrationBuilder.CreateTable(
                name: "Users",
                schema: "loreweaver",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(128)", maxLength: 128, nullable: false),
                    Login = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    Email = table.Column<string>(type: "character varying(128)", maxLength: 128, nullable: false),
                    Password = table.Column<string>(type: "character varying(64)", maxLength: 64, nullable: false),
                    Roles = table.Column<int[]>(type: "integer[]", nullable: false),
                    Created = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    LastEdit = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Worlds",
                schema: "loreweaver",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(128)", maxLength: 128, nullable: false),
                    Description = table.Column<string>(type: "character varying(512)", maxLength: 512, nullable: true),
                    MapPath = table.Column<string>(type: "text", nullable: true),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    Created = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    LastEdit = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Worlds", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Worlds_Users_UserId",
                        column: x => x.UserId,
                        principalSchema: "loreweaver",
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Location",
                schema: "loreweaver",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "character varying(128)", maxLength: 128, nullable: false),
                    shortDescription = table.Column<string>(type: "text", nullable: false),
                    Area = table.Column<float>(type: "real", nullable: false),
                    Population = table.Column<int>(type: "integer", nullable: false),
                    Climate = table.Column<string>(type: "text", nullable: false),
                    Resources = table.Column<List<string>>(type: "text[]", nullable: false),
                    ParentLocationId = table.Column<int>(type: "integer", nullable: true),
                    Lore = table.Column<string>(type: "text", nullable: true),
                    Discriminator = table.Column<string>(type: "character varying(21)", maxLength: 21, nullable: false),
                    GeographicType = table.Column<int>(type: "integer", nullable: true),
                    GeographicLocationId = table.Column<int>(type: "integer", nullable: true),
                    PoliticalLocationId = table.Column<int>(type: "integer", nullable: true),
                    WorldId = table.Column<int>(type: "integer", nullable: true),
                    PoliticalType = table.Column<int>(type: "integer", nullable: true),
                    GovernmentType = table.Column<string>(type: "text", nullable: true),
                    Ruler = table.Column<string>(type: "text", nullable: true),
                    PoliticalLocation_WorldId = table.Column<int>(type: "integer", nullable: true),
                    Created = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    LastEdit = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Location", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Location_Location_GeographicLocationId",
                        column: x => x.GeographicLocationId,
                        principalSchema: "loreweaver",
                        principalTable: "Location",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Location_Location_ParentLocationId",
                        column: x => x.ParentLocationId,
                        principalSchema: "loreweaver",
                        principalTable: "Location",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Location_Location_PoliticalLocationId",
                        column: x => x.PoliticalLocationId,
                        principalSchema: "loreweaver",
                        principalTable: "Location",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Location_Worlds_PoliticalLocation_WorldId",
                        column: x => x.PoliticalLocation_WorldId,
                        principalSchema: "loreweaver",
                        principalTable: "Worlds",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Location_Worlds_WorldId",
                        column: x => x.WorldId,
                        principalSchema: "loreweaver",
                        principalTable: "Worlds",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Coordinate",
                schema: "loreweaver",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Latitude = table.Column<double>(type: "double precision", nullable: false),
                    Longitude = table.Column<double>(type: "double precision", nullable: false),
                    LocationId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Coordinate", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Coordinate_Location_LocationId",
                        column: x => x.LocationId,
                        principalSchema: "loreweaver",
                        principalTable: "Location",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Coordinate_LocationId",
                schema: "loreweaver",
                table: "Coordinate",
                column: "LocationId");

            migrationBuilder.CreateIndex(
                name: "IX_Location_GeographicLocationId",
                schema: "loreweaver",
                table: "Location",
                column: "GeographicLocationId");

            migrationBuilder.CreateIndex(
                name: "IX_Location_ParentLocationId",
                schema: "loreweaver",
                table: "Location",
                column: "ParentLocationId");

            migrationBuilder.CreateIndex(
                name: "IX_Location_PoliticalLocation_WorldId",
                schema: "loreweaver",
                table: "Location",
                column: "PoliticalLocation_WorldId");

            migrationBuilder.CreateIndex(
                name: "IX_Location_PoliticalLocationId",
                schema: "loreweaver",
                table: "Location",
                column: "PoliticalLocationId");

            migrationBuilder.CreateIndex(
                name: "IX_Location_WorldId",
                schema: "loreweaver",
                table: "Location",
                column: "WorldId");

            migrationBuilder.CreateIndex(
                name: "IX_Worlds_UserId",
                schema: "loreweaver",
                table: "Worlds",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Coordinate",
                schema: "loreweaver");

            migrationBuilder.DropTable(
                name: "Location",
                schema: "loreweaver");

            migrationBuilder.DropTable(
                name: "Worlds",
                schema: "loreweaver");

            migrationBuilder.DropTable(
                name: "Users",
                schema: "loreweaver");
        }
    }
}
