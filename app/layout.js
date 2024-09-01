import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { Inter, Rubik } from "next/font/google";
import Header from "@/components/TheHeader";
import Footer from "@/components/TheFooter";
import { PermissionContextProvider } from "@/Store/permission-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    absolute: "EAUED MHS",
    template: "EAUED MHS | %s",
  },
  description:
    "Welcome to Emmanuel Alayande University of education Model High School, Oyo official website.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PermissionContextProvider>
          <Header />
          {children}
          <Footer />
        </PermissionContextProvider>
      </body>
    </html>
  );
}
