import { Providers } from "./providers";
import "./index.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Connect } from "../components/Connect";
import { Connected } from "../components/Connected";


export const metadata = {
  title: "wagmi",
  icons: {
    icon: "./public/images/favicon.ico",
  },
};

import Image from 'next/image';

function MyComponent () {
  return (
    <div  className="nav">
      {/* Replace 'your-image.jpg' with the actual path to your image */}

    </div>
  );
}


function Header() {
  return (
    <div className="header">
      <Image 
        src="/images/android-chrome-192x192.png" // Path to your image in the 'public' directory
        alt="Description of your image"
        width={100} // Set the width of the image
        height={100} // Set the height of the image
      />
      <a href="#default" className="nftpoolparty">
        NFT Pool Party 
      </a>
      <Image 
        src="/images/home.png" // Path to your image in the 'public' directory
        alt="Description of your image"
        width={50} // Set the width of the image
        height={50} // Set the height of the image
      />
      <a className="active" href="#create">
        Create
      </a>
      <Image 
        src="/images/writing.png" // Path to your image in the 'public' directory
        alt="Description of your image"
        width={50} // Set the width of the image
        height={50} // Set the height of the image
      />
      <a href="#shop">Shop </a>
      <Image 
        src="/images/shopping-bag.png" // Path to your image in the 'public' directory
        alt="Description of your image"
        width={50} // Set the width of the image
        height={50} // Set the height of the image
      />
      <a href="#swap">Swap</a>
      <Image 
        src="/images/alter.png" // Path to your image in the 'public' directory
        alt="Description of your image"
        width={50} // Set the width of the image
        height={50} // Set the height of the image
      />
      <a href="#pool">Pool</a>
      <Image 
        src="/images/swim.png" // Path to your image in the 'public' directory
        alt="Description of your image"
        width={50} // Set the width of the image
        height={50} // Set the height of the image
      />
      <a href="#analytics">Analytics</a>
      <Image 
        src="/images/stats.png" // Path to your image in the 'public' directory
        alt="Description of your image"
        width={50} // Set the width of the image
        height={50} // Set the height of the image
      />
      <div className="wallet">
      <Connect />
      </div>
      </div>   

  );
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
