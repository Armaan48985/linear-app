import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./GlobalRedux/Provider";

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ['400', '700'] 
});

export const metadata: Metadata = {
  title: "Linear App",
  description: "Kaizokuo Ni naru",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body className={poppins.className}>{children}</body>
      </html>
    </Providers>
  );
}
