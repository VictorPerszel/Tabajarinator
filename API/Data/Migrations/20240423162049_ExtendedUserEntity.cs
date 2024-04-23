using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class ExtendedUserEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Alcunha",
                table: "Jogadores",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "AtivoEm",
                table: "Jogadores",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "Criado",
                table: "Jogadores",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "FotoUrl",
                table: "Jogadores",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Recado",
                table: "Jogadores",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Alcunha",
                table: "Jogadores");

            migrationBuilder.DropColumn(
                name: "AtivoEm",
                table: "Jogadores");

            migrationBuilder.DropColumn(
                name: "Criado",
                table: "Jogadores");

            migrationBuilder.DropColumn(
                name: "FotoUrl",
                table: "Jogadores");

            migrationBuilder.DropColumn(
                name: "Recado",
                table: "Jogadores");
        }
    }
}
