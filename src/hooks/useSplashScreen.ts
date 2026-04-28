import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

export function useSplashScreen(callback: () => Promise<void>) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function initialize() {
      try {
        await callback();
      } catch (error) {
        console.error('Error initializing application:', error);
      } finally {
        setIsReady(true);
      }
    }

    initialize();
  }, [callback]);

  useEffect(() => {
    if (isReady) SplashScreen.hideAsync();
  }, [isReady]);

  return isReady;
}
