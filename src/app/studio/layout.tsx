import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Studio",
    template: "%s | Studio Criare",
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function StudioRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
