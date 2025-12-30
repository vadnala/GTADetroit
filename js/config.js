// Configuration for R2 storage
const R2_CONFIG = {
    baseUrl: 'https://pub-16bad3ab8ee04865aa77eed78dfc8813.r2.dev'
};

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.R2_CONFIG = R2_CONFIG;
}
