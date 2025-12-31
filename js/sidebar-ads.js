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
                requestAnimationFrame(() => {
                    const tracks = sidebarContainer.querySelectorAll('.sponsor-logos-track');
                    tracks.forEach(track => {
                        // Force a reflow to ensure layout is calculated
                        track.offsetWidth;
                        // Add class to trigger animation
                        track.classList.add('animate');
                    });
                });
            })
            .catch(error => {
                console.warn('Could not load sidebar ads:', error);
            });
    }
});
