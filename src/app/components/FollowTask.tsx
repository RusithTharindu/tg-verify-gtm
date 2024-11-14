"use client";

import { useState, useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface FollowTaskProps {
  channelUsername: string;
}

export default function FollowTask({ channelUsername }: FollowTaskProps) {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [webApp, setWebApp] = useState<any>(null);

  useEffect(() => {
    // @ts-ignore
    if (window.Telegram?.WebApp) {
      // @ts-ignore
      setWebApp(window.Telegram.WebApp);
    }
  }, []);

  const handleVerify = async () => {
    if (!webApp?.initData) {
      setError("Telegram WebApp data not found");
      return;
    }

    setIsVerifying(true);
    setError(null);

    try {
      const response = await fetch("/api/verify-follow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: webApp.initDataUnsafe.user.id }),
      });

      const data = await response.json();

      if (data.success && data.isMember) {
        setIsComplete(true);
        // Notify the parent app that the task is complete
        webApp.MainButton.setText("Task Completed!");
        webApp.MainButton.show();
      } else {
        setError("Please follow the channel first");
      }
    } catch (err) {
      setError("Failed to verify channel membership");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleFollowClick = () => {
    window.open(`https://t.me/${channelUsername}`, "_blank");
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Follow Channel Task</h2>

      <div className="space-y-4">
        <p>Complete these steps to finish the task:</p>

        <ol className="list-decimal list-inside space-y-2">
          <li>Follow our Telegram channel @{channelUsername}</li>
          <li>Verify your subscription</li>
        </ol>

        <div className="flex flex-col gap-2">
          <Button
            onClick={handleFollowClick}
            className="w-full"
            variant="outline"
          >
            Follow Channel
          </Button>

          <Button
            onClick={handleVerify}
            disabled={isVerifying || isComplete}
            className="w-full"
          >
            {isVerifying ? "Verifying..." : "Verify Subscription"}
          </Button>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {isComplete && (
          <Alert>
            <AlertDescription>
              Task completed! You have successfully followed the channel.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
