using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using backend.Models;
using backend.Services;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly CategoryService _categoryService;

        public CategoriesController(CategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        public ActionResult<List<Category>> Get() => _categoryService.Get();

        [HttpGet("{id}")]
        public ActionResult<Category> Get(int id)
        {
            var category = _categoryService.Get(id);

            if (category == null)
            {
                return NotFound();
            }

            return category;
        }

        [HttpPost]
        public ActionResult<Category> Create(Category category)
        {
            _categoryService.Create(category);
            return CreatedAtAction(nameof(Get), new { id = category.Id }, category);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Category categoryIn)
        {
            var category = _categoryService.Get(id);

            if (category == null)
            {
                return NotFound();
            }

            _categoryService.Update(id, categoryIn);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var category = _categoryService.Get(id);

            if (category == null)
            {
                return NotFound();
            }

            _categoryService.Remove(id);
            return NoContent();
        }
    }
}