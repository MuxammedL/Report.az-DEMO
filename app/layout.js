import { Montserrat } from "next/font/google";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
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
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
