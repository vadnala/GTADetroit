# Event Slideshow System Documentation

## Overview
This system enables dynamic loading of event photo galleries from Cloudflare R2 storage. Events can display cover images and link to dedicated slideshow pages.

## R2 Storage Structure

The expected R2 bucket structure is:

```
gtadetroit-images/
└── events/
    ├── events-list.json              # List of all events
    ├── bathukamma/                   # Event type directory
    │   ├── 2024/                     # Year directory
    │   │   ├── cover.webp            # Cover image for event card
    │   │   ├── event-data.json       # Event metadata
    │   │   ├── image1.webp           # Slideshow images
    │   │   ├── image2.webp
    │   │   └── ...
    │   └── 2025/                     # Another year
    │       ├── cover.webp
    │       ├── event-data.json
    │       └── ...
    └── cricket/                      # Another event type
        ├── 2024/
        │   ├── cover.webp
        │   ├── event-data.json
        │   └── ...
        └── 2025/
            └── ...
```

## JSON File Formats

### events-list.json
Located at: `{R2_BASE_URL}/gtadetroit-images/events/events-list.json`

This file contains an array of all events:

```json
[
    {
        "id": "bathukamma-2025",
        "title": "Bathukamma Festival",
        "date": "September 27, 2025",
        "description": "We celebrated the grand festival of Bathukamma...",
        "r2Directory": "bathukamma/2025",
        "coverImage": "images/Bhathukamma_2025_1.JPG",
        "galleryUrl": "https://external-gallery.com/..."  // Optional external gallery
    },
    ...
]
```

**Field Descriptions:**
- `id`: Unique identifier for the event
- `title`: Event title displayed on the card
- `date`: Event date string
- `description`: Brief description of the event
- `r2Directory`: (Optional) If present, enables R2-based slideshow. This is the path relative to `/gtadetroit-images/events/` (e.g., `bathukamma/2025` or `cricket/2024`).
- `coverImage`: (Optional) Fallback cover image URL if R2 cover.webp is not available
- `galleryUrl`: (Optional) External gallery link (e.g., Zenfolio). Used only if r2Directory is not present.

### event-data.json
Located at: `{R2_BASE_URL}/gtadetroit-images/events/{event-type}/{year}/event-data.json`

This file contains metadata for a specific event's slideshow:

```json
{
    "title": "Bathukamma Festival 2025",
    "date": "September 27, 2025",
    "description": "Grand celebration of Bathukamma...",
    "images": [
        "image1.webp",
        "image2.webp",
        "image3.webp"
    ]
}
```

**Field Descriptions:**
- `title`: Event title for the slideshow header
- `date`: Event date
- `description`: (Optional) Event description
- `images`: Array of image filenames in the event directory

## How It Works

### On events.html:
1. The page attempts to fetch `events-list.json` from R2 at `{R2_BASE_URL}/gtadetroit-images/events/events-list.json`
2. If successful, it dynamically renders event cards
3. For each event:
   - If `r2Directory` is present, it uses `cover.webp` from `{R2_BASE_URL}/gtadetroit-images/events/{r2Directory}/cover.webp`
   - Falls back to `coverImage` if R2 is unavailable
   - Creates a "View Slideshow" link to `event-slideshow.html?event={r2Directory}` if R2 is configured
   - Otherwise shows "View Gallery" link to external `galleryUrl`
4. If R2 fetch fails, static HTML events are displayed as fallback

### On event-slideshow.html:
1. Reads the `event` parameter from URL (e.g., `?event=bathukamma/2025`)
2. Fetches `event-data.json` from `{R2_BASE_URL}/gtadetroit-images/events/{event}/event-data.json`
3. Renders an interactive slideshow with:
   - Navigation buttons (previous/next)
   - Thumbnail strip
   - Keyboard navigation (arrow keys)
   - Image counter
4. All images are loaded from the event's R2 directory at `{R2_BASE_URL}/gtadetroit-images/events/{event}/`

## Configuration

The R2 base URL is configured in a centralized location in `js/config.js`:

```javascript
const R2_CONFIG = {
    baseUrl: 'https://pub-16bad3ab8ee04865aa77eed78dfc8813.r2.dev'
};
```

To change the R2 bucket, update the `baseUrl` value in `js/config.js`. This configuration is automatically shared across all modules that need it (`js/events.js` and `js/event-slideshow.js`).

## Fallback Behavior

The system gracefully degrades:
1. If R2 is unavailable, static events in HTML are displayed
2. If `cover.webp` is not found, it falls back to `coverImage` URL
3. If an event has no R2 directory, it uses the external `galleryUrl`
4. If neither R2 nor external gallery exists, shows "Gallery Coming Soon"

## Image Requirements

- **Cover images**: Should be named `cover.webp` in WebP format
- **Slideshow images**: Can be any filename, but WebP is recommended for performance
- **Recommended dimensions**: 
  - Cover: 400x300px or similar aspect ratio
  - Slideshow: 1920x1080px or original photo dimensions

## Testing Locally

To test with sample data:
1. Set up a local server: `python3 -m http.server 8000`
2. The sample data files in `/sample-data/` show the expected JSON structure
3. For full testing, you'll need to populate the actual R2 bucket with events

## Adding a New Event

1. Create a directory in R2: `/gtadetroit-images/events/{event-type}/{year}/`
   - Example: `/gtadetroit-images/events/bathukamma/2025/`
2. Add images to the directory (including `cover.webp`)
3. Create `event-data.json` in the directory with metadata
4. Update `/gtadetroit-images/events/events-list.json` to include the new event with `r2Directory` set to `{event-type}/{year}`
5. The event will automatically appear on the events page
