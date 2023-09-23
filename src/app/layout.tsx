import { Providers } from "./providers";
import "./index.css";
import { Connect } from "../components/Connect";
import { Connected } from "../components/Connected";
import { Account } from "../components/Account";
import { NetworkSwitcher } from "../components/NetworkSwitcher";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

export const metadata = {
  title: "wagmi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Connect />

          <Connected>{children}</Connected>
        </Providers>
      </body>
    </html>
  );
}
