import type { AppProps } from "next/app";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";

import lightTheme from "../themes/lightTheme";

import { createEmotionCache } from "../components/createEmotionCache";

// Client-side cache shared for the whole session
// of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

type MyApp = AppProps & { emotionCache: EmotionCache };
function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyApp) {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
