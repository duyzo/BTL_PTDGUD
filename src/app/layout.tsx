import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "@/context/AuthContext";
import QueryProvider from "@/providers/QueryProvider";

const quicksand = Quicksand({ 
  subsets: ["latin", "vietnamese"],
  variable: "--font-quicksand",
});

export const metadata: Metadata = {
  title: "ToyKingdom - Thế giới đồ chơi an toàn & sáng tạo",
  description: "Cửa hàng đồ chơi trẻ em uy tín, đa dạng mẫu mã, giá cả hợp lý.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${quicksand.variable} font-sans antialiased min-h-screen flex flex-col bg-slate-50 text-slate-900`}>
        <QueryProvider>
          <AuthProvider>
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
            <ToastContainer position="bottom-right" autoClose={3000} />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
