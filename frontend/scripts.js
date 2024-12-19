document.addEventListener('DOMContentLoaded', function () {
    fetchCategories(); // Carregar as categorias ao carregar a página
    fetchProducts(); // Carregar os produtos ao carregar a página
});

// Função para buscar categorias
async function fetchCategories() {
    try {
        const response = await fetch('http://localhost:5000/api/categories');
        const data = await response.json();
        console.log(data); // Mostrar as categorias no console
        displayCategories(data); // Exibir as categorias no HTML
    } catch (error) {
        console.error('Erro ao buscar categorias:', error);
    }
}

// Função para adicionar nova categoria
async function addCategory() {
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;

    try {
        const response = await fetch('http://localhost:5000/api/categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, description })
        });
        const data = await response.json();
        console.log('Categoria cadastrada:', data);
        fetchCategories(); // Atualizar a lista de categorias
    } catch (error) {
        console.error('Erro ao cadastrar categoria:', error);
    }
}

// Função para buscar produtos
async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        console.log(data); // Mostrar os produtos no console
        displayProducts(data); // Exibir os produtos no HTML
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
    }
}

// Função para exibir categorias no HTML
function displayCategories(categories) {
    const categoriesList = document.getElementById('categories-list');
    categoriesList.innerHTML = '';
    categories.forEach(category => {
        const listItem = document.createElement('div');
        listItem.textContent = `${category.name}: ${category.description}`;
        categoriesList.appendChild(listItem);
    });
}

// Função para exibir produtos no HTML
function displayProducts(products) {
    const reportTableBody = document.getElementById('report-table-body');
    reportTableBody.innerHTML = '';
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.quantity}</td>
            <td>${product.price}</td>
            <td>${product.category.name}</td>
        `;
        reportTableBody.appendChild(row);
    });
}

// Função para gerar relatório CSV
document.getElementById('generate-report').addEventListener('click', function() {
    let table = document.getElementById('report-table');
    let rows = table.querySelectorAll('tr');
    let csvContent = '';

    rows.forEach(row => {
        let cols = row.querySelectorAll('td, th');
        let rowData = [];
        cols.forEach(col => {
            rowData.push(col.innerText);
        });
        csvContent += rowData.join(',') + '\n';
    });

    let blob = new Blob([csvContent], { type: 'text/csv' });
    let url = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'relatorio.csv');
    a.click();
});

