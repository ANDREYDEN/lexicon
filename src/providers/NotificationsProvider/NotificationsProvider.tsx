import { createContext, PropsWithChildren, useState } from "react";
import * as notificationService from "../../services/notificationService";
import * as settingsRepository from "../../services/settingsRepository";
import { Settings } from "../../services/settingsRepository";
import { useHandleNotification } from "./hooks/useHandleNotification";
import { useSyncNotificationSchedule } from "./hooks/useSyncNotificationSchedule";

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

export function NotificationsProvider({ children }: PropsWithChildren) {
  const [settings, setSettingsState] = useState<Settings>(
    settingsRepository.defaultSettings,
  );

  useSyncNotificationSchedule({
    notificationsEnabled: settings.notificationsEnabled,
  });

  useHandleNotification();

  const loadNotificationSettings = async () => {
    setSettingsState(await settingsRepository.getSettings());
  };

  const setNotificationsEnabled = async (
    enabled: boolean,
  ): Promise<boolean> => {
    if (enabled) {
      const granted = await notificationService.requestPermissions();
      if (!granted) return false;
    }
    const nextSettings: Settings = {
      ...settings,
      notificationsEnabled: enabled,
    };
    setSettingsState(nextSettings);
    await settingsRepository.setSettings(nextSettings);
    return true;
  };

  return (
    <NotificationsContext
      value={{ settings, loadNotificationSettings, setNotificationsEnabled }}
    >
      {children}
    </NotificationsContext>
  );
}
