import { useEffect, useState } from 'react'
 import { useAnalytics } from '../hooks/useAnalytics'
 declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        initData: string
        initDataUnsafe: {
          user?: {
            id: string
            language_code: string
          }
        }
      }
    }
  }
 }
 export default function UserTracker() {
  const [userData, setUserData] = useState<{userId?: string, region?: string}>({})
  useEffect(() => {
    const getUserData = async () => {
      if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
        const { user } = window.Telegram.WebApp.initDataUnsafe
        
        // Get user's region from IP (example using ipapi.co)
        try {
          const response = await fetch('https://ipapi.co/json/')
          const data = await response.json()
          
          setUserData({
            userId: user?.id.toString(),
            region: data.country_name
          })
        } catch (error) {
          console.error('Error fetching location:', error)
        }
      }
    }
    getUserData()
  }, [])
  // Use the analytics hook
  useAnalytics(userData)
  return null // This is a tracking component, no need to render anything
 }