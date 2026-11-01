import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/ui/CartDrawer";
import QuickViewModal from "@/components/ui/QuickViewModal";
import EnquiryModal from "@/components/ui/EnquiryModal";
import SearchOverlay from "@/components/ui/SearchOverlay";
import ToastContainer from "@/components/ui/ToastContainer";

export const metadata = {
  title: "Bundeli Kalavrat | Premium Indian Art & Cultural Heritage Gallery",
  description:
    "Discover authentic Bundelkhand & Indian art, handcrafted masterpieces, folk paintings, and sculptures connecting heritage with discerning art collectors worldwide.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#F8F4EA] text-[#292522]">
        <AppProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />

          {/* Global luxury interactive modals & overlays */}
          <CartDrawer />
          <QuickViewModal />
          <EnquiryModal />
          <SearchOverlay />
          <ToastContainer />
        </AppProvider>
      </body>
    </html>
  );
}
