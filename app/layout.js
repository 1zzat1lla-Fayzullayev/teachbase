import Footer from "./components/footer";
import Navbar from "./components/navbar";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="dark"
      style={{ scrollBehavior: "smooth", colorScheme: "dark" }}
    >
      <body className={`antialiased min-h-screen flex flex-col`}>
      <Navbar />
        {children}
        
        <Footer />
        </body>
    </html>
  );
}
