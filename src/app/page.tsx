import "./globals.css";

import dynamic from "next/dynamic";

/*
import { ThemeProvider } from "./material-tailwind";
import { AppContainer } from "./components/AppContainer";
import { useEffect } from "react";
*/

const AppContainer = dynamic(() => import("./components/AppContainer"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AppContainer />
    </main>
  );
}
