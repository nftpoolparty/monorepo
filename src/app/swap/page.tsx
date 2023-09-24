import { Swap } from "../../components/Swap";

export default function Page({
  params,
  searchParams,
}: {
  params: {};
  searchParams?: { [key: string]: string | string[] };
}) {
  return <Swap />;
}
