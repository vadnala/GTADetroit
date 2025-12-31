// Sidebar Ads Loader
// This script loads the sidebar ads component into pages

document.addEventListener('DOMContentLoaded', () => {
    const sidebarContainer = document.getElementById('sidebar-ads-container');
    
    if (sidebarContainer) {
        fetch('components/sidebar-ads.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                sidebarContainer.innerHTML = html;
                
                // Force reflow and start animations after content is loaded
                // This fixes the issue where animations start before layout is calculated
                // Use double requestAnimationFrame for Safari compatibility
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        const tracks = sidebarContainer.querySelectorAll('.sponsor-logos-track');
                        
                        // Wait for images to load before starting animations (Safari fix)
                        const images = sidebarContainer.querySelectorAll('.sponsor-logo');
                        let loadedImages = 0;
                        const totalImages = images.length;
                        let animationsStarted = false;
                        
                        const startAnimations = () => {
                            if (animationsStarted) return; // Prevent multiple calls
                            animationsStarted = true;
                            
                            tracks.forEach(track => {
                                // Force a reflow to ensure layout is calculated
                                track.offsetWidth;
                                // Add class to trigger animation
                                track.classList.add('animate');
                            });
                        };
                        
                        // If no images, start animations immediately
                        if (totalImages === 0) {
                            startAnimations();
                            return;
                        }
                        
                        // Wait for all images to load
                        images.forEach(img => {
                            if (img.complete) {
                                loadedImages++;
                            } else {
                                const handleImageLoad = () => {
                                    loadedImages++;
                                    if (loadedImages === totalImages) {
                                        startAnimations();
                                    }
                                };
                                
                                // Use 'once: true' to auto-remove listeners and prevent memory leaks
                                img.addEventListener('load', handleImageLoad, { once: true });
                                img.addEventListener('error', handleImageLoad, { once: true });
                            }
                        });
                        
                        // Start animations if all images were already loaded
                        if (loadedImages === totalImages) {
                            startAnimations();
                        }
                    });
                });
            })
            .catch(error => {
                console.warn('Could not load sidebar ads:', error);
            });
    }
});
