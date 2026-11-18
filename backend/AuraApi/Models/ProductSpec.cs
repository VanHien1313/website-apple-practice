namespace AuraApi.Models;

// Entity ánh xạ tới bảng ProductSpecs (khóa ngoại ProductId -> Products.Id).
public class ProductSpec
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public string Label { get; set; } = string.Empty;
    public string Value { get; set; } = string.Empty;
}
