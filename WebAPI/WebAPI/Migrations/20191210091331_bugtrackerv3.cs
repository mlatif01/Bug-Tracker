using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPI.Migrations
{
    public partial class bugtrackerv3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bugs_Project_ProjectId1",
                table: "Bugs");

            migrationBuilder.DropIndex(
                name: "IX_Bugs_ProjectId1",
                table: "Bugs");

            migrationBuilder.DropColumn(
                name: "ProjectId1",
                table: "Bugs");

            migrationBuilder.AlterColumn<int>(
                name: "ProjectId",
                table: "Bugs",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Bugs_ProjectId",
                table: "Bugs",
                column: "ProjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bugs_Project_ProjectId",
                table: "Bugs",
                column: "ProjectId",
                principalTable: "Project",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bugs_Project_ProjectId",
                table: "Bugs");

            migrationBuilder.DropIndex(
                name: "IX_Bugs_ProjectId",
                table: "Bugs");

            migrationBuilder.AlterColumn<string>(
                name: "ProjectId",
                table: "Bugs",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ProjectId1",
                table: "Bugs",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Bugs_ProjectId1",
                table: "Bugs",
                column: "ProjectId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Bugs_Project_ProjectId1",
                table: "Bugs",
                column: "ProjectId1",
                principalTable: "Project",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
