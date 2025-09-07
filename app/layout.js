import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// Import styles
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@/app/globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Al-Khair - Modern Business Template",
  description: "A modern business template built with Next.js",
  icons: {
    icon: "/img/favicon.png",
    apple: "/img/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="main">{children}</main>
        <Footer />

        {/* Scroll to top button */}
        <a
          href="#"
          id="scroll-top"
          className="scroll-top d-flex align-items-center justify-content-center"
        >
          <i className="bi bi-arrow-up-short"></i>
        </a>

        {/* Preloader */}
        {/* <div id="preloader"></div> */}

        {/* Vendor JS Files */}
      </body>
    </html>
  );
}
