import { Montserrat } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import GoToTop from "./components/goToTop/goToTop";
import Provider from "./components/Provider";
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: {
    template: "%s | Report.az",
    default: "Azərbaycanın aparıcı xəbər saytı | Report.az",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <SpeedInsights />
        <Provider>
          <Header />
          <main>
            {children}
            <GoToTop />
          </main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
