import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const display = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const ui = Inter({
  variable: "--font-ui",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Olympus Labs UK · Experience Lab",
    template: "%s · Olympus Labs UK Experience Lab",
  },
  description:
    "A private design review build for the Olympus Labs UK commerce and OpenLab experience.",
  openGraph: {
    title: "Olympus Labs UK · Experience Lab",
    description: "Private design review for the converged commerce and OpenLab experience.",
    type: "website",
    images: [
      {
        url: "/assets/share/oluk-experience-lab-og.png",
        width: 1731,
        height: 909,
        alt: "Olympus Labs UK Experience Lab with MK-2866 product chamber",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Olympus Labs UK · Experience Lab",
    description: "Private design review for the converged commerce and OpenLab experience.",
    images: ["/assets/share/oluk-experience-lab-og.png"],
  },
  icons: {
    icon: "/assets/evidence/openlab-atom.svg",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body className={`${display.variable} ${ui.variable}`}>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
