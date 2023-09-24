import { TransactionReceipt, decodeEventLog } from "viem";
import { nftPoolFactoryABI } from "../generated";
import { ExtractAbiEvent } from "abitype";

type CreatedEvent = ExtractAbiEvent<typeof nftPoolFactoryABI, "Created">;

export function parseCreateReceipt(receipt: TransactionReceipt): {
  contractAddress?: `0x${string}`;
  tokenId?: bigint;
} {
  const parsedLog = receipt.logs
    .map((log) => {
      try {
        return decodeEventLog({
          abi: nftPoolFactoryABI,
          ...log,
        });
      } catch (e) {
        return null;
      }
    })
    .filter(Boolean);

  const createdEvents = parsedLog.filter((log) => log?.eventName === "Created");

  const createdEvent = createdEvents[createdEvents.length - 1];

  const contractAddress = createdEvent!.args.erc721Address;

  return { contractAddress };
}
