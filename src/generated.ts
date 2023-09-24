import {
  useContractRead,
  UseContractReadConfig,
  useContractWrite,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
  useContractEvent,
  UseContractEventConfig,
  useNetwork,
  useChainId,
  Address,
} from 'wagmi'
import {
  ReadContractResult,
  WriteContractMode,
  PrepareWriteContractResult,
} from 'wagmi/actions'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BaseHook
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const baseHookABI = [
  {
    type: 'error',
    inputs: [{ name: 'hooks', internalType: 'address', type: 'address' }],
    name: 'HookAddressNotValid',
  },
  { type: 'error', inputs: [], name: 'HookNotImplemented' },
  { type: 'error', inputs: [], name: 'InvalidPool' },
  { type: 'error', inputs: [], name: 'LockFailure' },
  { type: 'error', inputs: [], name: 'NotPoolManager' },
  { type: 'error', inputs: [], name: 'NotSelf' },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      {
        name: '',
        internalType: 'struct PoolKey',
        type: 'tuple',
        components: [
          { name: 'currency0', internalType: 'Currency', type: 'address' },
          { name: 'currency1', internalType: 'Currency', type: 'address' },
          { name: 'fee', internalType: 'uint24', type: 'uint24' },
          { name: 'tickSpacing', internalType: 'int24', type: 'int24' },
          { name: 'hooks', internalType: 'contract IHooks', type: 'address' },
        ],
      },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'afterDonate',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      {
        name: '',
        internalType: 'struct PoolKey',
        type: 'tuple',
        components: [
          { name: 'currency0', internalType: 'Currency', type: 'address' },
          { name: 'currency1', internalType: 'Currency', type: 'address' },
          { name: 'fee', internalType: 'uint24', type: 'uint24' },
          { name: 'tickSpacing', internalType: 'int24', type: 'int24' },
          { name: 'hooks', internalType: 'contract IHooks', type: 'address' },
        ],
      },
      { name: '', internalType: 'uint160', type: 'uint160' },
      { name: '', internalType: 'int24', type: 'int24' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'afterInitialize',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      {
        name: '',
        internalType: 'struct PoolKey',
        type: 'tuple',
        components: [
          { name: 'currency0', internalType: 'Currency', type: 'address' },
          { name: 'currency1', internalType: 'Currency', type: 'address' },
          { name: 'fee', internalType: 'uint24', type: 'uint24' },
          { name: 'tickSpacing', internalType: 'int24', type: 'int24' },
          { name: 'hooks', internalType: 'contract IHooks', type: 'address' },
        ],
      },
      {
        name: '',
        internalType: 'struct IPoolManager.ModifyPositionParams',
        type: 'tuple',
        components: [
          { name: 'tickLower', internalType: 'int24', type: 'int24' },
          { name: 'tickUpper', internalType: 'int24', type: 'int24' },
          { name: 'liquidityDelta', internalType: 'int256', type: 'int256' },
        ],
      },
      { name: '', internalType: 'BalanceDelta', type: 'int256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'afterModifyPosition',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      {
        name: '',
        internalType: 'struct PoolKey',
        type: 'tuple',
        components: [
          { name: 'currency0', internalType: 'Currency', type: 'address' },
          { name: 'currency1', internalType: 'Currency', type: 'address' },
          { name: 'fee', internalType: 'uint24', type: 'uint24' },
          { name: 'tickSpacing', internalType: 'int24', type: 'int24' },
          { name: 'hooks', internalType: 'contract IHooks', type: 'address' },
        ],
      },
      {
        name: '',
        internalType: 'struct IPoolManager.SwapParams',
        type: 'tuple',
        components: [
          { name: 'zeroForOne', internalType: 'bool', type: 'bool' },
          { name: 'amountSpecified', internalType: 'int256', type: 'int256' },
          {
            name: 'sqrtPriceLimitX96',
            internalType: 'uint160',
            type: 'uint160',
          },
        ],
      },
      { name: '', internalType: 'BalanceDelta', type: 'int256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'afterSwap',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      {
        name: '',
        internalType: 'struct PoolKey',
        type: 'tuple',
        components: [
          { name: 'currency0', internalType: 'Currency', type: 'address' },
          { name: 'currency1', internalType: 'Currency', type: 'address' },
          { name: 'fee', internalType: 'uint24', type: 'uint24' },
          { name: 'tickSpacing', internalType: 'int24', type: 'int24' },
          { name: 'hooks', internalType: 'contract IHooks', type: 'address' },
        ],
      },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'beforeDonate',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      {
        name: '',
        internalType: 'struct PoolKey',
        type: 'tuple',
        components: [
          { name: 'currency0', internalType: 'Currency', type: 'address' },
          { name: 'currency1', internalType: 'Currency', type: 'address' },
          { name: 'fee', internalType: 'uint24', type: 'uint24' },
          { name: 'tickSpacing', internalType: 'int24', type: 'int24' },
          { name: 'hooks', internalType: 'contract IHooks', type: 'address' },
        ],
      },
      { name: '', internalType: 'uint160', type: 'uint160' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'beforeInitialize',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      {
        name: '',
        internalType: 'struct PoolKey',
        type: 'tuple',
        components: [
          { name: 'currency0', internalType: 'Currency', type: 'address' },
          { name: 'currency1', internalType: 'Currency', type: 'address' },
          { name: 'fee', internalType: 'uint24', type: 'uint24' },
          { name: 'tickSpacing', internalType: 'int24', type: 'int24' },
          { name: 'hooks', internalType: 'contract IHooks', type: 'address' },
        ],
      },
      {
        name: '',
        internalType: 'struct IPoolManager.ModifyPositionParams',
        type: 'tuple',
        components: [
          { name: 'tickLower', internalType: 'int24', type: 'int24' },
          { name: 'tickUpper', internalType: 'int24', type: 'int24' },
          { name: 'liquidityDelta', internalType: 'int256', type: 'int256' },
        ],
      },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'beforeModifyPosition',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      {
        name: '',
        internalType: 'struct PoolKey',
        type: 'tuple',
        components: [
          { name: 'currency0', internalType: 'Currency', type: 'address' },
          { name: 'currency1', internalType: 'Currency', type: 'address' },
          { name: 'fee', internalType: 'uint24', type: 'uint24' },
          { name: 'tickSpacing', internalType: 'int24', type: 'int24' },
          { name: 'hooks', internalType: 'contract IHooks', type: 'address' },
        ],
      },
      {
        name: '',
        internalType: 'struct IPoolManager.SwapParams',
        type: 'tuple',
        components: [
          { name: 'zeroForOne', internalType: 'bool', type: 'bool' },
          { name: 'amountSpecified', internalType: 'int256', type: 'int256' },
          {
            name: 'sqrtPriceLimitX96',
            internalType: 'uint160',
            type: 'uint160',
          },
        ],
      },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'beforeSwap',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [],
    name: 'getHooksCalls',
    outputs: [
      {
        name: '',
        internalType: 'struct Hooks.Calls',
        type: 'tuple',
        components: [
          { name: 'beforeInitialize', internalType: 'bool', type: 'bool' },
          { name: 'afterInitialize', internalType: 'bool', type: 'bool' },
          { name: 'beforeModifyPosition', internalType: 'bool', type: 'bool' },
          { name: 'afterModifyPosition', internalType: 'bool', type: 'bool' },
          { name: 'beforeSwap', internalType: 'bool', type: 'bool' },
          { name: 'afterSwap', internalType: 'bool', type: 'bool' },
          { name: 'beforeDonate', internalType: 'bool', type: 'bool' },
          { name: 'afterDonate', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes', type: 'bytes' }],
    name: 'lockAcquired',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'poolManager',
    outputs: [
      { name: '', internalType: 'contract IPoolManager', type: 'address' },
    ],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CurrencyLibrary
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const currencyLibraryABI = [
  { type: 'error', inputs: [], name: 'ERC20TransferFailed' },
  { type: 'error', inputs: [], name: 'NativeTransferFailed' },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'NATIVE',
    outputs: [{ name: '', internalType: 'Currency', type: 'address' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC1155
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc1155ABI = [
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC1155InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidApprover',
  },
  {
    type: 'error',
    inputs: [
      { name: 'idsLength', internalType: 'uint256', type: 'uint256' },
      { name: 'valuesLength', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC1155InvalidArrayLength',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidOperator',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidSender',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC1155MissingApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
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
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'ids',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
      {
        name: 'values',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    name: 'TransferBatch',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TransferSingle',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'value', internalType: 'string', type: 'string', indexed: false },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'URI',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'accounts', internalType: 'address[]', type: 'address[]' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'balanceOfBatch',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'values', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeBatchTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
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
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'uri',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC165
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc165ABI = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

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
// FeeLibrary
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const feeLibraryABI = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'DYNAMIC_FEE_FLAG',
    outputs: [{ name: '', internalType: 'uint24', type: 'uint24' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'HOOK_SWAP_FEE_FLAG',
    outputs: [{ name: '', internalType: 'uint24', type: 'uint24' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'HOOK_WITHDRAW_FEE_FLAG',
    outputs: [{ name: '', internalType: 'uint24', type: 'uint24' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'STATIC_FEE_MASK',
    outputs: [{ name: '', internalType: 'uint24', type: 'uint24' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Fees
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const feesABI = [
  { type: 'error', inputs: [], name: 'ERC20TransferFailed' },
  { type: 'error', inputs: [], name: 'FeeTooLarge' },
  { type: 'error', inputs: [], name: 'InvalidCaller' },
  { type: 'error', inputs: [], name: 'NativeTransferFailed' },
  { type: 'error', inputs: [], name: 'ProtocolFeeCannotBeFetched' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'oldOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnerChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'protocolFeeController',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'ProtocolFeeControllerUpdated',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MIN_PROTOCOL_FEE_DENOMINATOR',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'currency', internalType: 'Currency', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'collectHookFees',
    outputs: [
      { name: 'amountCollected', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'currency', internalType: 'Currency', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'collectProtocolFees',
    outputs: [
      { name: 'amountCollected', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'hookAddress', internalType: 'address', type: 'address' },
      { name: 'currency', internalType: 'Currency', type: 'address' },
    ],
    name: 'hookFeesAccrued',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'protocolFeeController',
    outputs: [
      {
        name: '',
        internalType: 'contract IProtocolFeeController',
        type: 'address',
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'currency', internalType: 'Currency', type: 'address' }],
    name: 'protocolFeesAccrued',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_owner', internalType: 'address', type: 'address' }],
    name: 'setOwner',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'controller',
        internalType: 'contract IProtocolFeeController',
        type: 'address',
      },
    ],
    name: 'setProtocolFeeController',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Hooks
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const hooksABI = [
  {
    type: 'error',
    inputs: [{ name: 'hooks', internalType: 'address', type: 'address' }],
    name: 'HookAddressNotValid',
  },
  { type: 'error', inputs: [], name: 'InvalidHookResponse' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IDynamicFeeManager
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iDynamicFeeManagerABI = [
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      {
        name: 'key',
        internalType: 'struct PoolKey',
        type: 'tuple',
        components: [
          { name: 'currency0', internalType: 'Currency', type: 'address' },
          { name: 'currency1', internalType: 'Currency', type: 'address' },
          { name: 'fee', internalType: 'uint24', type: 'uint24' },
          { name: 'tickSpacing', internalType: 'int24', type: 'int24' },
          { name: 'hooks', internalType: 'contract IHooks', type: 'address' },
        ],
      },
      {
        name: 'params',
        internalType: 'struct IPoolManager.SwapParams',
        type: 'tuple',
        components: [
          { name: 'zeroForOne', internalType: 'bool', type: 'bool' },
          { name: 'amountSpecified', internalType: 'int256', type: 'int256' },
          {
            name: 'sqrtPriceLimitX96',
            internalType: 'uint160',
            type: 'uint160',
          },
        ],
      },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'getFee',
    outputs: [{ name: '', internalType: 'uint24', type: 'uint24' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC1155
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc1155ABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
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
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'ids',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
      {
        name: 'values',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    name: 'TransferBatch',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TransferSingle',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'value', internalType: 'string', type: 'string', indexed: false },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'URI',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'accounts', internalType: 'address[]', type: 'address[]' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'balanceOfBatch',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'values', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeBatchTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
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
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC1155Errors
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc1155ErrorsABI = [
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC1155InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidApprover',
  },
  {
    type: 'error',
    inputs: [
      { name: 'idsLength', internalType: 'uint256', type: 'uint256' },
      { name: 'valuesLength', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC1155InvalidArrayLength',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidOperator',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidSender',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC1155MissingApprovalForAll',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC1155MetadataURI
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc1155MetadataUriABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
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
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'ids',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
      {
        name: 'values',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    name: 'TransferBatch',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TransferSingle',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'value', internalType: 'string', type: 'string', indexed: false },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'URI',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'accounts', internalType: 'address[]', type: 'address[]' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'balanceOfBatch',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'values', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeBatchTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
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
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'uri',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC1155Receiver
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc1155ReceiverABI = [
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'values', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155BatchReceived',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC165
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc165ABI = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20Errors
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20ErrorsABI = [
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC20Minimal
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc20MinimalABI = [
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
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721Errors
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc721ErrorsABI = [
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC721IncorrectOwner',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC721InsufficientApproval',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOperator',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ERC721NonexistentToken',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IFees
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iFeesABI = [
  { type: 'error', inputs: [], name: 'FeeTooLarge' },
  { type: 'error', inputs: [], name: 'ProtocolFeeCannotBeFetched' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'protocolFeeController',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'ProtocolFeeControllerUpdated',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MIN_PROTOCOL_FEE_DENOMINATOR',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'Currency', type: 'address' },
    ],
    name: 'hookFeesAccrued',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'Currency', type: 'address' }],
    name: 'protocolFeesAccrued',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IHookFeeManager
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iHookFeeManagerABI = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      {
        name: 'key',
        internalType: 'struct PoolKey',
        type: 'tuple',
        components: [
          { name: 'currency0', internalType: 'Currency', type: 'address' },
          { name: 'currency1', internalType: 'Currency', type: 'address' },
          { name: 'fee', internalType: 'uint24', type: 'uint24' },
          { name: 'tickSpacing', internalType: 'int24', type: 'int24' },
          { name: 'hooks', internalType: 'contract IHooks', type: 'address' },
        ],
      },
    ],
    name: 'getHookFees',
    outputs: [{ name: '', internalType: 'uint24', type: 'uint24' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IHooks
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iHooksABI = [
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      {
        name: 'key',
        internalType: 'struct PoolKey',
        type: 'tuple',
        components: [
          { name: 'currency0', internalType: 'Currency', type: 'address' },
          { name: 'currency1', internalType: 'Currency', type: 'address' },
          { name: 'fee', internalType: 'uint24', type: 'uint24' },
          { name: 'tickSpacing', internalType: 'int24', type: 'int24' },
          { name: 'hooks', internalType: 'contract IHooks', type: 'address' },
        ],
      },
      { name: 'amount0', internalType: 'uint256', type: 'uint256' },
      { name: 'amount1', internalType: 'uint256', type: 'uint256' },
      { name: 'hookData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'afterDonate',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      {
        name: 'key',
        internalType: 'struct PoolKey',
        type: 'tuple',
        components: [
          { name: 'currency0', internalType: 'Currency', type: 'address' },
          { name: 'currency1', internalType: 'Currency', type: 'address' },
          { name: 'fee', internalType: 'uint24', type: 'uint24' },
          { name: 'tickSpacing', internalType: 'int24', type: 'int24' },
          { name: 'hooks', internalType: 'contract IHooks', type: 'address' },
        ],
      },
      { name: 'sqrtPriceX96', internalType: 'uint160', type: 'uint160' },
      { name: 'tick', internalType: 'int24', type: 'int24' },
      { name: 'hookData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'afterInitialize',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      {
        name: 'key',
        internalType: 'struct PoolKey',
        type: 'tuple',
        components: [
          { name: 'currency0', internalType: 'Currency', type: 'address' },
          { name: 'currency1', internalType: 'Currency', type: 'address' },
          { name: 'fee', internalType: 'uint24', type: 'uint24' },
          { name: 'tickSpacing', internalType: 'int24', type: 'int24' },
          { name: 'hooks', internalType: 'contract IHooks', type: 'address' },
        ],
      },
      {
        name: 'params',
        internalType: 'struct IPoolManager.ModifyPositionParams',
        type: 'tuple',
        components: [
          { name: 'tickLower', internalType: 'int24', type: 'int24' },
          { name: 'tickUpper', internalType: 'int24', type: 'int24' },
          { name: 'liquidityDelta', internalType: 'int256', type: 'int256' },
        ],
      },
      { name: 'delta', internalType: 'BalanceDelta', type: 'int256' },
      { name: 'hookData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'afterModifyPosition',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      {
        name: 'key',
        internalType: 'struct PoolKey',
        type: 'tuple',
        components: [
          { name: 'currency0', internalType: 'Currency', type: 'address' },
          { name: 'currency1', internalType: 'Currency', type: 'address' },
          { name: 'fee', internalType: 'uint24', type: 'uint24' },
          { name: 'tickSpacing', internalType: 'int24', type: 'int24' },
          { name: 'hooks', internalType: 'contract IHooks', type: 'address' },
        ],
      },
      {
        name: 'params',
        internalType: 'struct IPoolManager.SwapParams',
        type: 'tuple',
        components: [
          { name: 'zeroForOne', internalType: 'bool', type: 'bool' },
          { name: 'amountSpecified', internalType: 'int256', type: 'int256' },
          {
            name: 'sqrtPriceLimitX96',
            internalType: 'uint160',
            type: 'uint160',
          },
        ],
      },
      { name: 'delta', internalType: 'BalanceDelta', type: 'int256' },
      { name: 'hookData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'afterSwap',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      {
        name: 'key',
        internalType: 'struct PoolKey',
        type: 'tuple',
        components: [
          { name: 'currency0', internalType: 'Currency', type: 'address' },
          { name: 'currency1', internalType: 'Currency', type: 'address' },
          { name: 'fee', internalType: 'uint24', type: 'uint24' },
          { name: 'tickSpacing', internalType: 'int24', type: 'int24' },
          { name: 'hooks', internalType: 'contract IHooks', type: 'address' },
        ],
      },
      { name: 'amount0', internalType: 'uint256', type: 'uint256' },
      { name: 'amount1', internalType: 'uint256', type: 'uint256' },
      { name: 'hookData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'beforeDonate',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      {
        name: 'key',
        internalType: 'struct PoolKey',
        type: 'tuple',
        components: [
          { name: 'currency0', internalType: 'Currency', type: 'address' },
          { name: 'currency1', internalType: 'Currency', type: 'address' },
          { name: 'fee', internalType: 'uint24', type: 'uint24' },
          { name: 'tickSpacing', internalType: 'int24', type: 'int24' },
          { name: 'hooks', internalType: 'contract IHooks', type: 'address' },
        ],
      },
      { name: 'sqrtPriceX96', internalType: 'uint160', type: 'uint160' },
      { name: 'hookData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'beforeInitialize',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      {
        name: 'key',
        internalType: 'struct PoolKey',
        type: 'tuple',
        components: [
          { name: 'currency0', internalType: 'Currency', type: 'address' },
          { name: 'currency1', internalType: 'Currency', type: 'address' },
          { name: 'fee', internalType: 'uint24', type: 'uint24' },
          { name: 'tickSpacing', internalType: 'int24', type: 'int24' },
          { name: 'hooks', internalType: 'contract IHooks', type: 'address' },
        ],
      },
      {
        name: 'params',
        internalType: 'struct IPoolManager.ModifyPositionParams',
        type: 'tuple',
        components: [
          { name: 'tickLower', internalType: 'int24', type: 'int24' },
          { name: 'tickUpper', internalType: 'int24', type: 'int24' },
          { name: 'liquidityDelta', internalType: 'int256', type: 'int256' },
        ],
      },
      { name: 'hookData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'beforeModifyPosition',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      {
        name: 'key',
        internalType: 'struct PoolKey',
        type: 'tuple',
        components: [
          { name: 'currency0', internalType: 'Currency', type: 'address' },
          { name: 'currency1', internalType: 'Currency', type: 'address' },
          { name: 'fee', internalType: 'uint24', type: 'uint24' },
          { name: 'tickSpacing', internalType: 'int24', type: 'int24' },
          { name: 'hooks', internalType: 'contract IHooks', type: 'address' },
        ],
      },
      {
        name: 'params',
        internalType: 'struct IPoolManager.SwapParams',
        type: 'tuple',
        components: [
          { name: 'zeroForOne', internalType: 'bool', type: 'bool' },
          { name: 'amountSpecified', internalType: 'int256', type: 'int256' },
          {
            name: 'sqrtPriceLimitX96',
            internalType: 'uint160',
            type: 'uint160',
          },
        ],
      },
      { name: 'hookData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'beforeSwap',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ILockCallback
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iLockCallbackABI = [
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes', type: 'bytes' }],
    name: 'lockAcquired',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
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
// IPoolManager
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iPoolManagerABI = [
  { type: 'error', inputs: [], name: 'CurrenciesInitializedOutOfOrder' },
  { type: 'error', inputs: [], name: 'CurrencyNotSettled' },
  { type: 'error', inputs: [], name: 'FeeTooLarge' },
  {
    type: 'error',
    inputs: [{ name: 'locker', internalType: 'address', type: 'address' }],
    name: 'LockedBy',
  },
  { type: 'error', inputs: [], name: 'MaxCurrenciesTouched' },
  { type: 'error', inputs: [], name: 'NotPoolManagerToken' },
  { type: 'error', inputs: [], name: 'ProtocolFeeCannotBeFetched' },
  { type: 'error', inputs: [], name: 'TickSpacingTooLarge' },
  { type: 'error', inputs: [], name: 'TickSpacingTooSmall' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
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
      { name: 'id', internalType: 'PoolId', type: 'bytes32', indexed: true },
      {
        name: 'hookFees',
        internalType: 'uint24',
        type: 'uint24',
        indexed: false,
      },
    ],
    name: 'HookFeeUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'id', internalType: 'PoolId', type: 'bytes32', indexed: true },
      {
        name: 'currency0',
        internalType: 'Currency',
        type: 'address',
        indexed: true,
      },
      {
        name: 'currency1',
        internalType: 'Currency',
        type: 'address',
        indexed: true,
      },
      { name: 'fee', internalType: 'uint24', type: 'uint24', indexed: false },
      {
        name: 'tickSpacing',
        internalType: 'int24',
        type: 'int24',
        indexed: false,
      },
      {
        name: 'hooks',
        internalType: 'contract IHooks',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Initialize',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'id', internalType: 'PoolId', type: 'bytes32', indexed: true },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tickLower',
        internalType: 'int24',
        type: 'int24',
        indexed: false,
      },
      {
        name: 'tickUpper',
        internalType: 'int24',
        type: 'int24',
        indexed: false,
      },
      {
        name: 'liquidityDelta',
        internalType: 'int256',
        type: 'int256',
        indexed: false,
      },
    ],
    name: 'ModifyPosition',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'protocolFeeController',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'ProtocolFeeControllerUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'id', internalType: 'PoolId', type: 'bytes32', indexed: true },
      {
        name: 'protocolFees',
        internalType: 'uint24',
        type: 'uint24',
        indexed: false,
      },
    ],
    name: 'ProtocolFeeUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'id', internalType: 'PoolId', type: 'bytes32', indexed: true },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount0',
        internalType: 'int128',
        type: 'int128',
        indexed: false,
      },
      {
        name: 'amount1',
        internalType: 'int128',
        type: 'int128',
        indexed: false,
      },
      {
        name: 'sqrtPriceX96',
        internalType: 'uint160',
        type: 'uint160',
        indexed: false,
      },
      {
        name: 'liquidity',
        internalType: 'uint128',
        type: 'uint128',
        indexed: false,
      },
      { name: 'tick', internalType: 'int24', type: 'int24', indexed: false },
      { name: 'fee', internalType: 'uint24', type: 'uint24', indexed: false },
    ],
    name: 'Swap',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'ids',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
      {
        name: 'values',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    name: 'TransferBatch',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TransferSingle',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'value', internalType: 'string', type: 'string', indexed: false },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'URI',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MAX_TICK_SPACING',
    outputs: [{ name: '', internalType: 'int24', type: 'int24' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MIN_PROTOCOL_FEE_DENOMINATOR',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MIN_TICK_SPACING',
    outputs: [{ name: '', internalType: 'int24', type: 'int24' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'accounts', internalType: 'address[]', type: 'address[]' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'balanceOfBatch',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'locker', internalType: 'address', type: 'address' },
      { name: 'currency', internalType: 'Currency', type: 'address' },
    ],
    name: 'currencyDelta',
    outputs: [{ name: '', internalType: 'int256', type: 'int256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'key',
        internalType: 'struct PoolKey',
        type: 'tuple',
        components: [
          { name: 'currency0', internalType: 'Currency', type: 'address' },
          { name: 'currency1', internalType: 'Currency', type: 'address' },
          { name: 'fee', internalType: 'uint24', type: 'uint24' },
          { name: 'tickSpacing', internalType: 'int24', type: 'int24' },
          { name: 'hooks', internalType: 'contract IHooks', type: 'address' },
        ],
      },
      { name: 'amount0', internalType: 'uint256', type: 'uint256' },
      { name: 'amount1', internalType: 'uint256', type: 'uint256' },
      { name: 'hookData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'donate',
    outputs: [{ name: '', internalType: 'BalanceDelta', type: 'int256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'slot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'extsload',
    outputs: [{ name: 'value', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'slot', internalType: 'bytes32', type: 'bytes32' },
      { name: 'nSlots', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'extsload',
    outputs: [{ name: 'value', internalType: 'bytes', type: 'bytes' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'id', internalType: 'PoolId', type: 'bytes32' },
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'tickLower', internalType: 'int24', type: 'int24' },
      { name: 'tickUpper', internalType: 'int24', type: 'int24' },
    ],
    name: 'getLiquidity',
    outputs: [{ name: 'liquidity', internalType: 'uint128', type: 'uint128' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'id', internalType: 'PoolId', type: 'bytes32' }],
    name: 'getLiquidity',
    outputs: [{ name: 'liquidity', internalType: 'uint128', type: 'uint128' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'i', internalType: 'uint256', type: 'uint256' }],
    name: 'getLock',
    outputs: [{ name: 'locker', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'id', internalType: 'PoolId', type: 'bytes32' },
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'tickLower', internalType: 'int24', type: 'int24' },
      { name: 'tickUpper', internalType: 'int24', type: 'int24' },
    ],
    name: 'getPosition',
    outputs: [
      {
        name: 'position',
        internalType: 'struct Position.Info',
        type: 'tuple',
        components: [
          { name: 'liquidity', internalType: 'uint128', type: 'uint128' },
          {
            name: 'feeGrowthInside0LastX128',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'feeGrowthInside1LastX128',
            internalType: 'uint256',
            type: 'uint256',
          },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'id', internalType: 'PoolId', type: 'bytes32' }],
    name: 'getSlot0',
    outputs: [
      { name: 'sqrtPriceX96', internalType: 'uint160', type: 'uint160' },
      { name: 'tick', internalType: 'int24', type: 'int24' },
      { name: 'protocolFees', internalType: 'uint24', type: 'uint24' },
      { name: 'hookFees', internalType: 'uint24', type: 'uint24' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'Currency', type: 'address' },
    ],
    name: 'hookFeesAccrued',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'key',
        internalType: 'struct PoolKey',
        type: 'tuple',
        components: [
          { name: 'currency0', internalType: 'Currency', type: 'address' },
          { name: 'currency1', internalType: 'Currency', type: 'address' },
          { name: 'fee', internalType: 'uint24', type: 'uint24' },
          { name: 'tickSpacing', internalType: 'int24', type: 'int24' },
          { name: 'hooks', internalType: 'contract IHooks', type: 'address' },
        ],
      },
      { name: 'sqrtPriceX96', internalType: 'uint160', type: 'uint160' },
      { name: 'hookData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'initialize',
    outputs: [{ name: 'tick', internalType: 'int24', type: 'int24' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes', type: 'bytes' }],
    name: 'lock',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'lockData',
    outputs: [
      { name: 'length', internalType: 'uint128', type: 'uint128' },
      { name: 'nonzeroDeltaCount', internalType: 'uint128', type: 'uint128' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'Currency', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'key',
        internalType: 'struct PoolKey',
        type: 'tuple',
        components: [
          { name: 'currency0', internalType: 'Currency', type: 'address' },
          { name: 'currency1', internalType: 'Currency', type: 'address' },
          { name: 'fee', internalType: 'uint24', type: 'uint24' },
          { name: 'tickSpacing', internalType: 'int24', type: 'int24' },
          { name: 'hooks', internalType: 'contract IHooks', type: 'address' },
        ],
      },
      {
        name: 'params',
        internalType: 'struct IPoolManager.ModifyPositionParams',
        type: 'tuple',
        components: [
          { name: 'tickLower', internalType: 'int24', type: 'int24' },
          { name: 'tickUpper', internalType: 'int24', type: 'int24' },
          { name: 'liquidityDelta', internalType: 'int256', type: 'int256' },
        ],
      },
      { name: 'hookData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'modifyPosition',
    outputs: [{ name: '', internalType: 'BalanceDelta', type: 'int256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'Currency', type: 'address' }],
    name: 'protocolFeesAccrued',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'currency', internalType: 'Currency', type: 'address' }],
    name: 'reservesOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'values', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeBatchTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
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
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'key',
        internalType: 'struct PoolKey',
        type: 'tuple',
        components: [
          { name: 'currency0', internalType: 'Currency', type: 'address' },
          { name: 'currency1', internalType: 'Currency', type: 'address' },
          { name: 'fee', internalType: 'uint24', type: 'uint24' },
          { name: 'tickSpacing', internalType: 'int24', type: 'int24' },
          { name: 'hooks', internalType: 'contract IHooks', type: 'address' },
        ],
      },
    ],
    name: 'setHookFees',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'key',
        internalType: 'struct PoolKey',
        type: 'tuple',
        components: [
          { name: 'currency0', internalType: 'Currency', type: 'address' },
          { name: 'currency1', internalType: 'Currency', type: 'address' },
          { name: 'fee', internalType: 'uint24', type: 'uint24' },
          { name: 'tickSpacing', internalType: 'int24', type: 'int24' },
          { name: 'hooks', internalType: 'contract IHooks', type: 'address' },
        ],
      },
    ],
    name: 'setProtocolFees',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [{ name: 'token', internalType: 'Currency', type: 'address' }],
    name: 'settle',
    outputs: [{ name: 'paid', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'key',
        internalType: 'struct PoolKey',
        type: 'tuple',
        components: [
          { name: 'currency0', internalType: 'Currency', type: 'address' },
          { name: 'currency1', internalType: 'Currency', type: 'address' },
          { name: 'fee', internalType: 'uint24', type: 'uint24' },
          { name: 'tickSpacing', internalType: 'int24', type: 'int24' },
          { name: 'hooks', internalType: 'contract IHooks', type: 'address' },
        ],
      },
      {
        name: 'params',
        internalType: 'struct IPoolManager.SwapParams',
        type: 'tuple',
        components: [
          { name: 'zeroForOne', internalType: 'bool', type: 'bool' },
          { name: 'amountSpecified', internalType: 'int256', type: 'int256' },
          {
            name: 'sqrtPriceLimitX96',
            internalType: 'uint160',
            type: 'uint160',
          },
        ],
      },
      { name: 'hookData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'swap',
    outputs: [{ name: '', internalType: 'BalanceDelta', type: 'int256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'currency', internalType: 'Currency', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'take',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IProtocolFeeController
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iProtocolFeeControllerABI = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      {
        name: 'poolKey',
        internalType: 'struct PoolKey',
        type: 'tuple',
        components: [
          { name: 'currency0', internalType: 'Currency', type: 'address' },
          { name: 'currency1', internalType: 'Currency', type: 'address' },
          { name: 'fee', internalType: 'uint24', type: 'uint24' },
          { name: 'tickSpacing', internalType: 'int24', type: 'int24' },
          { name: 'hooks', internalType: 'contract IHooks', type: 'address' },
        ],
      },
    ],
    name: 'protocolFeesForPool',
    outputs: [{ name: '', internalType: 'uint24', type: 'uint24' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Math
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const mathABI = [
  { type: 'error', inputs: [], name: 'MathOverflowedMulDiv' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MultiEdition721
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
    stateMutability: 'payable',
    type: 'function',
    inputs: [{ name: 'quantity', internalType: 'uint256', type: 'uint256' }],
    name: 'mintBatch',
    outputs: [],
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// NoDelegateCall
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const noDelegateCallABI = [
  { type: 'error', inputs: [], name: 'DelegateCallNotAllowed' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Owned
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ownedABI = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
  { type: 'error', inputs: [], name: 'InvalidCaller' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'oldOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnerChanged',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_owner', internalType: 'address', type: 'address' }],
    name: 'setOwner',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Pool
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const poolABI = [
  { type: 'error', inputs: [], name: 'NoLiquidityToReceiveFees' },
  { type: 'error', inputs: [], name: 'PoolAlreadyInitialized' },
  { type: 'error', inputs: [], name: 'PoolNotInitialized' },
  {
    type: 'error',
    inputs: [
      { name: 'sqrtPriceCurrentX96', internalType: 'uint160', type: 'uint160' },
      { name: 'sqrtPriceLimitX96', internalType: 'uint160', type: 'uint160' },
    ],
    name: 'PriceLimitAlreadyExceeded',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sqrtPriceLimitX96', internalType: 'uint160', type: 'uint160' },
    ],
    name: 'PriceLimitOutOfBounds',
  },
  { type: 'error', inputs: [], name: 'SwapAmountCannotBeZero' },
  {
    type: 'error',
    inputs: [{ name: 'tick', internalType: 'int24', type: 'int24' }],
    name: 'TickLiquidityOverflow',
  },
  {
    type: 'error',
    inputs: [{ name: 'tickLower', internalType: 'int24', type: 'int24' }],
    name: 'TickLowerOutOfBounds',
  },
  {
    type: 'error',
    inputs: [{ name: 'tick', internalType: 'int24', type: 'int24' }],
    name: 'TickNotInitialized',
  },
  {
    type: 'error',
    inputs: [{ name: 'tickUpper', internalType: 'int24', type: 'int24' }],
    name: 'TickUpperOutOfBounds',
  },
  {
    type: 'error',
    inputs: [
      { name: 'tickLower', internalType: 'int24', type: 'int24' },
      { name: 'tickUpper', internalType: 'int24', type: 'int24' },
    ],
    name: 'TicksMisordered',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PoolManager
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const poolManagerABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: 'controllerGasLimit', internalType: 'uint256', type: 'uint256' },
    ],
  },
  { type: 'error', inputs: [], name: 'CannotUpdateEmptyPosition' },
  { type: 'error', inputs: [], name: 'CurrenciesInitializedOutOfOrder' },
  { type: 'error', inputs: [], name: 'CurrencyNotSettled' },
  { type: 'error', inputs: [], name: 'DelegateCallNotAllowed' },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC1155InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidApprover',
  },
  {
    type: 'error',
    inputs: [
      { name: 'idsLength', internalType: 'uint256', type: 'uint256' },
      { name: 'valuesLength', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC1155InvalidArrayLength',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidOperator',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidSender',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC1155MissingApprovalForAll',
  },
  { type: 'error', inputs: [], name: 'ERC20TransferFailed' },
  { type: 'error', inputs: [], name: 'FeeTooLarge' },
  {
    type: 'error',
    inputs: [{ name: 'hooks', internalType: 'address', type: 'address' }],
    name: 'HookAddressNotValid',
  },
  { type: 'error', inputs: [], name: 'InvalidCaller' },
  { type: 'error', inputs: [], name: 'InvalidHookResponse' },
  { type: 'error', inputs: [], name: 'InvalidSqrtRatio' },
  { type: 'error', inputs: [], name: 'InvalidTick' },
  {
    type: 'error',
    inputs: [{ name: 'locker', internalType: 'address', type: 'address' }],
    name: 'LockedBy',
  },
  { type: 'error', inputs: [], name: 'MaxCurrenciesTouched' },
  { type: 'error', inputs: [], name: 'NativeTransferFailed' },
  { type: 'error', inputs: [], name: 'NoLiquidityToReceiveFees' },
  { type: 'error', inputs: [], name: 'NotPoolManagerToken' },
  { type: 'error', inputs: [], name: 'PoolAlreadyInitialized' },
  { type: 'error', inputs: [], name: 'PoolNotInitialized' },
  {
    type: 'error',
    inputs: [
      { name: 'sqrtPriceCurrentX96', internalType: 'uint160', type: 'uint160' },
      { name: 'sqrtPriceLimitX96', internalType: 'uint160', type: 'uint160' },
    ],
    name: 'PriceLimitAlreadyExceeded',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sqrtPriceLimitX96', internalType: 'uint160', type: 'uint160' },
    ],
    name: 'PriceLimitOutOfBounds',
  },
  { type: 'error', inputs: [], name: 'ProtocolFeeCannotBeFetched' },
  { type: 'error', inputs: [], name: 'SwapAmountCannotBeZero' },
  {
    type: 'error',
    inputs: [{ name: 'tick', internalType: 'int24', type: 'int24' }],
    name: 'TickLiquidityOverflow',
  },
  {
    type: 'error',
    inputs: [{ name: 'tickLower', internalType: 'int24', type: 'int24' }],
    name: 'TickLowerOutOfBounds',
  },
  {
    type: 'error',
    inputs: [
      { name: 'tick', internalType: 'int24', type: 'int24' },
      { name: 'tickSpacing', internalType: 'int24', type: 'int24' },
    ],
    name: 'TickMisaligned',
  },
  { type: 'error', inputs: [], name: 'TickSpacingTooLarge' },
  { type: 'error', inputs: [], name: 'TickSpacingTooSmall' },
  {
    type: 'error',
    inputs: [{ name: 'tickUpper', internalType: 'int24', type: 'int24' }],
    name: 'TickUpperOutOfBounds',
  },
  {
    type: 'error',
    inputs: [
      { name: 'tickLower', internalType: 'int24', type: 'int24' },
      { name: 'tickUpper', internalType: 'int24', type: 'int24' },
    ],
    name: 'TicksMisordered',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
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
      { name: 'id', internalType: 'PoolId', type: 'bytes32', indexed: true },
      {
        name: 'hookFees',
        internalType: 'uint24',
        type: 'uint24',
        indexed: false,
      },
    ],
    name: 'HookFeeUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'id', internalType: 'PoolId', type: 'bytes32', indexed: true },
      {
        name: 'currency0',
        internalType: 'Currency',
        type: 'address',
        indexed: true,
      },
      {
        name: 'currency1',
        internalType: 'Currency',
        type: 'address',
        indexed: true,
      },
      { name: 'fee', internalType: 'uint24', type: 'uint24', indexed: false },
      {
        name: 'tickSpacing',
        internalType: 'int24',
        type: 'int24',
        indexed: false,
      },
      {
        name: 'hooks',
        internalType: 'contract IHooks',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Initialize',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'id', internalType: 'PoolId', type: 'bytes32', indexed: true },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tickLower',
        internalType: 'int24',
        type: 'int24',
        indexed: false,
      },
      {
        name: 'tickUpper',
        internalType: 'int24',
        type: 'int24',
        indexed: false,
      },
      {
        name: 'liquidityDelta',
        internalType: 'int256',
        type: 'int256',
        indexed: false,
      },
    ],
    name: 'ModifyPosition',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'oldOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnerChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'protocolFeeController',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'ProtocolFeeControllerUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'id', internalType: 'PoolId', type: 'bytes32', indexed: true },
      {
        name: 'protocolFees',
        internalType: 'uint24',
        type: 'uint24',
        indexed: false,
      },
    ],
    name: 'ProtocolFeeUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'id', internalType: 'PoolId', type: 'bytes32', indexed: true },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount0',
        internalType: 'int128',
        type: 'int128',
        indexed: false,
      },
      {
        name: 'amount1',
        internalType: 'int128',
        type: 'int128',
        indexed: false,
      },
      {
        name: 'sqrtPriceX96',
        internalType: 'uint160',
        type: 'uint160',
        indexed: false,
      },
      {
        name: 'liquidity',
        internalType: 'uint128',
        type: 'uint128',
        indexed: false,
      },
      { name: 'tick', internalType: 'int24', type: 'int24', indexed: false },
      { name: 'fee', internalType: 'uint24', type: 'uint24', indexed: false },
    ],
    name: 'Swap',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'ids',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
      {
        name: 'values',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    name: 'TransferBatch',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TransferSingle',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'value', internalType: 'string', type: 'string', indexed: false },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'URI',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MAX_TICK_SPACING',
    outputs: [{ name: '', internalType: 'int24', type: 'int24' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MIN_PROTOCOL_FEE_DENOMINATOR',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MIN_TICK_SPACING',
    outputs: [{ name: '', internalType: 'int24', type: 'int24' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'accounts', internalType: 'address[]', type: 'address[]' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'balanceOfBatch',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'currency', internalType: 'Currency', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'collectHookFees',
    outputs: [
      { name: 'amountCollected', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: 'currency', internalType: 'Currency', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'collectProtocolFees',
    outputs: [
      { name: 'amountCollected', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'locker', internalType: 'address', type: 'address' },
      { name: 'currency', internalType: 'Currency', type: 'address' },
    ],
    name: 'currencyDelta',
    outputs: [
      { name: 'currencyDelta', internalType: 'int256', type: 'int256' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'key',
        internalType: 'struct PoolKey',
        type: 'tuple',
        components: [
          { name: 'currency0', internalType: 'Currency', type: 'address' },
          { name: 'currency1', internalType: 'Currency', type: 'address' },
          { name: 'fee', internalType: 'uint24', type: 'uint24' },
          { name: 'tickSpacing', internalType: 'int24', type: 'int24' },
          { name: 'hooks', internalType: 'contract IHooks', type: 'address' },
        ],
      },
      { name: 'amount0', internalType: 'uint256', type: 'uint256' },
      { name: 'amount1', internalType: 'uint256', type: 'uint256' },
      { name: 'hookData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'donate',
    outputs: [{ name: 'delta', internalType: 'BalanceDelta', type: 'int256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'slot', internalType: 'bytes32', type: 'bytes32' }],
    name: 'extsload',
    outputs: [{ name: 'value', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'startSlot', internalType: 'bytes32', type: 'bytes32' },
      { name: 'nSlots', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'extsload',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'id', internalType: 'PoolId', type: 'bytes32' },
      { name: '_owner', internalType: 'address', type: 'address' },
      { name: 'tickLower', internalType: 'int24', type: 'int24' },
      { name: 'tickUpper', internalType: 'int24', type: 'int24' },
    ],
    name: 'getLiquidity',
    outputs: [{ name: 'liquidity', internalType: 'uint128', type: 'uint128' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'id', internalType: 'PoolId', type: 'bytes32' }],
    name: 'getLiquidity',
    outputs: [{ name: 'liquidity', internalType: 'uint128', type: 'uint128' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'i', internalType: 'uint256', type: 'uint256' }],
    name: 'getLock',
    outputs: [{ name: 'locker', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'id', internalType: 'PoolId', type: 'bytes32' },
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'tickLower', internalType: 'int24', type: 'int24' },
      { name: 'tickUpper', internalType: 'int24', type: 'int24' },
    ],
    name: 'getPosition',
    outputs: [
      {
        name: 'position',
        internalType: 'struct Position.Info',
        type: 'tuple',
        components: [
          { name: 'liquidity', internalType: 'uint128', type: 'uint128' },
          {
            name: 'feeGrowthInside0LastX128',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'feeGrowthInside1LastX128',
            internalType: 'uint256',
            type: 'uint256',
          },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'id', internalType: 'PoolId', type: 'bytes32' }],
    name: 'getSlot0',
    outputs: [
      { name: 'sqrtPriceX96', internalType: 'uint160', type: 'uint160' },
      { name: 'tick', internalType: 'int24', type: 'int24' },
      { name: 'protocolFees', internalType: 'uint24', type: 'uint24' },
      { name: 'hookFees', internalType: 'uint24', type: 'uint24' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'hookAddress', internalType: 'address', type: 'address' },
      { name: 'currency', internalType: 'Currency', type: 'address' },
    ],
    name: 'hookFeesAccrued',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'key',
        internalType: 'struct PoolKey',
        type: 'tuple',
        components: [
          { name: 'currency0', internalType: 'Currency', type: 'address' },
          { name: 'currency1', internalType: 'Currency', type: 'address' },
          { name: 'fee', internalType: 'uint24', type: 'uint24' },
          { name: 'tickSpacing', internalType: 'int24', type: 'int24' },
          { name: 'hooks', internalType: 'contract IHooks', type: 'address' },
        ],
      },
      { name: 'sqrtPriceX96', internalType: 'uint160', type: 'uint160' },
      { name: 'hookData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'initialize',
    outputs: [{ name: 'tick', internalType: 'int24', type: 'int24' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes', type: 'bytes' }],
    name: 'lock',
    outputs: [{ name: 'result', internalType: 'bytes', type: 'bytes' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'lockData',
    outputs: [
      { name: 'length', internalType: 'uint128', type: 'uint128' },
      { name: 'nonzeroDeltaCount', internalType: 'uint128', type: 'uint128' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'currency', internalType: 'Currency', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'key',
        internalType: 'struct PoolKey',
        type: 'tuple',
        components: [
          { name: 'currency0', internalType: 'Currency', type: 'address' },
          { name: 'currency1', internalType: 'Currency', type: 'address' },
          { name: 'fee', internalType: 'uint24', type: 'uint24' },
          { name: 'tickSpacing', internalType: 'int24', type: 'int24' },
          { name: 'hooks', internalType: 'contract IHooks', type: 'address' },
        ],
      },
      {
        name: 'params',
        internalType: 'struct IPoolManager.ModifyPositionParams',
        type: 'tuple',
        components: [
          { name: 'tickLower', internalType: 'int24', type: 'int24' },
          { name: 'tickUpper', internalType: 'int24', type: 'int24' },
          { name: 'liquidityDelta', internalType: 'int256', type: 'int256' },
        ],
      },
      { name: 'hookData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'modifyPosition',
    outputs: [{ name: 'delta', internalType: 'BalanceDelta', type: 'int256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'values', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155BatchReceived',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'id', internalType: 'PoolId', type: 'bytes32' }],
    name: 'pools',
    outputs: [
      {
        name: 'slot0',
        internalType: 'struct Pool.Slot0',
        type: 'tuple',
        components: [
          { name: 'sqrtPriceX96', internalType: 'uint160', type: 'uint160' },
          { name: 'tick', internalType: 'int24', type: 'int24' },
          { name: 'protocolFees', internalType: 'uint24', type: 'uint24' },
          { name: 'hookFees', internalType: 'uint24', type: 'uint24' },
        ],
      },
      {
        name: 'feeGrowthGlobal0X128',
        internalType: 'uint256',
        type: 'uint256',
      },
      {
        name: 'feeGrowthGlobal1X128',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: 'liquidity', internalType: 'uint128', type: 'uint128' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'protocolFeeController',
    outputs: [
      {
        name: '',
        internalType: 'contract IProtocolFeeController',
        type: 'address',
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'currency', internalType: 'Currency', type: 'address' }],
    name: 'protocolFeesAccrued',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'currency', internalType: 'Currency', type: 'address' }],
    name: 'reservesOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'values', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeBatchTransferFrom',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
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
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'key',
        internalType: 'struct PoolKey',
        type: 'tuple',
        components: [
          { name: 'currency0', internalType: 'Currency', type: 'address' },
          { name: 'currency1', internalType: 'Currency', type: 'address' },
          { name: 'fee', internalType: 'uint24', type: 'uint24' },
          { name: 'tickSpacing', internalType: 'int24', type: 'int24' },
          { name: 'hooks', internalType: 'contract IHooks', type: 'address' },
        ],
      },
    ],
    name: 'setHookFees',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_owner', internalType: 'address', type: 'address' }],
    name: 'setOwner',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'controller',
        internalType: 'contract IProtocolFeeController',
        type: 'address',
      },
    ],
    name: 'setProtocolFeeController',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'key',
        internalType: 'struct PoolKey',
        type: 'tuple',
        components: [
          { name: 'currency0', internalType: 'Currency', type: 'address' },
          { name: 'currency1', internalType: 'Currency', type: 'address' },
          { name: 'fee', internalType: 'uint24', type: 'uint24' },
          { name: 'tickSpacing', internalType: 'int24', type: 'int24' },
          { name: 'hooks', internalType: 'contract IHooks', type: 'address' },
        ],
      },
    ],
    name: 'setProtocolFees',
    outputs: [],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [{ name: 'currency', internalType: 'Currency', type: 'address' }],
    name: 'settle',
    outputs: [{ name: 'paid', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      {
        name: 'key',
        internalType: 'struct PoolKey',
        type: 'tuple',
        components: [
          { name: 'currency0', internalType: 'Currency', type: 'address' },
          { name: 'currency1', internalType: 'Currency', type: 'address' },
          { name: 'fee', internalType: 'uint24', type: 'uint24' },
          { name: 'tickSpacing', internalType: 'int24', type: 'int24' },
          { name: 'hooks', internalType: 'contract IHooks', type: 'address' },
        ],
      },
      {
        name: 'params',
        internalType: 'struct IPoolManager.SwapParams',
        type: 'tuple',
        components: [
          { name: 'zeroForOne', internalType: 'bool', type: 'bool' },
          { name: 'amountSpecified', internalType: 'int256', type: 'int256' },
          {
            name: 'sqrtPriceLimitX96',
            internalType: 'uint160',
            type: 'uint160',
          },
        ],
      },
      { name: 'hookData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'swap',
    outputs: [{ name: 'delta', internalType: 'BalanceDelta', type: 'int256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'currency', internalType: 'Currency', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'take',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'uri',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  { stateMutability: 'payable', type: 'receive' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Position
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const positionABI = [
  { type: 'error', inputs: [], name: 'CannotUpdateEmptyPosition' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TickBitmap
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const tickBitmapABI = [
  {
    type: 'error',
    inputs: [
      { name: 'tick', internalType: 'int24', type: 'int24' },
      { name: 'tickSpacing', internalType: 'int24', type: 'int24' },
    ],
    name: 'TickMisaligned',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TickMath
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const tickMathABI = [
  { type: 'error', inputs: [], name: 'InvalidSqrtRatio' },
  { type: 'error', inputs: [], name: 'InvalidTick' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// UniNftHook
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const uniNftHookABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: 'mgr', internalType: 'contract IPoolManager', type: 'address' },
      { name: 'fee', internalType: 'uint24', type: 'uint24' },
      { name: 'name_', internalType: 'string', type: 'string' },
      { name: 'symbol_', internalType: 'string', type: 'string' },
      { name: 'tokenUri', internalType: 'string', type: 'string' },
    ],
  },
  {
    type: 'error',
    inputs: [{ name: 'hooks', internalType: 'address', type: 'address' }],
    name: 'HookAddressNotValid',
  },
  { type: 'error', inputs: [], name: 'HookNotImplemented' },
  { type: 'error', inputs: [], name: 'InvalidPool' },
  { type: 'error', inputs: [], name: 'LockFailure' },
  { type: 'error', inputs: [], name: 'NotPoolManager' },
  { type: 'error', inputs: [], name: 'NotSelf' },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'NFT',
    outputs: [
      { name: '', internalType: 'contract UniNftToken', type: 'address' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      {
        name: '',
        internalType: 'struct PoolKey',
        type: 'tuple',
        components: [
          { name: 'currency0', internalType: 'Currency', type: 'address' },
          { name: 'currency1', internalType: 'Currency', type: 'address' },
          { name: 'fee', internalType: 'uint24', type: 'uint24' },
          { name: 'tickSpacing', internalType: 'int24', type: 'int24' },
          { name: 'hooks', internalType: 'contract IHooks', type: 'address' },
        ],
      },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'afterDonate',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      {
        name: '',
        internalType: 'struct PoolKey',
        type: 'tuple',
        components: [
          { name: 'currency0', internalType: 'Currency', type: 'address' },
          { name: 'currency1', internalType: 'Currency', type: 'address' },
          { name: 'fee', internalType: 'uint24', type: 'uint24' },
          { name: 'tickSpacing', internalType: 'int24', type: 'int24' },
          { name: 'hooks', internalType: 'contract IHooks', type: 'address' },
        ],
      },
      { name: '', internalType: 'uint160', type: 'uint160' },
      { name: '', internalType: 'int24', type: 'int24' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'afterInitialize',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      {
        name: 'key',
        internalType: 'struct PoolKey',
        type: 'tuple',
        components: [
          { name: 'currency0', internalType: 'Currency', type: 'address' },
          { name: 'currency1', internalType: 'Currency', type: 'address' },
          { name: 'fee', internalType: 'uint24', type: 'uint24' },
          { name: 'tickSpacing', internalType: 'int24', type: 'int24' },
          { name: 'hooks', internalType: 'contract IHooks', type: 'address' },
        ],
      },
      {
        name: 'params',
        internalType: 'struct IPoolManager.ModifyPositionParams',
        type: 'tuple',
        components: [
          { name: 'tickLower', internalType: 'int24', type: 'int24' },
          { name: 'tickUpper', internalType: 'int24', type: 'int24' },
          { name: 'liquidityDelta', internalType: 'int256', type: 'int256' },
        ],
      },
      { name: 'delta', internalType: 'BalanceDelta', type: 'int256' },
      { name: 'hookData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'afterModifyPosition',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      {
        name: 'key',
        internalType: 'struct PoolKey',
        type: 'tuple',
        components: [
          { name: 'currency0', internalType: 'Currency', type: 'address' },
          { name: 'currency1', internalType: 'Currency', type: 'address' },
          { name: 'fee', internalType: 'uint24', type: 'uint24' },
          { name: 'tickSpacing', internalType: 'int24', type: 'int24' },
          { name: 'hooks', internalType: 'contract IHooks', type: 'address' },
        ],
      },
      {
        name: 'params',
        internalType: 'struct IPoolManager.SwapParams',
        type: 'tuple',
        components: [
          { name: 'zeroForOne', internalType: 'bool', type: 'bool' },
          { name: 'amountSpecified', internalType: 'int256', type: 'int256' },
          {
            name: 'sqrtPriceLimitX96',
            internalType: 'uint160',
            type: 'uint160',
          },
        ],
      },
      { name: 'delta', internalType: 'BalanceDelta', type: 'int256' },
      { name: 'hookData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'afterSwap',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      {
        name: '',
        internalType: 'struct PoolKey',
        type: 'tuple',
        components: [
          { name: 'currency0', internalType: 'Currency', type: 'address' },
          { name: 'currency1', internalType: 'Currency', type: 'address' },
          { name: 'fee', internalType: 'uint24', type: 'uint24' },
          { name: 'tickSpacing', internalType: 'int24', type: 'int24' },
          { name: 'hooks', internalType: 'contract IHooks', type: 'address' },
        ],
      },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'beforeDonate',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      {
        name: '',
        internalType: 'struct PoolKey',
        type: 'tuple',
        components: [
          { name: 'currency0', internalType: 'Currency', type: 'address' },
          { name: 'currency1', internalType: 'Currency', type: 'address' },
          { name: 'fee', internalType: 'uint24', type: 'uint24' },
          { name: 'tickSpacing', internalType: 'int24', type: 'int24' },
          { name: 'hooks', internalType: 'contract IHooks', type: 'address' },
        ],
      },
      { name: '', internalType: 'uint160', type: 'uint160' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'beforeInitialize',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      {
        name: '',
        internalType: 'struct PoolKey',
        type: 'tuple',
        components: [
          { name: 'currency0', internalType: 'Currency', type: 'address' },
          { name: 'currency1', internalType: 'Currency', type: 'address' },
          { name: 'fee', internalType: 'uint24', type: 'uint24' },
          { name: 'tickSpacing', internalType: 'int24', type: 'int24' },
          { name: 'hooks', internalType: 'contract IHooks', type: 'address' },
        ],
      },
      {
        name: '',
        internalType: 'struct IPoolManager.ModifyPositionParams',
        type: 'tuple',
        components: [
          { name: 'tickLower', internalType: 'int24', type: 'int24' },
          { name: 'tickUpper', internalType: 'int24', type: 'int24' },
          { name: 'liquidityDelta', internalType: 'int256', type: 'int256' },
        ],
      },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'beforeModifyPosition',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      {
        name: '',
        internalType: 'struct PoolKey',
        type: 'tuple',
        components: [
          { name: 'currency0', internalType: 'Currency', type: 'address' },
          { name: 'currency1', internalType: 'Currency', type: 'address' },
          { name: 'fee', internalType: 'uint24', type: 'uint24' },
          { name: 'tickSpacing', internalType: 'int24', type: 'int24' },
          { name: 'hooks', internalType: 'contract IHooks', type: 'address' },
        ],
      },
      {
        name: '',
        internalType: 'struct IPoolManager.SwapParams',
        type: 'tuple',
        components: [
          { name: 'zeroForOne', internalType: 'bool', type: 'bool' },
          { name: 'amountSpecified', internalType: 'int256', type: 'int256' },
          {
            name: 'sqrtPriceLimitX96',
            internalType: 'uint160',
            type: 'uint160',
          },
        ],
      },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'beforeSwap',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [],
    name: 'getHooksCalls',
    outputs: [
      {
        name: '',
        internalType: 'struct Hooks.Calls',
        type: 'tuple',
        components: [
          { name: 'beforeInitialize', internalType: 'bool', type: 'bool' },
          { name: 'afterInitialize', internalType: 'bool', type: 'bool' },
          { name: 'beforeModifyPosition', internalType: 'bool', type: 'bool' },
          { name: 'afterModifyPosition', internalType: 'bool', type: 'bool' },
          { name: 'beforeSwap', internalType: 'bool', type: 'bool' },
          { name: 'afterSwap', internalType: 'bool', type: 'bool' },
          { name: 'beforeDonate', internalType: 'bool', type: 'bool' },
          { name: 'afterDonate', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getPoolKey',
    outputs: [
      {
        name: 'key',
        internalType: 'struct PoolKey',
        type: 'tuple',
        components: [
          { name: 'currency0', internalType: 'Currency', type: 'address' },
          { name: 'currency1', internalType: 'Currency', type: 'address' },
          { name: 'fee', internalType: 'uint24', type: 'uint24' },
          { name: 'tickSpacing', internalType: 'int24', type: 'int24' },
          { name: 'hooks', internalType: 'contract IHooks', type: 'address' },
        ],
      },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes', type: 'bytes' }],
    name: 'lockAcquired',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
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
    inputs: [],
    name: 'poolManager',
    outputs: [
      { name: '', internalType: 'contract IPoolManager', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// UniNftRouter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * -
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x2093fa634730172d29c618879428336b021f7732)
 */
export const uniNftRouterABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: 'mgr', internalType: 'contract IPoolManager', type: 'address' },
    ],
  },
  { type: 'error', inputs: [], name: 'InvalidTick' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'token',
        internalType: 'contract UniNftToken',
        type: 'address',
        indexed: false,
      },
      { name: 'name', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'Created',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MGR',
    outputs: [
      { name: '', internalType: 'contract IPoolManager', type: 'address' },
    ],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'contract UniNftToken', type: 'address' },
      { name: 'maxPrice', internalType: 'uint256', type: 'uint256' },
      { name: 'receiver', internalType: 'address', type: 'address' },
      { name: 'receiverData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'buyNft',
    outputs: [{ name: 'price', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'nftName', internalType: 'string', type: 'string' },
      { name: 'nftSymbol', internalType: 'string', type: 'string' },
      { name: 'maxSupply', internalType: 'uint128', type: 'uint128' },
      { name: 'tokenUri', internalType: 'string', type: 'string' },
      { name: 'fee', internalType: 'uint24', type: 'uint24' },
      { name: 'hookSalt', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'create',
    outputs: [
      {
        name: 'nftToken',
        internalType: 'contract UniNftToken',
        type: 'address',
      },
      { name: 'ethUsed', internalType: 'uint256', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'nftName', internalType: 'string', type: 'string' },
      { name: 'nftSymbol', internalType: 'string', type: 'string' },
      { name: 'tokenUri', internalType: 'string', type: 'string' },
      { name: 'fee', internalType: 'uint24', type: 'uint24' },
      { name: 'caller', internalType: 'address', type: 'address' },
      { name: 'saltStart', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'findHookSalt',
    outputs: [{ name: 'salt', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'contract UniNftToken', type: 'address' },
    ],
    name: 'isValidToken',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes', type: 'bytes' }],
    name: 'lockAcquired',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'token', internalType: 'contract UniNftToken', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'minPrice', internalType: 'uint256', type: 'uint256' },
      { name: 'receiver', internalType: 'address payable', type: 'address' },
    ],
    name: 'sellNft',
    outputs: [{ name: 'price', internalType: 'uint256', type: 'uint256' }],
  },
] as const

/**
 * -
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x2093fa634730172d29c618879428336b021f7732)
 */
export const uniNftRouterAddress = {
  31337: '0xA15BB66138824a1c7167f5E85b957d04Dd34E468',
  534351: '0x2093FA634730172d29C618879428336b021f7732',
} as const

/**
 * -
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x2093fa634730172d29c618879428336b021f7732)
 */
export const uniNftRouterConfig = {
  address: uniNftRouterAddress,
  abi: uniNftRouterABI,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// UniNftToken
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const uniNftTokenABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [
      { name: 'mgr', internalType: 'contract IPoolManager', type: 'address' },
      { name: 'hook', internalType: 'contract UniNftHook', type: 'address' },
      { name: 'fee', internalType: 'uint24', type: 'uint24' },
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'symbol', internalType: 'string', type: 'string' },
      { name: 'tokenUri', internalType: 'string', type: 'string' },
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
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'HOOK',
    outputs: [
      { name: '', internalType: 'contract UniNftHook', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'MGR',
    outputs: [
      { name: '', internalType: 'contract IPoolManager', type: 'address' },
    ],
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
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'receiver', internalType: 'address', type: 'address' },
      { name: 'receiverData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'claimOrMint',
    outputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
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
    inputs: [],
    name: 'getPoolKey',
    outputs: [
      {
        name: 'key',
        internalType: 'struct PoolKey',
        type: 'tuple',
        components: [
          { name: 'currency0', internalType: 'Currency', type: 'address' },
          { name: 'currency1', internalType: 'Currency', type: 'address' },
          { name: 'fee', internalType: 'uint24', type: 'uint24' },
          { name: 'tickSpacing', internalType: 'int24', type: 'int24' },
          { name: 'hooks', internalType: 'contract IHooks', type: 'address' },
        ],
      },
    ],
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
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'stash',
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
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
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
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link baseHookABI}__.
 */
export function useBaseHookRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof baseHookABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof baseHookABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: baseHookABI,
    ...config,
  } as UseContractReadConfig<typeof baseHookABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link baseHookABI}__ and `functionName` set to `"getHooksCalls"`.
 */
export function useBaseHookGetHooksCalls<
  TFunctionName extends 'getHooksCalls',
  TSelectData = ReadContractResult<typeof baseHookABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof baseHookABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: baseHookABI,
    functionName: 'getHooksCalls',
    ...config,
  } as UseContractReadConfig<typeof baseHookABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link baseHookABI}__ and `functionName` set to `"poolManager"`.
 */
export function useBaseHookPoolManager<
  TFunctionName extends 'poolManager',
  TSelectData = ReadContractResult<typeof baseHookABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof baseHookABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: baseHookABI,
    functionName: 'poolManager',
    ...config,
  } as UseContractReadConfig<typeof baseHookABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link baseHookABI}__.
 */
export function useBaseHookWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof baseHookABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof baseHookABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof baseHookABI, TFunctionName, TMode>({
    abi: baseHookABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link baseHookABI}__ and `functionName` set to `"afterDonate"`.
 */
export function useBaseHookAfterDonate<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof baseHookABI,
          'afterDonate'
        >['request']['abi'],
        'afterDonate',
        TMode
      > & { functionName?: 'afterDonate' }
    : UseContractWriteConfig<typeof baseHookABI, 'afterDonate', TMode> & {
        abi?: never
        functionName?: 'afterDonate'
      } = {} as any,
) {
  return useContractWrite<typeof baseHookABI, 'afterDonate', TMode>({
    abi: baseHookABI,
    functionName: 'afterDonate',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link baseHookABI}__ and `functionName` set to `"afterInitialize"`.
 */
export function useBaseHookAfterInitialize<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof baseHookABI,
          'afterInitialize'
        >['request']['abi'],
        'afterInitialize',
        TMode
      > & { functionName?: 'afterInitialize' }
    : UseContractWriteConfig<typeof baseHookABI, 'afterInitialize', TMode> & {
        abi?: never
        functionName?: 'afterInitialize'
      } = {} as any,
) {
  return useContractWrite<typeof baseHookABI, 'afterInitialize', TMode>({
    abi: baseHookABI,
    functionName: 'afterInitialize',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link baseHookABI}__ and `functionName` set to `"afterModifyPosition"`.
 */
export function useBaseHookAfterModifyPosition<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof baseHookABI,
          'afterModifyPosition'
        >['request']['abi'],
        'afterModifyPosition',
        TMode
      > & { functionName?: 'afterModifyPosition' }
    : UseContractWriteConfig<
        typeof baseHookABI,
        'afterModifyPosition',
        TMode
      > & {
        abi?: never
        functionName?: 'afterModifyPosition'
      } = {} as any,
) {
  return useContractWrite<typeof baseHookABI, 'afterModifyPosition', TMode>({
    abi: baseHookABI,
    functionName: 'afterModifyPosition',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link baseHookABI}__ and `functionName` set to `"afterSwap"`.
 */
export function useBaseHookAfterSwap<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof baseHookABI,
          'afterSwap'
        >['request']['abi'],
        'afterSwap',
        TMode
      > & { functionName?: 'afterSwap' }
    : UseContractWriteConfig<typeof baseHookABI, 'afterSwap', TMode> & {
        abi?: never
        functionName?: 'afterSwap'
      } = {} as any,
) {
  return useContractWrite<typeof baseHookABI, 'afterSwap', TMode>({
    abi: baseHookABI,
    functionName: 'afterSwap',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link baseHookABI}__ and `functionName` set to `"beforeDonate"`.
 */
export function useBaseHookBeforeDonate<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof baseHookABI,
          'beforeDonate'
        >['request']['abi'],
        'beforeDonate',
        TMode
      > & { functionName?: 'beforeDonate' }
    : UseContractWriteConfig<typeof baseHookABI, 'beforeDonate', TMode> & {
        abi?: never
        functionName?: 'beforeDonate'
      } = {} as any,
) {
  return useContractWrite<typeof baseHookABI, 'beforeDonate', TMode>({
    abi: baseHookABI,
    functionName: 'beforeDonate',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link baseHookABI}__ and `functionName` set to `"beforeInitialize"`.
 */
export function useBaseHookBeforeInitialize<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof baseHookABI,
          'beforeInitialize'
        >['request']['abi'],
        'beforeInitialize',
        TMode
      > & { functionName?: 'beforeInitialize' }
    : UseContractWriteConfig<typeof baseHookABI, 'beforeInitialize', TMode> & {
        abi?: never
        functionName?: 'beforeInitialize'
      } = {} as any,
) {
  return useContractWrite<typeof baseHookABI, 'beforeInitialize', TMode>({
    abi: baseHookABI,
    functionName: 'beforeInitialize',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link baseHookABI}__ and `functionName` set to `"beforeModifyPosition"`.
 */
export function useBaseHookBeforeModifyPosition<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof baseHookABI,
          'beforeModifyPosition'
        >['request']['abi'],
        'beforeModifyPosition',
        TMode
      > & { functionName?: 'beforeModifyPosition' }
    : UseContractWriteConfig<
        typeof baseHookABI,
        'beforeModifyPosition',
        TMode
      > & {
        abi?: never
        functionName?: 'beforeModifyPosition'
      } = {} as any,
) {
  return useContractWrite<typeof baseHookABI, 'beforeModifyPosition', TMode>({
    abi: baseHookABI,
    functionName: 'beforeModifyPosition',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link baseHookABI}__ and `functionName` set to `"beforeSwap"`.
 */
export function useBaseHookBeforeSwap<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof baseHookABI,
          'beforeSwap'
        >['request']['abi'],
        'beforeSwap',
        TMode
      > & { functionName?: 'beforeSwap' }
    : UseContractWriteConfig<typeof baseHookABI, 'beforeSwap', TMode> & {
        abi?: never
        functionName?: 'beforeSwap'
      } = {} as any,
) {
  return useContractWrite<typeof baseHookABI, 'beforeSwap', TMode>({
    abi: baseHookABI,
    functionName: 'beforeSwap',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link baseHookABI}__ and `functionName` set to `"lockAcquired"`.
 */
export function useBaseHookLockAcquired<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof baseHookABI,
          'lockAcquired'
        >['request']['abi'],
        'lockAcquired',
        TMode
      > & { functionName?: 'lockAcquired' }
    : UseContractWriteConfig<typeof baseHookABI, 'lockAcquired', TMode> & {
        abi?: never
        functionName?: 'lockAcquired'
      } = {} as any,
) {
  return useContractWrite<typeof baseHookABI, 'lockAcquired', TMode>({
    abi: baseHookABI,
    functionName: 'lockAcquired',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link baseHookABI}__.
 */
export function usePrepareBaseHookWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof baseHookABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: baseHookABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof baseHookABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link baseHookABI}__ and `functionName` set to `"afterDonate"`.
 */
export function usePrepareBaseHookAfterDonate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof baseHookABI, 'afterDonate'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: baseHookABI,
    functionName: 'afterDonate',
    ...config,
  } as UsePrepareContractWriteConfig<typeof baseHookABI, 'afterDonate'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link baseHookABI}__ and `functionName` set to `"afterInitialize"`.
 */
export function usePrepareBaseHookAfterInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof baseHookABI, 'afterInitialize'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: baseHookABI,
    functionName: 'afterInitialize',
    ...config,
  } as UsePrepareContractWriteConfig<typeof baseHookABI, 'afterInitialize'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link baseHookABI}__ and `functionName` set to `"afterModifyPosition"`.
 */
export function usePrepareBaseHookAfterModifyPosition(
  config: Omit<
    UsePrepareContractWriteConfig<typeof baseHookABI, 'afterModifyPosition'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: baseHookABI,
    functionName: 'afterModifyPosition',
    ...config,
  } as UsePrepareContractWriteConfig<typeof baseHookABI, 'afterModifyPosition'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link baseHookABI}__ and `functionName` set to `"afterSwap"`.
 */
export function usePrepareBaseHookAfterSwap(
  config: Omit<
    UsePrepareContractWriteConfig<typeof baseHookABI, 'afterSwap'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: baseHookABI,
    functionName: 'afterSwap',
    ...config,
  } as UsePrepareContractWriteConfig<typeof baseHookABI, 'afterSwap'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link baseHookABI}__ and `functionName` set to `"beforeDonate"`.
 */
export function usePrepareBaseHookBeforeDonate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof baseHookABI, 'beforeDonate'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: baseHookABI,
    functionName: 'beforeDonate',
    ...config,
  } as UsePrepareContractWriteConfig<typeof baseHookABI, 'beforeDonate'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link baseHookABI}__ and `functionName` set to `"beforeInitialize"`.
 */
export function usePrepareBaseHookBeforeInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof baseHookABI, 'beforeInitialize'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: baseHookABI,
    functionName: 'beforeInitialize',
    ...config,
  } as UsePrepareContractWriteConfig<typeof baseHookABI, 'beforeInitialize'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link baseHookABI}__ and `functionName` set to `"beforeModifyPosition"`.
 */
export function usePrepareBaseHookBeforeModifyPosition(
  config: Omit<
    UsePrepareContractWriteConfig<typeof baseHookABI, 'beforeModifyPosition'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: baseHookABI,
    functionName: 'beforeModifyPosition',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof baseHookABI,
    'beforeModifyPosition'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link baseHookABI}__ and `functionName` set to `"beforeSwap"`.
 */
export function usePrepareBaseHookBeforeSwap(
  config: Omit<
    UsePrepareContractWriteConfig<typeof baseHookABI, 'beforeSwap'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: baseHookABI,
    functionName: 'beforeSwap',
    ...config,
  } as UsePrepareContractWriteConfig<typeof baseHookABI, 'beforeSwap'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link baseHookABI}__ and `functionName` set to `"lockAcquired"`.
 */
export function usePrepareBaseHookLockAcquired(
  config: Omit<
    UsePrepareContractWriteConfig<typeof baseHookABI, 'lockAcquired'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: baseHookABI,
    functionName: 'lockAcquired',
    ...config,
  } as UsePrepareContractWriteConfig<typeof baseHookABI, 'lockAcquired'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link currencyLibraryABI}__.
 */
export function useCurrencyLibraryRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof currencyLibraryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof currencyLibraryABI,
      TFunctionName,
      TSelectData
    >,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: currencyLibraryABI,
    ...config,
  } as UseContractReadConfig<
    typeof currencyLibraryABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link currencyLibraryABI}__ and `functionName` set to `"NATIVE"`.
 */
export function useCurrencyLibraryNative<
  TFunctionName extends 'NATIVE',
  TSelectData = ReadContractResult<typeof currencyLibraryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof currencyLibraryABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: currencyLibraryABI,
    functionName: 'NATIVE',
    ...config,
  } as UseContractReadConfig<
    typeof currencyLibraryABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc1155ABI}__.
 */
export function useErc1155Read<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof erc1155ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc1155ABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: erc1155ABI,
    ...config,
  } as UseContractReadConfig<typeof erc1155ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc1155ABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useErc1155BalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof erc1155ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc1155ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc1155ABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof erc1155ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc1155ABI}__ and `functionName` set to `"balanceOfBatch"`.
 */
export function useErc1155BalanceOfBatch<
  TFunctionName extends 'balanceOfBatch',
  TSelectData = ReadContractResult<typeof erc1155ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc1155ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc1155ABI,
    functionName: 'balanceOfBatch',
    ...config,
  } as UseContractReadConfig<typeof erc1155ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc1155ABI}__ and `functionName` set to `"isApprovedForAll"`.
 */
export function useErc1155IsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof erc1155ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc1155ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc1155ABI,
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<typeof erc1155ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc1155ABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useErc1155SupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof erc1155ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc1155ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc1155ABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<typeof erc1155ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc1155ABI}__ and `functionName` set to `"uri"`.
 */
export function useErc1155Uri<
  TFunctionName extends 'uri',
  TSelectData = ReadContractResult<typeof erc1155ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc1155ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc1155ABI,
    functionName: 'uri',
    ...config,
  } as UseContractReadConfig<typeof erc1155ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc1155ABI}__.
 */
export function useErc1155Write<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof erc1155ABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof erc1155ABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof erc1155ABI, TFunctionName, TMode>({
    abi: erc1155ABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc1155ABI}__ and `functionName` set to `"safeBatchTransferFrom"`.
 */
export function useErc1155SafeBatchTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc1155ABI,
          'safeBatchTransferFrom'
        >['request']['abi'],
        'safeBatchTransferFrom',
        TMode
      > & { functionName?: 'safeBatchTransferFrom' }
    : UseContractWriteConfig<
        typeof erc1155ABI,
        'safeBatchTransferFrom',
        TMode
      > & {
        abi?: never
        functionName?: 'safeBatchTransferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof erc1155ABI, 'safeBatchTransferFrom', TMode>({
    abi: erc1155ABI,
    functionName: 'safeBatchTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc1155ABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function useErc1155SafeTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc1155ABI,
          'safeTransferFrom'
        >['request']['abi'],
        'safeTransferFrom',
        TMode
      > & { functionName?: 'safeTransferFrom' }
    : UseContractWriteConfig<typeof erc1155ABI, 'safeTransferFrom', TMode> & {
        abi?: never
        functionName?: 'safeTransferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof erc1155ABI, 'safeTransferFrom', TMode>({
    abi: erc1155ABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link erc1155ABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function useErc1155SetApprovalForAll<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof erc1155ABI,
          'setApprovalForAll'
        >['request']['abi'],
        'setApprovalForAll',
        TMode
      > & { functionName?: 'setApprovalForAll' }
    : UseContractWriteConfig<typeof erc1155ABI, 'setApprovalForAll', TMode> & {
        abi?: never
        functionName?: 'setApprovalForAll'
      } = {} as any,
) {
  return useContractWrite<typeof erc1155ABI, 'setApprovalForAll', TMode>({
    abi: erc1155ABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc1155ABI}__.
 */
export function usePrepareErc1155Write<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc1155ABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc1155ABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc1155ABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc1155ABI}__ and `functionName` set to `"safeBatchTransferFrom"`.
 */
export function usePrepareErc1155SafeBatchTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc1155ABI, 'safeBatchTransferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc1155ABI,
    functionName: 'safeBatchTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof erc1155ABI,
    'safeBatchTransferFrom'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc1155ABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePrepareErc1155SafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc1155ABI, 'safeTransferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc1155ABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc1155ABI, 'safeTransferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link erc1155ABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePrepareErc1155SetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<typeof erc1155ABI, 'setApprovalForAll'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: erc1155ABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<typeof erc1155ABI, 'setApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc1155ABI}__.
 */
export function useErc1155Event<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof erc1155ABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc1155ABI,
    ...config,
  } as UseContractEventConfig<typeof erc1155ABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc1155ABI}__ and `eventName` set to `"ApprovalForAll"`.
 */
export function useErc1155ApprovalForAllEvent(
  config: Omit<
    UseContractEventConfig<typeof erc1155ABI, 'ApprovalForAll'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc1155ABI,
    eventName: 'ApprovalForAll',
    ...config,
  } as UseContractEventConfig<typeof erc1155ABI, 'ApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc1155ABI}__ and `eventName` set to `"TransferBatch"`.
 */
export function useErc1155TransferBatchEvent(
  config: Omit<
    UseContractEventConfig<typeof erc1155ABI, 'TransferBatch'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc1155ABI,
    eventName: 'TransferBatch',
    ...config,
  } as UseContractEventConfig<typeof erc1155ABI, 'TransferBatch'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc1155ABI}__ and `eventName` set to `"TransferSingle"`.
 */
export function useErc1155TransferSingleEvent(
  config: Omit<
    UseContractEventConfig<typeof erc1155ABI, 'TransferSingle'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc1155ABI,
    eventName: 'TransferSingle',
    ...config,
  } as UseContractEventConfig<typeof erc1155ABI, 'TransferSingle'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link erc1155ABI}__ and `eventName` set to `"URI"`.
 */
export function useErc1155UriEvent(
  config: Omit<
    UseContractEventConfig<typeof erc1155ABI, 'URI'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: erc1155ABI,
    eventName: 'URI',
    ...config,
  } as UseContractEventConfig<typeof erc1155ABI, 'URI'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc165ABI}__.
 */
export function useErc165Read<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof erc165ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc165ABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({ abi: erc165ABI, ...config } as UseContractReadConfig<
    typeof erc165ABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link erc165ABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useErc165SupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof erc165ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof erc165ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: erc165ABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<typeof erc165ABI, TFunctionName, TSelectData>)
}

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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link feeLibraryABI}__.
 */
export function useFeeLibraryRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof feeLibraryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof feeLibraryABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: feeLibraryABI,
    ...config,
  } as UseContractReadConfig<typeof feeLibraryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link feeLibraryABI}__ and `functionName` set to `"DYNAMIC_FEE_FLAG"`.
 */
export function useFeeLibraryDynamicFeeFlag<
  TFunctionName extends 'DYNAMIC_FEE_FLAG',
  TSelectData = ReadContractResult<typeof feeLibraryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof feeLibraryABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: feeLibraryABI,
    functionName: 'DYNAMIC_FEE_FLAG',
    ...config,
  } as UseContractReadConfig<typeof feeLibraryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link feeLibraryABI}__ and `functionName` set to `"HOOK_SWAP_FEE_FLAG"`.
 */
export function useFeeLibraryHookSwapFeeFlag<
  TFunctionName extends 'HOOK_SWAP_FEE_FLAG',
  TSelectData = ReadContractResult<typeof feeLibraryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof feeLibraryABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: feeLibraryABI,
    functionName: 'HOOK_SWAP_FEE_FLAG',
    ...config,
  } as UseContractReadConfig<typeof feeLibraryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link feeLibraryABI}__ and `functionName` set to `"HOOK_WITHDRAW_FEE_FLAG"`.
 */
export function useFeeLibraryHookWithdrawFeeFlag<
  TFunctionName extends 'HOOK_WITHDRAW_FEE_FLAG',
  TSelectData = ReadContractResult<typeof feeLibraryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof feeLibraryABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: feeLibraryABI,
    functionName: 'HOOK_WITHDRAW_FEE_FLAG',
    ...config,
  } as UseContractReadConfig<typeof feeLibraryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link feeLibraryABI}__ and `functionName` set to `"STATIC_FEE_MASK"`.
 */
export function useFeeLibraryStaticFeeMask<
  TFunctionName extends 'STATIC_FEE_MASK',
  TSelectData = ReadContractResult<typeof feeLibraryABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof feeLibraryABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: feeLibraryABI,
    functionName: 'STATIC_FEE_MASK',
    ...config,
  } as UseContractReadConfig<typeof feeLibraryABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link feesABI}__.
 */
export function useFeesRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof feesABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof feesABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({ abi: feesABI, ...config } as UseContractReadConfig<
    typeof feesABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link feesABI}__ and `functionName` set to `"MIN_PROTOCOL_FEE_DENOMINATOR"`.
 */
export function useFeesMinProtocolFeeDenominator<
  TFunctionName extends 'MIN_PROTOCOL_FEE_DENOMINATOR',
  TSelectData = ReadContractResult<typeof feesABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof feesABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: feesABI,
    functionName: 'MIN_PROTOCOL_FEE_DENOMINATOR',
    ...config,
  } as UseContractReadConfig<typeof feesABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link feesABI}__ and `functionName` set to `"hookFeesAccrued"`.
 */
export function useFeesHookFeesAccrued<
  TFunctionName extends 'hookFeesAccrued',
  TSelectData = ReadContractResult<typeof feesABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof feesABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: feesABI,
    functionName: 'hookFeesAccrued',
    ...config,
  } as UseContractReadConfig<typeof feesABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link feesABI}__ and `functionName` set to `"owner"`.
 */
export function useFeesOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof feesABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof feesABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: feesABI,
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof feesABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link feesABI}__ and `functionName` set to `"protocolFeeController"`.
 */
export function useFeesProtocolFeeController<
  TFunctionName extends 'protocolFeeController',
  TSelectData = ReadContractResult<typeof feesABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof feesABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: feesABI,
    functionName: 'protocolFeeController',
    ...config,
  } as UseContractReadConfig<typeof feesABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link feesABI}__ and `functionName` set to `"protocolFeesAccrued"`.
 */
export function useFeesProtocolFeesAccrued<
  TFunctionName extends 'protocolFeesAccrued',
  TSelectData = ReadContractResult<typeof feesABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof feesABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: feesABI,
    functionName: 'protocolFeesAccrued',
    ...config,
  } as UseContractReadConfig<typeof feesABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link feesABI}__.
 */
export function useFeesWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof feesABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof feesABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof feesABI, TFunctionName, TMode>({
    abi: feesABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link feesABI}__ and `functionName` set to `"collectHookFees"`.
 */
export function useFeesCollectHookFees<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof feesABI,
          'collectHookFees'
        >['request']['abi'],
        'collectHookFees',
        TMode
      > & { functionName?: 'collectHookFees' }
    : UseContractWriteConfig<typeof feesABI, 'collectHookFees', TMode> & {
        abi?: never
        functionName?: 'collectHookFees'
      } = {} as any,
) {
  return useContractWrite<typeof feesABI, 'collectHookFees', TMode>({
    abi: feesABI,
    functionName: 'collectHookFees',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link feesABI}__ and `functionName` set to `"collectProtocolFees"`.
 */
export function useFeesCollectProtocolFees<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof feesABI,
          'collectProtocolFees'
        >['request']['abi'],
        'collectProtocolFees',
        TMode
      > & { functionName?: 'collectProtocolFees' }
    : UseContractWriteConfig<typeof feesABI, 'collectProtocolFees', TMode> & {
        abi?: never
        functionName?: 'collectProtocolFees'
      } = {} as any,
) {
  return useContractWrite<typeof feesABI, 'collectProtocolFees', TMode>({
    abi: feesABI,
    functionName: 'collectProtocolFees',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link feesABI}__ and `functionName` set to `"setOwner"`.
 */
export function useFeesSetOwner<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof feesABI,
          'setOwner'
        >['request']['abi'],
        'setOwner',
        TMode
      > & { functionName?: 'setOwner' }
    : UseContractWriteConfig<typeof feesABI, 'setOwner', TMode> & {
        abi?: never
        functionName?: 'setOwner'
      } = {} as any,
) {
  return useContractWrite<typeof feesABI, 'setOwner', TMode>({
    abi: feesABI,
    functionName: 'setOwner',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link feesABI}__ and `functionName` set to `"setProtocolFeeController"`.
 */
export function useFeesSetProtocolFeeController<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof feesABI,
          'setProtocolFeeController'
        >['request']['abi'],
        'setProtocolFeeController',
        TMode
      > & { functionName?: 'setProtocolFeeController' }
    : UseContractWriteConfig<
        typeof feesABI,
        'setProtocolFeeController',
        TMode
      > & {
        abi?: never
        functionName?: 'setProtocolFeeController'
      } = {} as any,
) {
  return useContractWrite<typeof feesABI, 'setProtocolFeeController', TMode>({
    abi: feesABI,
    functionName: 'setProtocolFeeController',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link feesABI}__.
 */
export function usePrepareFeesWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof feesABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: feesABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof feesABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link feesABI}__ and `functionName` set to `"collectHookFees"`.
 */
export function usePrepareFeesCollectHookFees(
  config: Omit<
    UsePrepareContractWriteConfig<typeof feesABI, 'collectHookFees'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: feesABI,
    functionName: 'collectHookFees',
    ...config,
  } as UsePrepareContractWriteConfig<typeof feesABI, 'collectHookFees'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link feesABI}__ and `functionName` set to `"collectProtocolFees"`.
 */
export function usePrepareFeesCollectProtocolFees(
  config: Omit<
    UsePrepareContractWriteConfig<typeof feesABI, 'collectProtocolFees'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: feesABI,
    functionName: 'collectProtocolFees',
    ...config,
  } as UsePrepareContractWriteConfig<typeof feesABI, 'collectProtocolFees'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link feesABI}__ and `functionName` set to `"setOwner"`.
 */
export function usePrepareFeesSetOwner(
  config: Omit<
    UsePrepareContractWriteConfig<typeof feesABI, 'setOwner'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: feesABI,
    functionName: 'setOwner',
    ...config,
  } as UsePrepareContractWriteConfig<typeof feesABI, 'setOwner'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link feesABI}__ and `functionName` set to `"setProtocolFeeController"`.
 */
export function usePrepareFeesSetProtocolFeeController(
  config: Omit<
    UsePrepareContractWriteConfig<typeof feesABI, 'setProtocolFeeController'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: feesABI,
    functionName: 'setProtocolFeeController',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof feesABI,
    'setProtocolFeeController'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link feesABI}__.
 */
export function useFeesEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof feesABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({ abi: feesABI, ...config } as UseContractEventConfig<
    typeof feesABI,
    TEventName
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link feesABI}__ and `eventName` set to `"OwnerChanged"`.
 */
export function useFeesOwnerChangedEvent(
  config: Omit<
    UseContractEventConfig<typeof feesABI, 'OwnerChanged'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: feesABI,
    eventName: 'OwnerChanged',
    ...config,
  } as UseContractEventConfig<typeof feesABI, 'OwnerChanged'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link feesABI}__ and `eventName` set to `"ProtocolFeeControllerUpdated"`.
 */
export function useFeesProtocolFeeControllerUpdatedEvent(
  config: Omit<
    UseContractEventConfig<typeof feesABI, 'ProtocolFeeControllerUpdated'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: feesABI,
    eventName: 'ProtocolFeeControllerUpdated',
    ...config,
  } as UseContractEventConfig<typeof feesABI, 'ProtocolFeeControllerUpdated'>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iDynamicFeeManagerABI}__.
 */
export function useIDynamicFeeManagerWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iDynamicFeeManagerABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<
        typeof iDynamicFeeManagerABI,
        TFunctionName,
        TMode
      > & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof iDynamicFeeManagerABI, TFunctionName, TMode>({
    abi: iDynamicFeeManagerABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iDynamicFeeManagerABI}__ and `functionName` set to `"getFee"`.
 */
export function useIDynamicFeeManagerGetFee<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iDynamicFeeManagerABI,
          'getFee'
        >['request']['abi'],
        'getFee',
        TMode
      > & { functionName?: 'getFee' }
    : UseContractWriteConfig<typeof iDynamicFeeManagerABI, 'getFee', TMode> & {
        abi?: never
        functionName?: 'getFee'
      } = {} as any,
) {
  return useContractWrite<typeof iDynamicFeeManagerABI, 'getFee', TMode>({
    abi: iDynamicFeeManagerABI,
    functionName: 'getFee',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iDynamicFeeManagerABI}__.
 */
export function usePrepareIDynamicFeeManagerWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iDynamicFeeManagerABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iDynamicFeeManagerABI,
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof iDynamicFeeManagerABI,
    TFunctionName
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iDynamicFeeManagerABI}__ and `functionName` set to `"getFee"`.
 */
export function usePrepareIDynamicFeeManagerGetFee(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iDynamicFeeManagerABI, 'getFee'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iDynamicFeeManagerABI,
    functionName: 'getFee',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iDynamicFeeManagerABI, 'getFee'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc1155ABI}__.
 */
export function useIerc1155Read<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof ierc1155ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc1155ABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc1155ABI,
    ...config,
  } as UseContractReadConfig<typeof ierc1155ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc1155ABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useIerc1155BalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof ierc1155ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc1155ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc1155ABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof ierc1155ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc1155ABI}__ and `functionName` set to `"balanceOfBatch"`.
 */
export function useIerc1155BalanceOfBatch<
  TFunctionName extends 'balanceOfBatch',
  TSelectData = ReadContractResult<typeof ierc1155ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc1155ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc1155ABI,
    functionName: 'balanceOfBatch',
    ...config,
  } as UseContractReadConfig<typeof ierc1155ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc1155ABI}__ and `functionName` set to `"isApprovedForAll"`.
 */
export function useIerc1155IsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof ierc1155ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc1155ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc1155ABI,
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<typeof ierc1155ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc1155ABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useIerc1155SupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof ierc1155ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc1155ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc1155ABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<typeof ierc1155ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc1155ABI}__.
 */
export function useIerc1155Write<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc1155ABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof ierc1155ABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof ierc1155ABI, TFunctionName, TMode>({
    abi: ierc1155ABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc1155ABI}__ and `functionName` set to `"safeBatchTransferFrom"`.
 */
export function useIerc1155SafeBatchTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc1155ABI,
          'safeBatchTransferFrom'
        >['request']['abi'],
        'safeBatchTransferFrom',
        TMode
      > & { functionName?: 'safeBatchTransferFrom' }
    : UseContractWriteConfig<
        typeof ierc1155ABI,
        'safeBatchTransferFrom',
        TMode
      > & {
        abi?: never
        functionName?: 'safeBatchTransferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof ierc1155ABI, 'safeBatchTransferFrom', TMode>({
    abi: ierc1155ABI,
    functionName: 'safeBatchTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc1155ABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function useIerc1155SafeTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc1155ABI,
          'safeTransferFrom'
        >['request']['abi'],
        'safeTransferFrom',
        TMode
      > & { functionName?: 'safeTransferFrom' }
    : UseContractWriteConfig<typeof ierc1155ABI, 'safeTransferFrom', TMode> & {
        abi?: never
        functionName?: 'safeTransferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof ierc1155ABI, 'safeTransferFrom', TMode>({
    abi: ierc1155ABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc1155ABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function useIerc1155SetApprovalForAll<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc1155ABI,
          'setApprovalForAll'
        >['request']['abi'],
        'setApprovalForAll',
        TMode
      > & { functionName?: 'setApprovalForAll' }
    : UseContractWriteConfig<typeof ierc1155ABI, 'setApprovalForAll', TMode> & {
        abi?: never
        functionName?: 'setApprovalForAll'
      } = {} as any,
) {
  return useContractWrite<typeof ierc1155ABI, 'setApprovalForAll', TMode>({
    abi: ierc1155ABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc1155ABI}__.
 */
export function usePrepareIerc1155Write<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc1155ABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc1155ABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc1155ABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc1155ABI}__ and `functionName` set to `"safeBatchTransferFrom"`.
 */
export function usePrepareIerc1155SafeBatchTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc1155ABI, 'safeBatchTransferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc1155ABI,
    functionName: 'safeBatchTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof ierc1155ABI,
    'safeBatchTransferFrom'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc1155ABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePrepareIerc1155SafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc1155ABI, 'safeTransferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc1155ABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc1155ABI, 'safeTransferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc1155ABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePrepareIerc1155SetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc1155ABI, 'setApprovalForAll'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc1155ABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc1155ABI, 'setApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc1155ABI}__.
 */
export function useIerc1155Event<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof ierc1155ABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc1155ABI,
    ...config,
  } as UseContractEventConfig<typeof ierc1155ABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc1155ABI}__ and `eventName` set to `"ApprovalForAll"`.
 */
export function useIerc1155ApprovalForAllEvent(
  config: Omit<
    UseContractEventConfig<typeof ierc1155ABI, 'ApprovalForAll'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc1155ABI,
    eventName: 'ApprovalForAll',
    ...config,
  } as UseContractEventConfig<typeof ierc1155ABI, 'ApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc1155ABI}__ and `eventName` set to `"TransferBatch"`.
 */
export function useIerc1155TransferBatchEvent(
  config: Omit<
    UseContractEventConfig<typeof ierc1155ABI, 'TransferBatch'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc1155ABI,
    eventName: 'TransferBatch',
    ...config,
  } as UseContractEventConfig<typeof ierc1155ABI, 'TransferBatch'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc1155ABI}__ and `eventName` set to `"TransferSingle"`.
 */
export function useIerc1155TransferSingleEvent(
  config: Omit<
    UseContractEventConfig<typeof ierc1155ABI, 'TransferSingle'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc1155ABI,
    eventName: 'TransferSingle',
    ...config,
  } as UseContractEventConfig<typeof ierc1155ABI, 'TransferSingle'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc1155ABI}__ and `eventName` set to `"URI"`.
 */
export function useIerc1155UriEvent(
  config: Omit<
    UseContractEventConfig<typeof ierc1155ABI, 'URI'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc1155ABI,
    eventName: 'URI',
    ...config,
  } as UseContractEventConfig<typeof ierc1155ABI, 'URI'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc1155MetadataUriABI}__.
 */
export function useIerc1155MetadataUriRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<
    typeof ierc1155MetadataUriABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc1155MetadataUriABI,
      TFunctionName,
      TSelectData
    >,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc1155MetadataUriABI,
    ...config,
  } as UseContractReadConfig<
    typeof ierc1155MetadataUriABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc1155MetadataUriABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useIerc1155MetadataUriBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<
    typeof ierc1155MetadataUriABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc1155MetadataUriABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc1155MetadataUriABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<
    typeof ierc1155MetadataUriABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc1155MetadataUriABI}__ and `functionName` set to `"balanceOfBatch"`.
 */
export function useIerc1155MetadataUriBalanceOfBatch<
  TFunctionName extends 'balanceOfBatch',
  TSelectData = ReadContractResult<
    typeof ierc1155MetadataUriABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc1155MetadataUriABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc1155MetadataUriABI,
    functionName: 'balanceOfBatch',
    ...config,
  } as UseContractReadConfig<
    typeof ierc1155MetadataUriABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc1155MetadataUriABI}__ and `functionName` set to `"isApprovedForAll"`.
 */
export function useIerc1155MetadataUriIsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<
    typeof ierc1155MetadataUriABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc1155MetadataUriABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc1155MetadataUriABI,
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<
    typeof ierc1155MetadataUriABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc1155MetadataUriABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useIerc1155MetadataUriSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<
    typeof ierc1155MetadataUriABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc1155MetadataUriABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc1155MetadataUriABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<
    typeof ierc1155MetadataUriABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc1155MetadataUriABI}__ and `functionName` set to `"uri"`.
 */
export function useIerc1155MetadataUriUri<
  TFunctionName extends 'uri',
  TSelectData = ReadContractResult<
    typeof ierc1155MetadataUriABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc1155MetadataUriABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc1155MetadataUriABI,
    functionName: 'uri',
    ...config,
  } as UseContractReadConfig<
    typeof ierc1155MetadataUriABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc1155MetadataUriABI}__.
 */
export function useIerc1155MetadataUriWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc1155MetadataUriABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<
        typeof ierc1155MetadataUriABI,
        TFunctionName,
        TMode
      > & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof ierc1155MetadataUriABI, TFunctionName, TMode>({
    abi: ierc1155MetadataUriABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc1155MetadataUriABI}__ and `functionName` set to `"safeBatchTransferFrom"`.
 */
export function useIerc1155MetadataUriSafeBatchTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc1155MetadataUriABI,
          'safeBatchTransferFrom'
        >['request']['abi'],
        'safeBatchTransferFrom',
        TMode
      > & { functionName?: 'safeBatchTransferFrom' }
    : UseContractWriteConfig<
        typeof ierc1155MetadataUriABI,
        'safeBatchTransferFrom',
        TMode
      > & {
        abi?: never
        functionName?: 'safeBatchTransferFrom'
      } = {} as any,
) {
  return useContractWrite<
    typeof ierc1155MetadataUriABI,
    'safeBatchTransferFrom',
    TMode
  >({
    abi: ierc1155MetadataUriABI,
    functionName: 'safeBatchTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc1155MetadataUriABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function useIerc1155MetadataUriSafeTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc1155MetadataUriABI,
          'safeTransferFrom'
        >['request']['abi'],
        'safeTransferFrom',
        TMode
      > & { functionName?: 'safeTransferFrom' }
    : UseContractWriteConfig<
        typeof ierc1155MetadataUriABI,
        'safeTransferFrom',
        TMode
      > & {
        abi?: never
        functionName?: 'safeTransferFrom'
      } = {} as any,
) {
  return useContractWrite<
    typeof ierc1155MetadataUriABI,
    'safeTransferFrom',
    TMode
  >({
    abi: ierc1155MetadataUriABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc1155MetadataUriABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function useIerc1155MetadataUriSetApprovalForAll<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc1155MetadataUriABI,
          'setApprovalForAll'
        >['request']['abi'],
        'setApprovalForAll',
        TMode
      > & { functionName?: 'setApprovalForAll' }
    : UseContractWriteConfig<
        typeof ierc1155MetadataUriABI,
        'setApprovalForAll',
        TMode
      > & {
        abi?: never
        functionName?: 'setApprovalForAll'
      } = {} as any,
) {
  return useContractWrite<
    typeof ierc1155MetadataUriABI,
    'setApprovalForAll',
    TMode
  >({
    abi: ierc1155MetadataUriABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc1155MetadataUriABI}__.
 */
export function usePrepareIerc1155MetadataUriWrite<
  TFunctionName extends string,
>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc1155MetadataUriABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc1155MetadataUriABI,
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof ierc1155MetadataUriABI,
    TFunctionName
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc1155MetadataUriABI}__ and `functionName` set to `"safeBatchTransferFrom"`.
 */
export function usePrepareIerc1155MetadataUriSafeBatchTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof ierc1155MetadataUriABI,
      'safeBatchTransferFrom'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc1155MetadataUriABI,
    functionName: 'safeBatchTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof ierc1155MetadataUriABI,
    'safeBatchTransferFrom'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc1155MetadataUriABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePrepareIerc1155MetadataUriSafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof ierc1155MetadataUriABI,
      'safeTransferFrom'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc1155MetadataUriABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof ierc1155MetadataUriABI,
    'safeTransferFrom'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc1155MetadataUriABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePrepareIerc1155MetadataUriSetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof ierc1155MetadataUriABI,
      'setApprovalForAll'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc1155MetadataUriABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof ierc1155MetadataUriABI,
    'setApprovalForAll'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc1155MetadataUriABI}__.
 */
export function useIerc1155MetadataUriEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof ierc1155MetadataUriABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc1155MetadataUriABI,
    ...config,
  } as UseContractEventConfig<typeof ierc1155MetadataUriABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc1155MetadataUriABI}__ and `eventName` set to `"ApprovalForAll"`.
 */
export function useIerc1155MetadataUriApprovalForAllEvent(
  config: Omit<
    UseContractEventConfig<typeof ierc1155MetadataUriABI, 'ApprovalForAll'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc1155MetadataUriABI,
    eventName: 'ApprovalForAll',
    ...config,
  } as UseContractEventConfig<typeof ierc1155MetadataUriABI, 'ApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc1155MetadataUriABI}__ and `eventName` set to `"TransferBatch"`.
 */
export function useIerc1155MetadataUriTransferBatchEvent(
  config: Omit<
    UseContractEventConfig<typeof ierc1155MetadataUriABI, 'TransferBatch'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc1155MetadataUriABI,
    eventName: 'TransferBatch',
    ...config,
  } as UseContractEventConfig<typeof ierc1155MetadataUriABI, 'TransferBatch'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc1155MetadataUriABI}__ and `eventName` set to `"TransferSingle"`.
 */
export function useIerc1155MetadataUriTransferSingleEvent(
  config: Omit<
    UseContractEventConfig<typeof ierc1155MetadataUriABI, 'TransferSingle'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc1155MetadataUriABI,
    eventName: 'TransferSingle',
    ...config,
  } as UseContractEventConfig<typeof ierc1155MetadataUriABI, 'TransferSingle'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc1155MetadataUriABI}__ and `eventName` set to `"URI"`.
 */
export function useIerc1155MetadataUriUriEvent(
  config: Omit<
    UseContractEventConfig<typeof ierc1155MetadataUriABI, 'URI'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc1155MetadataUriABI,
    eventName: 'URI',
    ...config,
  } as UseContractEventConfig<typeof ierc1155MetadataUriABI, 'URI'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc1155ReceiverABI}__.
 */
export function useIerc1155ReceiverRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof ierc1155ReceiverABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc1155ReceiverABI,
      TFunctionName,
      TSelectData
    >,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc1155ReceiverABI,
    ...config,
  } as UseContractReadConfig<
    typeof ierc1155ReceiverABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc1155ReceiverABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useIerc1155ReceiverSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof ierc1155ReceiverABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof ierc1155ReceiverABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc1155ReceiverABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<
    typeof ierc1155ReceiverABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc1155ReceiverABI}__.
 */
export function useIerc1155ReceiverWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc1155ReceiverABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<
        typeof ierc1155ReceiverABI,
        TFunctionName,
        TMode
      > & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof ierc1155ReceiverABI, TFunctionName, TMode>({
    abi: ierc1155ReceiverABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc1155ReceiverABI}__ and `functionName` set to `"onERC1155BatchReceived"`.
 */
export function useIerc1155ReceiverOnErc1155BatchReceived<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc1155ReceiverABI,
          'onERC1155BatchReceived'
        >['request']['abi'],
        'onERC1155BatchReceived',
        TMode
      > & { functionName?: 'onERC1155BatchReceived' }
    : UseContractWriteConfig<
        typeof ierc1155ReceiverABI,
        'onERC1155BatchReceived',
        TMode
      > & {
        abi?: never
        functionName?: 'onERC1155BatchReceived'
      } = {} as any,
) {
  return useContractWrite<
    typeof ierc1155ReceiverABI,
    'onERC1155BatchReceived',
    TMode
  >({
    abi: ierc1155ReceiverABI,
    functionName: 'onERC1155BatchReceived',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc1155ReceiverABI}__ and `functionName` set to `"onERC1155Received"`.
 */
export function useIerc1155ReceiverOnErc1155Received<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc1155ReceiverABI,
          'onERC1155Received'
        >['request']['abi'],
        'onERC1155Received',
        TMode
      > & { functionName?: 'onERC1155Received' }
    : UseContractWriteConfig<
        typeof ierc1155ReceiverABI,
        'onERC1155Received',
        TMode
      > & {
        abi?: never
        functionName?: 'onERC1155Received'
      } = {} as any,
) {
  return useContractWrite<
    typeof ierc1155ReceiverABI,
    'onERC1155Received',
    TMode
  >({
    abi: ierc1155ReceiverABI,
    functionName: 'onERC1155Received',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc1155ReceiverABI}__.
 */
export function usePrepareIerc1155ReceiverWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc1155ReceiverABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc1155ReceiverABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc1155ReceiverABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc1155ReceiverABI}__ and `functionName` set to `"onERC1155BatchReceived"`.
 */
export function usePrepareIerc1155ReceiverOnErc1155BatchReceived(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof ierc1155ReceiverABI,
      'onERC1155BatchReceived'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc1155ReceiverABI,
    functionName: 'onERC1155BatchReceived',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof ierc1155ReceiverABI,
    'onERC1155BatchReceived'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc1155ReceiverABI}__ and `functionName` set to `"onERC1155Received"`.
 */
export function usePrepareIerc1155ReceiverOnErc1155Received(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof ierc1155ReceiverABI,
      'onERC1155Received'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc1155ReceiverABI,
    functionName: 'onERC1155Received',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof ierc1155ReceiverABI,
    'onERC1155Received'
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc165ABI}__.
 */
export function useIerc165Read<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof ierc165ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc165ABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc165ABI,
    ...config,
  } as UseContractReadConfig<typeof ierc165ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc165ABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useIerc165SupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof ierc165ABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc165ABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc165ABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<typeof ierc165ABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20MinimalABI}__.
 */
export function useIerc20MinimalRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof ierc20MinimalABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20MinimalABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc20MinimalABI,
    ...config,
  } as UseContractReadConfig<
    typeof ierc20MinimalABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20MinimalABI}__ and `functionName` set to `"allowance"`.
 */
export function useIerc20MinimalAllowance<
  TFunctionName extends 'allowance',
  TSelectData = ReadContractResult<typeof ierc20MinimalABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20MinimalABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc20MinimalABI,
    functionName: 'allowance',
    ...config,
  } as UseContractReadConfig<
    typeof ierc20MinimalABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ierc20MinimalABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useIerc20MinimalBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof ierc20MinimalABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ierc20MinimalABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ierc20MinimalABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<
    typeof ierc20MinimalABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc20MinimalABI}__.
 */
export function useIerc20MinimalWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc20MinimalABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof ierc20MinimalABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof ierc20MinimalABI, TFunctionName, TMode>({
    abi: ierc20MinimalABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc20MinimalABI}__ and `functionName` set to `"approve"`.
 */
export function useIerc20MinimalApprove<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc20MinimalABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof ierc20MinimalABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof ierc20MinimalABI, 'approve', TMode>({
    abi: ierc20MinimalABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc20MinimalABI}__ and `functionName` set to `"transfer"`.
 */
export function useIerc20MinimalTransfer<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc20MinimalABI,
          'transfer'
        >['request']['abi'],
        'transfer',
        TMode
      > & { functionName?: 'transfer' }
    : UseContractWriteConfig<typeof ierc20MinimalABI, 'transfer', TMode> & {
        abi?: never
        functionName?: 'transfer'
      } = {} as any,
) {
  return useContractWrite<typeof ierc20MinimalABI, 'transfer', TMode>({
    abi: ierc20MinimalABI,
    functionName: 'transfer',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ierc20MinimalABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useIerc20MinimalTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ierc20MinimalABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof ierc20MinimalABI, 'transferFrom', TMode> & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof ierc20MinimalABI, 'transferFrom', TMode>({
    abi: ierc20MinimalABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc20MinimalABI}__.
 */
export function usePrepareIerc20MinimalWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc20MinimalABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc20MinimalABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc20MinimalABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc20MinimalABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareIerc20MinimalApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc20MinimalABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc20MinimalABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc20MinimalABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc20MinimalABI}__ and `functionName` set to `"transfer"`.
 */
export function usePrepareIerc20MinimalTransfer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc20MinimalABI, 'transfer'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc20MinimalABI,
    functionName: 'transfer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc20MinimalABI, 'transfer'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ierc20MinimalABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareIerc20MinimalTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ierc20MinimalABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ierc20MinimalABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ierc20MinimalABI, 'transferFrom'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc20MinimalABI}__.
 */
export function useIerc20MinimalEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof ierc20MinimalABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc20MinimalABI,
    ...config,
  } as UseContractEventConfig<typeof ierc20MinimalABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc20MinimalABI}__ and `eventName` set to `"Approval"`.
 */
export function useIerc20MinimalApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof ierc20MinimalABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc20MinimalABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof ierc20MinimalABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ierc20MinimalABI}__ and `eventName` set to `"Transfer"`.
 */
export function useIerc20MinimalTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof ierc20MinimalABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: ierc20MinimalABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof ierc20MinimalABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iFeesABI}__.
 */
export function useIFeesRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof iFeesABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iFeesABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({ abi: iFeesABI, ...config } as UseContractReadConfig<
    typeof iFeesABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iFeesABI}__ and `functionName` set to `"MIN_PROTOCOL_FEE_DENOMINATOR"`.
 */
export function useIFeesMinProtocolFeeDenominator<
  TFunctionName extends 'MIN_PROTOCOL_FEE_DENOMINATOR',
  TSelectData = ReadContractResult<typeof iFeesABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iFeesABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iFeesABI,
    functionName: 'MIN_PROTOCOL_FEE_DENOMINATOR',
    ...config,
  } as UseContractReadConfig<typeof iFeesABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iFeesABI}__ and `functionName` set to `"hookFeesAccrued"`.
 */
export function useIFeesHookFeesAccrued<
  TFunctionName extends 'hookFeesAccrued',
  TSelectData = ReadContractResult<typeof iFeesABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iFeesABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iFeesABI,
    functionName: 'hookFeesAccrued',
    ...config,
  } as UseContractReadConfig<typeof iFeesABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iFeesABI}__ and `functionName` set to `"protocolFeesAccrued"`.
 */
export function useIFeesProtocolFeesAccrued<
  TFunctionName extends 'protocolFeesAccrued',
  TSelectData = ReadContractResult<typeof iFeesABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iFeesABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iFeesABI,
    functionName: 'protocolFeesAccrued',
    ...config,
  } as UseContractReadConfig<typeof iFeesABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iFeesABI}__.
 */
export function useIFeesEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof iFeesABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: iFeesABI,
    ...config,
  } as UseContractEventConfig<typeof iFeesABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iFeesABI}__ and `eventName` set to `"ProtocolFeeControllerUpdated"`.
 */
export function useIFeesProtocolFeeControllerUpdatedEvent(
  config: Omit<
    UseContractEventConfig<typeof iFeesABI, 'ProtocolFeeControllerUpdated'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iFeesABI,
    eventName: 'ProtocolFeeControllerUpdated',
    ...config,
  } as UseContractEventConfig<typeof iFeesABI, 'ProtocolFeeControllerUpdated'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iHookFeeManagerABI}__.
 */
export function useIHookFeeManagerRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof iHookFeeManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof iHookFeeManagerABI,
      TFunctionName,
      TSelectData
    >,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: iHookFeeManagerABI,
    ...config,
  } as UseContractReadConfig<
    typeof iHookFeeManagerABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iHookFeeManagerABI}__ and `functionName` set to `"getHookFees"`.
 */
export function useIHookFeeManagerGetHookFees<
  TFunctionName extends 'getHookFees',
  TSelectData = ReadContractResult<typeof iHookFeeManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<
      typeof iHookFeeManagerABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iHookFeeManagerABI,
    functionName: 'getHookFees',
    ...config,
  } as UseContractReadConfig<
    typeof iHookFeeManagerABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iHooksABI}__.
 */
export function useIHooksWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof iHooksABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof iHooksABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof iHooksABI, TFunctionName, TMode>({
    abi: iHooksABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iHooksABI}__ and `functionName` set to `"afterDonate"`.
 */
export function useIHooksAfterDonate<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iHooksABI,
          'afterDonate'
        >['request']['abi'],
        'afterDonate',
        TMode
      > & { functionName?: 'afterDonate' }
    : UseContractWriteConfig<typeof iHooksABI, 'afterDonate', TMode> & {
        abi?: never
        functionName?: 'afterDonate'
      } = {} as any,
) {
  return useContractWrite<typeof iHooksABI, 'afterDonate', TMode>({
    abi: iHooksABI,
    functionName: 'afterDonate',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iHooksABI}__ and `functionName` set to `"afterInitialize"`.
 */
export function useIHooksAfterInitialize<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iHooksABI,
          'afterInitialize'
        >['request']['abi'],
        'afterInitialize',
        TMode
      > & { functionName?: 'afterInitialize' }
    : UseContractWriteConfig<typeof iHooksABI, 'afterInitialize', TMode> & {
        abi?: never
        functionName?: 'afterInitialize'
      } = {} as any,
) {
  return useContractWrite<typeof iHooksABI, 'afterInitialize', TMode>({
    abi: iHooksABI,
    functionName: 'afterInitialize',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iHooksABI}__ and `functionName` set to `"afterModifyPosition"`.
 */
export function useIHooksAfterModifyPosition<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iHooksABI,
          'afterModifyPosition'
        >['request']['abi'],
        'afterModifyPosition',
        TMode
      > & { functionName?: 'afterModifyPosition' }
    : UseContractWriteConfig<typeof iHooksABI, 'afterModifyPosition', TMode> & {
        abi?: never
        functionName?: 'afterModifyPosition'
      } = {} as any,
) {
  return useContractWrite<typeof iHooksABI, 'afterModifyPosition', TMode>({
    abi: iHooksABI,
    functionName: 'afterModifyPosition',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iHooksABI}__ and `functionName` set to `"afterSwap"`.
 */
export function useIHooksAfterSwap<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iHooksABI,
          'afterSwap'
        >['request']['abi'],
        'afterSwap',
        TMode
      > & { functionName?: 'afterSwap' }
    : UseContractWriteConfig<typeof iHooksABI, 'afterSwap', TMode> & {
        abi?: never
        functionName?: 'afterSwap'
      } = {} as any,
) {
  return useContractWrite<typeof iHooksABI, 'afterSwap', TMode>({
    abi: iHooksABI,
    functionName: 'afterSwap',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iHooksABI}__ and `functionName` set to `"beforeDonate"`.
 */
export function useIHooksBeforeDonate<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iHooksABI,
          'beforeDonate'
        >['request']['abi'],
        'beforeDonate',
        TMode
      > & { functionName?: 'beforeDonate' }
    : UseContractWriteConfig<typeof iHooksABI, 'beforeDonate', TMode> & {
        abi?: never
        functionName?: 'beforeDonate'
      } = {} as any,
) {
  return useContractWrite<typeof iHooksABI, 'beforeDonate', TMode>({
    abi: iHooksABI,
    functionName: 'beforeDonate',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iHooksABI}__ and `functionName` set to `"beforeInitialize"`.
 */
export function useIHooksBeforeInitialize<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iHooksABI,
          'beforeInitialize'
        >['request']['abi'],
        'beforeInitialize',
        TMode
      > & { functionName?: 'beforeInitialize' }
    : UseContractWriteConfig<typeof iHooksABI, 'beforeInitialize', TMode> & {
        abi?: never
        functionName?: 'beforeInitialize'
      } = {} as any,
) {
  return useContractWrite<typeof iHooksABI, 'beforeInitialize', TMode>({
    abi: iHooksABI,
    functionName: 'beforeInitialize',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iHooksABI}__ and `functionName` set to `"beforeModifyPosition"`.
 */
export function useIHooksBeforeModifyPosition<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iHooksABI,
          'beforeModifyPosition'
        >['request']['abi'],
        'beforeModifyPosition',
        TMode
      > & { functionName?: 'beforeModifyPosition' }
    : UseContractWriteConfig<
        typeof iHooksABI,
        'beforeModifyPosition',
        TMode
      > & {
        abi?: never
        functionName?: 'beforeModifyPosition'
      } = {} as any,
) {
  return useContractWrite<typeof iHooksABI, 'beforeModifyPosition', TMode>({
    abi: iHooksABI,
    functionName: 'beforeModifyPosition',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iHooksABI}__ and `functionName` set to `"beforeSwap"`.
 */
export function useIHooksBeforeSwap<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iHooksABI,
          'beforeSwap'
        >['request']['abi'],
        'beforeSwap',
        TMode
      > & { functionName?: 'beforeSwap' }
    : UseContractWriteConfig<typeof iHooksABI, 'beforeSwap', TMode> & {
        abi?: never
        functionName?: 'beforeSwap'
      } = {} as any,
) {
  return useContractWrite<typeof iHooksABI, 'beforeSwap', TMode>({
    abi: iHooksABI,
    functionName: 'beforeSwap',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iHooksABI}__.
 */
export function usePrepareIHooksWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iHooksABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iHooksABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof iHooksABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iHooksABI}__ and `functionName` set to `"afterDonate"`.
 */
export function usePrepareIHooksAfterDonate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iHooksABI, 'afterDonate'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iHooksABI,
    functionName: 'afterDonate',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iHooksABI, 'afterDonate'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iHooksABI}__ and `functionName` set to `"afterInitialize"`.
 */
export function usePrepareIHooksAfterInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iHooksABI, 'afterInitialize'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iHooksABI,
    functionName: 'afterInitialize',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iHooksABI, 'afterInitialize'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iHooksABI}__ and `functionName` set to `"afterModifyPosition"`.
 */
export function usePrepareIHooksAfterModifyPosition(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iHooksABI, 'afterModifyPosition'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iHooksABI,
    functionName: 'afterModifyPosition',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iHooksABI, 'afterModifyPosition'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iHooksABI}__ and `functionName` set to `"afterSwap"`.
 */
export function usePrepareIHooksAfterSwap(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iHooksABI, 'afterSwap'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iHooksABI,
    functionName: 'afterSwap',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iHooksABI, 'afterSwap'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iHooksABI}__ and `functionName` set to `"beforeDonate"`.
 */
export function usePrepareIHooksBeforeDonate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iHooksABI, 'beforeDonate'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iHooksABI,
    functionName: 'beforeDonate',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iHooksABI, 'beforeDonate'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iHooksABI}__ and `functionName` set to `"beforeInitialize"`.
 */
export function usePrepareIHooksBeforeInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iHooksABI, 'beforeInitialize'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iHooksABI,
    functionName: 'beforeInitialize',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iHooksABI, 'beforeInitialize'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iHooksABI}__ and `functionName` set to `"beforeModifyPosition"`.
 */
export function usePrepareIHooksBeforeModifyPosition(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iHooksABI, 'beforeModifyPosition'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iHooksABI,
    functionName: 'beforeModifyPosition',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iHooksABI, 'beforeModifyPosition'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iHooksABI}__ and `functionName` set to `"beforeSwap"`.
 */
export function usePrepareIHooksBeforeSwap(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iHooksABI, 'beforeSwap'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iHooksABI,
    functionName: 'beforeSwap',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iHooksABI, 'beforeSwap'>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iLockCallbackABI}__.
 */
export function useILockCallbackWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iLockCallbackABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof iLockCallbackABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof iLockCallbackABI, TFunctionName, TMode>({
    abi: iLockCallbackABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iLockCallbackABI}__ and `functionName` set to `"lockAcquired"`.
 */
export function useILockCallbackLockAcquired<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iLockCallbackABI,
          'lockAcquired'
        >['request']['abi'],
        'lockAcquired',
        TMode
      > & { functionName?: 'lockAcquired' }
    : UseContractWriteConfig<typeof iLockCallbackABI, 'lockAcquired', TMode> & {
        abi?: never
        functionName?: 'lockAcquired'
      } = {} as any,
) {
  return useContractWrite<typeof iLockCallbackABI, 'lockAcquired', TMode>({
    abi: iLockCallbackABI,
    functionName: 'lockAcquired',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iLockCallbackABI}__.
 */
export function usePrepareILockCallbackWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iLockCallbackABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iLockCallbackABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof iLockCallbackABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iLockCallbackABI}__ and `functionName` set to `"lockAcquired"`.
 */
export function usePrepareILockCallbackLockAcquired(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iLockCallbackABI, 'lockAcquired'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iLockCallbackABI,
    functionName: 'lockAcquired',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iLockCallbackABI, 'lockAcquired'>)
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
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iPoolManagerABI}__.
 */
export function useIPoolManagerRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof iPoolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iPoolManagerABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: iPoolManagerABI,
    ...config,
  } as UseContractReadConfig<
    typeof iPoolManagerABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"MAX_TICK_SPACING"`.
 */
export function useIPoolManagerMaxTickSpacing<
  TFunctionName extends 'MAX_TICK_SPACING',
  TSelectData = ReadContractResult<typeof iPoolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iPoolManagerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iPoolManagerABI,
    functionName: 'MAX_TICK_SPACING',
    ...config,
  } as UseContractReadConfig<
    typeof iPoolManagerABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"MIN_PROTOCOL_FEE_DENOMINATOR"`.
 */
export function useIPoolManagerMinProtocolFeeDenominator<
  TFunctionName extends 'MIN_PROTOCOL_FEE_DENOMINATOR',
  TSelectData = ReadContractResult<typeof iPoolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iPoolManagerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iPoolManagerABI,
    functionName: 'MIN_PROTOCOL_FEE_DENOMINATOR',
    ...config,
  } as UseContractReadConfig<
    typeof iPoolManagerABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"MIN_TICK_SPACING"`.
 */
export function useIPoolManagerMinTickSpacing<
  TFunctionName extends 'MIN_TICK_SPACING',
  TSelectData = ReadContractResult<typeof iPoolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iPoolManagerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iPoolManagerABI,
    functionName: 'MIN_TICK_SPACING',
    ...config,
  } as UseContractReadConfig<
    typeof iPoolManagerABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useIPoolManagerBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof iPoolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iPoolManagerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iPoolManagerABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<
    typeof iPoolManagerABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"balanceOfBatch"`.
 */
export function useIPoolManagerBalanceOfBatch<
  TFunctionName extends 'balanceOfBatch',
  TSelectData = ReadContractResult<typeof iPoolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iPoolManagerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iPoolManagerABI,
    functionName: 'balanceOfBatch',
    ...config,
  } as UseContractReadConfig<
    typeof iPoolManagerABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"currencyDelta"`.
 */
export function useIPoolManagerCurrencyDelta<
  TFunctionName extends 'currencyDelta',
  TSelectData = ReadContractResult<typeof iPoolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iPoolManagerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iPoolManagerABI,
    functionName: 'currencyDelta',
    ...config,
  } as UseContractReadConfig<
    typeof iPoolManagerABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"extsload"`.
 */
export function useIPoolManagerExtsload<
  TFunctionName extends 'extsload',
  TSelectData = ReadContractResult<typeof iPoolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iPoolManagerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iPoolManagerABI,
    functionName: 'extsload',
    ...config,
  } as UseContractReadConfig<
    typeof iPoolManagerABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"getLiquidity"`.
 */
export function useIPoolManagerGetLiquidity<
  TFunctionName extends 'getLiquidity',
  TSelectData = ReadContractResult<typeof iPoolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iPoolManagerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iPoolManagerABI,
    functionName: 'getLiquidity',
    ...config,
  } as UseContractReadConfig<
    typeof iPoolManagerABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"getLock"`.
 */
export function useIPoolManagerGetLock<
  TFunctionName extends 'getLock',
  TSelectData = ReadContractResult<typeof iPoolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iPoolManagerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iPoolManagerABI,
    functionName: 'getLock',
    ...config,
  } as UseContractReadConfig<
    typeof iPoolManagerABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"getPosition"`.
 */
export function useIPoolManagerGetPosition<
  TFunctionName extends 'getPosition',
  TSelectData = ReadContractResult<typeof iPoolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iPoolManagerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iPoolManagerABI,
    functionName: 'getPosition',
    ...config,
  } as UseContractReadConfig<
    typeof iPoolManagerABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"getSlot0"`.
 */
