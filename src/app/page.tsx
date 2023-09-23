import { Account } from "../components/Account";
import { Connect } from "../components/Connect";
import { Connected } from "../components/Connected";
import { Create } from "../components/Create";
import { NetworkSwitcher } from "../components/NetworkSwitcher";

export default function Page({
  params,
  searchParams,
}: {
  params: {};
  searchParams?: { [key: string]: string | string[] };
}) {
  return (
    <>
      <h1 className="text-3xl font-bold underline">
        wagmi + Next.js + Foundry
      </h1>

      <Connect />

      <Connected>
        <Account />
        <hr />
        <NetworkSwitcher />
        <hr />
        {/* page section: */}
        <Create />
        <hr />
      </Connected>
    </>
  );
}
