document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.dashboard-card');
    
    // Animación de entrada en cascada
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.4s ease-out';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index); // Retraso progresivo para cada tarjeta
    });
});
