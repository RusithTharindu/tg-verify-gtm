export const testAnalytics = () => {
    if (typeof window !== 'undefined') {
    window.dataLayer.push({
    event: 'telegram_user_data',
    userId: 'test-user',
    region: 'test-region'
    })
    }
    }