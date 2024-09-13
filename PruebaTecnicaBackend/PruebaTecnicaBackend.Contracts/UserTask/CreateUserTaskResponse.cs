using PruebaTecnicaBackend.Contracts.Enums;
namespace PruebaTecnicaBackend.Contracts.UserTask;

public record UserTaskResponse(
Guid Id,
string Title,
string Description,
UserTaskStatus Status,
DateTime CreatedDateTime,
DateTime LastModifiedDateTime
);

