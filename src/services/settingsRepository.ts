import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Settings {
  notificationsEnabled: boolean;
}

const STORAGE_KEY = "settings";
export const defaultSettings: Settings = { notificationsEnabled: false };

export async function getSettings(): Promise<Settings> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return defaultSettings;
  try {
    return { ...defaultSettings, ...(JSON.parse(raw) as Partial<Settings>) };
  } catch (error) {
    console.error("Failed to parse stored settings:", error);
    return defaultSettings;
  }
}

export async function setSettings(settings: Settings): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}
