using System.ComponentModel.DataAnnotations;

namespace LoreWeaver.Entities;

public class CoordinatesRangeAttribute : ValidationAttribute
{
    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        return value switch
        {
            null or Coordinate[] { Length: 1 } or Coordinate[] { Length: >= 3 } => ValidationResult.Success,
            Coordinate[] { Length: 2 } => new ValidationResult("Length cannot be 2"),
            _ => new ValidationResult("Invalid value type")
        };
    }
}