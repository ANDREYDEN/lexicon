import { use, useEffect } from "react";

import * as notificationService from "../../../services/notificationService";
import { WordsContext } from "../../WordsProvider";

interface SyncNotificationScheduleParams {
  notificationsEnabled: boolean;
}

export function useSyncNotificationSchedule({
  notificationsEnabled,
}: SyncNotificationScheduleParams) {
  const { words } = use(WordsContext);

  useEffect(() => {
    if (notificationsEnabled) notificationService.rescheduleAll(words);
    else notificationService.cancelAll();
  }, [notificationsEnabled, words]);
}
