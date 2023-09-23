import { Create } from "../components/Create";

export default function Page({
  params,
  searchParams,
}: {
  params: {};
  searchParams?: { [key: string]: string | string[] };
}) {
  return (
    <>
      <Create />
    </>
  );
}
