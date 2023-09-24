import { Providers } from "./providers";
import "./index.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Connect } from "../components/Connect";
import { Connected } from "../components/Connected";

export const metadata = {
  title: "NFT Pool Party",
  icons: {
    icon: "/images/favicon.ico",
  },
};

import Image from "next/image";
import { NotConnected } from "../components/NotConnected";
import Link from "next/link";

function MyComponent() {
  return (
    <div className="navvy">
      {/* Replace 'your-image.jpg' with the actual path to your image */}
      <Image
        src="/images/android-chrome-512x512.png" // Path to your image in the 'public' directory
        alt="Description of your image"
        width={1920} // Set the width of the image
        height={1080} // Set the height of the image
      />
    </div>
  );
}
function Nav() {
  return (
    <div className="nav">
      {/* Replace 'your-image.jpg' with the actual path to your image */}
      <Image
        src="/images/android-chrome-512x512.png" // Path to your image in the 'public' directory
        alt="Description of your image"
        width={512} // Set the width of the image
        height={512} // Set the height of the image
      />
    </div>
  );
}

function Header() {
  return (
    <div className="header">
      <Link href="/" className="nftpoolparty">
        NFT Pool Party
      </Link>

      <Link className="active" href="/">
        Create NFT Collection
      </Link>

      <Link href="#swap">Swap</Link>

      <Link href="#pool">Pool</Link>

      <div className="wallet">
        <Connect />
      </div>
    </div>
  );
}

<div> </div>;
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
          <Header />
          <Connected>{children}</Connected>
          <NotConnected>
            <MyComponent></MyComponent>
          </NotConnected>
        </Providers>
      </body>
    </html>
  );
}
