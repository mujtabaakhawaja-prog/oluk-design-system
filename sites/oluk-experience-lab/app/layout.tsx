import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource/jetbrains-mono/700.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/800.css";
import "./design-system/candidate-tokens.css";
import "./globals.css";
import { SitesRuntimeBoundaryGate } from "./runtime-adapters/sites-runtime-boundary-gate";
import { loadSitesDiscoveryProjection } from "./runtime-adapters/sites-discovery-server";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const discovery = await loadSitesDiscoveryProjection();
  return (
    <html lang="en-GB">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <SitesRuntimeBoundaryGate boundary={discovery.boundary} family="discovery">{children}</SitesRuntimeBoundaryGate>
      </body>
    </html>
  );
}
