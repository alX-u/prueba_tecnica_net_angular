using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace PruebaTecnicaBackend.API.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserRoles",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedDateTime = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RoleId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedDateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModifiedDateTime = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_UserRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "UserRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserTasks",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    AssignedTo = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedDateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModifiedDateTime = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserTasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserTasks_Users_AssignedTo",
                        column: x => x.AssignedTo,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.InsertData(
                table: "UserRoles",
                columns: new[] { "Id", "CreatedDateTime", "Name" },
                values: new object[,]
                {
                    { new Guid("47363117-ff0f-43f1-b600-9886fafde0f7"), new DateTime(2024, 9, 15, 23, 28, 26, 972, DateTimeKind.Utc).AddTicks(3697), "Sin rol" },
                    { new Guid("7bd46732-4acc-4fb9-b1ca-c4db971b11e0"), new DateTime(2024, 9, 15, 23, 28, 26, 972, DateTimeKind.Utc).AddTicks(3700), "Supervisor" },
                    { new Guid("7d82d5ad-4e10-48bc-81ad-98c3200be749"), new DateTime(2024, 9, 15, 23, 28, 26, 972, DateTimeKind.Utc).AddTicks(3703), "Administrador" },
                    { new Guid("aad3b2fb-c5ce-45cf-a52a-7d3f8a4addef"), new DateTime(2024, 9, 15, 23, 28, 26, 972, DateTimeKind.Utc).AddTicks(3702), "Empleado" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedDateTime", "Email", "LastModifiedDateTime", "Name", "Password", "RoleId" },
                values: new object[] { new Guid("6e285376-1d92-4d4f-91ee-ca3ba8dc6500"), new DateTime(2024, 9, 15, 23, 28, 27, 90, DateTimeKind.Utc).AddTicks(7782), "admin@gmail.com", new DateTime(2024, 9, 15, 23, 28, 27, 90, DateTimeKind.Utc).AddTicks(7789), "Admin", "$2a$11$CS1BiiO5QyVsUNYHxbgk1./1MMknZpq2Bi7lPE2wKmlpb1rnUTmie", new Guid("7d82d5ad-4e10-48bc-81ad-98c3200be749") });

            migrationBuilder.CreateIndex(
                name: "IX_Users_RoleId",
                table: "Users",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_UserTasks_AssignedTo",
                table: "UserTasks",
                column: "AssignedTo");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserTasks");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "UserRoles");
        }
    }
}
