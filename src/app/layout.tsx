import { Providers } from "./providers";
import "./index.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Connect } from "../components/Connect";
import { Connected } from "../components/Connected";

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
