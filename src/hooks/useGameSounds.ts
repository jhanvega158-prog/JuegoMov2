import { useCallback } from 'react';
import * as Haptics from 'expo-haptics';

export function useGameSounds() {
  const playCorrect = useCallback(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, []);

  const playWrong = useCallback(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  }, []);

  return { playCorrect, playWrong };
}
