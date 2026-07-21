import { createContext, use, useEffect, useState } from "react";
import * as notificationService from "../services/notificationService";
import * as settingsRepository from "../services/settingsRepository";
import { Settings } from "../services/settingsRepository";
import { WordsContext } from "./WordsProvider";

interface NotificationsContextValue {
  settings: Settings;
  loadNotificationSettings: () => Promise<void>;
  setNotificationsEnabled: (enabled: boolean) => Promise<boolean>;
}

const initialNotificationsContextValue: NotificationsContextValue = {
  settings: settingsRepository.defaultSettings,
  loadNotificationSettings: async () => {},
  setNotificationsEnabled: async () => false,
};

export const NotificationsContext = createContext<NotificationsContextValue>(
  initialNotificationsContextValue,
);

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettingsState] = useState<Settings>(
    settingsRepository.defaultSettings,
  );
  const { words } = use(WordsContext);

  const loadNotificationSettings = async () => {
    setSettingsState(await settingsRepository.getSettings());
  };

  const setNotificationsEnabled = async (enabled: boolean): Promise<boolean> => {
    if (enabled) {
      const granted = await notificationService.requestPermissions();
      if (!granted) return false;
    }
    const nextSettings: Settings = { ...settings, notificationsEnabled: enabled };
    setSettingsState(nextSettings);
    await settingsRepository.setSettings(nextSettings);
    return true;
  };

  useEffect(() => {
    if (settings.notificationsEnabled) notificationService.rescheduleAll(words);
    else notificationService.cancelAll();
  }, [settings.notificationsEnabled, words]);

  return (
    <NotificationsContext
      value={{ settings, loadNotificationSettings, setNotificationsEnabled }}
    >
      {children}
    </NotificationsContext>
  );
}
