document.addEventListener('DOMContentLoaded', async () => {
    const slideshowContent = document.getElementById('slideshow-content');
    
    // Get event ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('event');
    
    if (!eventId) {
        showError('No event specified');
        return;
    }
    
    try {
        // Fetch event data from R2
        const eventData = await fetchEventData(eventId);
        
        if (!eventData || !eventData.images || eventData.images.length === 0) {
            showError('No images found for this event');
            return;
        }
        
        renderSlideshow(eventData);
    } catch (error) {
        console.error('Error loading slideshow:', error);
        showError('Failed to load slideshow. Please try again later.');
    }
});

async function fetchEventData(eventId) {
    // Construct R2 URL for event data
    const r2BaseUrl = 'https://pub-4bc84f329ded4595a098e56d0bd37e93.r2.dev';
    const eventDataUrl = `${r2BaseUrl}/events/${eventId}/event-data.json`;
    
    try {
        const response = await fetch(eventDataUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching event data:', error);
        throw error;
    }
}

function renderSlideshow(eventData) {
    const slideshowContent = document.getElementById('slideshow-content');
    const r2BaseUrl = 'https://pub-4bc84f329ded4595a098e56d0bd37e93.r2.dev';
    
    // Get event ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('event');
    
    const html = `
        <div class="slideshow-header">
            <h1>${eventData.title || 'Event Gallery'}</h1>
            <div class="event-date">${eventData.date || ''}</div>
        </div>
        
        <div class="slideshow-viewer">
            <div class="slideshow-image-container">
                ${eventData.images.map((image, index) => `
                    <img src="${r2BaseUrl}/events/${eventId}/${image}" 
                         alt="${eventData.title} - Image ${index + 1}"
                         class="slideshow-image ${index === 0 ? 'active' : ''}"
                         data-index="${index}">
                `).join('')}
            </div>
            
            <div class="slideshow-controls">
                <button class="slideshow-btn" id="prevBtn" onclick="changeSlide(-1)">❮</button>
                <button class="slideshow-btn" id="nextBtn" onclick="changeSlide(1)">❯</button>
            </div>
        </div>
        
        <div class="slideshow-counter">
            <span id="currentSlide">1</span> / <span id="totalSlides">${eventData.images.length}</span>
        </div>
        
        <div class="slideshow-thumbnails">
            ${eventData.images.map((image, index) => `
                <img src="${r2BaseUrl}/events/${eventId}/${image}" 
                     alt="Thumbnail ${index + 1}"
                     class="thumbnail ${index === 0 ? 'active' : ''}"
                     onclick="goToSlide(${index})">
            `).join('')}
        </div>
    `;
    
    slideshowContent.innerHTML = html;
    
    // Initialize slideshow
    window.currentSlideIndex = 0;
    window.totalSlides = eventData.images.length;
}

function changeSlide(direction) {
    const images = document.querySelectorAll('.slideshow-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    // Remove active class from current slide
    images[window.currentSlideIndex].classList.remove('active');
    thumbnails[window.currentSlideIndex].classList.remove('active');
    
    // Calculate new index
    window.currentSlideIndex += direction;
    
    // Wrap around
    if (window.currentSlideIndex >= window.totalSlides) {
        window.currentSlideIndex = 0;
    } else if (window.currentSlideIndex < 0) {
        window.currentSlideIndex = window.totalSlides - 1;
    }
    
    // Add active class to new slide
    images[window.currentSlideIndex].classList.add('active');
    thumbnails[window.currentSlideIndex].classList.add('active');
    
    // Update counter
    document.getElementById('currentSlide').textContent = window.currentSlideIndex + 1;
    
    // Scroll thumbnail into view
    thumbnails[window.currentSlideIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
}

function goToSlide(index) {
    const images = document.querySelectorAll('.slideshow-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    // Remove active class from current slide
    images[window.currentSlideIndex].classList.remove('active');
    thumbnails[window.currentSlideIndex].classList.remove('active');
    
    // Set new index
    window.currentSlideIndex = index;
    
    // Add active class to new slide
    images[window.currentSlideIndex].classList.add('active');
    thumbnails[window.currentSlideIndex].classList.add('active');
    
    // Update counter
    document.getElementById('currentSlide').textContent = window.currentSlideIndex + 1;
}

function showError(message) {
    const slideshowContent = document.getElementById('slideshow-content');
    slideshowContent.innerHTML = `
        <div class="error-message">
            <h2>Error</h2>
            <p>${message}</p>
            <a href="events.html" class="cta-btn" style="display: inline-block; margin-top: 20px;">Back to Events</a>
        </div>
    `;
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
});
