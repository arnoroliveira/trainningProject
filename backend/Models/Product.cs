namespace backend.Models
{
    public class Product
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public int Quantity { get; set; }

        public int CategoryId { get; set; }

        public decimal Price { get; set; } // Added Price property

    }
}