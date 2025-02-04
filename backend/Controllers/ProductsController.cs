using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using backend.Models;
using backend.Services;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ProductService _productService;

        public ProductsController(ProductService productService)
        {
            _productService = productService;
        }

        [HttpGet("ping")]
        public ActionResult<string> Ping()
        {
            return "Pong";
        }

        [HttpGet]
        public ActionResult<List<Product>> Get() => _productService.GetAllProducts().ToList();

        [HttpGet("{id}")]
        public ActionResult<Product> Get(int id)
        {
            var product = _productService.GetProductById(id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        [HttpPost]
        public ActionResult<Product> Create(Product product)
        {
            _productService.AddProduct(product);
            return CreatedAtAction(nameof(Get), new { id = product.Id }, product);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Product productIn)
        {
            if (id != productIn.Id)
            {
                return BadRequest();
            }

            var product = _productService.GetProductById(id);

            if (product == null)
            {
                return NotFound();
            }

            _productService.UpdateProduct(id, productIn);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var product = _productService.GetProductById(id);

            if (product == null)
            {
                return NotFound();
            }

            _productService.DeleteProduct(id);

            return NoContent();
        }
    }
}