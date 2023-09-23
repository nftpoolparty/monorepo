import {
  useContractRead,
  UseContractReadConfig,
  useContractWrite,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
  useContractEvent,
  UseContractEventConfig,
  Address,
} from 'wagmi'
import {
  ReadContractResult,
  WriteContractMode,
  PrepareWriteContractResult,
} from 'wagmi/actions'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC721
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc721ABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC721TokenReceiver
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc721TokenReceiverABI = [
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC721Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMulticall3
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMulticall3ABI = [
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'returnData', internalType: 'bytes[]', type: 'bytes[]' },
    ],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call3[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'allowFailure', internalType: 'bool', type: 'bool' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate3',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call3Value[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'allowFailure', internalType: 'bool', type: 'bool' },
          { name: 'value', internalType: 'uint256', type: 'uint256' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate3Value',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'blockAndAggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'blockHash', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getBasefee',
    outputs: [{ name: 'basefee', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'blockNumber', internalType: 'uint256', type: 'uint256' }],
    name: 'getBlockHash',
    outputs: [{ name: 'blockHash', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getBlockNumber',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getChainId',
    outputs: [{ name: 'chainid', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockCoinbase',
    outputs: [{ name: 'coinbase', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockDifficulty',
    outputs: [{ name: 'difficulty', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockGasLimit',
    outputs: [{ name: 'gaslimit', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockTimestamp',
    outputs: [{ name: 'timestamp', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'getEthBalance',
    outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getLastBlockHash',
    outputs: [{ name: 'blockHash', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'requireSuccess', internalType: 'bool', type: 'bool' },
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'tryAggregate',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'requireSuccess', internalType: 'bool', type: 'bool' },
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'tryBlockAndAggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'blockHash', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MultiEdition721
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**

*/
export const multiEdition721ABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: '_name', internalType: 'string', type: 'string' },
      { name: '_symbol', internalType: 'string', type: 'string' },
      { name: '_tokenURI', internalType: 'string', type: 'string' },
      { name: '_maxSupply', internalType: 'uint256', type: 'uint256' },
      { name: '_initialPrice', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'tokenPrice',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
  },
] as const

/**

*/
export const multiEdition721Address = {} as const

/**

*/
export const multiEdition721Config = {
  address: multiEdition721Address,
  abi: multiEdition721ABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// NftPoolFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 *
 */
export const nftPoolFactoryABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'erc721Address',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Created',
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: '_name', internalType: 'string', type: 'string' },
      { name: '_symbol', internalType: 'string', type: 'string' },
      { name: '_tokenURI', internalType: 'string', type: 'string' },
      { name: '_maxSupply', internalType: 'uint256', type: 'uint256' },
      { name: '_initialPrice', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'create',
    outputs: [
      { name: 'contractAddress', internalType: 'address', type: 'address' },
    ],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [
      { name: '_maxSupply', internalType: 'uint256', type: 'uint256' },
      { name: '_initialPrice', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getLiquidityToProvide',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
] as const

/**
 *
 */
export const nftPoolFactoryAddress = {
  31337: '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9',
} as const

/**
 *
 */
export const nftPoolFactoryConfig = {
  address: nftPoolFactoryAddress,
  abi: nftPoolFactoryABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__.
 */
export function useErc721Read<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({ abi: erc721ABI, ...config } as UseContractReadConfig<
    typeof erc721ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useErc721BalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"getApproved"`.
 */
export function useErc721GetApproved<
  TFunctionName extends 'getApproved',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ABI,
    functionName: 'getApproved',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"isApprovedForAll"`.
 */
export function useErc721IsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ABI,
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"name"`.
 */
export function useErc721Name<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ABI,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"ownerOf"`.
 */
export function useErc721OwnerOf<
  TFunctionName extends 'ownerOf',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ABI,
    functionName: 'ownerOf',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useErc721SupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"symbol"`.
 */
export function useErc721Symbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ABI,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"tokenURI"`.
 */
export function useErc721TokenUri<
  TFunctionName extends 'tokenURI',
  TSelectData = ReadContractResult<typeof erc721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc721ABI,
    functionName: 'tokenURI',
    ...config,
  } as UseContractReadConfig<typeof erc721ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__.
 */
export function useErc721Write<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof erc721ABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof erc721ABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof erc721ABI, TFunctionName, TMode>({
    abi: erc721ABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"approve"`.
 */
export function useErc721Approve<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721ABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof erc721ABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof erc721ABI, 'approve', TMode>({
    abi: erc721ABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function useErc721SafeTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721ABI,
          'safeTransferFrom'
        >['request']['abi'],
        'safeTransferFrom',
        TMode
      > & { functionName?: 'safeTransferFrom' }
    : UseContractWriteConfig<typeof erc721ABI, 'safeTransferFrom', TMode> & {
        abi?: never
        functionName?: 'safeTransferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof erc721ABI, 'safeTransferFrom', TMode>({
    abi: erc721ABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function useErc721SetApprovalForAll<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721ABI,
          'setApprovalForAll'
        >['request']['abi'],
        'setApprovalForAll',
        TMode
      > & { functionName?: 'setApprovalForAll' }
    : UseContractWriteConfig<typeof erc721ABI, 'setApprovalForAll', TMode> & {
        abi?: never
        functionName?: 'setApprovalForAll'
      } = {} as any,
) {
  return useContractWrite<typeof erc721ABI, 'setApprovalForAll', TMode>({
    abi: erc721ABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useErc721TransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721ABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof erc721ABI, 'transferFrom', TMode> & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof erc721ABI, 'transferFrom', TMode>({
    abi: erc721ABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__.
 */
export function usePrepareErc721Write<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721ABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721ABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareErc721Approve(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721ABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721ABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePrepareErc721SafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721ABI, 'safeTransferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721ABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ABI, 'safeTransferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePrepareErc721SetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721ABI, 'setApprovalForAll'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721ABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ABI, 'setApprovalForAll'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareErc721TransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721ABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721ABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc721ABI, 'transferFrom'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc721ABI}__.
 */
export function useErc721Event<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof erc721ABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc721ABI,
    ...config,
  } as UseContractEventConfig<typeof erc721ABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc721ABI}__ and `eventName` set to `"Approval"`.
 */
export function useErc721ApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof erc721ABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc721ABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof erc721ABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc721ABI}__ and `eventName` set to `"ApprovalForAll"`.
 */
export function useErc721ApprovalForAllEvent(
  config: Omit<
    UseContractEventConfig<typeof erc721ABI, 'ApprovalForAll'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc721ABI,
    eventName: 'ApprovalForAll',
    ...config,
  } as UseContractEventConfig<typeof erc721ABI, 'ApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc721ABI}__ and `eventName` set to `"Transfer"`.
 */
export function useErc721TransferEvent(
  config: Omit<
    UseContractEventConfig<typeof erc721ABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc721ABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof erc721ABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721TokenReceiverABI}__.
 */
export function useErc721TokenReceiverWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721TokenReceiverABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<
        typeof erc721TokenReceiverABI,
        TFunctionName,
        TMode
      > & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof erc721TokenReceiverABI, TFunctionName, TMode>({
    abi: erc721TokenReceiverABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc721TokenReceiverABI}__ and `functionName` set to `"onERC721Received"`.
 */
export function useErc721TokenReceiverOnErc721Received<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc721TokenReceiverABI,
          'onERC721Received'
        >['request']['abi'],
        'onERC721Received',
        TMode
      > & { functionName?: 'onERC721Received' }
    : UseContractWriteConfig<
        typeof erc721TokenReceiverABI,
        'onERC721Received',
        TMode
      > & {
        abi?: never
        functionName?: 'onERC721Received'
      } = {} as any,
) {
  return useContractWrite<
    typeof erc721TokenReceiverABI,
    'onERC721Received',
    TMode
  >({
    abi: erc721TokenReceiverABI,
    functionName: 'onERC721Received',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721TokenReceiverABI}__.
 */
export function usePrepareErc721TokenReceiverWrite<
  TFunctionName extends string,
>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc721TokenReceiverABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721TokenReceiverABI,
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof erc721TokenReceiverABI,
    TFunctionName
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc721TokenReceiverABI}__ and `functionName` set to `"onERC721Received"`.
 */
export function usePrepareErc721TokenReceiverOnErc721Received(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof erc721TokenReceiverABI,
      'onERC721Received'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc721TokenReceiverABI,
    functionName: 'onERC721Received',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof erc721TokenReceiverABI,
    'onERC721Received'
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iMulticall3ABI}__.
 */
export function useIMulticall3Read<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof iMulticall3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iMulticall3ABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: iMulticall3ABI,
    ...config,
  } as UseContractReadConfig<typeof iMulticall3ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"getBasefee"`.
 */
export function useIMulticall3GetBasefee<
  TFunctionName extends 'getBasefee',
  TSelectData = ReadContractResult<typeof iMulticall3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iMulticall3ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iMulticall3ABI,
    functionName: 'getBasefee',
    ...config,
  } as UseContractReadConfig<typeof iMulticall3ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"getBlockHash"`.
 */
export function useIMulticall3GetBlockHash<
  TFunctionName extends 'getBlockHash',
  TSelectData = ReadContractResult<typeof iMulticall3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iMulticall3ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iMulticall3ABI,
    functionName: 'getBlockHash',
    ...config,
  } as UseContractReadConfig<typeof iMulticall3ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"getBlockNumber"`.
 */
export function useIMulticall3GetBlockNumber<
  TFunctionName extends 'getBlockNumber',
  TSelectData = ReadContractResult<typeof iMulticall3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iMulticall3ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iMulticall3ABI,
    functionName: 'getBlockNumber',
    ...config,
  } as UseContractReadConfig<typeof iMulticall3ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"getChainId"`.
 */
export function useIMulticall3GetChainId<
  TFunctionName extends 'getChainId',
  TSelectData = ReadContractResult<typeof iMulticall3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iMulticall3ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iMulticall3ABI,
    functionName: 'getChainId',
    ...config,
  } as UseContractReadConfig<typeof iMulticall3ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"getCurrentBlockCoinbase"`.
 */
export function useIMulticall3GetCurrentBlockCoinbase<
  TFunctionName extends 'getCurrentBlockCoinbase',
  TSelectData = ReadContractResult<typeof iMulticall3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iMulticall3ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iMulticall3ABI,
    functionName: 'getCurrentBlockCoinbase',
    ...config,
  } as UseContractReadConfig<typeof iMulticall3ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"getCurrentBlockDifficulty"`.
 */
export function useIMulticall3GetCurrentBlockDifficulty<
  TFunctionName extends 'getCurrentBlockDifficulty',
  TSelectData = ReadContractResult<typeof iMulticall3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iMulticall3ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iMulticall3ABI,
    functionName: 'getCurrentBlockDifficulty',
    ...config,
  } as UseContractReadConfig<typeof iMulticall3ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"getCurrentBlockGasLimit"`.
 */
export function useIMulticall3GetCurrentBlockGasLimit<
  TFunctionName extends 'getCurrentBlockGasLimit',
  TSelectData = ReadContractResult<typeof iMulticall3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iMulticall3ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iMulticall3ABI,
    functionName: 'getCurrentBlockGasLimit',
    ...config,
  } as UseContractReadConfig<typeof iMulticall3ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"getCurrentBlockTimestamp"`.
 */
export function useIMulticall3GetCurrentBlockTimestamp<
  TFunctionName extends 'getCurrentBlockTimestamp',
  TSelectData = ReadContractResult<typeof iMulticall3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iMulticall3ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iMulticall3ABI,
    functionName: 'getCurrentBlockTimestamp',
    ...config,
  } as UseContractReadConfig<typeof iMulticall3ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"getEthBalance"`.
 */
export function useIMulticall3GetEthBalance<
  TFunctionName extends 'getEthBalance',
  TSelectData = ReadContractResult<typeof iMulticall3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iMulticall3ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iMulticall3ABI,
    functionName: 'getEthBalance',
    ...config,
  } as UseContractReadConfig<typeof iMulticall3ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"getLastBlockHash"`.
 */
export function useIMulticall3GetLastBlockHash<
  TFunctionName extends 'getLastBlockHash',
  TSelectData = ReadContractResult<typeof iMulticall3ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iMulticall3ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iMulticall3ABI,
    functionName: 'getLastBlockHash',
    ...config,
  } as UseContractReadConfig<typeof iMulticall3ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iMulticall3ABI}__.
 */
export function useIMulticall3Write<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iMulticall3ABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof iMulticall3ABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof iMulticall3ABI, TFunctionName, TMode>({
    abi: iMulticall3ABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"aggregate"`.
 */
export function useIMulticall3Aggregate<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iMulticall3ABI,
          'aggregate'
        >['request']['abi'],
        'aggregate',
        TMode
      > & { functionName?: 'aggregate' }
    : UseContractWriteConfig<typeof iMulticall3ABI, 'aggregate', TMode> & {
        abi?: never
        functionName?: 'aggregate'
      } = {} as any,
) {
  return useContractWrite<typeof iMulticall3ABI, 'aggregate', TMode>({
    abi: iMulticall3ABI,
    functionName: 'aggregate',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"aggregate3"`.
 */
export function useIMulticall3Aggregate3<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iMulticall3ABI,
          'aggregate3'
        >['request']['abi'],
        'aggregate3',
        TMode
      > & { functionName?: 'aggregate3' }
    : UseContractWriteConfig<typeof iMulticall3ABI, 'aggregate3', TMode> & {
        abi?: never
        functionName?: 'aggregate3'
      } = {} as any,
) {
  return useContractWrite<typeof iMulticall3ABI, 'aggregate3', TMode>({
    abi: iMulticall3ABI,
    functionName: 'aggregate3',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"aggregate3Value"`.
 */
export function useIMulticall3Aggregate3Value<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iMulticall3ABI,
          'aggregate3Value'
        >['request']['abi'],
        'aggregate3Value',
        TMode
      > & { functionName?: 'aggregate3Value' }
    : UseContractWriteConfig<
        typeof iMulticall3ABI,
        'aggregate3Value',
        TMode
      > & {
        abi?: never
        functionName?: 'aggregate3Value'
      } = {} as any,
) {
  return useContractWrite<typeof iMulticall3ABI, 'aggregate3Value', TMode>({
    abi: iMulticall3ABI,
    functionName: 'aggregate3Value',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"blockAndAggregate"`.
 */
export function useIMulticall3BlockAndAggregate<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iMulticall3ABI,
          'blockAndAggregate'
        >['request']['abi'],
        'blockAndAggregate',
        TMode
      > & { functionName?: 'blockAndAggregate' }
    : UseContractWriteConfig<
        typeof iMulticall3ABI,
        'blockAndAggregate',
        TMode
      > & {
        abi?: never
        functionName?: 'blockAndAggregate'
      } = {} as any,
) {
  return useContractWrite<typeof iMulticall3ABI, 'blockAndAggregate', TMode>({
    abi: iMulticall3ABI,
    functionName: 'blockAndAggregate',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"tryAggregate"`.
 */
export function useIMulticall3TryAggregate<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iMulticall3ABI,
          'tryAggregate'
        >['request']['abi'],
        'tryAggregate',
        TMode
      > & { functionName?: 'tryAggregate' }
    : UseContractWriteConfig<typeof iMulticall3ABI, 'tryAggregate', TMode> & {
        abi?: never
        functionName?: 'tryAggregate'
      } = {} as any,
) {
  return useContractWrite<typeof iMulticall3ABI, 'tryAggregate', TMode>({
    abi: iMulticall3ABI,
    functionName: 'tryAggregate',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"tryBlockAndAggregate"`.
 */
export function useIMulticall3TryBlockAndAggregate<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iMulticall3ABI,
          'tryBlockAndAggregate'
        >['request']['abi'],
        'tryBlockAndAggregate',
        TMode
      > & { functionName?: 'tryBlockAndAggregate' }
    : UseContractWriteConfig<
        typeof iMulticall3ABI,
        'tryBlockAndAggregate',
        TMode
      > & {
        abi?: never
        functionName?: 'tryBlockAndAggregate'
      } = {} as any,
) {
  return useContractWrite<typeof iMulticall3ABI, 'tryBlockAndAggregate', TMode>(
    {
      abi: iMulticall3ABI,
      functionName: 'tryBlockAndAggregate',
      ...config,
    } as any,
  )
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iMulticall3ABI}__.
 */
export function usePrepareIMulticall3Write<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iMulticall3ABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iMulticall3ABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof iMulticall3ABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"aggregate"`.
 */
export function usePrepareIMulticall3Aggregate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iMulticall3ABI, 'aggregate'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iMulticall3ABI,
    functionName: 'aggregate',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iMulticall3ABI, 'aggregate'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"aggregate3"`.
 */
export function usePrepareIMulticall3Aggregate3(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iMulticall3ABI, 'aggregate3'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iMulticall3ABI,
    functionName: 'aggregate3',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iMulticall3ABI, 'aggregate3'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"aggregate3Value"`.
 */
export function usePrepareIMulticall3Aggregate3Value(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iMulticall3ABI, 'aggregate3Value'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iMulticall3ABI,
    functionName: 'aggregate3Value',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iMulticall3ABI, 'aggregate3Value'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"blockAndAggregate"`.
 */
export function usePrepareIMulticall3BlockAndAggregate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iMulticall3ABI, 'blockAndAggregate'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iMulticall3ABI,
    functionName: 'blockAndAggregate',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof iMulticall3ABI,
    'blockAndAggregate'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"tryAggregate"`.
 */
export function usePrepareIMulticall3TryAggregate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iMulticall3ABI, 'tryAggregate'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iMulticall3ABI,
    functionName: 'tryAggregate',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iMulticall3ABI, 'tryAggregate'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iMulticall3ABI}__ and `functionName` set to `"tryBlockAndAggregate"`.
 */
export function usePrepareIMulticall3TryBlockAndAggregate(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof iMulticall3ABI,
      'tryBlockAndAggregate'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iMulticall3ABI,
    functionName: 'tryBlockAndAggregate',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof iMulticall3ABI,
    'tryBlockAndAggregate'
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link multiEdition721ABI}__.
 */
export function useMultiEdition721Read<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof multiEdition721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof multiEdition721ABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address'
  > & { chainId?: keyof typeof multiEdition721Address } = {} as any,
) {
  return useContractRead({
    abi: multiEdition721ABI,
    address: multiEdition721Address[undefined],
    ...config,
  } as UseContractReadConfig<
    typeof multiEdition721ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link multiEdition721ABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useMultiEdition721BalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof multiEdition721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof multiEdition721ABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof multiEdition721Address } = {} as any,
) {
  return useContractRead({
    abi: multiEdition721ABI,
    address: multiEdition721Address[undefined],
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<
    typeof multiEdition721ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link multiEdition721ABI}__ and `functionName` set to `"getApproved"`.
 */
export function useMultiEdition721GetApproved<
  TFunctionName extends 'getApproved',
  TSelectData = ReadContractResult<typeof multiEdition721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof multiEdition721ABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof multiEdition721Address } = {} as any,
) {
  return useContractRead({
    abi: multiEdition721ABI,
    address: multiEdition721Address[undefined],
    functionName: 'getApproved',
    ...config,
  } as UseContractReadConfig<
    typeof multiEdition721ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link multiEdition721ABI}__ and `functionName` set to `"isApprovedForAll"`.
 */
export function useMultiEdition721IsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof multiEdition721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof multiEdition721ABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof multiEdition721Address } = {} as any,
) {
  return useContractRead({
    abi: multiEdition721ABI,
    address: multiEdition721Address[undefined],
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<
    typeof multiEdition721ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link multiEdition721ABI}__ and `functionName` set to `"name"`.
 */
export function useMultiEdition721Name<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof multiEdition721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof multiEdition721ABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof multiEdition721Address } = {} as any,
) {
  return useContractRead({
    abi: multiEdition721ABI,
    address: multiEdition721Address[undefined],
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<
    typeof multiEdition721ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link multiEdition721ABI}__ and `functionName` set to `"ownerOf"`.
 */
export function useMultiEdition721OwnerOf<
  TFunctionName extends 'ownerOf',
  TSelectData = ReadContractResult<typeof multiEdition721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof multiEdition721ABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof multiEdition721Address } = {} as any,
) {
  return useContractRead({
    abi: multiEdition721ABI,
    address: multiEdition721Address[undefined],
    functionName: 'ownerOf',
    ...config,
  } as UseContractReadConfig<
    typeof multiEdition721ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link multiEdition721ABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useMultiEdition721SupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof multiEdition721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof multiEdition721ABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof multiEdition721Address } = {} as any,
) {
  return useContractRead({
    abi: multiEdition721ABI,
    address: multiEdition721Address[undefined],
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<
    typeof multiEdition721ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link multiEdition721ABI}__ and `functionName` set to `"symbol"`.
 */
export function useMultiEdition721Symbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof multiEdition721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof multiEdition721ABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof multiEdition721Address } = {} as any,
) {
  return useContractRead({
    abi: multiEdition721ABI,
    address: multiEdition721Address[undefined],
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<
    typeof multiEdition721ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link multiEdition721ABI}__ and `functionName` set to `"tokenPrice"`.
 */
export function useMultiEdition721TokenPrice<
  TFunctionName extends 'tokenPrice',
  TSelectData = ReadContractResult<typeof multiEdition721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof multiEdition721ABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof multiEdition721Address } = {} as any,
) {
  return useContractRead({
    abi: multiEdition721ABI,
    address: multiEdition721Address[undefined],
    functionName: 'tokenPrice',
    ...config,
  } as UseContractReadConfig<
    typeof multiEdition721ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link multiEdition721ABI}__ and `functionName` set to `"tokenURI"`.
 */
export function useMultiEdition721TokenUri<
  TFunctionName extends 'tokenURI',
  TSelectData = ReadContractResult<typeof multiEdition721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof multiEdition721ABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof multiEdition721Address } = {} as any,
) {
  return useContractRead({
    abi: multiEdition721ABI,
    address: multiEdition721Address[undefined],
    functionName: 'tokenURI',
    ...config,
  } as UseContractReadConfig<
    typeof multiEdition721ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link multiEdition721ABI}__ and `functionName` set to `"totalSupply"`.
 */
export function useMultiEdition721TotalSupply<
  TFunctionName extends 'totalSupply',
  TSelectData = ReadContractResult<typeof multiEdition721ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof multiEdition721ABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof multiEdition721Address } = {} as any,
) {
  return useContractRead({
    abi: multiEdition721ABI,
    address: multiEdition721Address[undefined],
    functionName: 'totalSupply',
    ...config,
  } as UseContractReadConfig<
    typeof multiEdition721ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link multiEdition721ABI}__.
 */
export function useMultiEdition721Write<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof multiEdition721Address,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof multiEdition721ABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<
        typeof multiEdition721ABI,
        TFunctionName,
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
      } = {} as any,
) {
  return useContractWrite<typeof multiEdition721ABI, TFunctionName, TMode>({
    abi: multiEdition721ABI,
    address: multiEdition721Address[undefined],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link multiEdition721ABI}__ and `functionName` set to `"approve"`.
 */
export function useMultiEdition721Approve<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof multiEdition721Address,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof multiEdition721ABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'approve' }
    : UseContractWriteConfig<typeof multiEdition721ABI, 'approve', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof multiEdition721ABI, 'approve', TMode>({
    abi: multiEdition721ABI,
    address: multiEdition721Address[undefined],
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link multiEdition721ABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function useMultiEdition721SafeTransferFrom<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof multiEdition721Address,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof multiEdition721ABI,
          'safeTransferFrom'
        >['request']['abi'],
        'safeTransferFrom',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'safeTransferFrom'
      }
    : UseContractWriteConfig<
        typeof multiEdition721ABI,
        'safeTransferFrom',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'safeTransferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof multiEdition721ABI, 'safeTransferFrom', TMode>(
    {
      abi: multiEdition721ABI,
      address: multiEdition721Address[undefined],
      functionName: 'safeTransferFrom',
      ...config,
    } as any,
  )
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link multiEdition721ABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function useMultiEdition721SetApprovalForAll<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof multiEdition721Address,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof multiEdition721ABI,
          'setApprovalForAll'
        >['request']['abi'],
        'setApprovalForAll',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'setApprovalForAll'
      }
    : UseContractWriteConfig<
        typeof multiEdition721ABI,
        'setApprovalForAll',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'setApprovalForAll'
      } = {} as any,
) {
  return useContractWrite<
    typeof multiEdition721ABI,
    'setApprovalForAll',
    TMode
  >({
    abi: multiEdition721ABI,
    address: multiEdition721Address[undefined],
    functionName: 'setApprovalForAll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link multiEdition721ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useMultiEdition721TransferFrom<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof multiEdition721Address,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof multiEdition721ABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'transferFrom'
      }
    : UseContractWriteConfig<
        typeof multiEdition721ABI,
        'transferFrom',
        TMode
      > & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof multiEdition721ABI, 'transferFrom', TMode>({
    abi: multiEdition721ABI,
    address: multiEdition721Address[undefined],
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link multiEdition721ABI}__.
 */
export function usePrepareMultiEdition721Write<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof multiEdition721ABI, TFunctionName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof multiEdition721Address } = {} as any,
) {
  return usePrepareContractWrite({
    abi: multiEdition721ABI,
    address: multiEdition721Address[undefined],
    ...config,
  } as UsePrepareContractWriteConfig<typeof multiEdition721ABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link multiEdition721ABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareMultiEdition721Approve(
  config: Omit<
    UsePrepareContractWriteConfig<typeof multiEdition721ABI, 'approve'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof multiEdition721Address } = {} as any,
) {
  return usePrepareContractWrite({
    abi: multiEdition721ABI,
    address: multiEdition721Address[undefined],
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof multiEdition721ABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link multiEdition721ABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePrepareMultiEdition721SafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof multiEdition721ABI,
      'safeTransferFrom'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof multiEdition721Address } = {} as any,
) {
  return usePrepareContractWrite({
    abi: multiEdition721ABI,
    address: multiEdition721Address[undefined],
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof multiEdition721ABI,
    'safeTransferFrom'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link multiEdition721ABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePrepareMultiEdition721SetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof multiEdition721ABI,
      'setApprovalForAll'
    >,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof multiEdition721Address } = {} as any,
) {
  return usePrepareContractWrite({
    abi: multiEdition721ABI,
    address: multiEdition721Address[undefined],
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof multiEdition721ABI,
    'setApprovalForAll'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link multiEdition721ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareMultiEdition721TransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof multiEdition721ABI, 'transferFrom'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof multiEdition721Address } = {} as any,
) {
  return usePrepareContractWrite({
    abi: multiEdition721ABI,
    address: multiEdition721Address[undefined],
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof multiEdition721ABI, 'transferFrom'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link multiEdition721ABI}__.
 */
export function useMultiEdition721Event<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof multiEdition721ABI, TEventName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof multiEdition721Address } = {} as any,
) {
  return useContractEvent({
    abi: multiEdition721ABI,
    address: multiEdition721Address[undefined],
    ...config,
  } as UseContractEventConfig<typeof multiEdition721ABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link multiEdition721ABI}__ and `eventName` set to `"Approval"`.
 */
export function useMultiEdition721ApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof multiEdition721ABI, 'Approval'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof multiEdition721Address } = {} as any,
) {
  return useContractEvent({
    abi: multiEdition721ABI,
    address: multiEdition721Address[undefined],
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof multiEdition721ABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link multiEdition721ABI}__ and `eventName` set to `"ApprovalForAll"`.
 */
export function useMultiEdition721ApprovalForAllEvent(
  config: Omit<
    UseContractEventConfig<typeof multiEdition721ABI, 'ApprovalForAll'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof multiEdition721Address } = {} as any,
) {
  return useContractEvent({
    abi: multiEdition721ABI,
    address: multiEdition721Address[undefined],
    eventName: 'ApprovalForAll',
    ...config,
  } as UseContractEventConfig<typeof multiEdition721ABI, 'ApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link multiEdition721ABI}__ and `eventName` set to `"Transfer"`.
 */
export function useMultiEdition721TransferEvent(
  config: Omit<
    UseContractEventConfig<typeof multiEdition721ABI, 'Transfer'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof multiEdition721Address } = {} as any,
) {
  return useContractEvent({
    abi: multiEdition721ABI,
    address: multiEdition721Address[undefined],
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof multiEdition721ABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link nftPoolFactoryABI}__.
 *
 *
 */
export function useNftPoolFactoryRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof nftPoolFactoryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof nftPoolFactoryABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  > & { chainId?: keyof typeof nftPoolFactoryAddress } = {} as any,
) {
  return useContractRead({
    abi: nftPoolFactoryABI,
    address: nftPoolFactoryAddress[31337],
    ...config,
  } as UseContractReadConfig<
    typeof nftPoolFactoryABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link nftPoolFactoryABI}__ and `functionName` set to `"getLiquidityToProvide"`.
 *
 *
 */
export function useNftPoolFactoryGetLiquidityToProvide<
  TFunctionName extends 'getLiquidityToProvide',
  TSelectData = ReadContractResult<typeof nftPoolFactoryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof nftPoolFactoryABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof nftPoolFactoryAddress } = {} as any,
) {
  return useContractRead({
    abi: nftPoolFactoryABI,
    address: nftPoolFactoryAddress[31337],
    functionName: 'getLiquidityToProvide',
    ...config,
  } as UseContractReadConfig<
    typeof nftPoolFactoryABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link nftPoolFactoryABI}__.
 *
 *
 */
export function useNftPoolFactoryWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof nftPoolFactoryAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof nftPoolFactoryABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<typeof nftPoolFactoryABI, TFunctionName, TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
      } = {} as any,
) {
  return useContractWrite<typeof nftPoolFactoryABI, TFunctionName, TMode>({
    abi: nftPoolFactoryABI,
    address: nftPoolFactoryAddress[31337],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link nftPoolFactoryABI}__ and `functionName` set to `"create"`.
 *
 *
 */
export function useNftPoolFactoryCreate<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof nftPoolFactoryAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof nftPoolFactoryABI,
          'create'
        >['request']['abi'],
        'create',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'create' }
    : UseContractWriteConfig<typeof nftPoolFactoryABI, 'create', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'create'
      } = {} as any,
) {
  return useContractWrite<typeof nftPoolFactoryABI, 'create', TMode>({
    abi: nftPoolFactoryABI,
    address: nftPoolFactoryAddress[31337],
    functionName: 'create',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link nftPoolFactoryABI}__.
 *
 *
 */
export function usePrepareNftPoolFactoryWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof nftPoolFactoryABI, TFunctionName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof nftPoolFactoryAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: nftPoolFactoryABI,
    address: nftPoolFactoryAddress[31337],
    ...config,
  } as UsePrepareContractWriteConfig<typeof nftPoolFactoryABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link nftPoolFactoryABI}__ and `functionName` set to `"create"`.
 *
 *
 */
export function usePrepareNftPoolFactoryCreate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof nftPoolFactoryABI, 'create'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof nftPoolFactoryAddress } = {} as any,
) {
  return usePrepareContractWrite({
    abi: nftPoolFactoryABI,
    address: nftPoolFactoryAddress[31337],
    functionName: 'create',
    ...config,
  } as UsePrepareContractWriteConfig<typeof nftPoolFactoryABI, 'create'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link nftPoolFactoryABI}__.
 *
 *
 */
export function useNftPoolFactoryEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof nftPoolFactoryABI, TEventName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof nftPoolFactoryAddress } = {} as any,
) {
  return useContractEvent({
    abi: nftPoolFactoryABI,
    address: nftPoolFactoryAddress[31337],
    ...config,
  } as UseContractEventConfig<typeof nftPoolFactoryABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link nftPoolFactoryABI}__ and `eventName` set to `"Created"`.
 *
 *
 */
export function useNftPoolFactoryCreatedEvent(
  config: Omit<
    UseContractEventConfig<typeof nftPoolFactoryABI, 'Created'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof nftPoolFactoryAddress } = {} as any,
) {
  return useContractEvent({
    abi: nftPoolFactoryABI,
    address: nftPoolFactoryAddress[31337],
    eventName: 'Created',
    ...config,
  } as UseContractEventConfig<typeof nftPoolFactoryABI, 'Created'>)
}
