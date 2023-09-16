import "@/styles/globals.scss";

import type { AppProps } from "next/app";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <main className={playfair.className}>
        <Component {...pageProps} />
      </main>
    </>
  );
}
