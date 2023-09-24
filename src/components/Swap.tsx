"use client"; // This is a client component 👈🏽

import { useSearchParams } from "next/navigation";
import { Address, formatEther, parseEther } from "viem";
import {
  useAccount,
  useBalance,
  useChainId,
  useWaitForTransaction,
} from "wagmi";
import {
  uniNftRouterAddress,
  usePrepareUniNftRouterBuyNft,
  usePrepareUniNftRouterQuoteBuyNft,
  usePrepareUniNftRouterSellNft,
  usePrepareUniNftTokenSetApprovalForAll,
  useUniNftRouterBuyNft,
  useUniNftRouterSellNft,
  useUniNftTokenBalanceOf,
  useUniNftTokenGetTokenIdsByOwner,
  useUniNftTokenIsApprovedForAll,
  useUniNftTokenName,
  useUniNftTokenSetApprovalForAll,
  useUniNftTokenSymbol,
  useUniNftTokenTokenUri,
} from "../generated";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { ProcessingMessage } from "./Forms";

function Buy({ nftContractAddress }: { nftContractAddress: Address }) {
  const { address } = useAccount();
  const [quantity, setQuantity] = useState(1n);

  const { data: buyEstimation } = usePrepareUniNftRouterQuoteBuyNft({
    args: [nftContractAddress],
  });

  const { data: tokenUri } = useUniNftTokenTokenUri({
    address: nftContractAddress,
    args: [1n],
  });

  const { data: tokenName } = useUniNftTokenName({
    address: nftContractAddress,
  });

  const { data: tokenSymbol } = useUniNftTokenSymbol({
    address: nftContractAddress,
  });

  const price = buyEstimation ? buyEstimation.result : null;

  const handleQuantityChanged = useCallback((e: ChangeEvent) => {
    // convert to bigint before setting
    setQuantity(BigInt((e.target as HTMLInputElement).value));
  }, []);

  const preventChange = useCallback((e: ChangeEvent) => {
    e.preventDefault();
  }, []);

  const totalCost = price ? price * quantity : 0n;

  const { config, isError, error } = usePrepareUniNftRouterBuyNft({
    args: [
      nftContractAddress,
      (price || 0n) + BigInt(Math.round(Number(price) * 0.02)),
      address!,
      "0x",
    ],
    value: price || 0n,
    enabled: !!price,
  });

  const { data, write, isSuccess } = useUniNftRouterBuyNft({
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

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative my-4 rounded shadow-sm ring-1 ">
        <img src={tokenUri} title="nft-media" width={200} />
        <span className="text-white">
          {tokenName} {tokenSymbol}
        </span>
      </div>
      <div className="relative rounded-md my-4 px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600 bg-white">
        <label
          htmlFor="quantity"
          className="block text-xs font-medium text-gray-900"
        >
          Mint
        </label>
        <input
          type="number"
          step="1"
          min={1}
          max={1}
          name="quantity"
          id="quantity"
          className="appearance-none border-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={quantity.toString()}
          onChange={handleQuantityChanged}
        />
        <div className="pointer-events-none absolute inset-y-0 right-10 top-5 flex items-center pr-3 text-gray-700">
          <span className="text-gray-500 sm:text-sm" id="price-currency">
            {tokenSymbol} NFTs
          </span>
        </div>
      </div>
      <div className="relative rounded-md my-4 px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600 bg-white">
        <label
          htmlFor="quantity"
          className="block text-xs font-medium text-gray-900"
        >
          Mint Price
        </label>
        <input
          type="number"
          step="1"
          min={1}
          max={1}
          name="quantity"
          id="quantity"
          className="appearance-none border-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={formatEther(totalCost)}
          onChange={handleQuantityChanged}
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
          Mint {Number(quantity)} NFT(s)
        </button>
      </div>

      {isError && error && <div>{error.message}</div>}
      {isLoading && <ProcessingMessage hash={data?.hash} />}
      {isSuccess && <div>Token minted!</div>}
    </form>
  );
}

function Sell({ nftContractAddress }: { nftContractAddress: Address }) {
  const { address } = useAccount();
  const [quantity, setQuantity] = useState(1n);

  const { data: tokenIds } = useUniNftTokenGetTokenIdsByOwner({
    args: [address!],
    address: nftContractAddress,
  });

  const tokenId = (tokenIds && tokenIds[0]) || null;

  console.log({ tokenIds });

  const minPrice = 1n;

  const { data: sellEstimationResult } = usePrepareUniNftRouterSellNft({
    args: [nftContractAddress, tokenId || 0n, minPrice, address!],
    enabled: !!tokenId,
  });

  const sellEstimation = sellEstimationResult
    ? sellEstimationResult.result
    : null;

  const handleQuantityChanged = useCallback((e: ChangeEvent) => {
    // convert to bigint before setting
    setQuantity(BigInt((e.target as HTMLInputElement).value));
  }, []);

  const preventChange = useCallback((e: ChangeEvent) => {
    e.preventDefault();
  }, []);

  const totalCost = sellEstimation ? sellEstimation * quantity : 0n;

  const { config, isError, error } = usePrepareUniNftRouterSellNft({
    args: [nftContractAddress, tokenId || 0n, minPrice, address!],
    enabled: !!sellEstimation && !!tokenId,
  });

  const { data, write, isSuccess } = useUniNftRouterSellNft({
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

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative rounded-md my-4 px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600 bg-white">
        <label
          htmlFor="quantity"
          className="block text-xs font-medium text-gray-900"
        >
          You Sell
        </label>
        <input
          type="number"
          step="1"
          min={1}
          max={1}
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
          You Get
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
          Sell
        </button>
      </div>
      {isError && error && <div>{error.message}</div>}
      {isLoading && <ProcessingMessage hash={data?.hash} />}
      {isSuccess && <div>Token sold!</div>}
    </form>
  );
}

function ApproveSell({ nftContractAddress }: { nftContractAddress: Address }) {
  const chainId = useChainId();

  const uniRouterAddress =
    uniNftRouterAddress[chainId! as keyof typeof uniNftRouterAddress];

  const { config, isError, error } = usePrepareUniNftTokenSetApprovalForAll({
    args: [uniRouterAddress, true],
    address: nftContractAddress,
  });

  const { data, write, isSuccess } = useUniNftTokenSetApprovalForAll({
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

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between">
        <button
          className="bg-white text-purple hover:bg-green-dark py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          disabled={!write || isLoading}
        >
          Approve NFTs to Router
        </button>
      </div>
      {isError && error && <div>{error.message}</div>}
      {isLoading && <ProcessingMessage hash={data?.hash} />}
    </form>
  );
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function Swap() {
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<"mint" | "sell">("mint");

  const nftContractAddress = searchParams.get("contract") as Address;

  const { address } = useAccount();

  const { data } = useUniNftTokenBalanceOf({
    args: [address!],
    address: nftContractAddress,
    watch: true,
  });

  const chainId = useChainId();

  const uniRouterAddress =
    uniNftRouterAddress[chainId! as keyof typeof uniNftRouterAddress];

  const { data: isApproved } = useUniNftTokenIsApprovedForAll({
    args: [address!, uniRouterAddress],
    address: nftContractAddress,
    watch: true,
  });

  return (
    <div className="max-w-md mx-auto p-4 ">
      <nav className="flex space-x-4 my-2" aria-label="Tabs">
        {["mint", "sell"].map((tab) => (
          <a
            key={tab}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              // @ts-ignore
              setMode(tab);
            }}
            className={classNames(
              tab === mode
                ? "bg-gray-100 text-gray-700 border-black border-2"
                : "text-gray-500 hover:text-gray-700 border-2",
              "rounded-md px-3 py-2 text-sm font-bold"
            )}
            aria-current={tab === "mode" ? "page" : undefined}
          >
            {tab}
          </a>
        ))}
      </nav>
      <div className={`max-w-md mx-auto p-4 rounded-lg bg-purple-500`}>
        <p className="mb-2 text-white">
          number of nfts owned: {Number(data || 0n)}
        </p>
        {mode === "mint" && <Buy nftContractAddress={nftContractAddress} />}
        {mode === "sell" && Number(data || 0n) > 0n && (
          <>
            {!isApproved && (
              <ApproveSell nftContractAddress={nftContractAddress} />
            )}
            {isApproved && <Sell nftContractAddress={nftContractAddress} />}
          </>
        )}
      </div>
    </div>
  );
}
