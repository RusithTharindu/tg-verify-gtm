// import FollowTask from './components/FollowTask';
import UserTracker from './components/UserTracker'

export default function Home() {
  const channelUsername = process.env.NEXT_PUBLIC_TELEGRAM_CHANNEL_USERNAME || 'your_channel';
  
  return (
    <main className="container mx-auto max-w-md">
      {/* <FollowTask channelUsername={channelUsername} /> */}
      <UserTracker />
    </main>
  );
}