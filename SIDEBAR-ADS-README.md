# Sidebar Sponsor Logos Documentation

## Overview
This feature adds scrolling sponsor logos in the sidebar, categorized by sponsorship level (DIAMOND, GOLD, SILVER), similar to the global GTA website.

## Files Involved

### Component Files
- **`/components/sidebar-ads.html`** - The reusable sponsor component with scrolling logos
- **`/js/sidebar-ads.js`** - JavaScript that loads the component dynamically

### Pages with Sidebar Sponsors
- **`index.html`** - Home page (with "Who We Are" section)
- **`about.html`** - About page (with "Mission & Vision" section)  
- **`events.html`** - Events page (alongside event listings)

### Styling
- **`/css/style.css`** - Contains all sponsor sidebar styles (search for "Sidebar Ads" comment)

## Sponsor Categories

The sidebar displays three sponsor tiers:
1. **DIAMOND** - Premium tier sponsors
2. **GOLD** - Mid-tier sponsors
3. **SILVER** - Standard tier sponsors

Each category displays sponsor logos in a horizontal scrolling animation.

## How to Update Sponsor Logos

### Step 1: Prepare Sponsor Logos
- **Recommended size**: 150px × 80px (width × height)
- **Format**: PNG with transparent background works best
- **File size**: Keep under 50KB for fast loading
- Upload logos to `/images/sponsors/` folder

### Step 2: Edit the Component File
Open `/components/sidebar-ads.html` and locate the category you want to update:

```html
<!-- DIAMOND Sponsors -->
<div class="sponsor-category">
    <h4 class="sponsor-category-title">DIAMOND</h4>
    <div class="sponsor-logos-scroll">
        <div class="sponsor-logos-track">
            <!-- Add your sponsor logos here -->
            <img src="images/sponsors/sponsor1-logo.png" alt="Sponsor 1" class="sponsor-logo">
            <img src="images/sponsors/sponsor2-logo.png" alt="Sponsor 2" class="sponsor-logo">
            <img src="images/sponsors/sponsor3-logo.png" alt="Sponsor 3" class="sponsor-logo">
            <!-- Duplicate logos for seamless scrolling -->
            <img src="images/sponsors/sponsor1-logo.png" alt="Sponsor 1" class="sponsor-logo">
            <img src="images/sponsors/sponsor2-logo.png" alt="Sponsor 2" class="sponsor-logo">
            <img src="images/sponsors/sponsor3-logo.png" alt="Sponsor 3" class="sponsor-logo">
        </div>
    </div>
</div>
```

### Step 3: Important Notes
- **Always duplicate logos**: Each logo should appear twice in the track for seamless infinite scrolling
- **Maintain aspect ratio**: Logos are constrained to 60px height, width adjusts automatically
- **Alt text**: Use descriptive alt text for accessibility

### Step 4: Add/Remove Categories
To add a new tier (e.g., PLATINUM):
```html
<div class="sponsor-category">
    <h4 class="sponsor-category-title">PLATINUM</h4>
    <div class="sponsor-logos-scroll">
        <div class="sponsor-logos-track">
            <!-- Your logos here, duplicated -->
        </div>
    </div>
</div>
```

To remove a tier, delete the entire `<div class="sponsor-category">` block.

## Scrolling Animation

The logos scroll automatically at a 15-second loop. Features:
- **Infinite loop**: Logos scroll continuously
- **Pause on hover**: Users can hover to pause and view logos
- **Smooth animation**: CSS-based animation for performance

To adjust scroll speed, edit `/css/style.css`:
```css
.sponsor-logos-track {
    animation: scroll-sponsors 15s linear infinite; /* Change 15s to desired duration */
}
```

## Responsive Behavior
- **Desktop (≥992px)**: Sidebar appears on the right (300px wide)
- **Tablet/Mobile (<992px)**: Sponsors appear at the top, full width, centered

## Alignment Fix
The "Who We Are" and "Mission & Vision" section titles are now properly centered. The titles are included within the grid layout so they align with the main content.

## Adding Sidebar to New Pages

To add sponsor logos to additional pages:

1. Wrap your content in the grid layout:
```html
<div class="content-with-sidebar">
    <div class="main-content">
        <div class="section-title">
            <h2>Your Section Title</h2>
        </div>
        <!-- Your page content here -->
    </div>
    <div id="sidebar-ads-container"></div>
</div>
```

2. Include the JavaScript loader before closing `</body>`:
```html
<script src="js/sidebar-ads.js"></script>
```

## Styling Customization

Key CSS classes in `/css/style.css`:
- `.sidebar-ads` - Container styling
- `.sponsor-category` - Individual category container
- `.sponsor-category-title` - Category heading (DIAMOND, GOLD, SILVER)
- `.sponsor-logos-scroll` - Scrolling container
- `.sponsor-logos-track` - Animation track
- `.sponsor-logo` - Individual logo styling

## Template Example

Use this template logo URL format for testing:
```
https://placehold.co/150x80/BC2026/FFFFFF?text=Your+Text
```

Replace with actual sponsor logos in production.

## Support
For questions or issues, contact the GTA Detroit tech team.
