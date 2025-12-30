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
        
        renderSlideshow(eventData, eventId);
    } catch (error) {
        console.error('Error loading slideshow:', error);
        showError('Failed to load slideshow. Please try again later.');
    }
});

async function fetchEventData(eventId) {
    // Construct R2 URL for event data
    const r2BaseUrl = window.R2_CONFIG?.baseUrl || 'https://pub-16bad3ab8ee04865aa77eed78dfc8813.r2.dev';
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

function renderSlideshow(eventData, eventId) {
    const slideshowContent = document.getElementById('slideshow-content');
    const r2BaseUrl = window.R2_CONFIG?.baseUrl || 'https://pub-16bad3ab8ee04865aa77eed78dfc8813.r2.dev';
    
    // Module-scoped state
    let currentSlideIndex = 0;
    const totalSlides = eventData.images.length;
    
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
                <button class="slideshow-btn" id="prevBtn">❮</button>
                <button class="slideshow-btn" id="nextBtn">❯</button>
            </div>
        </div>
        
        <div class="slideshow-counter">
            <span id="currentSlide">1</span> / <span id="totalSlides">${totalSlides}</span>
        </div>
        
        <div class="slideshow-thumbnails" id="thumbnails">
            ${eventData.images.map((image, index) => `
                <img src="${r2BaseUrl}/events/${eventId}/${image}" 
                     alt="Thumbnail ${index + 1}"
                     class="thumbnail ${index === 0 ? 'active' : ''}"
                     data-thumbnail-index="${index}">
            `).join('')}
        </div>
    `;
    
    slideshowContent.innerHTML = html;
    
    // Function to change slide
    function changeSlide(direction) {
        const images = document.querySelectorAll('.slideshow-image');
        const thumbnails = document.querySelectorAll('.thumbnail');
        
        // Remove active class from current slide
        images[currentSlideIndex].classList.remove('active');
        thumbnails[currentSlideIndex].classList.remove('active');
        
        // Calculate new index
        currentSlideIndex += direction;
        
        // Wrap around
        if (currentSlideIndex >= totalSlides) {
            currentSlideIndex = 0;
        } else if (currentSlideIndex < 0) {
            currentSlideIndex = totalSlides - 1;
        }
        
        // Add active class to new slide
        images[currentSlideIndex].classList.add('active');
        thumbnails[currentSlideIndex].classList.add('active');
        
        // Update counter
        document.getElementById('currentSlide').textContent = currentSlideIndex + 1;
        
        // Scroll thumbnail into view
        thumbnails[currentSlideIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
    
    // Function to go to specific slide
    function goToSlide(index) {
        const images = document.querySelectorAll('.slideshow-image');
        const thumbnails = document.querySelectorAll('.thumbnail');
        
        // Remove active class from current slide
        images[currentSlideIndex].classList.remove('active');
        thumbnails[currentSlideIndex].classList.remove('active');
        
        // Set new index
        currentSlideIndex = index;
        
        // Add active class to new slide
        images[currentSlideIndex].classList.add('active');
        thumbnails[currentSlideIndex].classList.add('active');
        
        // Update counter
        document.getElementById('currentSlide').textContent = currentSlideIndex + 1;
    }
    
    // Attach event listeners
    document.getElementById('prevBtn').addEventListener('click', () => changeSlide(-1));
    document.getElementById('nextBtn').addEventListener('click', () => changeSlide(1));
    
    // Thumbnail click handlers using event delegation
    document.getElementById('thumbnails').addEventListener('click', (e) => {
        if (e.target.classList.contains('thumbnail')) {
            const index = parseInt(e.target.getAttribute('data-thumbnail-index'));
            goToSlide(index);
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', keyboardHandler);
}

function keyboardHandler(e) {
    // Only handle if we're on the slideshow page
    if (!document.getElementById('slideshow-content')) return;
    
    if (e.key === 'ArrowLeft') {
        const prevBtn = document.getElementById('prevBtn');
        if (prevBtn) prevBtn.click();
    } else if (e.key === 'ArrowRight') {
        const nextBtn = document.getElementById('nextBtn');
        if (nextBtn) nextBtn.click();
    }
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