export function useIPoolManagerGetSlot0<
  TFunctionName extends 'getSlot0',
  TSelectData = ReadContractResult<typeof iPoolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iPoolManagerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iPoolManagerABI,
    functionName: 'getSlot0',
    ...config,
  } as UseContractReadConfig<
    typeof iPoolManagerABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"hookFeesAccrued"`.
 */
export function useIPoolManagerHookFeesAccrued<
  TFunctionName extends 'hookFeesAccrued',
  TSelectData = ReadContractResult<typeof iPoolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iPoolManagerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iPoolManagerABI,
    functionName: 'hookFeesAccrued',
    ...config,
  } as UseContractReadConfig<
    typeof iPoolManagerABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"isApprovedForAll"`.
 */
export function useIPoolManagerIsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof iPoolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iPoolManagerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iPoolManagerABI,
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<
    typeof iPoolManagerABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"lockData"`.
 */
export function useIPoolManagerLockData<
  TFunctionName extends 'lockData',
  TSelectData = ReadContractResult<typeof iPoolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iPoolManagerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iPoolManagerABI,
    functionName: 'lockData',
    ...config,
  } as UseContractReadConfig<
    typeof iPoolManagerABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"protocolFeesAccrued"`.
 */
export function useIPoolManagerProtocolFeesAccrued<
  TFunctionName extends 'protocolFeesAccrued',
  TSelectData = ReadContractResult<typeof iPoolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iPoolManagerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iPoolManagerABI,
    functionName: 'protocolFeesAccrued',
    ...config,
  } as UseContractReadConfig<
    typeof iPoolManagerABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"reservesOf"`.
 */
export function useIPoolManagerReservesOf<
  TFunctionName extends 'reservesOf',
  TSelectData = ReadContractResult<typeof iPoolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iPoolManagerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iPoolManagerABI,
    functionName: 'reservesOf',
    ...config,
  } as UseContractReadConfig<
    typeof iPoolManagerABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useIPoolManagerSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof iPoolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof iPoolManagerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iPoolManagerABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<
    typeof iPoolManagerABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__.
 */
export function useIPoolManagerWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iPoolManagerABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof iPoolManagerABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof iPoolManagerABI, TFunctionName, TMode>({
    abi: iPoolManagerABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"donate"`.
 */
