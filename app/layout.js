import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/TheHeader";
import Footer from "@/components/TheFooter";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
