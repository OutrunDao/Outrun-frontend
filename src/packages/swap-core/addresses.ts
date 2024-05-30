import { ChainId, SUPPORTED_CHAINS, SupportedChainsType } from './chains';

type AddressMap = { [chainId: number]: string };

type ChainAddresses = {
  factoryAddress: string;
  multicallAddress: string;
  quoterAddress: string;
  nonfungiblePositionManagerAddress?: string;
  tickLensAddress?: string;
  routerAddress?: string;
};

const DEFAULT_NETWORKS = [ChainId.BLAST_SEPOLIA];

function constructSameAddressMap(address: string, additionalNetworks: ChainId[] = []): AddressMap {
  return DEFAULT_NETWORKS.concat(additionalNetworks).reduce<AddressMap>((memo, chainId) => {
    memo[chainId] = address;
    return memo;
  }, {});
}

/**
 * @deprecated use V2_FACTORY_ADDRESSES instead
 */
export const V2_FACTORY_ADDRESS = '0xb65EEEa6f65A2991F582c65D0f86557320446070';
export const V2_FACTORY_ADDRESSES: AddressMap = {
  [ChainId.BLAST]: '0xb65EEEa6f65A2991F582c65D0f86557320446070',
  [ChainId.BLAST_SEPOLIA]: '0xb65EEEa6f65A2991F582c65D0f86557320446070',
};
/**
 * @deprecated use V2_ROUTER_ADDRESSES instead
 */
export const V2_ROUTER_ADDRESS = '0x354Ecc33f434D111405F1f3B19FE013c3bEFcb73';
export const V2_ROUTER_ADDRESSES: AddressMap = {
  [ChainId.BLAST]: '0x354Ecc33f434D111405F1f3B19FE013c3bEFcb73',
  [ChainId.BLAST_SEPOLIA]: '0x354Ecc33f434D111405F1f3B19FE013c3bEFcb73',
};

// sepolia v3 addresses
const BLAST_SEPOLIA_ADDRESSES: ChainAddresses = {
  factoryAddress: '0xb65EEEa6f65A2991F582c65D0f86557320446070',
  multicallAddress: '0xca11bde05977b3631167028862be2a173976ca11',
  quoterAddress: '',
  nonfungiblePositionManagerAddress: '',
  tickLensAddress: '',
  routerAddress: '0x354Ecc33f434D111405F1f3B19FE013c3bEFcb73',
};

const BLAST_ADDRESSES: ChainAddresses = {
  // TODO: update with the correct addresses
  factoryAddress: '',
  multicallAddress: '',
  quoterAddress: '',
  nonfungiblePositionManagerAddress: '',
  tickLensAddress: '',
  routerAddress: '',
};

export const CHAIN_TO_ADDRESSES_MAP: Record<SupportedChainsType, ChainAddresses> = {
  [ChainId.BLAST_SEPOLIA]: BLAST_SEPOLIA_ADDRESSES,
  [ChainId.BLAST]: BLAST_ADDRESSES,
};

export const MULTICALL_ADDRESSES: AddressMap = {
  ...SUPPORTED_CHAINS.reduce<AddressMap>((memo, chainId) => {
    memo[chainId] = CHAIN_TO_ADDRESSES_MAP[chainId].multicallAddress;
    return memo;
  }, {}),
};

export const QUOTER_ADDRESSES: AddressMap = {
  ...SUPPORTED_CHAINS.reduce<AddressMap>((memo, chainId) => {
    memo[chainId] = CHAIN_TO_ADDRESSES_MAP[chainId].quoterAddress;
    return memo;
  }, {}),
};

export const NONFUNGIBLE_POSITION_MANAGER_ADDRESSES: AddressMap = {
  ...SUPPORTED_CHAINS.reduce<AddressMap>((memo, chainId) => {
    const nonfungiblePositionManagerAddress =
      CHAIN_TO_ADDRESSES_MAP[chainId].nonfungiblePositionManagerAddress;
    if (nonfungiblePositionManagerAddress) {
      memo[chainId] = nonfungiblePositionManagerAddress;
    }
    return memo;
  }, {}),
};

export const TICK_LENS_ADDRESSES: AddressMap = {
  ...SUPPORTED_CHAINS.reduce<AddressMap>((memo, chainId) => {
    const tickLensAddress = CHAIN_TO_ADDRESSES_MAP[chainId].tickLensAddress;
    if (tickLensAddress) {
      memo[chainId] = tickLensAddress;
    }
    return memo;
  }, {}),
};

export const SWAP_ROUTER_ADDRESSES = (chainId: number) => {
  if (SUPPORTED_CHAINS.includes(chainId)) {
    const id = chainId as SupportedChainsType;
    return CHAIN_TO_ADDRESSES_MAP[id].routerAddress ?? '';
  }
  return '';
};
