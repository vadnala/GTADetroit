# Sidebar Ads Documentation

## Overview
This feature adds sidebar advertisement support to the GTA Detroit website, allowing sponsors to be featured prominently on key pages.

## Files Involved

### Component Files
- **`/components/sidebar-ads.html`** - The reusable ad component containing all sponsor ads
- **`/js/sidebar-ads.js`** - JavaScript that loads the component dynamically

### Pages with Sidebar Ads
- **`index.html`** - Home page (in "Who We Are" section)
- **`about.html`** - About page (in "Mission & Vision" section)  
- **`events.html`** - Events page (alongside event listings)

### Styling
- **`/css/style.css`** - Contains all sidebar ad styles (search for "Sidebar Ads" comment)

## How to Update Sponsor Ads

### Step 1: Edit the Component File
Open `/components/sidebar-ads.html` and modify the ad banners:

```html
<div class="ad-banner">
    <a href="YOUR_SPONSOR_URL" target="_blank" rel="noopener noreferrer">
        <img src="PATH_TO_SPONSOR_LOGO" alt="Sponsor Name">
        <h4>Sponsor Name</h4>
        <p>Brief description of the sponsor or offer</p>
        <span class="ad-cta">Call to Action</span>
    </a>
</div>
```

### Step 2: Update Ad Content
- **Link (href)**: Change to sponsor's website URL
- **Image (src)**: Upload sponsor logo to `/images/` folder and update path
- **Heading (h4)**: Sponsor business name
- **Description (p)**: Short text about the sponsor (keep under 20 words)
- **CTA Button**: Change text like "Visit Website", "Learn More", etc.

### Step 3: Add/Remove Ads
- **Add**: Copy an existing `<div class="ad-banner">` block and modify it
- **Remove**: Delete the entire `<div class="ad-banner">...</div>` block

## Recommended Image Sizes
- **Ad Banner Images**: 270px × 150px (PNG or JPG)
- **Format**: PNG with transparent background works best
- **File Size**: Keep under 100KB for fast loading

## Responsive Behavior
- **Desktop (≥992px)**: Sidebar appears on the right (300px wide)
- **Tablet/Mobile (<992px)**: Ads stack at the top, full width, centered

## Adding Sidebar to New Pages

To add the sidebar ads to additional pages:

1. Add the container div where you want ads to appear:
```html
<div id="sidebar-ads-container"></div>
```

2. Wrap your content in the grid layout:
```html
<div class="content-with-sidebar">
    <div class="main-content">
        <!-- Your page content here -->
    </div>
    <div id="sidebar-ads-container"></div>
</div>
```

3. Include the JavaScript loader before closing `</body>`:
```html
<script src="js/sidebar-ads.js"></script>
```

## Styling Customization

All styles are in `/css/style.css` under the "Sidebar Ads" section. Key CSS classes:
- `.sidebar-ads` - Container styling
- `.ad-banner` - Individual ad card styling
- `.ad-cta` - Call-to-action button styling
- `.content-with-sidebar` - Grid layout

## Support
For questions or issues, contact the GTA Detroit tech team.
