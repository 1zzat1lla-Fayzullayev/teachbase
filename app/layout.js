import Footer from "./components/footer";
import Navbar from "./components/navbar";
import { ThemeProvider } from "./components/themeProvider";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark:bg-[#111111] bg-white dark">
      <head>
        <meta name="algolia-site-verification" content="760CFD0C213E7FB2" />
        <style>{`html { scroll-behavior: smooth; color-scheme: dark; }`}</style>
      </head>
      <body className="antialiased min-h-screen flex flex-col">
      <ThemeProvider>
        <Navbar />
        {children}
        <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
