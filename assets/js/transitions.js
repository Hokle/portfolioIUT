document.addEventListener('DOMContentLoaded', function() {
    if (typeof barba === 'undefined') {
        console.error("Barba.js n'est pas chargé");
        return;
    }
    
    if (typeof gsap === 'undefined') {
        console.error("GSAP n'est pas chargé");
        return;
    }

    console.log("Barba.js et GSAP sont chargés, initialisation...");
    
    // Configuration de base de Barba
    barba.init({
        transitions: [{
            name: 'fade-transition',
            
            // Cette fonction est appelée au début de la transition
            beforeLeave(data) {
                // Afficher l'overlay avec le spinner
                const overlay = document.getElementById('page-transition-overlay');
                if (overlay) {
                    gsap.to(overlay, {
                        opacity: 1,
                        duration: 0.3,
                        ease: 'power2.inOut'
                    });
                }
            },
            
            // Cette fonction est appelée avant de quitter la page actuelle
            leave(data) {
                return gsap.to(data.current.container, {
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power2.inOut'
                });
            },
            
            // Cette fonction est appelée après avoir quitté la page et avant d'entrer dans la nouvelle
            beforeEnter(data) {
                // Défiler vers le haut
                window.scrollTo(0, 0);
                
                // Rendre la nouvelle page initialement invisible
                gsap.set(data.next.container, { opacity: 0 });
                
                // Attendre un court instant pour simuler un chargement (si nécessaire)
                return new Promise(resolve => {
                    // Délai minimum pour l'animation du loader (facultatif)
                    setTimeout(resolve, 300);
                });
            },
            
            // Cette fonction est appelée pour afficher la nouvelle page
            enter(data) {
                return gsap.to(data.next.container, {
                    opacity: 1,
                    duration: 0.5,
                    ease: 'power2.inOut'
                });
            },
            
            // Cette fonction est appelée après l'entrée dans la nouvelle page
            after(data) {
                // Masquer l'overlay avec le spinner
                const overlay = document.getElementById('page-transition-overlay');
                if (overlay) {
                    gsap.to(overlay, {
                        opacity: 0,
                        duration: 0.3,
                        ease: 'power2.inOut'
                    });
                }
                
                // Réinitialiser les événements de la page
                initPageEvents();
            }
        }]
    });
    
    // Initialiser les événements de la page au chargement
    initPageEvents();
});

// Fonction pour initialiser les événements de la page
function initPageEvents() {
    // Gestion du menu mobile
    const menuButton = document.getElementById('menu-button');
    if (menuButton) {
        menuButton.addEventListener('click', function() {
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu) {
                mobileMenu.classList.toggle('hidden');
            }
        });
    }
}