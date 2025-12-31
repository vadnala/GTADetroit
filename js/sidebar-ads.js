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
            })
            .catch(error => {
                console.warn('Could not load sidebar ads:', error);
            });
    }
});
