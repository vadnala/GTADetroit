// Event data management for events.html
document.addEventListener('DOMContentLoaded', async () => {
    const pastEventsContainer = document.getElementById('past-events-container');
    
    if (!pastEventsContainer) {
        return; // Not on events page
    }
    
    try {
        // Fetch events list from R2
        const events = await fetchEventsList();
        
        if (events && events.length > 0) {
            renderPastEvents(events);
        }
    } catch (error) {
        console.error('Error loading events:', error);
        // Keep the static events if dynamic loading fails
    }
});

async function fetchEventsList() {
    const r2BaseUrl = window.R2_CONFIG?.baseUrl || 'https://pub-4bc84f329ded4595a098e56d0bd37e93.r2.dev';
    const eventsListUrl = `${r2BaseUrl}/events/events-list.json`;
    
    try {
        const response = await fetch(eventsListUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching events list:', error);
        throw error;
    }
}

function renderPastEvents(events) {
    const pastEventsContainer = document.getElementById('past-events-container');
    const r2BaseUrl = window.R2_CONFIG?.baseUrl || 'https://pub-4bc84f329ded4595a098e56d0bd37e93.r2.dev';
    
    const eventsHTML = events.map(event => {
        // Determine cover image - prioritize cover.webp from R2, fallback to event.coverImage
        const coverImageUrl = event.r2Directory 
            ? `${r2BaseUrl}/events/${event.r2Directory}/cover.webp`
            : (event.coverImage || 'https://placehold.co/400x300?text=Event');
        
        // Determine gallery link - prioritize slideshow if R2 directory exists
        const galleryLink = event.r2Directory
            ? `event-slideshow.html?event=${event.r2Directory}`
            : event.galleryUrl;
        
        const galleryButtonHTML = galleryLink
            ? `<a href="${galleryLink}" class="cta-btn" 
                  style="padding: 8px 20px; font-size: 14px;"
                  data-gallery-link="${galleryLink}"
                  data-is-external="${!event.r2Directory}">
                  ${event.r2Directory ? 'View Slideshow' : 'View Gallery'}
               </a>`
            : `<a href="#" class="cta-btn"
                  style="padding: 8px 20px; font-size: 14px; background-color: #ccc; cursor: default;"
                  data-disabled="true">Gallery Coming Soon</a>`;
        
        return `
            <div class="event-card">
                <div class="event-img">
                    <img src="${coverImageUrl}" 
                         alt="${event.title}"
                         data-fallback="https://placehold.co/400x300?text=Event">
                </div>
                <div class="event-details">
                    <span class="event-date">${event.date}</span>
                    <h3 style="font-size: 24px; margin-bottom: 10px;">${event.title}</h3>
                    <p style="margin-bottom: 20px; color: #666;">${event.description}</p>
                    ${galleryButtonHTML}
                </div>
            </div>
        `;
    }).join('');
    
    pastEventsContainer.innerHTML = eventsHTML;
    
    // Add event listeners after DOM insertion
    pastEventsContainer.querySelectorAll('.event-img img').forEach(img => {
        img.addEventListener('error', function() {
            this.src = this.getAttribute('data-fallback');
        });
    });
    
    pastEventsContainer.querySelectorAll('.cta-btn').forEach(btn => {
        if (btn.getAttribute('data-disabled') === 'true') {
            btn.addEventListener('click', (e) => e.preventDefault());
        } else if (btn.getAttribute('data-is-external') === 'true') {
            btn.setAttribute('target', '_blank');
        }
    });
}
