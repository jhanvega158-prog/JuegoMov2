import { useEffect, useRef, useState } from 'react';
import { GAME_CONFIG } from '../config/game.config';

// react-native-google-mobile-ads requiere un development build.
// En Expo Go se deshabilita silenciosamente.
let InterstitialAd: any = null;
let AdEventType: any = null;
let TestIds: any = null;
try {
  const ads = require('react-native-google-mobile-ads');
  InterstitialAd = ads.InterstitialAd;
  AdEventType = ads.AdEventType;
  TestIds = ads.TestIds;
} catch {
  // No disponible en Expo Go
}

let interstitial: any = null;
if (InterstitialAd && TestIds) {
  try {
    const adUnitId = __DEV__
      ? TestIds.INTERSTITIAL
      : GAME_CONFIG.ADMOB_INTERSTITIAL_ID;
    interstitial = InterstitialAd.createForAdRequest(adUnitId);
  } catch {
    // Ignorar
  }
}

// Contador global — persiste entre pantallas
let gamesPlayed = 0;

export function useInterstitialAd() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!interstitial || !AdEventType) return;

    const unsubscribeLoaded = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      setLoaded(true);
    });
    const unsubscribeClosed = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
      setLoaded(false);
      interstitial.load();
    });

    interstitial.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
    };
  }, []);

  const showAdIfReady = () => {
    if (!interstitial) return;
    gamesPlayed += 1;
    if (gamesPlayed >= GAME_CONFIG.GAMES_BEFORE_AD && loaded) {
      gamesPlayed = 0;
      interstitial.show();
    }
  };

  return { showAdIfReady };
}
