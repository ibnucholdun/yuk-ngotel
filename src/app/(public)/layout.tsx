import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="bg-gray-50 min-h-screen pt-20">{children}</main>
      <Footer />
    </>
  );
}
