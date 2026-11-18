using AuraApi.Data;
using AuraApi.Dtos;
using AuraApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AuraApi.Controllers;

[ApiController]
[Route("api/[controller]")] // => /api/products
public class ProductsController(AppDbContext db) : ControllerBase
{
    // GET /api/products hoặc /api/products?category=Mac
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProductResponse>>> GetAll([FromQuery] string? category)
    {
        IQueryable<Product> query = db.Products.AsNoTracking().Include(p => p.Specs);

        if (!string.IsNullOrWhiteSpace(category))
        {
            query = query.Where(p => p.Category == category);
        }

        var products = await query.OrderBy(p => p.Id).ToListAsync();
        return Ok(products.Select(ToResponse));
    }

    // GET /api/products/1
    [HttpGet("{id:int}")]
    public async Task<ActionResult<ProductResponse>> GetById(int id)
    {
        var product = await db.Products
            .AsNoTracking()
            .Include(p => p.Specs)
            .FirstOrDefaultAsync(p => p.Id == id);

        return product is null ? NotFound() : Ok(ToResponse(product));
    }

    // POST /api/products
    [HttpPost]
    public async Task<ActionResult<ProductResponse>> Create(ProductRequest request)
    {
        if (await db.Products.AnyAsync(p => p.Slug == request.Slug))
        {
            return SlugConflict(request.Slug);
        }

        var product = new Product();
        Apply(product, request);

        db.Products.Add(product);
        await db.SaveChangesAsync();

        // 201 Created + header Location trỏ tới GET /api/products/{id}
        return CreatedAtAction(nameof(GetById), new { id = product.Id }, ToResponse(product));
    }

    // PUT /api/products/1
    [HttpPut("{id:int}")]
    public async Task<ActionResult<ProductResponse>> Update(int id, ProductRequest request)
    {
        var product = await db.Products.Include(p => p.Specs).FirstOrDefaultAsync(p => p.Id == id);
        if (product is null)
        {
            return NotFound();
        }

        if (await db.Products.AnyAsync(p => p.Slug == request.Slug && p.Id != id))
        {
            return SlugConflict(request.Slug);
        }

        Apply(product, request);
        await db.SaveChangesAsync();

        return Ok(ToResponse(product));
    }

    // DELETE /api/products/1
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var product = await db.Products.FindAsync(id);
        if (product is null)
        {
            return NotFound();
        }

        db.Products.Remove(product); // các ProductSpec bị xóa theo nhờ cascade delete
        await db.SaveChangesAsync();

        return NoContent();
    }

    private ObjectResult SlugConflict(string slug) =>
        Problem(
            title: "Slug đã tồn tại",
            detail: $"Slug \"{slug}\" đã được dùng cho một sản phẩm khác.",
            statusCode: StatusCodes.Status409Conflict);

    // Chép dữ liệu từ request vào entity; danh sách Specs được thay mới hoàn toàn.
    private static void Apply(Product product, ProductRequest request)
    {
        product.Slug = request.Slug;
        product.Category = request.Category;
        product.Name = request.Name;
        product.Image = request.Image;
        product.Description = request.Description;
        product.Price = request.Price;

        product.Specs.Clear();
        foreach (var spec in request.Specs)
        {
            product.Specs.Add(new ProductSpec { Label = spec.Label, Value = spec.Value });
        }
    }

    private static ProductResponse ToResponse(Product product) => new()
    {
        Id = product.Id,
        Slug = product.Slug,
        Category = product.Category,
        Name = product.Name,
        Image = product.Image,
        Description = product.Description,
        Price = product.Price,
        Specs = product.Specs
            .Select(s => new SpecDto { Label = s.Label, Value = s.Value })
            .ToList(),
    };
}
