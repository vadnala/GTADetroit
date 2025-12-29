// Configuration for R2 storage
const R2_CONFIG = {
    baseUrl: 'https://pub-4bc84f329ded4595a098e56d0bd37e93.r2.dev'
};

// Export for use in other modules
if (typeof window !== 'undefined') {
    window.R2_CONFIG = R2_CONFIG;
}
