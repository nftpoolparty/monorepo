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


function Header () {

  return (
    <div className="header">

  <a href="#default" className="nftpoolparty">NFT Pool Party</a>
  <a className="active" href="#create">Create</a>
  <a href="#shop">Shop</a>
  <a href="#swap">Swap</a>
  <a href="#pool">Pool</a>
  <a href="#analytics">Analytics</a>
  <div className="wallet">
  
          <Connect />
          
          </div>
</div>  );
}

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
        </Providers>
      </body>
    </html>
  );
}
