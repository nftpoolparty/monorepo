"use client"; // This is a client component 👈🏽

import { useSearchParams } from "next/navigation";
import { Address, formatEther } from "viem";
import { useAccount, useWaitForTransaction } from "wagmi";
import {
  useMultiEdition721BalanceOf,
  useMultiEdition721MintBatch,
  useMultiEdition721TokenPrice,
  usePrepareMultiEdition721MintBatch,
} from "../generated";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { ProcessingMessage } from "./Forms";

function Buy({ nftContractAddress }: { nftContractAddress: Address }) {
  const { address } = useAccount();
  const [quantity, setQuantity] = useState(1n);

  const { data: tokenPrice } = useMultiEdition721TokenPrice({
    address: nftContractAddress,
    watch: true,
  });

  const handleQuantityChanged = useCallback((e: ChangeEvent) => {
    // convert to bigint before setting
    setQuantity(BigInt((e.target as HTMLInputElement).value));
  }, []);

  const preventChange = useCallback((e: ChangeEvent) => {
    e.preventDefault();
  }, []);

  const totalCost = tokenPrice ? tokenPrice * quantity : 0n;

  const { config, isError, error } = usePrepareMultiEdition721MintBatch({
    args: [quantity],
    value: totalCost,
    address: nftContractAddress,
  });

  const { data, write, isSuccess } = useMultiEdition721MintBatch({
    ...config,
  });

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      if (write) write();
      // Handle form submission logic here
    },
    [write]
  );

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
  });

  console.log({ isLoading, write: !!write });

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative rounded-md my-4 px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600 bg-white">
        <label
          htmlFor="quantity"
          className="block text-xs font-medium text-gray-900"
        >
          You Buy
        </label>
        <input
          type="number"
          step="1"
          min={1}
          name="quantity"
          id="quantity"
          className="appearance-none border-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={quantity.toString()}
          onChange={handleQuantityChanged}
        />
        <div className="pointer-events-none absolute inset-y-0 right-10 top-5 flex items-center pr-3 text-gray-700">
          <span className="text-gray-500 sm:text-sm" id="price-currency">
            NFTs
          </span>
        </div>
      </div>
      <div className="relative rounded-md my-4 px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600 bg-white">
        <label
          htmlFor="quantity"
          className="block text-xs font-medium text-gray-900"
        >
          You Pay
        </label>
        <input
          type="number"
          step="1"
          name="quantity"
          id="quantity"
          className="appearance-none border-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={formatEther(totalCost)}
          onChange={preventChange}
        />
        <div className="pointer-events-none absolute inset-y-0 right-10 top-5 flex items-center pr-3 text-gray-700">
          <span className="text-gray-500 sm:text-sm" id="price-currency">
            ETH
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-white text-purple hover:bg-green-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          disabled={!write || isLoading}
        >
          Mint
        </button>
      </div>
      {isError && error && <div>{error.message}</div>}
      {isLoading && <ProcessingMessage hash={data?.hash} />}
      {isSuccess && <div>Contract created!</div>}
    </form>
  );
}

export function Swap() {
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<"buy" | "sell">("buy");

  const nftContractAddress = searchParams.get("contract") as Address;

  const { address } = useAccount();

  const { data } = useMultiEdition721BalanceOf({
    args: [address!],
    address: nftContractAddress,
  });

  return (
    <div>
      <div className={`max-w-md mx-auto p-4 rounded-lg bg-purple-500`}>
        <>Your balance: {Number(data || 0n)}</>
        {mode === "buy" && <Buy nftContractAddress={nftContractAddress} />}
      </div>
    </div>
  );
}
