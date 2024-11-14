import { useEffect } from 'react'
 interface UserData {
 userId?: string
 region?: string
 // Add other relevant user data
 }
 export const useAnalytics = (userData: UserData) => {
 useEffect(() => {
 if (typeof window !== 'undefined') {
 // Push data to dataLayer
 window.dataLayer = window.dataLayer || []
 window.dataLayer.push({
 event: 'telegram_user_data',
 userId: userData.userId,
 region: userData.region,
 timestamp: new Date().toISOString()
 })
 }
 }, [userData])
 }