// Sidebar Ads Loader
// This script loads the sidebar ads component into pages

// Store interval IDs for cleanup
const sponsorIntervals = [];

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

// Cleanup function to clear all intervals
function cleanupSponsorDisplay() {
    sponsorIntervals.forEach(intervalId => clearInterval(intervalId));
    sponsorIntervals.length = 0;
}

function initializeSponsorDisplay() {
    // Clear any existing intervals before setting up new ones
    cleanupSponsorDisplay();
    
    // Height allocations and timing per category
    const categoryConfigs = {
        'sponsor-category-diamond': {
            // 40% height allocation, prefer 3 logos if they fit, else 2
            logoHeight: 120,  // Target height for each logo
            preferredCount: 3,
            fallbackCount: 2,
            interval: 10000   // 10 seconds
        },
        'sponsor-category-gold': {
            // 30% height allocation, fit as many as possible
            logoHeight: 100,  // Target height for each logo
            maxCount: 4,      // Maximum logos to show at once
            interval: 5000    // 5 seconds
        },
        'sponsor-category-silver': {
            // 20% height allocation, fit as many as possible
            logoHeight: 80,   // Target height for each logo
            maxCount: 3,      // Maximum logos to show at once
            interval: 3000    // 3 seconds
        }
    };

    // Process each sponsor category
    Object.keys(categoryConfigs).forEach(categoryClass => {
        const category = document.querySelector(`.${categoryClass}`);
        if (!category) return;

        const config = categoryConfigs[categoryClass];
        const logos = Array.from(category.querySelectorAll('.sponsor-logo'));
        
        if (logos.length === 0) return;

        // Get the container height
        const container = category.querySelector('.sponsor-logos-scroll');
        const containerHeight = container ? container.clientHeight : 300;
        
        // Calculate how many logos can fit
        let logosPerView;
        if (categoryClass === 'sponsor-category-diamond') {
            // Special logic for DIAMOND: try for 3, fallback to 2
            const spaceFor3 = config.preferredCount * config.logoHeight + (config.preferredCount - 1) * 20;
            logosPerView = spaceFor3 <= containerHeight ? config.preferredCount : config.fallbackCount;
        } else {
            // For GOLD and SILVER: fit as many as possible up to max
            const possibleCount = Math.floor(containerHeight / (config.logoHeight + 20));
            logosPerView = Math.min(possibleCount, config.maxCount || possibleCount);
        }
        
        // Ensure at least 1 logo is shown
        logosPerView = Math.max(1, logosPerView);
        
        // Set the height for all logos in this category
        logos.forEach(logo => {
            logo.style.maxHeight = `${config.logoHeight}px`;
        });

        let currentSetIndex = 0;
        
        // Calculate total number of sets
        const totalSets = Math.ceil(logos.length / logosPerView);

        // Function to show a specific set of logos
        function showLogoSet(setIndex) {
            // Hide all logos first
            logos.forEach(logo => logo.classList.remove('visible'));
            
            // Calculate which logos to show
            const startIdx = setIndex * logosPerView;
            const endIdx = Math.min(startIdx + logosPerView, logos.length);
            
            // Show the logos in this set
            for (let i = startIdx; i < endIdx; i++) {
                logos[i].classList.add('visible');
            }
        }

        // Show the first set immediately
        showLogoSet(currentSetIndex);

        // Set up interval to switch between sets and store the interval ID
        const intervalId = setInterval(() => {
            currentSetIndex = (currentSetIndex + 1) % totalSets;
            showLogoSet(currentSetIndex);
        }, config.interval);
        
        // Store interval ID for cleanup
        sponsorIntervals.push(intervalId);
    });
}
