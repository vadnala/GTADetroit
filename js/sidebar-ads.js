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
                
                // Initialize vertical sponsor logo display with timed switching
                initializeSponsorDisplay();
            })
            .catch(error => {
                console.warn('Could not load sidebar ads:', error);
            });
    }
});

function initializeSponsorDisplay() {
    // Configuration for each sponsor category
    const categoryConfigs = {
        'sponsor-category-diamond': {
            logosPerView: 2,  // Show 2 logos at a time
            interval: 5000    // 5 seconds
        },
        'sponsor-category-gold': {
            logosPerView: 4,  // Show 4 logos at a time
            interval: 5000    // 5 seconds
        },
        'sponsor-category-silver': {
            logosPerView: 2,  // Show 2 logos at a time
            interval: 5000    // 5 seconds
        }
    };

    // Process each sponsor category
    Object.keys(categoryConfigs).forEach(categoryClass => {
        const category = document.querySelector(`.${categoryClass}`);
        if (!category) return;

        const config = categoryConfigs[categoryClass];
        const logos = Array.from(category.querySelectorAll('.sponsor-logo'));
        
        if (logos.length === 0) return;

        let currentSetIndex = 0;
        
        // Calculate total number of sets
        const totalSets = Math.ceil(logos.length / config.logosPerView);

        // Function to show a specific set of logos
        function showLogoSet(setIndex) {
            // Hide all logos first
            logos.forEach(logo => logo.classList.remove('visible'));
            
            // Calculate which logos to show
            const startIdx = setIndex * config.logosPerView;
            const endIdx = Math.min(startIdx + config.logosPerView, logos.length);
            
            // Show the logos in this set
            for (let i = startIdx; i < endIdx; i++) {
                logos[i].classList.add('visible');
            }
        }

        // Show the first set immediately
        showLogoSet(currentSetIndex);

        // Set up interval to switch between sets
        setInterval(() => {
            currentSetIndex = (currentSetIndex + 1) % totalSets;
            showLogoSet(currentSetIndex);
        }, config.interval);
    });
}
