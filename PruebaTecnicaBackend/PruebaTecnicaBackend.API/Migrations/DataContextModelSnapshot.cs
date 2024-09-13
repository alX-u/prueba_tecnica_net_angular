﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PruebaTecnicaBackend.API.Data;

#nullable disable

namespace PruebaTecnicaBackend.API.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("PruebaTecnicaBackend.API.Data.Entities.UserEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("CreatedDateTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("RoleId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("PruebaTecnicaBackend.API.Data.Entities.UserRoleEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("CreatedDateTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("UserRoles");

                    b.HasData(
                        new
                        {
                            Id = new Guid("ea0e85f4-1eb6-4616-9940-559adfe428e2"),
                            CreatedDateTime = new DateTime(2024, 9, 13, 15, 24, 32, 139, DateTimeKind.Utc).AddTicks(4777),
                            Name = "Supervisor"
                        },
                        new
                        {
                            Id = new Guid("8d326e35-8a37-44ad-86a8-ef2ebed5d233"),
                            CreatedDateTime = new DateTime(2024, 9, 13, 15, 24, 32, 139, DateTimeKind.Utc).AddTicks(4822),
                            Name = "Empleado"
                        },
                        new
                        {
                            Id = new Guid("93ea1de6-08d6-4531-8e84-df8532b89cf6"),
                            CreatedDateTime = new DateTime(2024, 9, 13, 15, 24, 32, 139, DateTimeKind.Utc).AddTicks(4824),
                            Name = "Administrador"
                        });
                });

            modelBuilder.Entity("PruebaTecnicaBackend.API.Data.Entities.UserTaskEntity", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("AssignedTo")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("CreatedDateTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("LastModifiedDateTime")
                        .HasColumnType("datetime2");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("AssignedTo");

                    b.ToTable("UserTasks");
                });

            modelBuilder.Entity("PruebaTecnicaBackend.API.Data.Entities.UserEntity", b =>
                {
                    b.HasOne("PruebaTecnicaBackend.API.Data.Entities.UserRoleEntity", "Role")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Role");
                });

            modelBuilder.Entity("PruebaTecnicaBackend.API.Data.Entities.UserTaskEntity", b =>
                {
                    b.HasOne("PruebaTecnicaBackend.API.Data.Entities.UserEntity", "User")
                        .WithMany("AssignedTasks")
                        .HasForeignKey("AssignedTo")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.Navigation("User");
                });

            modelBuilder.Entity("PruebaTecnicaBackend.API.Data.Entities.UserEntity", b =>
                {
                    b.Navigation("AssignedTasks");
                });
#pragma warning restore 612, 618
        }
    }
}
