'use client';

import { useState, useEffect } from 'react';
import { StoreSettings } from '../types/settings';
import {
  DEFAULT_SETTINGS,
  isFirebaseConfigured,
  saveStoreSettingsToFirestore,
  subscribeStoreSettingsFromFirestore,
  fetchStoreSettingsFromFirestore,
} from '../lib/firebase';

export function useSettingsState(showToast?: (msg: string) => void) {
  const [settings, setSettings] = useState<StoreSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('skies_settings');
      if (saved) {
        setSettings(JSON.parse(saved));
      }
    } catch {}

    if (isFirebaseConfigured) {
      fetchStoreSettingsFromFirestore().then((initialSettings) => {
        setSettings(initialSettings);
        try {
          localStorage.setItem('skies_settings', JSON.stringify(initialSettings));
        } catch {}
      });

      const unsubscribe = subscribeStoreSettingsFromFirestore((remoteSettings) => {
        setSettings(remoteSettings);
        try {
          localStorage.setItem('skies_settings', JSON.stringify(remoteSettings));
        } catch {}
      });

      return () => {
        if (unsubscribe) unsubscribe();
      };
    }
  }, []);

  const updateSettings = async (newSettings: Partial<StoreSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    try {
      localStorage.setItem('skies_settings', JSON.stringify(updated));
    } catch {}

    if (showToast) showToast('Pengaturan toko berhasil disimpan');

    if (isFirebaseConfigured) {
      try {
        await saveStoreSettingsToFirestore(updated);
      } catch (err) {
        console.error('Failed to save settings to Firestore:', err);
      }
    }
  };

  return {
    settings,
    updateSettings,
  };
}
