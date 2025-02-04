using Microsoft.EntityFrameworkCore;
using backend.Services;
using backend.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configurar o Entity Framework Core com SQL Server
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Registrar os serviços
builder.Services.AddScoped<ProductService>();
builder.Services.AddScoped<CategoryService>();

// Configurar CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.WithOrigins("http://127.0.0.1:5500", "http://localhost:5500")
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection(); // Redirecionamento HTTPS

// Usar CORS
app.UseCors("AllowAllOrigins");

app.UseAuthorization();

app.MapControllers();

app.Run();
