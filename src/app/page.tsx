import "./globals.css";

import { ThemeProvider } from "./material-tailwind";

import AppContainer from "./components/AppContainer";

export default function Home() {
  return (
    <ThemeProvider>
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white dark:bg-slate-800">
        <AppContainer />
      </main>
    </ThemeProvider>
  );
}
