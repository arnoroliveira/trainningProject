using System.Collections.Generic;
using System.Linq;
using backend.Models;
using backend.Data;

namespace backend.Services
{
    public class CategoryService
    {
        private readonly ApplicationDbContext _context;

        public CategoryService(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Category> Get() => _context.Categories.ToList();

        public Category Get(int id)
        {
            var category = _context.Categories.Find(id);
            if (category == null)
            {
                throw new KeyNotFoundException($"Category with id {id} not found.");
            }
            return category;
        }

        public Category Create(Category category)
        {
            _context.Categories.Add(category);
            _context.SaveChanges();
            return category;
        }

        public void Update(int id, Category categoryIn)
        {
            var category = _context.Categories.Find(id);
            if (category != null)
            {
                category.Name = categoryIn.Name;
                category.Description = categoryIn.Description;
                _context.SaveChanges();
            }
        }

        public void Remove(int id)
        {
            var category = _context.Categories.Find(id);
            if (category != null)
            {
                _context.Categories.Remove(category);
                _context.SaveChanges();
            }
        }
    }
}