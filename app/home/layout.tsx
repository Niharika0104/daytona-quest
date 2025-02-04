import type { Metadata } from "next";
import { Toaster } from 'react-hot-toast';
import "@/app/globals.css";
import Navbar from "@/Components/HomePageComponents/Navbar";
import { AuthProvider } from "../Context/AuthContext";
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  
        <AuthProvider>
          <Navbar />
          {children}
         
          <Toaster />
        </AuthProvider>
     
  );
}
