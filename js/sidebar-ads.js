// Sidebar Ads Loader
// This script loads the sidebar ads component into pages

document.addEventListener('DOMContentLoaded', () => {
    const sidebarContainer = document.getElementById('sidebar-ads-container');
    
    if (sidebarContainer) {
        fetch('components/sidebar-ads.html')
            .then(response => response.text())
            .then(html => {
                sidebarContainer.innerHTML = html;
            })
            .catch(error => {
                console.warn('Could not load sidebar ads:', error);
            });
    }
});
