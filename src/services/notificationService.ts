import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { Word } from "../types/word";

const WINDOW_DAYS = 14;
const NOTIFICATION_HOUR = 9;
const NOTIFICATION_MINUTE = 0;
const ANDROID_CHANNEL_ID = "new-word-reminder";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export async function requestPermissions(): Promise<boolean> {
  const existing = await Notifications.getPermissionsAsync();
  if (existing.status === "granted") return true;
  const requested = await Notifications.requestPermissionsAsync();
  return requested.status === "granted";
}

export async function rescheduleAll(words: Word[]): Promise<void> {
  if (Platform.OS === "android") {
    await ensureAndroidChannel();
  }

  await cancelAll();
  if (words.length === 0) return;

  const now = new Date();
  for (let dayOffset = 0; dayOffset < WINDOW_DAYS; dayOffset++) {
    const date = nextOccurrenceAt(dayOffset, now);
    if (!date) continue;
    const word = pickRandomWord(words);
    await Notifications.scheduleNotificationAsync({
      content: { title: word.content },
      trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date },
    });
  }
  console.log("notifications scheduled");
}

export async function cancelAll(): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
  console.log("notifications cancelled");
}

async function ensureAndroidChannel(): Promise<void> {
  await Notifications.setNotificationChannelAsync(ANDROID_CHANNEL_ID, {
    name: "New Word Reminder",
    importance: Notifications.AndroidImportance.DEFAULT,
  });
}

function pickRandomWord(words: Word[]): Word {
  return words[Math.floor(Math.random() * words.length)];
}

function nextOccurrenceAt(dayOffset: number, now: Date): Date | undefined {
  const target = new Date(now);
  target.setDate(target.getDate() + dayOffset); // handles bleeding in the next month
  target.setHours(NOTIFICATION_HOUR, NOTIFICATION_MINUTE, 0, 0);
  if (target.getTime() <= now.getTime()) return;
  return target;
}
