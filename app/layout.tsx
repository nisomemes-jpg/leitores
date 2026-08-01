import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";

const title = "A Voz da Palavra | Formação de Leitores";
const description =
  "Material permanente de formação para leitores e candidatos da Paróquia Nossa Senhora de Lourdes, em Areia Preta, com base no Missal Romano e nas orientações da Arquidiocese de Natal.";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:5174";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const baseUrl = new URL(protocol + "://" + host);
  const socialImage = new URL("/og.png", baseUrl).toString();

  return {
    metadataBase: baseUrl,
    title,
    description,
    applicationName: "A Voz da Palavra",
    authors: [{ name: "Formação pastoral de leitores" }],
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url: baseUrl,
      title,
      description,
      siteName: "A Voz da Palavra",
      images: [{ url: socialImage, width: 1672, height: 940, alt: "Leitores a serviço da Palavra — formação permanente da Paróquia Nossa Senhora de Lourdes" }],
    },
    twitter: { card: "summary_large_image", title, description, images: [socialImage] },
  };
}

export const viewport: Viewport = { themeColor: "#061b3a", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
