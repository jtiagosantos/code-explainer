import { localization } from "@/lib/clerk";
import "./globals.css";
import { Providers } from "./providers";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: 'Code Explainer'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={localization}>
      <html lang="pt-br">
        <body
          className={`antialiased`}
        >
          <Providers>
            {children}
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
