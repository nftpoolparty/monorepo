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
  useUniNftRouterCreate,
  useUniNftRouterFindHookSalt,
} from "../generated";
import { Address, etherUnits, formatEther, parseEther } from "viem";
import { parseCreateReceipt } from "../utils/txParsing";

export function Create() {
  return (
    <div>
      <SetCreate />
    </div>
  );
}

function FormFieldWrapperAndLabel({
  label,
  children,
}: {
  label: string;
  children: JSX.Element;
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
  const [tokenURI, setTokenURI] = useState("ipfs.io//ipfs");
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

  console.log({ hookSalt, enabled: Boolean(hookSalt) && !isFetching });

  /* create args:
        string memory nftName,
        string memory nftSymbol,
        uint128 maxSupply,
        string memory tokenUri,
        uint24 fee,
        uint256 hookSalt
  
  */

  const { data: estimateCreateResult } = usePrepareUniNftRouterCreate({
    args: [name, symbol, maxSupply, tokenURI, fee, hookSalt!],
    value: BigInt(initialPrice),
    enabled: Boolean(hookSalt) && !isFetching,
  });

  const value = estimateCreateResult ? estimateCreateResult.result[1] : null;

  const { config, isError, error } = usePrepareUniNftRouterCreate({
    args: [name, symbol, maxSupply, tokenURI, fee, hookSalt!],
    value: value ? value : 0n,
    enabled: Boolean(hookSalt) && Boolean(value) && !isFetching,
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
    <div className={`max-w-md mx-auto bg-purple-500 p-4 rounded-lg`}>
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
        <FormFieldWrapperAndLabel label="Image">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
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
        <FormFieldWrapperAndLabel label="Initial Price">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="initialPrice"
            type="number"
            step="0.001"
            placeholder="Initial Price"
            value={formatEther(BigInt(initialPrice))}
            onChange={handlePricePerTokenChanged}
          />
        </FormFieldWrapperAndLabel>
        <FormFieldWrapperAndLabel label="Initial liquidity to provide">
          <label>{value ? `${formatEther(value)} ETH` : null}</label>
        </FormFieldWrapperAndLabel>
        <div className="flex items-center justify-between">
          <button
            className="bg-white text-purple hover:bg-green-dark font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={!write || isLoading}
          >
            Create
          </button>
        </div>
        {isError && error && <div>{error.message}</div>}
        {isLoading && <ProcessingMessage hash={data?.hash} />}
        {isSuccess && <div>Contract created!</div>}
        {contractAddress && <>contract address: {contractAddress}</>}
      </form>
    </div>
  );

  // return (
  //   <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
  //     <div className="sm:mx-auto sm:w-full sm:max-w-sm">
  //       <form>
  //         <div className="space-y-12">
  //           <div className="border-b border-white/10 pb-12">
  //             {/* form for the above fields except for `value`, using tailwind css for styling the fields: */}
  //             <div className="flex flex-col space-y-2">
  //               <input
  //                 type="text"
  //                 value={name}
  //                 onChange={(e) => setName(e.target.value)}
  //                 className="border-2 border-gray-300 rounded-md p-2"
  //               />
  //             </div>
  //             <div className="flex flex-col space-y-2">
  //               <input
  //                 type="text"
  //                 value={symbol}
  //                 onChange={(e) => setSymbol(e.target.value)}
  //                 className="border-2 border-gray-300 rounded-md p-2"
  //               />
  //             </div>
  //             <div className="flex flex-col space-y-2">
  //               <input
  //                 type="text"
  //                 value={tokenURI}
  //                 onChange={(e) => setTokenURI(e.target.value)}
  //               />
  //             </div>
  //             <input
  //               type="text"
  //               value={maxSupply.toString()}
  //               onChange={handleMaxSupplyChanged}
  //             />

  //             <button disabled={!write || isLoading} onClick={() => write?.()}>
  //               Create
  //             </button>
  //             {isLoading && <ProcessingMessage hash={data?.hash} />}
  //           </div>
  //         </div>
  //       </form>
  //     </div>
  //   </div>
  // );
}

function ProcessingMessage({ hash }: { hash?: `0x${string}` }) {
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
