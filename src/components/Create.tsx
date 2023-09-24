"use client";

import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAccount, useNetwork, useWaitForTransaction } from "wagmi";

import {
  usePrepareUniNftRouterCreate,
  usePrepareUniNftRouterQuoteCreate,
  useUniNftRouterCreate,
  useUniNftRouterFindHookSalt,
  useUniNftRouterQuoteCreate,
} from "../generated";
import { Address, etherUnits, formatEther, parseEther } from "viem";
import { parseCreateReceipt } from "../utils/txParsing";
import { FormFieldWrapperAndLabel, ProcessingMessage } from "./Forms";
import Link from "next/link";

export function Create() {
  return (
    <div>
      <SetCreate />
    </div>
  );
}

function SetCreate() {
  // contract fields are:
  /*
  string memory _name,
  string memory _symbol,
  string memory _tokenURI,
  uint256 _maxSupply,
  uint256 _initialPrice
  */
  const [name, setName] = useState("My Name");
  const [symbol, setSymbol] = useState("MNFT");
  const [tokenURI, setTokenURI] = useState(
    "https://ipfs.io/ipfs/QmQVwFtPdAVPgJLnXFwqVtFKGymgTVGCKdQttjWtHLhTZB/NounsNftImage.jpg"
  );
  const [maxSupply, setMaxSupply] = useState(100n);
  const [initialPrice, setInitialPrice] = useState<`${number}`>(
    () => parseEther("0.1").toString() as `${number}`
  );
  const [saltStart] = useState(() =>
    /* random bigint:*/ BigInt(Math.round(Math.random() * 100000))
  );

  const fee = 0.025e4;

  /*
         string memory nftName,
        string memory nftSymbol,
        string memory tokenUri,
        uint24 fee,
        address caller,
        uint256 saltStart
  */

  const { address } = useAccount();

  const { data: hookSalt, isFetching } = useUniNftRouterFindHookSalt({
    args: [name, symbol, tokenURI, fee, address!, saltStart],
  });

  /* create args:
        string memory nftName,
        string memory nftSymbol,
        uint128 maxSupply,
        string memory tokenUri,
        uint24 fee,
        uint256 hookSalt
  
  */

  const { data: estimateCreateResult } = usePrepareUniNftRouterQuoteCreate({
    args: [
      name,
      symbol,
      maxSupply,
      tokenURI,
      fee,
      hookSalt!,
      BigInt(initialPrice),
    ],
  });

  const liquidityToProvide = estimateCreateResult
    ? estimateCreateResult.result[1]
    : null;
  const tokenPrice = estimateCreateResult
    ? estimateCreateResult.result[2]
    : null;

  const { config, isError, error } = usePrepareUniNftRouterCreate({
    args: [name, symbol, maxSupply, tokenURI, fee, hookSalt!],
    value: liquidityToProvide ? liquidityToProvide : 0n,
    enabled: Boolean(hookSalt) && Boolean(liquidityToProvide) && !isFetching,
  });

  const { data, write, isSuccess } = useUniNftRouterCreate({
    ...config,
    // onSuccess: () => setValue(''),
  });

  const waitForTransation = useWaitForTransaction({
    hash: data?.hash,
  });

  const [contractAddress, setContractAddress] = useState<Address | null>(null);

  useEffect(() => {
    if (waitForTransation.isSuccess) {
      const { contractAddress } = parseCreateReceipt(waitForTransation.data!);
      setContractAddress(contractAddress!);
    }
  }, [waitForTransation]);

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    // onSuccess: () => refetch(),
  });

  const handleMaxSupplyChanged = useCallback((e: ChangeEvent) => {
    // convert to bigint before setting
    setMaxSupply(BigInt((e.target as HTMLInputElement).value));
  }, []);

  const handlePricePerTokenChanged = useCallback((e: ChangeEvent) => {
    setInitialPrice(
      parseEther(
        (e.target as HTMLInputElement).value as `${number}`
      ).toString() as `${number}`
    );
  }, []);

  const handleImageUpload = (e: ChangeEvent) => {
    // Handle image upload logic here
    // You can use FileReader to read the file and set the imageUri state
  };

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      if (write) write();
      // Handle form submission logic here
    },
    [write]
  );

  return (
    <div className="Formizzle">
      <div className={`max-w-md mx-auto bg-purple-500 p-4 rounded-lg mt-2`}>
        <form onSubmit={handleSubmit} className="bg-purple-500 rounded-lg p-4">
          <FormFieldWrapperAndLabel label="Name">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormFieldWrapperAndLabel>
          <FormFieldWrapperAndLabel label="Symbol">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="symbol"
              type="text"
              placeholder="Symbol"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
            />
          </FormFieldWrapperAndLabel>
          <FormFieldWrapperAndLabel label="NFT Media">
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={tokenURI} title="nft-media" width={200} />
              <input
                type="text"
                value={tokenURI}
                disabled
                className="w-full bg-gray-400 rounded"
              />
            </>
          </FormFieldWrapperAndLabel>
          <FormFieldWrapperAndLabel label="Max Supply">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="maxSupply"
              type="number"
              step={1}
              placeholder="Max Supply"
              value={maxSupply.toString()}
              onChange={handleMaxSupplyChanged}
            />
          </FormFieldWrapperAndLabel>
          <FormFieldWrapperAndLabel label="Initial liquidity to provide">
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="initialPrice"
                type="number"
                step="0.001"
                placeholder="Initial liquidity to provide"
                value={formatEther(BigInt(initialPrice))}
                onChange={handlePricePerTokenChanged}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="text-gray-500 sm:text-sm" id="price-currency">
                  ETH
                </span>
              </div>
            </div>
          </FormFieldWrapperAndLabel>
          <FormFieldWrapperAndLabel
            label={`Initial token price: ${
              tokenPrice ? `${formatEther(tokenPrice)} ETH` : ""
            }`}
          >
            <></>
          </FormFieldWrapperAndLabel>
          <div className="flex items-center justify-between">
            <button
              className="bg-white text-purple font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={!write || isLoading}
            >
              Create
            </button>
          </div>
          {isError && error && <div>{error.message}</div>}
          {isLoading && <ProcessingMessage hash={data?.hash} />}
          {isSuccess && !contractAddress && (
            <div>Transaction succeeded...waiting for receipt </div>
          )}
          {contractAddress && (
            <div className="text-white font-bold">
              NFT Contract & LP Created:
              <br />
              {contractAddress}
              <br />
              <Link
                href={`/swap?contract=${contractAddress}`}
                className="underline"
              >
                Mint NFTs on Contract
              </Link>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
