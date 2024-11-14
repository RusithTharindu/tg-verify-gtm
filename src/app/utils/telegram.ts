export const verifyChannelMembership = async (userId: number, channelUsername: string) => {
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const endpoint = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getChatMember`;
    
    try {
      const response = await fetch(`${endpoint}?chat_id=@${channelUsername}&user_id=${userId}`);
      const data = await response.json();
      
      if (!data.ok) return false;
      
      // Check if user is a member of the channel
      const status = data.result.status;
      return ['creator', 'administrator', 'member'].includes(status);
    } catch (error) {
      console.error('Error verifying channel membership:', error);
      return false;
    }
  };