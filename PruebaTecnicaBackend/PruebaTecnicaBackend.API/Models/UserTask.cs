using PruebaTecnicaBackend.Contracts.Enums;

namespace PruebaTecnicaBackend.API.Models;

public class UserTask
{
    public Guid Id { get; }
    public string Title { get; }

    public string Description { get; }

    public UserTaskStatus Status { get; }

    public DateTime StartDateTime { get; }

    public DateTime EndDateTime { get; }

    public DateTime LastModifiedDateTime { get; }

    public UserTask(Guid id, string title, string description, UserTaskStatus status, DateTime startDateTime, DateTime endDateTime, DateTime lastModifiedDateTime)
    {
        //Add wanted logic for each field
        Id = id;
        Title = title;
        Description = description;
        Status = status;
        StartDateTime = startDateTime;
        EndDateTime = endDateTime;
        LastModifiedDateTime = lastModifiedDateTime;
    }

}