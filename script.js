const products = [
    { "idproducto": "1", "nombre": "Producto A: Cafés", "precio": 10.00 },
    { "idproducto": "2", "nombre": "Producto B: Ensalada de frutas", "precio": 15.00 },
    { "idproducto": "3", "nombre": "Producto C: Sandwiches", "precio": 8.00 }
];

let selectedProducts = [];

// Función para mostrar productos 
function createProductCards() {
    const productGrid = document.getElementById('productGrid');
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = ` 
            <h5>${product.nombre}</h5> 
            <p>Precio: $${product.precio.toFixed(2)}</p> 
            <button class="select-product" data-idproducto="${product.idproducto}" data-nombre="${product.nombre}" data-precio="${product.precio}">Seleccionar</button> 
        `;
        productGrid.appendChild(card);
    });

    // Agregar eventos de clic a los botones de selección 
    document.querySelectorAll('.select-product').forEach(button => {
        button.addEventListener('click', function () {
            const idproducto = this.getAttribute('data-idproducto');
            const nombre = this.getAttribute('data-nombre');
            const precio = parseFloat(this.getAttribute('data-precio'));
            const existingProduct = selectedProducts.find(p => p.idproducto ===
                idproducto);

            if (existingProduct) {
                existingProduct.cantidad++;
            } else {
                selectedProducts.push({ idproducto, nombre, precio, cantidad: 1 });
            }

            createProductTable();
        });
    });
}

// Función para crear la tabla de productos seleccionados 
function createProductTable() {
    const productTable = document.getElementById('productTable');
    productTable.innerHTML = ''; // Limpiar la tabla 
    selectedProducts.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = ` 
            <td>${product.idproducto}</td> 
            <td>${product.nombre}</td> 
            <td>$${product.precio.toFixed(2)}</td> 
            <td><input type="number" value="${product.cantidad}" min="1" data
index="${index}" class="quantity-input"></td> 
            <td>$<span class="product-total">${(product.precio *
                product.cantidad).toFixed(2)}</span></td> 
            <td><button class="btn btn-danger delete-product" data
index="${index}">Eliminar</button></td> 
        `;
        productTable.appendChild(row);
    });

    // Actualizar total y manejar eventos de cambio 
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', function () {
            const index = this.getAttribute('data-index');
            const nuevaCantidad = parseInt(this.value);
            selectedProducts[index].cantidad = nuevaCantidad;
            createProductTable();
        });
    });

    // Agregar eventos de eliminación 
    document.querySelectorAll('.delete-product').forEach(button => {
        button.addEventListener('click', function () {
            const index = this.getAttribute('data-index');
            selectedProducts.splice(index, 1);
            createProductTable();
        });
    });
}

// Guardar el pedido (en sessionStorage) 
document.getElementById('saveOrder').addEventListener('click', function () {
    sessionStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
    alert('Productos guardados en Session Storage');
});

// Inicializar la aplicación 
createProductCards(); 
