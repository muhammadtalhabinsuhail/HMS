import "./globals.css";
import { AuthProvider } from "./AuthContext.js";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "HMS System",
  description: "Luxury Hotel Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-jost bg-white text-neutral-900">
        <AuthProvider>
          {children}
          <Toaster position="top-right" toastOptions={{
            style: { fontFamily: "Jost, sans-serif", fontSize: "14px" },
            success: { iconTheme: { primary: "#8b4513", secondary: "#fff" } }
          }} />
        </AuthProvider>
      </body>
    </html>
  );
}