// FontLoader.js

import { useFonts } from 'expo-font';

export function loadFonts() {
  const [fontsLoaded] = useFonts({
    'SongMyung': require('./assets/fonts/song.ttf'),
    // 여기에 추가적인 폰트가 있다면 로드하세요.
  });

  return fontsLoaded;
}
