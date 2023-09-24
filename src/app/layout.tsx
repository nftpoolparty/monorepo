import { Providers } from "./providers";
import "./index.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Connect } from "../components/Connect";
import { Connected } from "../components/Connected";

export const metadata = {
  title: "wagmi",
  icons: {
    icon: "/Favicon/favicon.ico"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <head><link rel="icon" href="/Favicon/favicon.ico" sizes="any" /></head> */}
      <body>
        <Providers>
          <Connect />

          <Connected>{children}</Connected>
        </Providers>
      </body>
    </html>
  );
}
