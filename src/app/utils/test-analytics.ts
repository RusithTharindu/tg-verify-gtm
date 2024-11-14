// export const testAnalytics = () => {
//     if (typeof window !== 'undefined') {
//     window.dataLayer.push({
//     event: 'telegram_user_data',
//     userId: 'test-user',
//     region: 'test-region'
//     })
//     }
//     }

export const testAnalytics = () => {
    if (typeof window !== 'undefined' && Array.isArray(window.dataLayer)) {
        window.dataLayer.push({
            event: 'telegram_user_data',
            userId: 'test-user',
            region: 'test-region'
        });
    }
};
