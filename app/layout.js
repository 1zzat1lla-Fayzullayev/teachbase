import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="dark"
      style={{ scrollBehavior: "smooth", colorScheme: "dark" }}
    >
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
