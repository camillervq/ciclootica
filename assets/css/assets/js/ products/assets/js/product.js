// Interatividade da página de produto
document.addEventListener('DOMContentLoaded', function() {
    // Galeria de imagens
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.querySelector('.main-image');
    
    if (thumbnails.length && mainImage) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                // Remove active class from all thumbnails
                thumbnails.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked thumbnail
                this.classList.add('active');
                
                // Change main image
                mainImage.src = this.src.replace('-thumbnail', '-large');
            });
        });
    }
    
    // Wishlist
    const wishlistBtn = document.querySelector('.wishlist-btn');
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            
            // Adicionar/remover da wishlist
            const productId = window.location.pathname.split('/').pop().replace('.html', '');
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
    }
    
    // Adicionar ao carrinho
    const addToCartBtn = document.querySelector('.btn-add-to-cart');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const productId = window.location.pathname.split('/').pop().replace('.html', '');
            
            fetch('/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    productId,
                    quantity: 1
                }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Atualizar contador do carrinho
                    const cartCount = document.querySelector('.cart-count');
                    if (cartCount) {
                        cartCount.textContent = data.cartCount;
                    }
                    
                    alert('Produto adicionado ao carrinho!');
                } else {
                    alert('Erro ao adicionar ao carrinho: ' + data.message);
                }
            });
        });
    }
});
