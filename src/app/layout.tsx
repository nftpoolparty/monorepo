import { Providers } from "./providers";
import "./index.css";
import { Connect } from "../components/Connect";
import { Connected } from "../components/Connected";
import { Account } from "../components/Account";
import { NetworkSwitcher } from "../components/NetworkSwitcher";

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
