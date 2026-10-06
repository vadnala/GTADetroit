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
    
    // Fixed logo slots keep category heights consistent across image proportions.
    const categoryConfigs = {
        'sponsor-category-diamond': {
            logoHeight: 200,
            logosPerView: 2,
            interval: 10000
        },
        'sponsor-category-gold': {
            logoHeight: 200,
            logosPerView: 2,
            interval: 5000
        },
        'sponsor-category-silver': {
            logoHeight: 200,
            logosPerView: 2,
            interval: 3000
        }
    };

    // Process each sponsor category
    Object.keys(categoryConfigs).forEach(categoryClass => {
        const category = document.querySelector(`.${categoryClass}`);
        if (!category) return;

        const config = categoryConfigs[categoryClass];
        const logos = Array.from(category.querySelectorAll('.sponsor-logo'));
        
        if (logos.length === 0) return;

        const logosPerView = Math.min(config.logosPerView, logos.length);

        logos.forEach(logo => {
            logo.style.height = `${config.logoHeight}px`;
        });

        let currentStartIndex = 0;

        // Function to show a specific set of logos with slide-up animation
        function showLogoSet(startIndex) {
            const SLIDE_OUT_DELAY = 100; // Small delay to allow slide-out animation to start
            
            // Add sliding-out class to currently visible logos
            const currentlyVisible = logos.filter(logo => logo.classList.contains('visible'));
            currentlyVisible.forEach(logo => {
                logo.classList.add('sliding-out');
            });
            
            // After slide-out animation completes, hide old logos and show new ones
            setTimeout(() => {
                // Remove all classes from all logos
                logos.forEach(logo => {
                    logo.classList.remove('visible', 'sliding-out');
                });
                
                // Show the new set of logos (they will slide up from bottom)
                for (let i = 0; i < logosPerView; i++) {
                    const logoIndex = (startIndex + i) % logos.length;
                    logos[logoIndex].classList.add('visible');
                }
            }, SLIDE_OUT_DELAY);
        }

        // Show the first set immediately
        showLogoSet(currentStartIndex);

        // Keep a single set visible rather than repeatedly animating the same logos.
        if (logos.length <= logosPerView) return;

        // Set up interval to switch between sets and store the interval ID
        const intervalId = setInterval(() => {
            currentStartIndex = (currentStartIndex + logosPerView) % logos.length;
            showLogoSet(currentStartIndex);
        }, config.interval);
        
        // Store interval ID for cleanup
        sponsorIntervals.push(intervalId);
    });
}
