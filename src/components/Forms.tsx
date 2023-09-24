import { useNetwork } from "wagmi";

export function FormFieldWrapperAndLabel({
  label,
  children,
}: {
  label: string;
  children?: JSX.Element;
}) {
  return (
    <div className="mb-4">
      <label
        className="block text-white text-sm font-bold mb-2"
        htmlFor="symbol"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

export function ProcessingMessage({ hash }: { hash?: `0x${string}` }) {
  const { chain } = useNetwork();
  const etherscan = chain?.blockExplorers?.etherscan;
  return (
    <span>
      Processing transaction...{" "}
      {etherscan && (
        <a href={`${etherscan.url}/tx/${hash}`}>{etherscan.name}</a>
      )}
    </span>
  );
}
