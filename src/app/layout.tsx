import "@/styles/globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

export const metadata: Metadata = {
  title: "Grandeur Net — Digital Engineering & High-Conversion Products",
  description:
    "We build digital products that drive conversions and grow revenue. Elite e-commerce, web applications, and AI cloud automations from Dehradun's premier digital engineering team.",
  keywords: [
    "Digital Marketing Company Dehradun",
    "Web Development Dehradun",
    "Grandeur Net",
    "E-commerce development",
    "Full-stack engineering",
    "Next.js agency",
    "AI automation",
  ],
  authors: [{ name: "Grandeur Net" }],
  creator: "Grandeur Net",
  metadataBase: new URL("https://grandeurnet.com"),
  openGraph: {
    title: "Grandeur Net — High-Conversion Digital Products",
    description:
      "Explore award-winning e-commerce, web applications, and cloud software engineered by Grandeur Net.",
    url: "https://grandeurnet.com",
    siteName: "Grandeur Net",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grandeur Net — Digital Engineering",
    description:
      "We build digital products that drive conversions and grow revenue.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var storedTheme = localStorage.getItem('grandeur-theme');
                if (storedTheme === 'light') {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.classList.add('light');
                  document.documentElement.style.colorScheme = 'light';
                } else {
                  document.documentElement.classList.remove('light');
                  document.documentElement.classList.add('dark');
                  document.documentElement.style.colorScheme = 'dark';
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="bg-brand-dark text-slate-100 antialiased selection:bg-brand-green selection:text-brand-dark">
        <ThemeProvider>
          <SmoothScrollProvider>
            <Preloader />
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
