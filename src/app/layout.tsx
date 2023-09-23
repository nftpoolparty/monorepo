import { Providers } from "./providers";
import "./index.css";
import { Connect } from "../components/Connect";
import { Connected } from "../components/Connected";
import { Account } from "../components/Account";
import { NetworkSwitcher } from "../components/NetworkSwitcher";

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

          <Connected>
            <Account />
            <hr />
            <NetworkSwitcher />
            <hr />

            {children}
          </Connected>
        </Providers>
      </body>
    </html>
  );
}
