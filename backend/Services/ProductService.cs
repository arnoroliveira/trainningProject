using System.Collections.Generic;
using System.Linq;
using backend.Models;
using backend.Data;

namespace backend.Services
{
    public class ProductService
    {
        private readonly ApplicationDbContext _context;

        public ProductService(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Product> GetAllProducts()
        {
            return _context.Products.ToList();
        }

        public Product GetProductById(int id)
        {
            return _context.Products.Find(id) ?? new Product { Name = "Default Name" };
        }

        public void AddProduct(Product product)
        {
            _context.Products.Add(product);
            _context.SaveChanges();
        }

        public void UpdateProduct(int id, Product productIn)
        {
            var product = _context.Products.Find(id);
            if (product != null && productIn != null)
            {
                product.Name = productIn.Name;
                product.Quantity = productIn.Quantity;
                product.Price = productIn.Price;
                product.CategoryId = productIn.CategoryId;
                _context.SaveChanges();
            }
        }

        public void DeleteProduct(int id)
        {
            var product = _context.Products.Find(id);
            if (product != null)
            {
                _context.Products.Remove(product);
                _context.SaveChanges();
            }
        }
    }
}