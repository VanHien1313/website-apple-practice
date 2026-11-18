namespace AuraApi.Models;

// Entity ánh xạ tới bảng Products.
public class Product
{
    public int Id { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Image { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }

    // Quan hệ 1-nhiều: một sản phẩm có nhiều thông số.
    public List<ProductSpec> Specs { get; set; } = new();
}
