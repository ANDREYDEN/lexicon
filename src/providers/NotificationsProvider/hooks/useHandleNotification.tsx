import { useRouter } from "expo-router";
import { useEffect } from "react";

import * as notificationService from "../../../services/notificationService";

export function useHandleNotification() {
  const router = useRouter();

  useEffect(() => {
    const navigateToWord = (wordContent: string | undefined) => {
      if (!wordContent) return;
      router.replace({ pathname: "/", params: { word: wordContent } });
    };

    navigateToWord(notificationService.getInitialTargetWord());
    const subscription =
      notificationService.addResponseListener(navigateToWord);
    return () => subscription.remove();
  }, [router]);
}
