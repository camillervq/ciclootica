// Funções gerais do site
document.addEventListener('DOMContentLoaded', function() {
    // Carrinho de compras
    const cartIcon = document.querySelector('.cart-icon');
    const cartDropdown = document.querySelector('.cart-dropdown');
    
    if (cartIcon && cartDropdown) {
        cartIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
        });
        
        document.addEventListener('click', function() {
            cartDropdown.style.display = 'none';
        });
    }
    
    // Filtros de tags
    const filterTags = document.querySelectorAll('.filter-tag');
    filterTags.forEach(tag => {
        tag.addEventListener('click', function() {
            // Remove active class from all tags in the same group
            const parent = this.parentNode;
            const siblings = parent.querySelectorAll('.filter-tag');
            siblings.forEach(sib => sib.classList.remove('active'));
            
            // Add active class to clicked tag
            this.classList.add('active');
            
            // Filtrar produtos (em um site real, isso faria uma requisição ao servidor)
            filterProducts();
        });
    });
    
    function filterProducts() {
        // Em um site real, isso faria uma requisição AJAX para o servidor
        // com os parâmetros de filtro selecionados
        console.log('Filtrando produtos...');
    }
    
    // Wishlist na página inicial
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
            
            const productCard = this.closest('.product-card');
            const productId = productCard.href.split('/').pop().replace('.html', '');
            const action = this.classList.contains('active') ? 'add' : 'remove';
            
            fetch('/wishlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    productId,
                    action
                }),
            });
        });
    });
});
