import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ReduxProvider from "@/lib/redux-provider";
import { AuthProvider } from "@/lib/auth-provider";

// const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin-ext"], weight: "200" });

export const metadata: Metadata = {
  title: "Simplyanai: A collection of AI services",
  description:
    "An AI powered web app consisting of a range of utilities to make your daily life easier.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ReduxProvider>
          <AuthProvider>{children}</AuthProvider>
          <Toaster />
        </ReduxProvider>
        {/* vercel speed analytics */}
        <SpeedInsights />
      </body>
    </html>
  );
}
