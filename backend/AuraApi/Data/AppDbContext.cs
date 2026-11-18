using AuraApi.Models;
using Microsoft.EntityFrameworkCore;

namespace AuraApi.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Product> Products => Set<Product>();
    public DbSet<ProductSpec> ProductSpecs => Set<ProductSpec>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>(entity =>
        {
            entity.Property(p => p.Slug).HasMaxLength(100).IsRequired();
            entity.HasIndex(p => p.Slug).IsUnique();
            entity.Property(p => p.Category).HasMaxLength(50).IsRequired();
            entity.Property(p => p.Name).HasMaxLength(150).IsRequired();
            entity.Property(p => p.Image).HasMaxLength(255).IsRequired();
            entity.Property(p => p.Description).HasMaxLength(500).IsRequired();
            entity.Property(p => p.Price).HasPrecision(18, 0);

            // 1 Product - nhiều ProductSpec; xóa Product thì xóa luôn các thông số.
            entity.HasMany(p => p.Specs)
                  .WithOne()
                  .HasForeignKey(s => s.ProductId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<ProductSpec>(entity =>
        {
            entity.Property(s => s.Label).HasMaxLength(50).IsRequired();
            entity.Property(s => s.Value).HasMaxLength(150).IsRequired();
        });

        // Dữ liệu mẫu, được chèn khi chạy "dotnet ef database update".
        modelBuilder.Entity<Product>().HasData(
            new Product { Id = 1, Slug = "macbook-air-13-m4", Category = "Mac", Name = "MacBook Air 13 inch M4", Image = "/images/macbook-air-13-m4.webp", Description = "Laptop 1,24 kg với chip M4, RAM 16 GB và hai cổng Thunderbolt 4.", Price = 26490000m },
            new Product { Id = 2, Slug = "iphone-17-pro", Category = "iPhone", Name = "iPhone 17 Pro", Image = "/images/iphone-17-pro.webp", Description = "Ba camera 48 MP, chip A19 Pro và màn hình ProMotion.", Price = 31990000m },
            new Product { Id = 3, Slug = "ipad-air-11-m3", Category = "iPad", Name = "iPad Air 11 inch M3 Wi-Fi", Image = "/images/ipad-air-11-m3.webp", Description = "Chip M3, màn hình Liquid Retina và hỗ trợ Apple Pencil Pro.", Price = 16690000m },
            new Product { Id = 4, Slug = "apple-watch-series-11", Category = "Apple Watch", Name = "Apple Watch Series 11 GPS 42mm", Image = "/images/apple-watch-series-11.webp", Description = "Màn hình luôn bật và theo dõi vận động trên cổ tay.", Price = 8990000m });

        modelBuilder.Entity<ProductSpec>().HasData(
            new ProductSpec { Id = 1, ProductId = 1, Label = "Chip", Value = "Apple M4" },
            new ProductSpec { Id = 2, ProductId = 1, Label = "Màn hình", Value = "Liquid Retina 13,6 inch" },
            new ProductSpec { Id = 3, ProductId = 1, Label = "Bộ nhớ", Value = "RAM 16 GB" },
            new ProductSpec { Id = 4, ProductId = 2, Label = "Chip", Value = "Apple A19 Pro" },
            new ProductSpec { Id = 5, ProductId = 2, Label = "Màn hình", Value = "OLED 6,3 inch, đến 120 Hz" },
            new ProductSpec { Id = 6, ProductId = 2, Label = "Camera sau", Value = "Hệ thống ba camera 48 MP" },
            new ProductSpec { Id = 7, ProductId = 3, Label = "Chip", Value = "Apple M3" },
            new ProductSpec { Id = 8, ProductId = 3, Label = "Màn hình", Value = "Liquid Retina 11 inch" },
            new ProductSpec { Id = 9, ProductId = 3, Label = "Bút cảm ứng", Value = "Hỗ trợ Apple Pencil Pro" },
            new ProductSpec { Id = 10, ProductId = 4, Label = "Vỏ", Value = "Nhôm 42 mm" },
            new ProductSpec { Id = 11, ProductId = 4, Label = "Màn hình", Value = "Retina OLED luôn bật" },
            new ProductSpec { Id = 12, ProductId = 4, Label = "Độ sáng", Value = "Tối đa 2.000 nit" });
    }
}
