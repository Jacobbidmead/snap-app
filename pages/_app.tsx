import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Darker_Grotesque } from "next/font/google";

const DarkerGrotesque = Darker_Grotesque({
  subsets: ["latin"],
  weight: ["300", "500"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={DarkerGrotesque.className}>
      <Component {...pageProps} />
    </main>
  );
}
