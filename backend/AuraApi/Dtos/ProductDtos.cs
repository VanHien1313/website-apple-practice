using System.ComponentModel.DataAnnotations;

namespace AuraApi.Dtos;

public class SpecDto
{
    [Required, StringLength(50)]
    public string Label { get; set; } = string.Empty;

    [Required, StringLength(150)]
    public string Value { get; set; } = string.Empty;
}

// Dữ liệu client gửi lên khi POST / PUT. Không có Id để tránh client tự đặt khóa chính.
public class ProductRequest
{
    [Required, StringLength(100)]
    [RegularExpression("^[a-z0-9]+(-[a-z0-9]+)*$", ErrorMessage = "Slug chỉ gồm chữ thường, số và dấu gạch ngang.")]
    public string Slug { get; set; } = string.Empty;

    [Required, StringLength(50)]
    public string Category { get; set; } = string.Empty;

    [Required, StringLength(150)]
    public string Name { get; set; } = string.Empty;

    [Required, StringLength(255)]
    public string Image { get; set; } = string.Empty;

    [Required, StringLength(500)]
    public string Description { get; set; } = string.Empty;

    [Range(0, 1_000_000_000, ErrorMessage = "Giá phải từ 0 đến 1.000.000.000.")]
    public decimal Price { get; set; }

    public List<SpecDto> Specs { get; set; } = new();
}

// Dữ liệu trả về cho client.
public class ProductResponse
{
    public int Id { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Image { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public List<SpecDto> Specs { get; set; } = new();
}