export function useIPoolManagerDonate<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iPoolManagerABI,
          'donate'
        >['request']['abi'],
        'donate',
        TMode
      > & { functionName?: 'donate' }
    : UseContractWriteConfig<typeof iPoolManagerABI, 'donate', TMode> & {
        abi?: never
        functionName?: 'donate'
      } = {} as any,
) {
  return useContractWrite<typeof iPoolManagerABI, 'donate', TMode>({
    abi: iPoolManagerABI,
    functionName: 'donate',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"initialize"`.
 */
export function useIPoolManagerInitialize<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iPoolManagerABI,
          'initialize'
        >['request']['abi'],
        'initialize',
        TMode
      > & { functionName?: 'initialize' }
    : UseContractWriteConfig<typeof iPoolManagerABI, 'initialize', TMode> & {
        abi?: never
        functionName?: 'initialize'
      } = {} as any,
) {
  return useContractWrite<typeof iPoolManagerABI, 'initialize', TMode>({
    abi: iPoolManagerABI,
    functionName: 'initialize',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"lock"`.
 */
export function useIPoolManagerLock<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iPoolManagerABI,
          'lock'
        >['request']['abi'],
        'lock',
        TMode
      > & { functionName?: 'lock' }
    : UseContractWriteConfig<typeof iPoolManagerABI, 'lock', TMode> & {
        abi?: never
        functionName?: 'lock'
      } = {} as any,
) {
  return useContractWrite<typeof iPoolManagerABI, 'lock', TMode>({
    abi: iPoolManagerABI,
    functionName: 'lock',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"mint"`.
 */
export function useIPoolManagerMint<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iPoolManagerABI,
          'mint'
        >['request']['abi'],
        'mint',
        TMode
      > & { functionName?: 'mint' }
    : UseContractWriteConfig<typeof iPoolManagerABI, 'mint', TMode> & {
        abi?: never
        functionName?: 'mint'
      } = {} as any,
) {
  return useContractWrite<typeof iPoolManagerABI, 'mint', TMode>({
    abi: iPoolManagerABI,
    functionName: 'mint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"modifyPosition"`.
 */
export function useIPoolManagerModifyPosition<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iPoolManagerABI,
          'modifyPosition'
        >['request']['abi'],
        'modifyPosition',
        TMode
      > & { functionName?: 'modifyPosition' }
    : UseContractWriteConfig<
        typeof iPoolManagerABI,
        'modifyPosition',
        TMode
      > & {
        abi?: never
        functionName?: 'modifyPosition'
      } = {} as any,
) {
  return useContractWrite<typeof iPoolManagerABI, 'modifyPosition', TMode>({
    abi: iPoolManagerABI,
    functionName: 'modifyPosition',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"safeBatchTransferFrom"`.
 */
export function useIPoolManagerSafeBatchTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iPoolManagerABI,
          'safeBatchTransferFrom'
        >['request']['abi'],
        'safeBatchTransferFrom',
        TMode
      > & { functionName?: 'safeBatchTransferFrom' }
    : UseContractWriteConfig<
        typeof iPoolManagerABI,
        'safeBatchTransferFrom',
        TMode
      > & {
        abi?: never
        functionName?: 'safeBatchTransferFrom'
      } = {} as any,
) {
  return useContractWrite<
    typeof iPoolManagerABI,
    'safeBatchTransferFrom',
    TMode
  >({
    abi: iPoolManagerABI,
    functionName: 'safeBatchTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function useIPoolManagerSafeTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iPoolManagerABI,
          'safeTransferFrom'
        >['request']['abi'],
        'safeTransferFrom',
        TMode
      > & { functionName?: 'safeTransferFrom' }
    : UseContractWriteConfig<
        typeof iPoolManagerABI,
        'safeTransferFrom',
        TMode
      > & {
        abi?: never
        functionName?: 'safeTransferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof iPoolManagerABI, 'safeTransferFrom', TMode>({
    abi: iPoolManagerABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function useIPoolManagerSetApprovalForAll<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iPoolManagerABI,
          'setApprovalForAll'
        >['request']['abi'],
        'setApprovalForAll',
        TMode
      > & { functionName?: 'setApprovalForAll' }
    : UseContractWriteConfig<
        typeof iPoolManagerABI,
        'setApprovalForAll',
        TMode
      > & {
        abi?: never
        functionName?: 'setApprovalForAll'
      } = {} as any,
) {
  return useContractWrite<typeof iPoolManagerABI, 'setApprovalForAll', TMode>({
    abi: iPoolManagerABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"setHookFees"`.
 */
export function useIPoolManagerSetHookFees<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iPoolManagerABI,
          'setHookFees'
        >['request']['abi'],
        'setHookFees',
        TMode
      > & { functionName?: 'setHookFees' }
    : UseContractWriteConfig<typeof iPoolManagerABI, 'setHookFees', TMode> & {
        abi?: never
        functionName?: 'setHookFees'
      } = {} as any,
) {
  return useContractWrite<typeof iPoolManagerABI, 'setHookFees', TMode>({
    abi: iPoolManagerABI,
    functionName: 'setHookFees',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"setProtocolFees"`.
 */
export function useIPoolManagerSetProtocolFees<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iPoolManagerABI,
          'setProtocolFees'
        >['request']['abi'],
        'setProtocolFees',
        TMode
      > & { functionName?: 'setProtocolFees' }
    : UseContractWriteConfig<
        typeof iPoolManagerABI,
        'setProtocolFees',
        TMode
      > & {
        abi?: never
        functionName?: 'setProtocolFees'
      } = {} as any,
) {
  return useContractWrite<typeof iPoolManagerABI, 'setProtocolFees', TMode>({
    abi: iPoolManagerABI,
    functionName: 'setProtocolFees',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"settle"`.
 */
export function useIPoolManagerSettle<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iPoolManagerABI,
          'settle'
        >['request']['abi'],
        'settle',
        TMode
      > & { functionName?: 'settle' }
    : UseContractWriteConfig<typeof iPoolManagerABI, 'settle', TMode> & {
        abi?: never
        functionName?: 'settle'
      } = {} as any,
) {
  return useContractWrite<typeof iPoolManagerABI, 'settle', TMode>({
    abi: iPoolManagerABI,
    functionName: 'settle',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"swap"`.
 */
export function useIPoolManagerSwap<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iPoolManagerABI,
          'swap'
        >['request']['abi'],
        'swap',
        TMode
      > & { functionName?: 'swap' }
    : UseContractWriteConfig<typeof iPoolManagerABI, 'swap', TMode> & {
        abi?: never
        functionName?: 'swap'
      } = {} as any,
) {
  return useContractWrite<typeof iPoolManagerABI, 'swap', TMode>({
    abi: iPoolManagerABI,
    functionName: 'swap',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"take"`.
 */
export function useIPoolManagerTake<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof iPoolManagerABI,
          'take'
        >['request']['abi'],
        'take',
        TMode
      > & { functionName?: 'take' }
    : UseContractWriteConfig<typeof iPoolManagerABI, 'take', TMode> & {
        abi?: never
        functionName?: 'take'
      } = {} as any,
) {
  return useContractWrite<typeof iPoolManagerABI, 'take', TMode>({
    abi: iPoolManagerABI,
    functionName: 'take',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__.
 */
export function usePrepareIPoolManagerWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iPoolManagerABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iPoolManagerABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof iPoolManagerABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"donate"`.
 */
export function usePrepareIPoolManagerDonate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iPoolManagerABI, 'donate'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iPoolManagerABI,
    functionName: 'donate',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iPoolManagerABI, 'donate'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"initialize"`.
 */
export function usePrepareIPoolManagerInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iPoolManagerABI, 'initialize'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iPoolManagerABI,
    functionName: 'initialize',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iPoolManagerABI, 'initialize'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"lock"`.
 */
export function usePrepareIPoolManagerLock(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iPoolManagerABI, 'lock'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iPoolManagerABI,
    functionName: 'lock',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iPoolManagerABI, 'lock'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"mint"`.
 */
export function usePrepareIPoolManagerMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iPoolManagerABI, 'mint'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iPoolManagerABI,
    functionName: 'mint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iPoolManagerABI, 'mint'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"modifyPosition"`.
 */
export function usePrepareIPoolManagerModifyPosition(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iPoolManagerABI, 'modifyPosition'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iPoolManagerABI,
    functionName: 'modifyPosition',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iPoolManagerABI, 'modifyPosition'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"safeBatchTransferFrom"`.
 */
export function usePrepareIPoolManagerSafeBatchTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof iPoolManagerABI,
      'safeBatchTransferFrom'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iPoolManagerABI,
    functionName: 'safeBatchTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof iPoolManagerABI,
    'safeBatchTransferFrom'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePrepareIPoolManagerSafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iPoolManagerABI, 'safeTransferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iPoolManagerABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof iPoolManagerABI,
    'safeTransferFrom'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePrepareIPoolManagerSetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iPoolManagerABI, 'setApprovalForAll'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iPoolManagerABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof iPoolManagerABI,
    'setApprovalForAll'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"setHookFees"`.
 */
export function usePrepareIPoolManagerSetHookFees(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iPoolManagerABI, 'setHookFees'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iPoolManagerABI,
    functionName: 'setHookFees',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iPoolManagerABI, 'setHookFees'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"setProtocolFees"`.
 */
export function usePrepareIPoolManagerSetProtocolFees(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iPoolManagerABI, 'setProtocolFees'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iPoolManagerABI,
    functionName: 'setProtocolFees',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iPoolManagerABI, 'setProtocolFees'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"settle"`.
 */
export function usePrepareIPoolManagerSettle(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iPoolManagerABI, 'settle'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iPoolManagerABI,
    functionName: 'settle',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iPoolManagerABI, 'settle'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"swap"`.
 */
export function usePrepareIPoolManagerSwap(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iPoolManagerABI, 'swap'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iPoolManagerABI,
    functionName: 'swap',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iPoolManagerABI, 'swap'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link iPoolManagerABI}__ and `functionName` set to `"take"`.
 */
export function usePrepareIPoolManagerTake(
  config: Omit<
    UsePrepareContractWriteConfig<typeof iPoolManagerABI, 'take'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: iPoolManagerABI,
    functionName: 'take',
    ...config,
  } as UsePrepareContractWriteConfig<typeof iPoolManagerABI, 'take'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iPoolManagerABI}__.
 */
export function useIPoolManagerEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof iPoolManagerABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: iPoolManagerABI,
    ...config,
  } as UseContractEventConfig<typeof iPoolManagerABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iPoolManagerABI}__ and `eventName` set to `"ApprovalForAll"`.
 */
export function useIPoolManagerApprovalForAllEvent(
  config: Omit<
    UseContractEventConfig<typeof iPoolManagerABI, 'ApprovalForAll'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iPoolManagerABI,
    eventName: 'ApprovalForAll',
    ...config,
  } as UseContractEventConfig<typeof iPoolManagerABI, 'ApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iPoolManagerABI}__ and `eventName` set to `"HookFeeUpdated"`.
 */
export function useIPoolManagerHookFeeUpdatedEvent(
  config: Omit<
    UseContractEventConfig<typeof iPoolManagerABI, 'HookFeeUpdated'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iPoolManagerABI,
    eventName: 'HookFeeUpdated',
    ...config,
  } as UseContractEventConfig<typeof iPoolManagerABI, 'HookFeeUpdated'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iPoolManagerABI}__ and `eventName` set to `"Initialize"`.
 */
export function useIPoolManagerInitializeEvent(
  config: Omit<
    UseContractEventConfig<typeof iPoolManagerABI, 'Initialize'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iPoolManagerABI,
    eventName: 'Initialize',
    ...config,
  } as UseContractEventConfig<typeof iPoolManagerABI, 'Initialize'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iPoolManagerABI}__ and `eventName` set to `"ModifyPosition"`.
 */
export function useIPoolManagerModifyPositionEvent(
  config: Omit<
    UseContractEventConfig<typeof iPoolManagerABI, 'ModifyPosition'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iPoolManagerABI,
    eventName: 'ModifyPosition',
    ...config,
  } as UseContractEventConfig<typeof iPoolManagerABI, 'ModifyPosition'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iPoolManagerABI}__ and `eventName` set to `"ProtocolFeeControllerUpdated"`.
 */
export function useIPoolManagerProtocolFeeControllerUpdatedEvent(
  config: Omit<
    UseContractEventConfig<
      typeof iPoolManagerABI,
      'ProtocolFeeControllerUpdated'
    >,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iPoolManagerABI,
    eventName: 'ProtocolFeeControllerUpdated',
    ...config,
  } as UseContractEventConfig<
    typeof iPoolManagerABI,
    'ProtocolFeeControllerUpdated'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iPoolManagerABI}__ and `eventName` set to `"ProtocolFeeUpdated"`.
 */
export function useIPoolManagerProtocolFeeUpdatedEvent(
  config: Omit<
    UseContractEventConfig<typeof iPoolManagerABI, 'ProtocolFeeUpdated'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iPoolManagerABI,
    eventName: 'ProtocolFeeUpdated',
    ...config,
  } as UseContractEventConfig<typeof iPoolManagerABI, 'ProtocolFeeUpdated'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iPoolManagerABI}__ and `eventName` set to `"Swap"`.
 */
export function useIPoolManagerSwapEvent(
  config: Omit<
    UseContractEventConfig<typeof iPoolManagerABI, 'Swap'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iPoolManagerABI,
    eventName: 'Swap',
    ...config,
  } as UseContractEventConfig<typeof iPoolManagerABI, 'Swap'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iPoolManagerABI}__ and `eventName` set to `"TransferBatch"`.
 */
export function useIPoolManagerTransferBatchEvent(
  config: Omit<
    UseContractEventConfig<typeof iPoolManagerABI, 'TransferBatch'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iPoolManagerABI,
    eventName: 'TransferBatch',
    ...config,
  } as UseContractEventConfig<typeof iPoolManagerABI, 'TransferBatch'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iPoolManagerABI}__ and `eventName` set to `"TransferSingle"`.
 */
export function useIPoolManagerTransferSingleEvent(
  config: Omit<
    UseContractEventConfig<typeof iPoolManagerABI, 'TransferSingle'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iPoolManagerABI,
    eventName: 'TransferSingle',
    ...config,
  } as UseContractEventConfig<typeof iPoolManagerABI, 'TransferSingle'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link iPoolManagerABI}__ and `eventName` set to `"URI"`.
 */
export function useIPoolManagerUriEvent(
  config: Omit<
    UseContractEventConfig<typeof iPoolManagerABI, 'URI'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: iPoolManagerABI,
    eventName: 'URI',
    ...config,
  } as UseContractEventConfig<typeof iPoolManagerABI, 'URI'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iProtocolFeeControllerABI}__.
 */
export function useIProtocolFeeControllerRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<
    typeof iProtocolFeeControllerABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof iProtocolFeeControllerABI,
      TFunctionName,
      TSelectData
    >,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: iProtocolFeeControllerABI,
    ...config,
  } as UseContractReadConfig<
    typeof iProtocolFeeControllerABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link iProtocolFeeControllerABI}__ and `functionName` set to `"protocolFeesForPool"`.
 */
export function useIProtocolFeeControllerProtocolFeesForPool<
  TFunctionName extends 'protocolFeesForPool',
  TSelectData = ReadContractResult<
    typeof iProtocolFeeControllerABI,
    TFunctionName
  >,
>(
  config: Omit<
    UseContractReadConfig<
      typeof iProtocolFeeControllerABI,
      TFunctionName,
      TSelectData
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: iProtocolFeeControllerABI,
    functionName: 'protocolFeesForPool',
    ...config,
  } as UseContractReadConfig<
    typeof iProtocolFeeControllerABI,
    TFunctionName,
    TSelectData
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
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: multiEdition721ABI,
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
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: multiEdition721ABI,
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
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: multiEdition721ABI,
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
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: multiEdition721ABI,
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
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: multiEdition721ABI,
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
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: multiEdition721ABI,
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
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: multiEdition721ABI,
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
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: multiEdition721ABI,
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
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: multiEdition721ABI,
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
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: multiEdition721ABI,
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
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: multiEdition721ABI,
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
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof multiEdition721ABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<
        typeof multiEdition721ABI,
        TFunctionName,
        TMode
      > & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof multiEdition721ABI, TFunctionName, TMode>({
    abi: multiEdition721ABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link multiEdition721ABI}__ and `functionName` set to `"approve"`.
 */
export function useMultiEdition721Approve<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof multiEdition721ABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof multiEdition721ABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof multiEdition721ABI, 'approve', TMode>({
    abi: multiEdition721ABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link multiEdition721ABI}__ and `functionName` set to `"mintBatch"`.
 */
export function useMultiEdition721MintBatch<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof multiEdition721ABI,
          'mintBatch'
        >['request']['abi'],
        'mintBatch',
        TMode
      > & { functionName?: 'mintBatch' }
    : UseContractWriteConfig<typeof multiEdition721ABI, 'mintBatch', TMode> & {
        abi?: never
        functionName?: 'mintBatch'
      } = {} as any,
) {
  return useContractWrite<typeof multiEdition721ABI, 'mintBatch', TMode>({
    abi: multiEdition721ABI,
    functionName: 'mintBatch',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link multiEdition721ABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function useMultiEdition721SafeTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof multiEdition721ABI,
          'safeTransferFrom'
        >['request']['abi'],
        'safeTransferFrom',
        TMode
      > & { functionName?: 'safeTransferFrom' }
    : UseContractWriteConfig<
        typeof multiEdition721ABI,
        'safeTransferFrom',
        TMode
      > & {
        abi?: never
        functionName?: 'safeTransferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof multiEdition721ABI, 'safeTransferFrom', TMode>(
    {
      abi: multiEdition721ABI,
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
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof multiEdition721ABI,
          'setApprovalForAll'
        >['request']['abi'],
        'setApprovalForAll',
        TMode
      > & { functionName?: 'setApprovalForAll' }
    : UseContractWriteConfig<
        typeof multiEdition721ABI,
        'setApprovalForAll',
        TMode
      > & {
        abi?: never
        functionName?: 'setApprovalForAll'
      } = {} as any,
) {
  return useContractWrite<
    typeof multiEdition721ABI,
    'setApprovalForAll',
    TMode
  >({
    abi: multiEdition721ABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link multiEdition721ABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useMultiEdition721TransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof multiEdition721ABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<
        typeof multiEdition721ABI,
        'transferFrom',
        TMode
      > & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof multiEdition721ABI, 'transferFrom', TMode>({
    abi: multiEdition721ABI,
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
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: multiEdition721ABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof multiEdition721ABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link multiEdition721ABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareMultiEdition721Approve(
  config: Omit<
    UsePrepareContractWriteConfig<typeof multiEdition721ABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: multiEdition721ABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof multiEdition721ABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link multiEdition721ABI}__ and `functionName` set to `"mintBatch"`.
 */
export function usePrepareMultiEdition721MintBatch(
  config: Omit<
    UsePrepareContractWriteConfig<typeof multiEdition721ABI, 'mintBatch'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: multiEdition721ABI,
    functionName: 'mintBatch',
    ...config,
  } as UsePrepareContractWriteConfig<typeof multiEdition721ABI, 'mintBatch'>)
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
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: multiEdition721ABI,
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
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: multiEdition721ABI,
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
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: multiEdition721ABI,
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
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: multiEdition721ABI,
    ...config,
  } as UseContractEventConfig<typeof multiEdition721ABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link multiEdition721ABI}__ and `eventName` set to `"Approval"`.
 */
export function useMultiEdition721ApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof multiEdition721ABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: multiEdition721ABI,
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
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: multiEdition721ABI,
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
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: multiEdition721ABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof multiEdition721ABI, 'Transfer'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ownedABI}__.
 */
export function useOwnedRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof ownedABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ownedABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({ abi: ownedABI, ...config } as UseContractReadConfig<
    typeof ownedABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link ownedABI}__ and `functionName` set to `"owner"`.
 */
export function useOwnedOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof ownedABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof ownedABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: ownedABI,
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof ownedABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ownedABI}__.
 */
export function useOwnedWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<typeof ownedABI, string>['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof ownedABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof ownedABI, TFunctionName, TMode>({
    abi: ownedABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link ownedABI}__ and `functionName` set to `"setOwner"`.
 */
export function useOwnedSetOwner<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof ownedABI,
          'setOwner'
        >['request']['abi'],
        'setOwner',
        TMode
      > & { functionName?: 'setOwner' }
    : UseContractWriteConfig<typeof ownedABI, 'setOwner', TMode> & {
        abi?: never
        functionName?: 'setOwner'
      } = {} as any,
) {
  return useContractWrite<typeof ownedABI, 'setOwner', TMode>({
    abi: ownedABI,
    functionName: 'setOwner',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ownedABI}__.
 */
export function usePrepareOwnedWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ownedABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ownedABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof ownedABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link ownedABI}__ and `functionName` set to `"setOwner"`.
 */
export function usePrepareOwnedSetOwner(
  config: Omit<
    UsePrepareContractWriteConfig<typeof ownedABI, 'setOwner'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: ownedABI,
    functionName: 'setOwner',
    ...config,
  } as UsePrepareContractWriteConfig<typeof ownedABI, 'setOwner'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ownedABI}__.
 */
export function useOwnedEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof ownedABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: ownedABI,
    ...config,
  } as UseContractEventConfig<typeof ownedABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link ownedABI}__ and `eventName` set to `"OwnerChanged"`.
 */
export function useOwnedOwnerChangedEvent(
  config: Omit<
    UseContractEventConfig<typeof ownedABI, 'OwnerChanged'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: ownedABI,
    eventName: 'OwnerChanged',
    ...config,
  } as UseContractEventConfig<typeof ownedABI, 'OwnerChanged'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolManagerABI}__.
 */
export function usePoolManagerRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof poolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: poolManagerABI,
    ...config,
  } as UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"MAX_TICK_SPACING"`.
 */
export function usePoolManagerMaxTickSpacing<
  TFunctionName extends 'MAX_TICK_SPACING',
  TSelectData = ReadContractResult<typeof poolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: poolManagerABI,
    functionName: 'MAX_TICK_SPACING',
    ...config,
  } as UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"MIN_PROTOCOL_FEE_DENOMINATOR"`.
 */
export function usePoolManagerMinProtocolFeeDenominator<
  TFunctionName extends 'MIN_PROTOCOL_FEE_DENOMINATOR',
  TSelectData = ReadContractResult<typeof poolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: poolManagerABI,
    functionName: 'MIN_PROTOCOL_FEE_DENOMINATOR',
    ...config,
  } as UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"MIN_TICK_SPACING"`.
 */
export function usePoolManagerMinTickSpacing<
  TFunctionName extends 'MIN_TICK_SPACING',
  TSelectData = ReadContractResult<typeof poolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: poolManagerABI,
    functionName: 'MIN_TICK_SPACING',
    ...config,
  } as UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"balanceOf"`.
 */
export function usePoolManagerBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof poolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: poolManagerABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"balanceOfBatch"`.
 */
export function usePoolManagerBalanceOfBatch<
  TFunctionName extends 'balanceOfBatch',
  TSelectData = ReadContractResult<typeof poolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: poolManagerABI,
    functionName: 'balanceOfBatch',
    ...config,
  } as UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"currencyDelta"`.
 */
export function usePoolManagerCurrencyDelta<
  TFunctionName extends 'currencyDelta',
  TSelectData = ReadContractResult<typeof poolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: poolManagerABI,
    functionName: 'currencyDelta',
    ...config,
  } as UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"extsload"`.
 */
export function usePoolManagerExtsload<
  TFunctionName extends 'extsload',
  TSelectData = ReadContractResult<typeof poolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: poolManagerABI,
    functionName: 'extsload',
    ...config,
  } as UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"getLiquidity"`.
 */
export function usePoolManagerGetLiquidity<
  TFunctionName extends 'getLiquidity',
  TSelectData = ReadContractResult<typeof poolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: poolManagerABI,
    functionName: 'getLiquidity',
    ...config,
  } as UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"getLock"`.
 */
export function usePoolManagerGetLock<
  TFunctionName extends 'getLock',
  TSelectData = ReadContractResult<typeof poolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: poolManagerABI,
    functionName: 'getLock',
    ...config,
  } as UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"getPosition"`.
 */
export function usePoolManagerGetPosition<
  TFunctionName extends 'getPosition',
  TSelectData = ReadContractResult<typeof poolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: poolManagerABI,
    functionName: 'getPosition',
    ...config,
  } as UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"getSlot0"`.
 */
export function usePoolManagerGetSlot0<
  TFunctionName extends 'getSlot0',
  TSelectData = ReadContractResult<typeof poolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: poolManagerABI,
    functionName: 'getSlot0',
    ...config,
  } as UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"hookFeesAccrued"`.
 */
export function usePoolManagerHookFeesAccrued<
  TFunctionName extends 'hookFeesAccrued',
  TSelectData = ReadContractResult<typeof poolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: poolManagerABI,
    functionName: 'hookFeesAccrued',
    ...config,
  } as UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"isApprovedForAll"`.
 */
export function usePoolManagerIsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof poolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: poolManagerABI,
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"lockData"`.
 */
export function usePoolManagerLockData<
  TFunctionName extends 'lockData',
  TSelectData = ReadContractResult<typeof poolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: poolManagerABI,
    functionName: 'lockData',
    ...config,
  } as UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"owner"`.
 */
export function usePoolManagerOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof poolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: poolManagerABI,
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"pools"`.
 */
export function usePoolManagerPools<
  TFunctionName extends 'pools',
  TSelectData = ReadContractResult<typeof poolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: poolManagerABI,
    functionName: 'pools',
    ...config,
  } as UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"protocolFeeController"`.
 */
export function usePoolManagerProtocolFeeController<
  TFunctionName extends 'protocolFeeController',
  TSelectData = ReadContractResult<typeof poolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: poolManagerABI,
    functionName: 'protocolFeeController',
    ...config,
  } as UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"protocolFeesAccrued"`.
 */
export function usePoolManagerProtocolFeesAccrued<
  TFunctionName extends 'protocolFeesAccrued',
  TSelectData = ReadContractResult<typeof poolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: poolManagerABI,
    functionName: 'protocolFeesAccrued',
    ...config,
  } as UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"reservesOf"`.
 */
export function usePoolManagerReservesOf<
  TFunctionName extends 'reservesOf',
  TSelectData = ReadContractResult<typeof poolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: poolManagerABI,
    functionName: 'reservesOf',
    ...config,
  } as UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function usePoolManagerSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof poolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: poolManagerABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"uri"`.
 */
export function usePoolManagerUri<
  TFunctionName extends 'uri',
  TSelectData = ReadContractResult<typeof poolManagerABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: poolManagerABI,
    functionName: 'uri',
    ...config,
  } as UseContractReadConfig<typeof poolManagerABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolManagerABI}__.
 */
export function usePoolManagerWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof poolManagerABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof poolManagerABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof poolManagerABI, TFunctionName, TMode>({
    abi: poolManagerABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"collectHookFees"`.
 */
export function usePoolManagerCollectHookFees<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof poolManagerABI,
          'collectHookFees'
        >['request']['abi'],
        'collectHookFees',
        TMode
      > & { functionName?: 'collectHookFees' }
    : UseContractWriteConfig<
        typeof poolManagerABI,
        'collectHookFees',
        TMode
      > & {
        abi?: never
        functionName?: 'collectHookFees'
      } = {} as any,
) {
  return useContractWrite<typeof poolManagerABI, 'collectHookFees', TMode>({
    abi: poolManagerABI,
    functionName: 'collectHookFees',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"collectProtocolFees"`.
 */
export function usePoolManagerCollectProtocolFees<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof poolManagerABI,
          'collectProtocolFees'
        >['request']['abi'],
        'collectProtocolFees',
        TMode
      > & { functionName?: 'collectProtocolFees' }
    : UseContractWriteConfig<
        typeof poolManagerABI,
        'collectProtocolFees',
        TMode
      > & {
        abi?: never
        functionName?: 'collectProtocolFees'
      } = {} as any,
) {
  return useContractWrite<typeof poolManagerABI, 'collectProtocolFees', TMode>({
    abi: poolManagerABI,
    functionName: 'collectProtocolFees',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"donate"`.
 */
export function usePoolManagerDonate<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof poolManagerABI,
          'donate'
        >['request']['abi'],
        'donate',
        TMode
      > & { functionName?: 'donate' }
    : UseContractWriteConfig<typeof poolManagerABI, 'donate', TMode> & {
        abi?: never
        functionName?: 'donate'
      } = {} as any,
) {
  return useContractWrite<typeof poolManagerABI, 'donate', TMode>({
    abi: poolManagerABI,
    functionName: 'donate',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"initialize"`.
 */
export function usePoolManagerInitialize<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof poolManagerABI,
          'initialize'
        >['request']['abi'],
        'initialize',
        TMode
      > & { functionName?: 'initialize' }
    : UseContractWriteConfig<typeof poolManagerABI, 'initialize', TMode> & {
        abi?: never
        functionName?: 'initialize'
      } = {} as any,
) {
  return useContractWrite<typeof poolManagerABI, 'initialize', TMode>({
    abi: poolManagerABI,
    functionName: 'initialize',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"lock"`.
 */
export function usePoolManagerLock<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof poolManagerABI,
          'lock'
        >['request']['abi'],
        'lock',
        TMode
      > & { functionName?: 'lock' }
    : UseContractWriteConfig<typeof poolManagerABI, 'lock', TMode> & {
        abi?: never
        functionName?: 'lock'
      } = {} as any,
) {
  return useContractWrite<typeof poolManagerABI, 'lock', TMode>({
    abi: poolManagerABI,
    functionName: 'lock',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"mint"`.
 */
export function usePoolManagerMint<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof poolManagerABI,
          'mint'
        >['request']['abi'],
        'mint',
        TMode
      > & { functionName?: 'mint' }
    : UseContractWriteConfig<typeof poolManagerABI, 'mint', TMode> & {
        abi?: never
        functionName?: 'mint'
      } = {} as any,
) {
  return useContractWrite<typeof poolManagerABI, 'mint', TMode>({
    abi: poolManagerABI,
    functionName: 'mint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"modifyPosition"`.
 */
export function usePoolManagerModifyPosition<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof poolManagerABI,
          'modifyPosition'
        >['request']['abi'],
        'modifyPosition',
        TMode
      > & { functionName?: 'modifyPosition' }
    : UseContractWriteConfig<typeof poolManagerABI, 'modifyPosition', TMode> & {
        abi?: never
        functionName?: 'modifyPosition'
      } = {} as any,
) {
  return useContractWrite<typeof poolManagerABI, 'modifyPosition', TMode>({
    abi: poolManagerABI,
    functionName: 'modifyPosition',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"onERC1155BatchReceived"`.
 */
export function usePoolManagerOnErc1155BatchReceived<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof poolManagerABI,
          'onERC1155BatchReceived'
        >['request']['abi'],
        'onERC1155BatchReceived',
        TMode
      > & { functionName?: 'onERC1155BatchReceived' }
    : UseContractWriteConfig<
        typeof poolManagerABI,
        'onERC1155BatchReceived',
        TMode
      > & {
        abi?: never
        functionName?: 'onERC1155BatchReceived'
      } = {} as any,
) {
  return useContractWrite<
    typeof poolManagerABI,
    'onERC1155BatchReceived',
    TMode
  >({
    abi: poolManagerABI,
    functionName: 'onERC1155BatchReceived',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"onERC1155Received"`.
 */
export function usePoolManagerOnErc1155Received<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof poolManagerABI,
          'onERC1155Received'
        >['request']['abi'],
        'onERC1155Received',
        TMode
      > & { functionName?: 'onERC1155Received' }
    : UseContractWriteConfig<
        typeof poolManagerABI,
        'onERC1155Received',
        TMode
      > & {
        abi?: never
        functionName?: 'onERC1155Received'
      } = {} as any,
) {
  return useContractWrite<typeof poolManagerABI, 'onERC1155Received', TMode>({
    abi: poolManagerABI,
    functionName: 'onERC1155Received',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"safeBatchTransferFrom"`.
 */
export function usePoolManagerSafeBatchTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof poolManagerABI,
          'safeBatchTransferFrom'
        >['request']['abi'],
        'safeBatchTransferFrom',
        TMode
      > & { functionName?: 'safeBatchTransferFrom' }
    : UseContractWriteConfig<
        typeof poolManagerABI,
        'safeBatchTransferFrom',
        TMode
      > & {
        abi?: never
        functionName?: 'safeBatchTransferFrom'
      } = {} as any,
) {
  return useContractWrite<
    typeof poolManagerABI,
    'safeBatchTransferFrom',
    TMode
  >({
    abi: poolManagerABI,
    functionName: 'safeBatchTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePoolManagerSafeTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof poolManagerABI,
          'safeTransferFrom'
        >['request']['abi'],
        'safeTransferFrom',
        TMode
      > & { functionName?: 'safeTransferFrom' }
    : UseContractWriteConfig<
        typeof poolManagerABI,
        'safeTransferFrom',
        TMode
      > & {
        abi?: never
        functionName?: 'safeTransferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof poolManagerABI, 'safeTransferFrom', TMode>({
    abi: poolManagerABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePoolManagerSetApprovalForAll<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof poolManagerABI,
          'setApprovalForAll'
        >['request']['abi'],
        'setApprovalForAll',
        TMode
      > & { functionName?: 'setApprovalForAll' }
    : UseContractWriteConfig<
        typeof poolManagerABI,
        'setApprovalForAll',
        TMode
      > & {
        abi?: never
        functionName?: 'setApprovalForAll'
      } = {} as any,
) {
  return useContractWrite<typeof poolManagerABI, 'setApprovalForAll', TMode>({
    abi: poolManagerABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"setHookFees"`.
 */
export function usePoolManagerSetHookFees<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof poolManagerABI,
          'setHookFees'
        >['request']['abi'],
        'setHookFees',
        TMode
      > & { functionName?: 'setHookFees' }
    : UseContractWriteConfig<typeof poolManagerABI, 'setHookFees', TMode> & {
        abi?: never
        functionName?: 'setHookFees'
      } = {} as any,
) {
  return useContractWrite<typeof poolManagerABI, 'setHookFees', TMode>({
    abi: poolManagerABI,
    functionName: 'setHookFees',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"setOwner"`.
 */
export function usePoolManagerSetOwner<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof poolManagerABI,
          'setOwner'
        >['request']['abi'],
        'setOwner',
        TMode
      > & { functionName?: 'setOwner' }
    : UseContractWriteConfig<typeof poolManagerABI, 'setOwner', TMode> & {
        abi?: never
        functionName?: 'setOwner'
      } = {} as any,
) {
  return useContractWrite<typeof poolManagerABI, 'setOwner', TMode>({
    abi: poolManagerABI,
    functionName: 'setOwner',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"setProtocolFeeController"`.
 */
export function usePoolManagerSetProtocolFeeController<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof poolManagerABI,
          'setProtocolFeeController'
        >['request']['abi'],
        'setProtocolFeeController',
        TMode
      > & { functionName?: 'setProtocolFeeController' }
    : UseContractWriteConfig<
        typeof poolManagerABI,
        'setProtocolFeeController',
        TMode
      > & {
        abi?: never
        functionName?: 'setProtocolFeeController'
      } = {} as any,
) {
  return useContractWrite<
    typeof poolManagerABI,
    'setProtocolFeeController',
    TMode
  >({
    abi: poolManagerABI,
    functionName: 'setProtocolFeeController',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"setProtocolFees"`.
 */
export function usePoolManagerSetProtocolFees<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof poolManagerABI,
          'setProtocolFees'
        >['request']['abi'],
        'setProtocolFees',
        TMode
      > & { functionName?: 'setProtocolFees' }
    : UseContractWriteConfig<
        typeof poolManagerABI,
        'setProtocolFees',
        TMode
      > & {
        abi?: never
        functionName?: 'setProtocolFees'
      } = {} as any,
) {
  return useContractWrite<typeof poolManagerABI, 'setProtocolFees', TMode>({
    abi: poolManagerABI,
    functionName: 'setProtocolFees',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"settle"`.
 */
export function usePoolManagerSettle<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof poolManagerABI,
          'settle'
        >['request']['abi'],
        'settle',
        TMode
      > & { functionName?: 'settle' }
    : UseContractWriteConfig<typeof poolManagerABI, 'settle', TMode> & {
        abi?: never
        functionName?: 'settle'
      } = {} as any,
) {
  return useContractWrite<typeof poolManagerABI, 'settle', TMode>({
    abi: poolManagerABI,
    functionName: 'settle',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"swap"`.
 */
export function usePoolManagerSwap<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof poolManagerABI,
          'swap'
        >['request']['abi'],
        'swap',
        TMode
      > & { functionName?: 'swap' }
    : UseContractWriteConfig<typeof poolManagerABI, 'swap', TMode> & {
        abi?: never
        functionName?: 'swap'
      } = {} as any,
) {
  return useContractWrite<typeof poolManagerABI, 'swap', TMode>({
    abi: poolManagerABI,
    functionName: 'swap',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"take"`.
 */
export function usePoolManagerTake<TMode extends WriteContractMode = undefined>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof poolManagerABI,
          'take'
        >['request']['abi'],
        'take',
        TMode
      > & { functionName?: 'take' }
    : UseContractWriteConfig<typeof poolManagerABI, 'take', TMode> & {
        abi?: never
        functionName?: 'take'
      } = {} as any,
) {
  return useContractWrite<typeof poolManagerABI, 'take', TMode>({
    abi: poolManagerABI,
    functionName: 'take',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolManagerABI}__.
 */
export function usePreparePoolManagerWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof poolManagerABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: poolManagerABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolManagerABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"collectHookFees"`.
 */
export function usePreparePoolManagerCollectHookFees(
  config: Omit<
    UsePrepareContractWriteConfig<typeof poolManagerABI, 'collectHookFees'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: poolManagerABI,
    functionName: 'collectHookFees',
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolManagerABI, 'collectHookFees'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"collectProtocolFees"`.
 */
export function usePreparePoolManagerCollectProtocolFees(
  config: Omit<
    UsePrepareContractWriteConfig<typeof poolManagerABI, 'collectProtocolFees'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: poolManagerABI,
    functionName: 'collectProtocolFees',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof poolManagerABI,
    'collectProtocolFees'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"donate"`.
 */
export function usePreparePoolManagerDonate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof poolManagerABI, 'donate'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: poolManagerABI,
    functionName: 'donate',
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolManagerABI, 'donate'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"initialize"`.
 */
export function usePreparePoolManagerInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof poolManagerABI, 'initialize'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: poolManagerABI,
    functionName: 'initialize',
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolManagerABI, 'initialize'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"lock"`.
 */
export function usePreparePoolManagerLock(
  config: Omit<
    UsePrepareContractWriteConfig<typeof poolManagerABI, 'lock'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: poolManagerABI,
    functionName: 'lock',
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolManagerABI, 'lock'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"mint"`.
 */
export function usePreparePoolManagerMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof poolManagerABI, 'mint'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: poolManagerABI,
    functionName: 'mint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolManagerABI, 'mint'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"modifyPosition"`.
 */
export function usePreparePoolManagerModifyPosition(
  config: Omit<
    UsePrepareContractWriteConfig<typeof poolManagerABI, 'modifyPosition'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: poolManagerABI,
    functionName: 'modifyPosition',
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolManagerABI, 'modifyPosition'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"onERC1155BatchReceived"`.
 */
export function usePreparePoolManagerOnErc1155BatchReceived(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof poolManagerABI,
      'onERC1155BatchReceived'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: poolManagerABI,
    functionName: 'onERC1155BatchReceived',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof poolManagerABI,
    'onERC1155BatchReceived'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"onERC1155Received"`.
 */
export function usePreparePoolManagerOnErc1155Received(
  config: Omit<
    UsePrepareContractWriteConfig<typeof poolManagerABI, 'onERC1155Received'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: poolManagerABI,
    functionName: 'onERC1155Received',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof poolManagerABI,
    'onERC1155Received'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"safeBatchTransferFrom"`.
 */
export function usePreparePoolManagerSafeBatchTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof poolManagerABI,
      'safeBatchTransferFrom'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: poolManagerABI,
    functionName: 'safeBatchTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof poolManagerABI,
    'safeBatchTransferFrom'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePreparePoolManagerSafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof poolManagerABI, 'safeTransferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: poolManagerABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolManagerABI, 'safeTransferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePreparePoolManagerSetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<typeof poolManagerABI, 'setApprovalForAll'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: poolManagerABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof poolManagerABI,
    'setApprovalForAll'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"setHookFees"`.
 */
export function usePreparePoolManagerSetHookFees(
  config: Omit<
    UsePrepareContractWriteConfig<typeof poolManagerABI, 'setHookFees'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: poolManagerABI,
    functionName: 'setHookFees',
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolManagerABI, 'setHookFees'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"setOwner"`.
 */
export function usePreparePoolManagerSetOwner(
  config: Omit<
    UsePrepareContractWriteConfig<typeof poolManagerABI, 'setOwner'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: poolManagerABI,
    functionName: 'setOwner',
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolManagerABI, 'setOwner'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"setProtocolFeeController"`.
 */
export function usePreparePoolManagerSetProtocolFeeController(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof poolManagerABI,
      'setProtocolFeeController'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: poolManagerABI,
    functionName: 'setProtocolFeeController',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof poolManagerABI,
    'setProtocolFeeController'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"setProtocolFees"`.
 */
export function usePreparePoolManagerSetProtocolFees(
  config: Omit<
    UsePrepareContractWriteConfig<typeof poolManagerABI, 'setProtocolFees'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: poolManagerABI,
    functionName: 'setProtocolFees',
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolManagerABI, 'setProtocolFees'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"settle"`.
 */
export function usePreparePoolManagerSettle(
  config: Omit<
    UsePrepareContractWriteConfig<typeof poolManagerABI, 'settle'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: poolManagerABI,
    functionName: 'settle',
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolManagerABI, 'settle'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"swap"`.
 */
export function usePreparePoolManagerSwap(
  config: Omit<
    UsePrepareContractWriteConfig<typeof poolManagerABI, 'swap'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: poolManagerABI,
    functionName: 'swap',
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolManagerABI, 'swap'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link poolManagerABI}__ and `functionName` set to `"take"`.
 */
export function usePreparePoolManagerTake(
  config: Omit<
    UsePrepareContractWriteConfig<typeof poolManagerABI, 'take'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: poolManagerABI,
    functionName: 'take',
    ...config,
  } as UsePrepareContractWriteConfig<typeof poolManagerABI, 'take'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link poolManagerABI}__.
 */
export function usePoolManagerEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof poolManagerABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: poolManagerABI,
    ...config,
  } as UseContractEventConfig<typeof poolManagerABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link poolManagerABI}__ and `eventName` set to `"ApprovalForAll"`.
 */
export function usePoolManagerApprovalForAllEvent(
  config: Omit<
    UseContractEventConfig<typeof poolManagerABI, 'ApprovalForAll'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: poolManagerABI,
    eventName: 'ApprovalForAll',
    ...config,
  } as UseContractEventConfig<typeof poolManagerABI, 'ApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link poolManagerABI}__ and `eventName` set to `"HookFeeUpdated"`.
 */
export function usePoolManagerHookFeeUpdatedEvent(
  config: Omit<
    UseContractEventConfig<typeof poolManagerABI, 'HookFeeUpdated'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: poolManagerABI,
    eventName: 'HookFeeUpdated',
    ...config,
  } as UseContractEventConfig<typeof poolManagerABI, 'HookFeeUpdated'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link poolManagerABI}__ and `eventName` set to `"Initialize"`.
 */
export function usePoolManagerInitializeEvent(
  config: Omit<
    UseContractEventConfig<typeof poolManagerABI, 'Initialize'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: poolManagerABI,
    eventName: 'Initialize',
    ...config,
  } as UseContractEventConfig<typeof poolManagerABI, 'Initialize'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link poolManagerABI}__ and `eventName` set to `"ModifyPosition"`.
 */
export function usePoolManagerModifyPositionEvent(
  config: Omit<
    UseContractEventConfig<typeof poolManagerABI, 'ModifyPosition'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: poolManagerABI,
    eventName: 'ModifyPosition',
    ...config,
  } as UseContractEventConfig<typeof poolManagerABI, 'ModifyPosition'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link poolManagerABI}__ and `eventName` set to `"OwnerChanged"`.
 */
export function usePoolManagerOwnerChangedEvent(
  config: Omit<
    UseContractEventConfig<typeof poolManagerABI, 'OwnerChanged'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: poolManagerABI,
    eventName: 'OwnerChanged',
    ...config,
  } as UseContractEventConfig<typeof poolManagerABI, 'OwnerChanged'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link poolManagerABI}__ and `eventName` set to `"ProtocolFeeControllerUpdated"`.
 */
export function usePoolManagerProtocolFeeControllerUpdatedEvent(
  config: Omit<
    UseContractEventConfig<
      typeof poolManagerABI,
      'ProtocolFeeControllerUpdated'
    >,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: poolManagerABI,
    eventName: 'ProtocolFeeControllerUpdated',
    ...config,
  } as UseContractEventConfig<
    typeof poolManagerABI,
    'ProtocolFeeControllerUpdated'
  >)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link poolManagerABI}__ and `eventName` set to `"ProtocolFeeUpdated"`.
 */
export function usePoolManagerProtocolFeeUpdatedEvent(
  config: Omit<
    UseContractEventConfig<typeof poolManagerABI, 'ProtocolFeeUpdated'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: poolManagerABI,
    eventName: 'ProtocolFeeUpdated',
    ...config,
  } as UseContractEventConfig<typeof poolManagerABI, 'ProtocolFeeUpdated'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link poolManagerABI}__ and `eventName` set to `"Swap"`.
 */
export function usePoolManagerSwapEvent(
  config: Omit<
    UseContractEventConfig<typeof poolManagerABI, 'Swap'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: poolManagerABI,
    eventName: 'Swap',
    ...config,
  } as UseContractEventConfig<typeof poolManagerABI, 'Swap'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link poolManagerABI}__ and `eventName` set to `"TransferBatch"`.
 */
export function usePoolManagerTransferBatchEvent(
  config: Omit<
    UseContractEventConfig<typeof poolManagerABI, 'TransferBatch'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: poolManagerABI,
    eventName: 'TransferBatch',
    ...config,
  } as UseContractEventConfig<typeof poolManagerABI, 'TransferBatch'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link poolManagerABI}__ and `eventName` set to `"TransferSingle"`.
 */
export function usePoolManagerTransferSingleEvent(
  config: Omit<
    UseContractEventConfig<typeof poolManagerABI, 'TransferSingle'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: poolManagerABI,
    eventName: 'TransferSingle',
    ...config,
  } as UseContractEventConfig<typeof poolManagerABI, 'TransferSingle'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link poolManagerABI}__ and `eventName` set to `"URI"`.
 */
export function usePoolManagerUriEvent(
  config: Omit<
    UseContractEventConfig<typeof poolManagerABI, 'URI'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: poolManagerABI,
    eventName: 'URI',
    ...config,
  } as UseContractEventConfig<typeof poolManagerABI, 'URI'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link uniNftHookABI}__.
 */
export function useUniNftHookRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof uniNftHookABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof uniNftHookABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: uniNftHookABI,
    ...config,
  } as UseContractReadConfig<typeof uniNftHookABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link uniNftHookABI}__ and `functionName` set to `"NFT"`.
 */
export function useUniNftHookNft<
  TFunctionName extends 'NFT',
  TSelectData = ReadContractResult<typeof uniNftHookABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof uniNftHookABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: uniNftHookABI,
    functionName: 'NFT',
    ...config,
  } as UseContractReadConfig<typeof uniNftHookABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link uniNftHookABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useUniNftHookBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof uniNftHookABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof uniNftHookABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: uniNftHookABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof uniNftHookABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link uniNftHookABI}__ and `functionName` set to `"decimals"`.
 */
export function useUniNftHookDecimals<
  TFunctionName extends 'decimals',
  TSelectData = ReadContractResult<typeof uniNftHookABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof uniNftHookABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: uniNftHookABI,
    functionName: 'decimals',
    ...config,
  } as UseContractReadConfig<typeof uniNftHookABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link uniNftHookABI}__ and `functionName` set to `"getHooksCalls"`.
 */
export function useUniNftHookGetHooksCalls<
  TFunctionName extends 'getHooksCalls',
  TSelectData = ReadContractResult<typeof uniNftHookABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof uniNftHookABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: uniNftHookABI,
    functionName: 'getHooksCalls',
    ...config,
  } as UseContractReadConfig<typeof uniNftHookABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link uniNftHookABI}__ and `functionName` set to `"getPoolKey"`.
 */
export function useUniNftHookGetPoolKey<
  TFunctionName extends 'getPoolKey',
  TSelectData = ReadContractResult<typeof uniNftHookABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof uniNftHookABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: uniNftHookABI,
    functionName: 'getPoolKey',
    ...config,
  } as UseContractReadConfig<typeof uniNftHookABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link uniNftHookABI}__ and `functionName` set to `"name"`.
 */
export function useUniNftHookName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof uniNftHookABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof uniNftHookABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: uniNftHookABI,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof uniNftHookABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link uniNftHookABI}__ and `functionName` set to `"poolManager"`.
 */
export function useUniNftHookPoolManager<
  TFunctionName extends 'poolManager',
  TSelectData = ReadContractResult<typeof uniNftHookABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof uniNftHookABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: uniNftHookABI,
    functionName: 'poolManager',
    ...config,
  } as UseContractReadConfig<typeof uniNftHookABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link uniNftHookABI}__ and `functionName` set to `"symbol"`.
 */
export function useUniNftHookSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof uniNftHookABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof uniNftHookABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: uniNftHookABI,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof uniNftHookABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link uniNftHookABI}__.
 */
export function useUniNftHookWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof uniNftHookABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof uniNftHookABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof uniNftHookABI, TFunctionName, TMode>({
    abi: uniNftHookABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link uniNftHookABI}__ and `functionName` set to `"afterDonate"`.
 */
export function useUniNftHookAfterDonate<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof uniNftHookABI,
          'afterDonate'
        >['request']['abi'],
        'afterDonate',
        TMode
      > & { functionName?: 'afterDonate' }
    : UseContractWriteConfig<typeof uniNftHookABI, 'afterDonate', TMode> & {
        abi?: never
        functionName?: 'afterDonate'
      } = {} as any,
) {
  return useContractWrite<typeof uniNftHookABI, 'afterDonate', TMode>({
    abi: uniNftHookABI,
    functionName: 'afterDonate',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link uniNftHookABI}__ and `functionName` set to `"afterInitialize"`.
 */
export function useUniNftHookAfterInitialize<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof uniNftHookABI,
          'afterInitialize'
        >['request']['abi'],
        'afterInitialize',
        TMode
      > & { functionName?: 'afterInitialize' }
    : UseContractWriteConfig<typeof uniNftHookABI, 'afterInitialize', TMode> & {
        abi?: never
        functionName?: 'afterInitialize'
      } = {} as any,
) {
  return useContractWrite<typeof uniNftHookABI, 'afterInitialize', TMode>({
    abi: uniNftHookABI,
    functionName: 'afterInitialize',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link uniNftHookABI}__ and `functionName` set to `"afterModifyPosition"`.
 */
export function useUniNftHookAfterModifyPosition<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof uniNftHookABI,
          'afterModifyPosition'
        >['request']['abi'],
        'afterModifyPosition',
        TMode
      > & { functionName?: 'afterModifyPosition' }
    : UseContractWriteConfig<
        typeof uniNftHookABI,
        'afterModifyPosition',
        TMode
      > & {
        abi?: never
        functionName?: 'afterModifyPosition'
      } = {} as any,
) {
  return useContractWrite<typeof uniNftHookABI, 'afterModifyPosition', TMode>({
    abi: uniNftHookABI,
    functionName: 'afterModifyPosition',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link uniNftHookABI}__ and `functionName` set to `"afterSwap"`.
 */
export function useUniNftHookAfterSwap<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof uniNftHookABI,
          'afterSwap'
        >['request']['abi'],
        'afterSwap',
        TMode
      > & { functionName?: 'afterSwap' }
    : UseContractWriteConfig<typeof uniNftHookABI, 'afterSwap', TMode> & {
        abi?: never
        functionName?: 'afterSwap'
      } = {} as any,
) {
  return useContractWrite<typeof uniNftHookABI, 'afterSwap', TMode>({
    abi: uniNftHookABI,
    functionName: 'afterSwap',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link uniNftHookABI}__ and `functionName` set to `"beforeDonate"`.
 */
export function useUniNftHookBeforeDonate<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof uniNftHookABI,
          'beforeDonate'
        >['request']['abi'],
        'beforeDonate',
        TMode
      > & { functionName?: 'beforeDonate' }
    : UseContractWriteConfig<typeof uniNftHookABI, 'beforeDonate', TMode> & {
        abi?: never
        functionName?: 'beforeDonate'
      } = {} as any,
) {
  return useContractWrite<typeof uniNftHookABI, 'beforeDonate', TMode>({
    abi: uniNftHookABI,
    functionName: 'beforeDonate',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link uniNftHookABI}__ and `functionName` set to `"beforeInitialize"`.
 */
export function useUniNftHookBeforeInitialize<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof uniNftHookABI,
          'beforeInitialize'
        >['request']['abi'],
        'beforeInitialize',
        TMode
      > & { functionName?: 'beforeInitialize' }
    : UseContractWriteConfig<
        typeof uniNftHookABI,
        'beforeInitialize',
        TMode
      > & {
        abi?: never
        functionName?: 'beforeInitialize'
      } = {} as any,
) {
  return useContractWrite<typeof uniNftHookABI, 'beforeInitialize', TMode>({
    abi: uniNftHookABI,
    functionName: 'beforeInitialize',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link uniNftHookABI}__ and `functionName` set to `"beforeModifyPosition"`.
 */
export function useUniNftHookBeforeModifyPosition<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof uniNftHookABI,
          'beforeModifyPosition'
        >['request']['abi'],
        'beforeModifyPosition',
        TMode
      > & { functionName?: 'beforeModifyPosition' }
    : UseContractWriteConfig<
        typeof uniNftHookABI,
        'beforeModifyPosition',
        TMode
      > & {
        abi?: never
        functionName?: 'beforeModifyPosition'
      } = {} as any,
) {
  return useContractWrite<typeof uniNftHookABI, 'beforeModifyPosition', TMode>({
    abi: uniNftHookABI,
    functionName: 'beforeModifyPosition',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link uniNftHookABI}__ and `functionName` set to `"beforeSwap"`.
 */
export function useUniNftHookBeforeSwap<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof uniNftHookABI,
          'beforeSwap'
        >['request']['abi'],
        'beforeSwap',
        TMode
      > & { functionName?: 'beforeSwap' }
    : UseContractWriteConfig<typeof uniNftHookABI, 'beforeSwap', TMode> & {
        abi?: never
        functionName?: 'beforeSwap'
      } = {} as any,
) {
  return useContractWrite<typeof uniNftHookABI, 'beforeSwap', TMode>({
    abi: uniNftHookABI,
    functionName: 'beforeSwap',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link uniNftHookABI}__ and `functionName` set to `"lockAcquired"`.
 */
export function useUniNftHookLockAcquired<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof uniNftHookABI,
          'lockAcquired'
        >['request']['abi'],
        'lockAcquired',
        TMode
      > & { functionName?: 'lockAcquired' }
    : UseContractWriteConfig<typeof uniNftHookABI, 'lockAcquired', TMode> & {
        abi?: never
        functionName?: 'lockAcquired'
      } = {} as any,
) {
  return useContractWrite<typeof uniNftHookABI, 'lockAcquired', TMode>({
    abi: uniNftHookABI,
    functionName: 'lockAcquired',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link uniNftHookABI}__ and `functionName` set to `"transfer"`.
 */
export function useUniNftHookTransfer<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof uniNftHookABI,
          'transfer'
        >['request']['abi'],
        'transfer',
        TMode
      > & { functionName?: 'transfer' }
    : UseContractWriteConfig<typeof uniNftHookABI, 'transfer', TMode> & {
        abi?: never
        functionName?: 'transfer'
      } = {} as any,
) {
  return useContractWrite<typeof uniNftHookABI, 'transfer', TMode>({
    abi: uniNftHookABI,
    functionName: 'transfer',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link uniNftHookABI}__.
 */
export function usePrepareUniNftHookWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof uniNftHookABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: uniNftHookABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof uniNftHookABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link uniNftHookABI}__ and `functionName` set to `"afterDonate"`.
 */
export function usePrepareUniNftHookAfterDonate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof uniNftHookABI, 'afterDonate'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: uniNftHookABI,
    functionName: 'afterDonate',
    ...config,
  } as UsePrepareContractWriteConfig<typeof uniNftHookABI, 'afterDonate'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link uniNftHookABI}__ and `functionName` set to `"afterInitialize"`.
 */
export function usePrepareUniNftHookAfterInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof uniNftHookABI, 'afterInitialize'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: uniNftHookABI,
    functionName: 'afterInitialize',
    ...config,
  } as UsePrepareContractWriteConfig<typeof uniNftHookABI, 'afterInitialize'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link uniNftHookABI}__ and `functionName` set to `"afterModifyPosition"`.
 */
export function usePrepareUniNftHookAfterModifyPosition(
  config: Omit<
    UsePrepareContractWriteConfig<typeof uniNftHookABI, 'afterModifyPosition'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: uniNftHookABI,
    functionName: 'afterModifyPosition',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof uniNftHookABI,
    'afterModifyPosition'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link uniNftHookABI}__ and `functionName` set to `"afterSwap"`.
 */
export function usePrepareUniNftHookAfterSwap(
  config: Omit<
    UsePrepareContractWriteConfig<typeof uniNftHookABI, 'afterSwap'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: uniNftHookABI,
    functionName: 'afterSwap',
    ...config,
  } as UsePrepareContractWriteConfig<typeof uniNftHookABI, 'afterSwap'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link uniNftHookABI}__ and `functionName` set to `"beforeDonate"`.
 */
export function usePrepareUniNftHookBeforeDonate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof uniNftHookABI, 'beforeDonate'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: uniNftHookABI,
    functionName: 'beforeDonate',
    ...config,
  } as UsePrepareContractWriteConfig<typeof uniNftHookABI, 'beforeDonate'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link uniNftHookABI}__ and `functionName` set to `"beforeInitialize"`.
 */
export function usePrepareUniNftHookBeforeInitialize(
  config: Omit<
    UsePrepareContractWriteConfig<typeof uniNftHookABI, 'beforeInitialize'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: uniNftHookABI,
    functionName: 'beforeInitialize',
    ...config,
  } as UsePrepareContractWriteConfig<typeof uniNftHookABI, 'beforeInitialize'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link uniNftHookABI}__ and `functionName` set to `"beforeModifyPosition"`.
 */
export function usePrepareUniNftHookBeforeModifyPosition(
  config: Omit<
    UsePrepareContractWriteConfig<typeof uniNftHookABI, 'beforeModifyPosition'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: uniNftHookABI,
    functionName: 'beforeModifyPosition',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof uniNftHookABI,
    'beforeModifyPosition'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link uniNftHookABI}__ and `functionName` set to `"beforeSwap"`.
 */
export function usePrepareUniNftHookBeforeSwap(
  config: Omit<
    UsePrepareContractWriteConfig<typeof uniNftHookABI, 'beforeSwap'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: uniNftHookABI,
    functionName: 'beforeSwap',
    ...config,
  } as UsePrepareContractWriteConfig<typeof uniNftHookABI, 'beforeSwap'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link uniNftHookABI}__ and `functionName` set to `"lockAcquired"`.
 */
export function usePrepareUniNftHookLockAcquired(
  config: Omit<
    UsePrepareContractWriteConfig<typeof uniNftHookABI, 'lockAcquired'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: uniNftHookABI,
    functionName: 'lockAcquired',
    ...config,
  } as UsePrepareContractWriteConfig<typeof uniNftHookABI, 'lockAcquired'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link uniNftHookABI}__ and `functionName` set to `"transfer"`.
 */
export function usePrepareUniNftHookTransfer(
  config: Omit<
    UsePrepareContractWriteConfig<typeof uniNftHookABI, 'transfer'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: uniNftHookABI,
    functionName: 'transfer',
    ...config,
  } as UsePrepareContractWriteConfig<typeof uniNftHookABI, 'transfer'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link uniNftRouterABI}__.
 *
 * -
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x2093fa634730172d29c618879428336b021f7732)
 */
export function useUniNftRouterRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof uniNftRouterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof uniNftRouterABI, TFunctionName, TSelectData>,
    'abi' | 'address'
  > & { chainId?: keyof typeof uniNftRouterAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: uniNftRouterABI,
    address: uniNftRouterAddress[chainId as keyof typeof uniNftRouterAddress],
    ...config,
  } as UseContractReadConfig<
    typeof uniNftRouterABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link uniNftRouterABI}__ and `functionName` set to `"MGR"`.
 *
 * -
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x2093fa634730172d29c618879428336b021f7732)
 */
export function useUniNftRouterMgr<
  TFunctionName extends 'MGR',
  TSelectData = ReadContractResult<typeof uniNftRouterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof uniNftRouterABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof uniNftRouterAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: uniNftRouterABI,
    address: uniNftRouterAddress[chainId as keyof typeof uniNftRouterAddress],
    functionName: 'MGR',
    ...config,
  } as UseContractReadConfig<
    typeof uniNftRouterABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link uniNftRouterABI}__ and `functionName` set to `"findHookSalt"`.
 *
 * -
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x2093fa634730172d29c618879428336b021f7732)
 */
export function useUniNftRouterFindHookSalt<
  TFunctionName extends 'findHookSalt',
  TSelectData = ReadContractResult<typeof uniNftRouterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof uniNftRouterABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof uniNftRouterAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: uniNftRouterABI,
    address: uniNftRouterAddress[chainId as keyof typeof uniNftRouterAddress],
    functionName: 'findHookSalt',
    ...config,
  } as UseContractReadConfig<
    typeof uniNftRouterABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link uniNftRouterABI}__ and `functionName` set to `"isValidToken"`.
 *
 * -
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x2093fa634730172d29c618879428336b021f7732)
 */
export function useUniNftRouterIsValidToken<
  TFunctionName extends 'isValidToken',
  TSelectData = ReadContractResult<typeof uniNftRouterABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof uniNftRouterABI, TFunctionName, TSelectData>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof uniNftRouterAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractRead({
    abi: uniNftRouterABI,
    address: uniNftRouterAddress[chainId as keyof typeof uniNftRouterAddress],
    functionName: 'isValidToken',
    ...config,
  } as UseContractReadConfig<
    typeof uniNftRouterABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link uniNftRouterABI}__.
 *
 * -
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x2093fa634730172d29c618879428336b021f7732)
 */
export function useUniNftRouterWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof uniNftRouterAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof uniNftRouterABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      > & { address?: Address; chainId?: TChainId }
    : UseContractWriteConfig<typeof uniNftRouterABI, TFunctionName, TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof uniNftRouterABI, TFunctionName, TMode>({
    abi: uniNftRouterABI,
    address: uniNftRouterAddress[chainId as keyof typeof uniNftRouterAddress],
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link uniNftRouterABI}__ and `functionName` set to `"buyNft"`.
 *
 * -
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x2093fa634730172d29c618879428336b021f7732)
 */
export function useUniNftRouterBuyNft<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof uniNftRouterAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof uniNftRouterABI,
          'buyNft'
        >['request']['abi'],
        'buyNft',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'buyNft' }
    : UseContractWriteConfig<typeof uniNftRouterABI, 'buyNft', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'buyNft'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof uniNftRouterABI, 'buyNft', TMode>({
    abi: uniNftRouterABI,
    address: uniNftRouterAddress[chainId as keyof typeof uniNftRouterAddress],
    functionName: 'buyNft',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link uniNftRouterABI}__ and `functionName` set to `"create"`.
 *
 * -
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x2093fa634730172d29c618879428336b021f7732)
 */
export function useUniNftRouterCreate<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof uniNftRouterAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof uniNftRouterABI,
          'create'
        >['request']['abi'],
        'create',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'create' }
    : UseContractWriteConfig<typeof uniNftRouterABI, 'create', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'create'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof uniNftRouterABI, 'create', TMode>({
    abi: uniNftRouterABI,
    address: uniNftRouterAddress[chainId as keyof typeof uniNftRouterAddress],
    functionName: 'create',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link uniNftRouterABI}__ and `functionName` set to `"lockAcquired"`.
 *
 * -
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x2093fa634730172d29c618879428336b021f7732)
 */
export function useUniNftRouterLockAcquired<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof uniNftRouterAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof uniNftRouterABI,
          'lockAcquired'
        >['request']['abi'],
        'lockAcquired',
        TMode
      > & {
        address?: Address
        chainId?: TChainId
        functionName?: 'lockAcquired'
      }
    : UseContractWriteConfig<typeof uniNftRouterABI, 'lockAcquired', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'lockAcquired'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof uniNftRouterABI, 'lockAcquired', TMode>({
    abi: uniNftRouterABI,
    address: uniNftRouterAddress[chainId as keyof typeof uniNftRouterAddress],
    functionName: 'lockAcquired',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link uniNftRouterABI}__ and `functionName` set to `"sellNft"`.
 *
 * -
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x2093fa634730172d29c618879428336b021f7732)
 */
export function useUniNftRouterSellNft<
  TMode extends WriteContractMode = undefined,
  TChainId extends number = keyof typeof uniNftRouterAddress,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof uniNftRouterABI,
          'sellNft'
        >['request']['abi'],
        'sellNft',
        TMode
      > & { address?: Address; chainId?: TChainId; functionName?: 'sellNft' }
    : UseContractWriteConfig<typeof uniNftRouterABI, 'sellNft', TMode> & {
        abi?: never
        address?: never
        chainId?: TChainId
        functionName?: 'sellNft'
      } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractWrite<typeof uniNftRouterABI, 'sellNft', TMode>({
    abi: uniNftRouterABI,
    address: uniNftRouterAddress[chainId as keyof typeof uniNftRouterAddress],
    functionName: 'sellNft',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link uniNftRouterABI}__.
 *
 * -
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x2093fa634730172d29c618879428336b021f7732)
 */
export function usePrepareUniNftRouterWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof uniNftRouterABI, TFunctionName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof uniNftRouterAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: uniNftRouterABI,
    address: uniNftRouterAddress[chainId as keyof typeof uniNftRouterAddress],
    ...config,
  } as UsePrepareContractWriteConfig<typeof uniNftRouterABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link uniNftRouterABI}__ and `functionName` set to `"buyNft"`.
 *
 * -
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x2093fa634730172d29c618879428336b021f7732)
 */
export function usePrepareUniNftRouterBuyNft(
  config: Omit<
    UsePrepareContractWriteConfig<typeof uniNftRouterABI, 'buyNft'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof uniNftRouterAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: uniNftRouterABI,
    address: uniNftRouterAddress[chainId as keyof typeof uniNftRouterAddress],
    functionName: 'buyNft',
    ...config,
  } as UsePrepareContractWriteConfig<typeof uniNftRouterABI, 'buyNft'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link uniNftRouterABI}__ and `functionName` set to `"create"`.
 *
 * -
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x2093fa634730172d29c618879428336b021f7732)
 */
export function usePrepareUniNftRouterCreate(
  config: Omit<
    UsePrepareContractWriteConfig<typeof uniNftRouterABI, 'create'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof uniNftRouterAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: uniNftRouterABI,
    address: uniNftRouterAddress[chainId as keyof typeof uniNftRouterAddress],
    functionName: 'create',
    ...config,
  } as UsePrepareContractWriteConfig<typeof uniNftRouterABI, 'create'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link uniNftRouterABI}__ and `functionName` set to `"lockAcquired"`.
 *
 * -
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x2093fa634730172d29c618879428336b021f7732)
 */
export function usePrepareUniNftRouterLockAcquired(
  config: Omit<
    UsePrepareContractWriteConfig<typeof uniNftRouterABI, 'lockAcquired'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof uniNftRouterAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: uniNftRouterABI,
    address: uniNftRouterAddress[chainId as keyof typeof uniNftRouterAddress],
    functionName: 'lockAcquired',
    ...config,
  } as UsePrepareContractWriteConfig<typeof uniNftRouterABI, 'lockAcquired'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link uniNftRouterABI}__ and `functionName` set to `"sellNft"`.
 *
 * -
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x2093fa634730172d29c618879428336b021f7732)
 */
export function usePrepareUniNftRouterSellNft(
  config: Omit<
    UsePrepareContractWriteConfig<typeof uniNftRouterABI, 'sellNft'>,
    'abi' | 'address' | 'functionName'
  > & { chainId?: keyof typeof uniNftRouterAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return usePrepareContractWrite({
    abi: uniNftRouterABI,
    address: uniNftRouterAddress[chainId as keyof typeof uniNftRouterAddress],
    functionName: 'sellNft',
    ...config,
  } as UsePrepareContractWriteConfig<typeof uniNftRouterABI, 'sellNft'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link uniNftRouterABI}__.
 *
 * -
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x2093fa634730172d29c618879428336b021f7732)
 */
export function useUniNftRouterEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof uniNftRouterABI, TEventName>,
    'abi' | 'address'
  > & { chainId?: keyof typeof uniNftRouterAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: uniNftRouterABI,
    address: uniNftRouterAddress[chainId as keyof typeof uniNftRouterAddress],
    ...config,
  } as UseContractEventConfig<typeof uniNftRouterABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link uniNftRouterABI}__ and `eventName` set to `"Created"`.
 *
 * -
 * - [__View Contract on Scroll Sepolia Blockscout__](https://sepolia-blockscout.scroll.io/address/0x2093fa634730172d29c618879428336b021f7732)
 */
export function useUniNftRouterCreatedEvent(
  config: Omit<
    UseContractEventConfig<typeof uniNftRouterABI, 'Created'>,
    'abi' | 'address' | 'eventName'
  > & { chainId?: keyof typeof uniNftRouterAddress } = {} as any,
) {
  const { chain } = useNetwork()
  const defaultChainId = useChainId()
  const chainId = config.chainId ?? chain?.id ?? defaultChainId
  return useContractEvent({
    abi: uniNftRouterABI,
    address: uniNftRouterAddress[chainId as keyof typeof uniNftRouterAddress],
    eventName: 'Created',
    ...config,
  } as UseContractEventConfig<typeof uniNftRouterABI, 'Created'>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link uniNftTokenABI}__.
 */
export function useUniNftTokenRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof uniNftTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof uniNftTokenABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: uniNftTokenABI,
    ...config,
  } as UseContractReadConfig<typeof uniNftTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link uniNftTokenABI}__ and `functionName` set to `"HOOK"`.
 */
export function useUniNftTokenHook<
  TFunctionName extends 'HOOK',
  TSelectData = ReadContractResult<typeof uniNftTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof uniNftTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: uniNftTokenABI,
    functionName: 'HOOK',
    ...config,
  } as UseContractReadConfig<typeof uniNftTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link uniNftTokenABI}__ and `functionName` set to `"MGR"`.
 */
export function useUniNftTokenMgr<
  TFunctionName extends 'MGR',
  TSelectData = ReadContractResult<typeof uniNftTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof uniNftTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: uniNftTokenABI,
    functionName: 'MGR',
    ...config,
  } as UseContractReadConfig<typeof uniNftTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link uniNftTokenABI}__ and `functionName` set to `"balanceOf"`.
 */
export function useUniNftTokenBalanceOf<
  TFunctionName extends 'balanceOf',
  TSelectData = ReadContractResult<typeof uniNftTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof uniNftTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: uniNftTokenABI,
    functionName: 'balanceOf',
    ...config,
  } as UseContractReadConfig<typeof uniNftTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link uniNftTokenABI}__ and `functionName` set to `"getApproved"`.
 */
export function useUniNftTokenGetApproved<
  TFunctionName extends 'getApproved',
  TSelectData = ReadContractResult<typeof uniNftTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof uniNftTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: uniNftTokenABI,
    functionName: 'getApproved',
    ...config,
  } as UseContractReadConfig<typeof uniNftTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link uniNftTokenABI}__ and `functionName` set to `"getPoolKey"`.
 */
export function useUniNftTokenGetPoolKey<
  TFunctionName extends 'getPoolKey',
  TSelectData = ReadContractResult<typeof uniNftTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof uniNftTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: uniNftTokenABI,
    functionName: 'getPoolKey',
    ...config,
  } as UseContractReadConfig<typeof uniNftTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link uniNftTokenABI}__ and `functionName` set to `"isApprovedForAll"`.
 */
export function useUniNftTokenIsApprovedForAll<
  TFunctionName extends 'isApprovedForAll',
  TSelectData = ReadContractResult<typeof uniNftTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof uniNftTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: uniNftTokenABI,
    functionName: 'isApprovedForAll',
    ...config,
  } as UseContractReadConfig<typeof uniNftTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link uniNftTokenABI}__ and `functionName` set to `"name"`.
 */
export function useUniNftTokenName<
  TFunctionName extends 'name',
  TSelectData = ReadContractResult<typeof uniNftTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof uniNftTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: uniNftTokenABI,
    functionName: 'name',
    ...config,
  } as UseContractReadConfig<typeof uniNftTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link uniNftTokenABI}__ and `functionName` set to `"ownerOf"`.
 */
export function useUniNftTokenOwnerOf<
  TFunctionName extends 'ownerOf',
  TSelectData = ReadContractResult<typeof uniNftTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof uniNftTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: uniNftTokenABI,
    functionName: 'ownerOf',
    ...config,
  } as UseContractReadConfig<typeof uniNftTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link uniNftTokenABI}__ and `functionName` set to `"supportsInterface"`.
 */
export function useUniNftTokenSupportsInterface<
  TFunctionName extends 'supportsInterface',
  TSelectData = ReadContractResult<typeof uniNftTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof uniNftTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: uniNftTokenABI,
    functionName: 'supportsInterface',
    ...config,
  } as UseContractReadConfig<typeof uniNftTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link uniNftTokenABI}__ and `functionName` set to `"symbol"`.
 */
export function useUniNftTokenSymbol<
  TFunctionName extends 'symbol',
  TSelectData = ReadContractResult<typeof uniNftTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof uniNftTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: uniNftTokenABI,
    functionName: 'symbol',
    ...config,
  } as UseContractReadConfig<typeof uniNftTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link uniNftTokenABI}__ and `functionName` set to `"tokenURI"`.
 */
export function useUniNftTokenTokenUri<
  TFunctionName extends 'tokenURI',
  TSelectData = ReadContractResult<typeof uniNftTokenABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof uniNftTokenABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: uniNftTokenABI,
    functionName: 'tokenURI',
    ...config,
  } as UseContractReadConfig<typeof uniNftTokenABI, TFunctionName, TSelectData>)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link uniNftTokenABI}__.
 */
export function useUniNftTokenWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof uniNftTokenABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof uniNftTokenABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof uniNftTokenABI, TFunctionName, TMode>({
    abi: uniNftTokenABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link uniNftTokenABI}__ and `functionName` set to `"approve"`.
 */
export function useUniNftTokenApprove<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof uniNftTokenABI,
          'approve'
        >['request']['abi'],
        'approve',
        TMode
      > & { functionName?: 'approve' }
    : UseContractWriteConfig<typeof uniNftTokenABI, 'approve', TMode> & {
        abi?: never
        functionName?: 'approve'
      } = {} as any,
) {
  return useContractWrite<typeof uniNftTokenABI, 'approve', TMode>({
    abi: uniNftTokenABI,
    functionName: 'approve',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link uniNftTokenABI}__ and `functionName` set to `"claimOrMint"`.
 */
export function useUniNftTokenClaimOrMint<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof uniNftTokenABI,
          'claimOrMint'
        >['request']['abi'],
        'claimOrMint',
        TMode
      > & { functionName?: 'claimOrMint' }
    : UseContractWriteConfig<typeof uniNftTokenABI, 'claimOrMint', TMode> & {
        abi?: never
        functionName?: 'claimOrMint'
      } = {} as any,
) {
  return useContractWrite<typeof uniNftTokenABI, 'claimOrMint', TMode>({
    abi: uniNftTokenABI,
    functionName: 'claimOrMint',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link uniNftTokenABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function useUniNftTokenSafeTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof uniNftTokenABI,
          'safeTransferFrom'
        >['request']['abi'],
        'safeTransferFrom',
        TMode
      > & { functionName?: 'safeTransferFrom' }
    : UseContractWriteConfig<
        typeof uniNftTokenABI,
        'safeTransferFrom',
        TMode
      > & {
        abi?: never
        functionName?: 'safeTransferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof uniNftTokenABI, 'safeTransferFrom', TMode>({
    abi: uniNftTokenABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link uniNftTokenABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function useUniNftTokenSetApprovalForAll<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof uniNftTokenABI,
          'setApprovalForAll'
        >['request']['abi'],
        'setApprovalForAll',
        TMode
      > & { functionName?: 'setApprovalForAll' }
    : UseContractWriteConfig<
        typeof uniNftTokenABI,
        'setApprovalForAll',
        TMode
      > & {
        abi?: never
        functionName?: 'setApprovalForAll'
      } = {} as any,
) {
  return useContractWrite<typeof uniNftTokenABI, 'setApprovalForAll', TMode>({
    abi: uniNftTokenABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link uniNftTokenABI}__ and `functionName` set to `"stash"`.
 */
export function useUniNftTokenStash<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof uniNftTokenABI,
          'stash'
        >['request']['abi'],
        'stash',
        TMode
      > & { functionName?: 'stash' }
    : UseContractWriteConfig<typeof uniNftTokenABI, 'stash', TMode> & {
        abi?: never
        functionName?: 'stash'
      } = {} as any,
) {
  return useContractWrite<typeof uniNftTokenABI, 'stash', TMode>({
    abi: uniNftTokenABI,
    functionName: 'stash',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link uniNftTokenABI}__ and `functionName` set to `"transferFrom"`.
 */
export function useUniNftTokenTransferFrom<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof uniNftTokenABI,
          'transferFrom'
        >['request']['abi'],
        'transferFrom',
        TMode
      > & { functionName?: 'transferFrom' }
    : UseContractWriteConfig<typeof uniNftTokenABI, 'transferFrom', TMode> & {
        abi?: never
        functionName?: 'transferFrom'
      } = {} as any,
) {
  return useContractWrite<typeof uniNftTokenABI, 'transferFrom', TMode>({
    abi: uniNftTokenABI,
    functionName: 'transferFrom',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link uniNftTokenABI}__.
 */
export function usePrepareUniNftTokenWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof uniNftTokenABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: uniNftTokenABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof uniNftTokenABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link uniNftTokenABI}__ and `functionName` set to `"approve"`.
 */
export function usePrepareUniNftTokenApprove(
  config: Omit<
    UsePrepareContractWriteConfig<typeof uniNftTokenABI, 'approve'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: uniNftTokenABI,
    functionName: 'approve',
    ...config,
  } as UsePrepareContractWriteConfig<typeof uniNftTokenABI, 'approve'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link uniNftTokenABI}__ and `functionName` set to `"claimOrMint"`.
 */
export function usePrepareUniNftTokenClaimOrMint(
  config: Omit<
    UsePrepareContractWriteConfig<typeof uniNftTokenABI, 'claimOrMint'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: uniNftTokenABI,
    functionName: 'claimOrMint',
    ...config,
  } as UsePrepareContractWriteConfig<typeof uniNftTokenABI, 'claimOrMint'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link uniNftTokenABI}__ and `functionName` set to `"safeTransferFrom"`.
 */
export function usePrepareUniNftTokenSafeTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof uniNftTokenABI, 'safeTransferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: uniNftTokenABI,
    functionName: 'safeTransferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof uniNftTokenABI, 'safeTransferFrom'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link uniNftTokenABI}__ and `functionName` set to `"setApprovalForAll"`.
 */
export function usePrepareUniNftTokenSetApprovalForAll(
  config: Omit<
    UsePrepareContractWriteConfig<typeof uniNftTokenABI, 'setApprovalForAll'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: uniNftTokenABI,
    functionName: 'setApprovalForAll',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof uniNftTokenABI,
    'setApprovalForAll'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link uniNftTokenABI}__ and `functionName` set to `"stash"`.
 */
export function usePrepareUniNftTokenStash(
  config: Omit<
    UsePrepareContractWriteConfig<typeof uniNftTokenABI, 'stash'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: uniNftTokenABI,
    functionName: 'stash',
    ...config,
  } as UsePrepareContractWriteConfig<typeof uniNftTokenABI, 'stash'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link uniNftTokenABI}__ and `functionName` set to `"transferFrom"`.
 */
export function usePrepareUniNftTokenTransferFrom(
  config: Omit<
    UsePrepareContractWriteConfig<typeof uniNftTokenABI, 'transferFrom'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: uniNftTokenABI,
    functionName: 'transferFrom',
    ...config,
  } as UsePrepareContractWriteConfig<typeof uniNftTokenABI, 'transferFrom'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link uniNftTokenABI}__.
 */
export function useUniNftTokenEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof uniNftTokenABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: uniNftTokenABI,
    ...config,
  } as UseContractEventConfig<typeof uniNftTokenABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link uniNftTokenABI}__ and `eventName` set to `"Approval"`.
 */
export function useUniNftTokenApprovalEvent(
  config: Omit<
    UseContractEventConfig<typeof uniNftTokenABI, 'Approval'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: uniNftTokenABI,
    eventName: 'Approval',
    ...config,
  } as UseContractEventConfig<typeof uniNftTokenABI, 'Approval'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link uniNftTokenABI}__ and `eventName` set to `"ApprovalForAll"`.
 */
export function useUniNftTokenApprovalForAllEvent(
  config: Omit<
    UseContractEventConfig<typeof uniNftTokenABI, 'ApprovalForAll'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: uniNftTokenABI,
    eventName: 'ApprovalForAll',
    ...config,
  } as UseContractEventConfig<typeof uniNftTokenABI, 'ApprovalForAll'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link uniNftTokenABI}__ and `eventName` set to `"Transfer"`.
 */
export function useUniNftTokenTransferEvent(
  config: Omit<
    UseContractEventConfig<typeof uniNftTokenABI, 'Transfer'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: uniNftTokenABI,
    eventName: 'Transfer',
    ...config,
  } as UseContractEventConfig<typeof uniNftTokenABI, 'Transfer'>)
}
