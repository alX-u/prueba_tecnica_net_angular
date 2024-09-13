using PruebaTecnicaBackend.Contracts.Enums;

namespace PruebaTecnicaBackend.API.Data.Entities;

public class UserTaskEntity
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public UserTaskStatus Status { get; set; }
    public Guid? AssignedTo { get; set; }
    public UserEntity? User { get; set; }
    public DateTime CreatedDateTime { get; set; }
    public DateTime LastModifiedDateTime { get; set; }

}