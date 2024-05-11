using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class Avaliacoes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Avaliacoes",
                columns: table => new
                {
                    OlheiroId = table.Column<int>(type: "INTEGER", nullable: false),
                    AvaliadoId = table.Column<int>(type: "INTEGER", nullable: false),
                    NotaVelocidade = table.Column<int>(type: "INTEGER", nullable: true),
                    NotaMarcacao = table.Column<int>(type: "INTEGER", nullable: true),
                    NotaRaca = table.Column<int>(type: "INTEGER", nullable: true),
                    NotaHabilidade = table.Column<int>(type: "INTEGER", nullable: true),
                    NotaGoleiro = table.Column<int>(type: "INTEGER", nullable: true),
                    EhFan = table.Column<bool>(type: "INTEGER", nullable: true),
                    NotaGeral = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Avaliacoes", x => new { x.OlheiroId, x.AvaliadoId });
                    table.ForeignKey(
                        name: "FK_Avaliacoes_Jogadores_AvaliadoId",
                        column: x => x.AvaliadoId,
                        principalTable: "Jogadores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Avaliacoes_Jogadores_OlheiroId",
                        column: x => x.OlheiroId,
                        principalTable: "Jogadores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Avaliacoes_AvaliadoId",
                table: "Avaliacoes",
                column: "AvaliadoId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Avaliacoes");
        }
    }
}
