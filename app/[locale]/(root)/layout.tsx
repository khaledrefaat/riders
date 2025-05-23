import BottomBar from "@/components/common/BottomBar";
import DesktopHeader from "@/components/layout/DesktopHeader";
import Footer from "@/components/layout/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <DesktopHeader />
      <>{children}</>
      <Footer />
      <BottomBar />
    </>
  );
}
