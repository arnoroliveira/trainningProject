document.addEventListener('DOMContentLoaded', function () {
    const url = 'http://localhost:5000/api/products/ping';

    // Fazer uma requisição GET para o endpoint de teste
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            console.log('Resposta do backend:', data);
            // Exibir a resposta no frontend
            const pingResultElement = document.getElementById('ping-result');
            if (pingResultElement) {
                pingResultElement.innerText = data;
            } else {
                console.error('Elemento com ID "ping-result" não encontrado.');
            }
        })
        .catch(error => {
            console.error('Erro ao conectar com o backend:', error);
            const pingResultElement = document.getElementById('ping-result');
            if (pingResultElement) {
                pingResultElement.innerText = 'Erro ao conectar com o backend: ' + error.message;
            } else {
                console.error('Elemento com ID "ping-result" não encontrado.');
            }
        });

    // Adiciona listener ao formulário de categorias
    const categoryForm = document.getElementById('category-form');
    if (categoryForm) {
        categoryForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const categoryName = document.getElementById('category-name').value;
            const categoryDescription = document.getElementById('category-description').value;
            const categoryUrl = 'http://localhost:5000/api/categories';

            fetch(categoryUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: categoryName })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Categoria adicionada:', data);
                // Atualizar a interface do usuário conforme necessário
            })
            .catch(error => {
                console.error('Erro ao adicionar categoria:', error);
            });
        });
    } else {
        console.error('Elemento com ID "category-form" não encontrado.');
    }

    // Adiciona listener ao formulário de produtos
    const productForm = document.getElementById('product-form');
    if (productForm) {
        productForm.addEventListener('submit', function (event) {
            event.preventDefault();
            addProduct();
        });
    } else {
        console.error('Elemento com ID "product-form" não encontrado.');
    }

    // Função para buscar categorias
    async function fetchCategories() {
        try {
            const response = await fetch('http://localhost:5000/api/categories');
            if (!response.ok) {
                throw new Error('Erro ao buscar categorias: ' + response.statusText);
            }
            const data = await response.json();
            console.log(data); // Mostrar as categorias no console
            displayCategories(data); // Exibir as categorias no HTML
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
            document.getElementById('result').textContent = 'Erro ao buscar categorias: ' + error.message;
        }
    }

    // Função para exibir categorias no HTML
    function displayCategories(categories) {
        const categoriesList = document.getElementById('categories-list');
        if (categoriesList) {
            categoriesList.innerHTML = '';
            categories.forEach(category => {
                const listItem = document.createElement('div');
                listItem.textContent = `${category.name}: ${category.description}`;
                categoriesList.appendChild(listItem);
            });
        }
    }

    // Função para buscar produtos
    async function fetchProducts() {
        try {
            const response = await fetch('http://localhost:5000/api/products');
            if (!response.ok) {
                throw new Error('Erro ao buscar produtos: ' + response.statusText);
            }
            const data = await response.json();
            console.log(data); // Mostrar os produtos no console
            displayProducts(data); // Exibir os produtos no HTML
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
            document.getElementById('result').textContent = 'Erro ao buscar produtos: ' + error.message;
        }
    }

    // Função para exibir produtos no HTML
    function displayProducts(products) {
        const reportTableBody = document.getElementById('report-table-body');
        if (reportTableBody) {
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

            if (response.ok) {
                const data = await response.json();
                console.log('Categoria cadastrada:', data);
                fetchCategories(); // Atualizar a lista de categorias
                document.getElementById('result').textContent = 'Categoria cadastrada com sucesso!';
                document.getElementById('category-form').reset();
            } else {
                console.error('Erro ao cadastrar categoria:', response.statusText);
                document.getElementById('result').textContent = 'Erro ao cadastrar categoria: ' + response.statusText;
            }
        } catch (error) {
            console.error('Erro ao cadastrar categoria:', error);
            document.getElementById('result').textContent = 'Erro ao cadastrar categoria: ' + error.message;
        }
    }

    // Função para adicionar novo produto
    async function addProduct() {
        const name = document.getElementById('product-name').value;
        const quantity = document.getElementById('product-quantity').value;
        const price = document.getElementById('product-price').value;
        const category = document.getElementById('product-category').value;

        try {
            const response = await fetch('http://localhost:5000/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, quantity, price, category })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Produto cadastrado:', data);
                fetchProducts(); // Atualizar a lista de produtos
                document.getElementById('result').textContent = 'Produto cadastrado com sucesso!';
                document.getElementById('product-form').reset();
            } else {
                console.error('Erro ao cadastrar produto:', response.statusText);
                document.getElementById('result').textContent = 'Erro ao cadastrar produto: ' + response.statusText;
            }
        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);
            document.getElementById('result').textContent = 'Erro ao cadastrar produto: ' + error.message;
        }
    }

    // Função para gerar relatório CSV
    document.getElementById('generate-report').addEventListener('click', function () {
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
});