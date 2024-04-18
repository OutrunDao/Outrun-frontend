// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace OutrunStakeTypes {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
  Int8: any;
  Timestamp: any;
};

export type Aggregation_interval =
  | 'hour'
  | 'day';

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type ClaimMaxGas = {
  id: Scalars['Bytes'];
  recipient: Scalars['Bytes'];
  gasAmount: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type ClaimMaxGas_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  recipient?: InputMaybe<Scalars['Bytes']>;
  recipient_not?: InputMaybe<Scalars['Bytes']>;
  recipient_gt?: InputMaybe<Scalars['Bytes']>;
  recipient_lt?: InputMaybe<Scalars['Bytes']>;
  recipient_gte?: InputMaybe<Scalars['Bytes']>;
  recipient_lte?: InputMaybe<Scalars['Bytes']>;
  recipient_in?: InputMaybe<Array<Scalars['Bytes']>>;
  recipient_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  recipient_contains?: InputMaybe<Scalars['Bytes']>;
  recipient_not_contains?: InputMaybe<Scalars['Bytes']>;
  gasAmount?: InputMaybe<Scalars['BigInt']>;
  gasAmount_not?: InputMaybe<Scalars['BigInt']>;
  gasAmount_gt?: InputMaybe<Scalars['BigInt']>;
  gasAmount_lt?: InputMaybe<Scalars['BigInt']>;
  gasAmount_gte?: InputMaybe<Scalars['BigInt']>;
  gasAmount_lte?: InputMaybe<Scalars['BigInt']>;
  gasAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gasAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ClaimMaxGas_filter>>>;
  or?: InputMaybe<Array<InputMaybe<ClaimMaxGas_filter>>>;
};

export type ClaimMaxGas_orderBy =
  | 'id'
  | 'recipient'
  | 'gasAmount'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type ExtendLockTime = {
  id: Scalars['Bytes'];
  positionId: Scalars['BigInt'];
  extendDays: Scalars['BigInt'];
  newDeadLine: Scalars['BigInt'];
  mintedREY: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type ExtendLockTime_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  positionId?: InputMaybe<Scalars['BigInt']>;
  positionId_not?: InputMaybe<Scalars['BigInt']>;
  positionId_gt?: InputMaybe<Scalars['BigInt']>;
  positionId_lt?: InputMaybe<Scalars['BigInt']>;
  positionId_gte?: InputMaybe<Scalars['BigInt']>;
  positionId_lte?: InputMaybe<Scalars['BigInt']>;
  positionId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  positionId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  extendDays?: InputMaybe<Scalars['BigInt']>;
  extendDays_not?: InputMaybe<Scalars['BigInt']>;
  extendDays_gt?: InputMaybe<Scalars['BigInt']>;
  extendDays_lt?: InputMaybe<Scalars['BigInt']>;
  extendDays_gte?: InputMaybe<Scalars['BigInt']>;
  extendDays_lte?: InputMaybe<Scalars['BigInt']>;
  extendDays_in?: InputMaybe<Array<Scalars['BigInt']>>;
  extendDays_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  newDeadLine?: InputMaybe<Scalars['BigInt']>;
  newDeadLine_not?: InputMaybe<Scalars['BigInt']>;
  newDeadLine_gt?: InputMaybe<Scalars['BigInt']>;
  newDeadLine_lt?: InputMaybe<Scalars['BigInt']>;
  newDeadLine_gte?: InputMaybe<Scalars['BigInt']>;
  newDeadLine_lte?: InputMaybe<Scalars['BigInt']>;
  newDeadLine_in?: InputMaybe<Array<Scalars['BigInt']>>;
  newDeadLine_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  mintedREY?: InputMaybe<Scalars['BigInt']>;
  mintedREY_not?: InputMaybe<Scalars['BigInt']>;
  mintedREY_gt?: InputMaybe<Scalars['BigInt']>;
  mintedREY_lt?: InputMaybe<Scalars['BigInt']>;
  mintedREY_gte?: InputMaybe<Scalars['BigInt']>;
  mintedREY_lte?: InputMaybe<Scalars['BigInt']>;
  mintedREY_in?: InputMaybe<Array<Scalars['BigInt']>>;
  mintedREY_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ExtendLockTime_filter>>>;
  or?: InputMaybe<Array<InputMaybe<ExtendLockTime_filter>>>;
};

export type ExtendLockTime_orderBy =
  | 'id'
  | 'positionId'
  | 'extendDays'
  | 'newDeadLine'
  | 'mintedREY'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type GasManagerTransferred = {
  id: Scalars['Bytes'];
  previousGasManager: Scalars['Bytes'];
  newGasManager: Scalars['Bytes'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type GasManagerTransferred_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  previousGasManager?: InputMaybe<Scalars['Bytes']>;
  previousGasManager_not?: InputMaybe<Scalars['Bytes']>;
  previousGasManager_gt?: InputMaybe<Scalars['Bytes']>;
  previousGasManager_lt?: InputMaybe<Scalars['Bytes']>;
  previousGasManager_gte?: InputMaybe<Scalars['Bytes']>;
  previousGasManager_lte?: InputMaybe<Scalars['Bytes']>;
  previousGasManager_in?: InputMaybe<Array<Scalars['Bytes']>>;
  previousGasManager_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  previousGasManager_contains?: InputMaybe<Scalars['Bytes']>;
  previousGasManager_not_contains?: InputMaybe<Scalars['Bytes']>;
  newGasManager?: InputMaybe<Scalars['Bytes']>;
  newGasManager_not?: InputMaybe<Scalars['Bytes']>;
  newGasManager_gt?: InputMaybe<Scalars['Bytes']>;
  newGasManager_lt?: InputMaybe<Scalars['Bytes']>;
  newGasManager_gte?: InputMaybe<Scalars['Bytes']>;
  newGasManager_lte?: InputMaybe<Scalars['Bytes']>;
  newGasManager_in?: InputMaybe<Array<Scalars['Bytes']>>;
  newGasManager_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  newGasManager_contains?: InputMaybe<Scalars['Bytes']>;
  newGasManager_not_contains?: InputMaybe<Scalars['Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<GasManagerTransferred_filter>>>;
  or?: InputMaybe<Array<InputMaybe<GasManagerTransferred_filter>>>;
};

export type GasManagerTransferred_orderBy =
  | 'id'
  | 'previousGasManager'
  | 'newGasManager'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type OwnershipTransferred = {
  id: Scalars['Bytes'];
  previousOwner: Scalars['Bytes'];
  newOwner: Scalars['Bytes'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type OwnershipTransferred_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  previousOwner?: InputMaybe<Scalars['Bytes']>;
  previousOwner_not?: InputMaybe<Scalars['Bytes']>;
  previousOwner_gt?: InputMaybe<Scalars['Bytes']>;
  previousOwner_lt?: InputMaybe<Scalars['Bytes']>;
  previousOwner_gte?: InputMaybe<Scalars['Bytes']>;
  previousOwner_lte?: InputMaybe<Scalars['Bytes']>;
  previousOwner_in?: InputMaybe<Array<Scalars['Bytes']>>;
  previousOwner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  previousOwner_contains?: InputMaybe<Scalars['Bytes']>;
  previousOwner_not_contains?: InputMaybe<Scalars['Bytes']>;
  newOwner?: InputMaybe<Scalars['Bytes']>;
  newOwner_not?: InputMaybe<Scalars['Bytes']>;
  newOwner_gt?: InputMaybe<Scalars['Bytes']>;
  newOwner_lt?: InputMaybe<Scalars['Bytes']>;
  newOwner_gte?: InputMaybe<Scalars['Bytes']>;
  newOwner_lte?: InputMaybe<Scalars['Bytes']>;
  newOwner_in?: InputMaybe<Array<Scalars['Bytes']>>;
  newOwner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  newOwner_contains?: InputMaybe<Scalars['Bytes']>;
  newOwner_not_contains?: InputMaybe<Scalars['Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<OwnershipTransferred_filter>>>;
  or?: InputMaybe<Array<InputMaybe<OwnershipTransferred_filter>>>;
};

export type OwnershipTransferred_orderBy =
  | 'id'
  | 'previousOwner'
  | 'newOwner'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type Query = {
  claimMaxGas?: Maybe<ClaimMaxGas>;
  claimMaxGas_collection: Array<ClaimMaxGas>;
  gasManagerTransferred?: Maybe<GasManagerTransferred>;
  gasManagerTransferreds: Array<GasManagerTransferred>;
  ownershipTransferred?: Maybe<OwnershipTransferred>;
  ownershipTransferreds: Array<OwnershipTransferred>;
  setForceUnstakeFee?: Maybe<SetForceUnstakeFee>;
  setForceUnstakeFees: Array<SetForceUnstakeFee>;
  setMaxLockupDays?: Maybe<SetMaxLockupDays>;
  setMaxLockupDays_collection: Array<SetMaxLockupDays>;
  setMinLockupDays?: Maybe<SetMinLockupDays>;
  setMinLockupDays_collection: Array<SetMinLockupDays>;
  setOutETHVault?: Maybe<SetOutETHVault>;
  setOutETHVaults: Array<SetOutETHVault>;
  extendLockTime?: Maybe<ExtendLockTime>;
  extendLockTimes: Array<ExtendLockTime>;
  stakeRETH?: Maybe<StakeRETH>;
  stakeRETHs: Array<StakeRETH>;
  unstake?: Maybe<Unstake>;
  unstakes: Array<Unstake>;
  withdrawYield?: Maybe<WithdrawYield>;
  withdrawYields: Array<WithdrawYield>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QueryclaimMaxGasArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryclaimMaxGas_collectionArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ClaimMaxGas_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ClaimMaxGas_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerygasManagerTransferredArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerygasManagerTransferredsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GasManagerTransferred_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<GasManagerTransferred_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryownershipTransferredArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryownershipTransferredsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<OwnershipTransferred_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<OwnershipTransferred_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysetForceUnstakeFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysetForceUnstakeFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SetForceUnstakeFee_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SetForceUnstakeFee_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysetMaxLockupDaysArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysetMaxLockupDays_collectionArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SetMaxLockupDays_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SetMaxLockupDays_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysetMinLockupDaysArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysetMinLockupDays_collectionArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SetMinLockupDays_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SetMinLockupDays_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysetOutETHVaultArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerysetOutETHVaultsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SetOutETHVault_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SetOutETHVault_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryextendLockTimeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryextendLockTimesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ExtendLockTime_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ExtendLockTime_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerystakeRETHArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerystakeRETHsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<StakeRETH_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<StakeRETH_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryunstakeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryunstakesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Unstake_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Unstake_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerywithdrawYieldArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerywithdrawYieldsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<WithdrawYield_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<WithdrawYield_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type SetForceUnstakeFee = {
  id: Scalars['Bytes'];
  forceUnstakeFee: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type SetForceUnstakeFee_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  forceUnstakeFee?: InputMaybe<Scalars['BigInt']>;
  forceUnstakeFee_not?: InputMaybe<Scalars['BigInt']>;
  forceUnstakeFee_gt?: InputMaybe<Scalars['BigInt']>;
  forceUnstakeFee_lt?: InputMaybe<Scalars['BigInt']>;
  forceUnstakeFee_gte?: InputMaybe<Scalars['BigInt']>;
  forceUnstakeFee_lte?: InputMaybe<Scalars['BigInt']>;
  forceUnstakeFee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  forceUnstakeFee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<SetForceUnstakeFee_filter>>>;
  or?: InputMaybe<Array<InputMaybe<SetForceUnstakeFee_filter>>>;
};

export type SetForceUnstakeFee_orderBy =
  | 'id'
  | 'forceUnstakeFee'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type SetMaxLockupDays = {
  id: Scalars['Bytes'];
  maxLockupDays: Scalars['Int'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type SetMaxLockupDays_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  maxLockupDays?: InputMaybe<Scalars['Int']>;
  maxLockupDays_not?: InputMaybe<Scalars['Int']>;
  maxLockupDays_gt?: InputMaybe<Scalars['Int']>;
  maxLockupDays_lt?: InputMaybe<Scalars['Int']>;
  maxLockupDays_gte?: InputMaybe<Scalars['Int']>;
  maxLockupDays_lte?: InputMaybe<Scalars['Int']>;
  maxLockupDays_in?: InputMaybe<Array<Scalars['Int']>>;
  maxLockupDays_not_in?: InputMaybe<Array<Scalars['Int']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<SetMaxLockupDays_filter>>>;
  or?: InputMaybe<Array<InputMaybe<SetMaxLockupDays_filter>>>;
};

export type SetMaxLockupDays_orderBy =
  | 'id'
  | 'maxLockupDays'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type SetMinLockupDays = {
  id: Scalars['Bytes'];
  minLockupDays: Scalars['Int'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type SetMinLockupDays_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  minLockupDays?: InputMaybe<Scalars['Int']>;
  minLockupDays_not?: InputMaybe<Scalars['Int']>;
  minLockupDays_gt?: InputMaybe<Scalars['Int']>;
  minLockupDays_lt?: InputMaybe<Scalars['Int']>;
  minLockupDays_gte?: InputMaybe<Scalars['Int']>;
  minLockupDays_lte?: InputMaybe<Scalars['Int']>;
  minLockupDays_in?: InputMaybe<Array<Scalars['Int']>>;
  minLockupDays_not_in?: InputMaybe<Array<Scalars['Int']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<SetMinLockupDays_filter>>>;
  or?: InputMaybe<Array<InputMaybe<SetMinLockupDays_filter>>>;
};

export type SetMinLockupDays_orderBy =
  | 'id'
  | 'minLockupDays'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type SetOutETHVault = {
  id: Scalars['Bytes'];
  outETHVault: Scalars['Bytes'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type SetOutETHVault_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  outETHVault?: InputMaybe<Scalars['Bytes']>;
  outETHVault_not?: InputMaybe<Scalars['Bytes']>;
  outETHVault_gt?: InputMaybe<Scalars['Bytes']>;
  outETHVault_lt?: InputMaybe<Scalars['Bytes']>;
  outETHVault_gte?: InputMaybe<Scalars['Bytes']>;
  outETHVault_lte?: InputMaybe<Scalars['Bytes']>;
  outETHVault_in?: InputMaybe<Array<Scalars['Bytes']>>;
  outETHVault_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  outETHVault_contains?: InputMaybe<Scalars['Bytes']>;
  outETHVault_not_contains?: InputMaybe<Scalars['Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<SetOutETHVault_filter>>>;
  or?: InputMaybe<Array<InputMaybe<SetOutETHVault_filter>>>;
};

export type SetOutETHVault_orderBy =
  | 'id'
  | 'outETHVault'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type StakeRETH = {
  id: Scalars['String'];
  positionId: Scalars['BigInt'];
  newDeadLine?: Maybe<Scalars['BigInt']>;
  account: Scalars['Bytes'];
  amountInRETH: Scalars['BigInt'];
  amountInPETH: Scalars['BigInt'];
  amountInREY: Scalars['BigInt'];
  deadline: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type StakeRETH_filter = {
  id?: InputMaybe<Scalars['String']>;
  id_not?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_contains_nocase?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']>;
  id_starts_with?: InputMaybe<Scalars['String']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_starts_with?: InputMaybe<Scalars['String']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_ends_with?: InputMaybe<Scalars['String']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_ends_with?: InputMaybe<Scalars['String']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  positionId?: InputMaybe<Scalars['BigInt']>;
  positionId_not?: InputMaybe<Scalars['BigInt']>;
  positionId_gt?: InputMaybe<Scalars['BigInt']>;
  positionId_lt?: InputMaybe<Scalars['BigInt']>;
  positionId_gte?: InputMaybe<Scalars['BigInt']>;
  positionId_lte?: InputMaybe<Scalars['BigInt']>;
  positionId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  positionId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  newDeadLine?: InputMaybe<Scalars['BigInt']>;
  newDeadLine_not?: InputMaybe<Scalars['BigInt']>;
  newDeadLine_gt?: InputMaybe<Scalars['BigInt']>;
  newDeadLine_lt?: InputMaybe<Scalars['BigInt']>;
  newDeadLine_gte?: InputMaybe<Scalars['BigInt']>;
  newDeadLine_lte?: InputMaybe<Scalars['BigInt']>;
  newDeadLine_in?: InputMaybe<Array<Scalars['BigInt']>>;
  newDeadLine_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  account?: InputMaybe<Scalars['Bytes']>;
  account_not?: InputMaybe<Scalars['Bytes']>;
  account_gt?: InputMaybe<Scalars['Bytes']>;
  account_lt?: InputMaybe<Scalars['Bytes']>;
  account_gte?: InputMaybe<Scalars['Bytes']>;
  account_lte?: InputMaybe<Scalars['Bytes']>;
  account_in?: InputMaybe<Array<Scalars['Bytes']>>;
  account_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  account_contains?: InputMaybe<Scalars['Bytes']>;
  account_not_contains?: InputMaybe<Scalars['Bytes']>;
  amountInRETH?: InputMaybe<Scalars['BigInt']>;
  amountInRETH_not?: InputMaybe<Scalars['BigInt']>;
  amountInRETH_gt?: InputMaybe<Scalars['BigInt']>;
  amountInRETH_lt?: InputMaybe<Scalars['BigInt']>;
  amountInRETH_gte?: InputMaybe<Scalars['BigInt']>;
  amountInRETH_lte?: InputMaybe<Scalars['BigInt']>;
  amountInRETH_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amountInRETH_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amountInPETH?: InputMaybe<Scalars['BigInt']>;
  amountInPETH_not?: InputMaybe<Scalars['BigInt']>;
  amountInPETH_gt?: InputMaybe<Scalars['BigInt']>;
  amountInPETH_lt?: InputMaybe<Scalars['BigInt']>;
  amountInPETH_gte?: InputMaybe<Scalars['BigInt']>;
  amountInPETH_lte?: InputMaybe<Scalars['BigInt']>;
  amountInPETH_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amountInPETH_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amountInREY?: InputMaybe<Scalars['BigInt']>;
  amountInREY_not?: InputMaybe<Scalars['BigInt']>;
  amountInREY_gt?: InputMaybe<Scalars['BigInt']>;
  amountInREY_lt?: InputMaybe<Scalars['BigInt']>;
  amountInREY_gte?: InputMaybe<Scalars['BigInt']>;
  amountInREY_lte?: InputMaybe<Scalars['BigInt']>;
  amountInREY_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amountInREY_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  deadline?: InputMaybe<Scalars['BigInt']>;
  deadline_not?: InputMaybe<Scalars['BigInt']>;
  deadline_gt?: InputMaybe<Scalars['BigInt']>;
  deadline_lt?: InputMaybe<Scalars['BigInt']>;
  deadline_gte?: InputMaybe<Scalars['BigInt']>;
  deadline_lte?: InputMaybe<Scalars['BigInt']>;
  deadline_in?: InputMaybe<Array<Scalars['BigInt']>>;
  deadline_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<StakeRETH_filter>>>;
  or?: InputMaybe<Array<InputMaybe<StakeRETH_filter>>>;
};

export type StakeRETH_orderBy =
  | 'id'
  | 'positionId'
  | 'newDeadLine'
  | 'account'
  | 'amountInRETH'
  | 'amountInPETH'
  | 'amountInREY'
  | 'deadline'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type Subscription = {
  claimMaxGas?: Maybe<ClaimMaxGas>;
  claimMaxGas_collection: Array<ClaimMaxGas>;
  gasManagerTransferred?: Maybe<GasManagerTransferred>;
  gasManagerTransferreds: Array<GasManagerTransferred>;
  ownershipTransferred?: Maybe<OwnershipTransferred>;
  ownershipTransferreds: Array<OwnershipTransferred>;
  setForceUnstakeFee?: Maybe<SetForceUnstakeFee>;
  setForceUnstakeFees: Array<SetForceUnstakeFee>;
  setMaxLockupDays?: Maybe<SetMaxLockupDays>;
  setMaxLockupDays_collection: Array<SetMaxLockupDays>;
  setMinLockupDays?: Maybe<SetMinLockupDays>;
  setMinLockupDays_collection: Array<SetMinLockupDays>;
  setOutETHVault?: Maybe<SetOutETHVault>;
  setOutETHVaults: Array<SetOutETHVault>;
  extendLockTime?: Maybe<ExtendLockTime>;
  extendLockTimes: Array<ExtendLockTime>;
  stakeRETH?: Maybe<StakeRETH>;
  stakeRETHs: Array<StakeRETH>;
  unstake?: Maybe<Unstake>;
  unstakes: Array<Unstake>;
  withdrawYield?: Maybe<WithdrawYield>;
  withdrawYields: Array<WithdrawYield>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptionclaimMaxGasArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionclaimMaxGas_collectionArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ClaimMaxGas_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ClaimMaxGas_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiongasManagerTransferredArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptiongasManagerTransferredsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GasManagerTransferred_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<GasManagerTransferred_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionownershipTransferredArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionownershipTransferredsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<OwnershipTransferred_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<OwnershipTransferred_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionsetForceUnstakeFeeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionsetForceUnstakeFeesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SetForceUnstakeFee_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SetForceUnstakeFee_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionsetMaxLockupDaysArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionsetMaxLockupDays_collectionArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SetMaxLockupDays_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SetMaxLockupDays_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionsetMinLockupDaysArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionsetMinLockupDays_collectionArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SetMinLockupDays_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SetMinLockupDays_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionsetOutETHVaultArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionsetOutETHVaultsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SetOutETHVault_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<SetOutETHVault_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionextendLockTimeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionextendLockTimesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ExtendLockTime_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<ExtendLockTime_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionstakeRETHArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionstakeRETHsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<StakeRETH_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<StakeRETH_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionunstakeArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionunstakesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Unstake_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Unstake_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionwithdrawYieldArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionwithdrawYieldsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<WithdrawYield_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<WithdrawYield_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Unstake = {
  id: Scalars['Bytes'];
  positionId: Scalars['BigInt'];
  amountInRETH: Scalars['BigInt'];
  burnedPETH: Scalars['BigInt'];
  burnedREY: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type Unstake_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  positionId?: InputMaybe<Scalars['BigInt']>;
  positionId_not?: InputMaybe<Scalars['BigInt']>;
  positionId_gt?: InputMaybe<Scalars['BigInt']>;
  positionId_lt?: InputMaybe<Scalars['BigInt']>;
  positionId_gte?: InputMaybe<Scalars['BigInt']>;
  positionId_lte?: InputMaybe<Scalars['BigInt']>;
  positionId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  positionId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amountInRETH?: InputMaybe<Scalars['BigInt']>;
  amountInRETH_not?: InputMaybe<Scalars['BigInt']>;
  amountInRETH_gt?: InputMaybe<Scalars['BigInt']>;
  amountInRETH_lt?: InputMaybe<Scalars['BigInt']>;
  amountInRETH_gte?: InputMaybe<Scalars['BigInt']>;
  amountInRETH_lte?: InputMaybe<Scalars['BigInt']>;
  amountInRETH_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amountInRETH_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  burnedPETH?: InputMaybe<Scalars['BigInt']>;
  burnedPETH_not?: InputMaybe<Scalars['BigInt']>;
  burnedPETH_gt?: InputMaybe<Scalars['BigInt']>;
  burnedPETH_lt?: InputMaybe<Scalars['BigInt']>;
  burnedPETH_gte?: InputMaybe<Scalars['BigInt']>;
  burnedPETH_lte?: InputMaybe<Scalars['BigInt']>;
  burnedPETH_in?: InputMaybe<Array<Scalars['BigInt']>>;
  burnedPETH_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  burnedREY?: InputMaybe<Scalars['BigInt']>;
  burnedREY_not?: InputMaybe<Scalars['BigInt']>;
  burnedREY_gt?: InputMaybe<Scalars['BigInt']>;
  burnedREY_lt?: InputMaybe<Scalars['BigInt']>;
  burnedREY_gte?: InputMaybe<Scalars['BigInt']>;
  burnedREY_lte?: InputMaybe<Scalars['BigInt']>;
  burnedREY_in?: InputMaybe<Array<Scalars['BigInt']>>;
  burnedREY_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Unstake_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Unstake_filter>>>;
};

export type Unstake_orderBy =
  | 'id'
  | 'positionId'
  | 'amountInRETH'
  | 'burnedPETH'
  | 'burnedREY'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type WithdrawYield = {
  id: Scalars['Bytes'];
  account: Scalars['Bytes'];
  burnedREY: Scalars['BigInt'];
  yieldAmount: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type WithdrawYield_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  account?: InputMaybe<Scalars['Bytes']>;
  account_not?: InputMaybe<Scalars['Bytes']>;
  account_gt?: InputMaybe<Scalars['Bytes']>;
  account_lt?: InputMaybe<Scalars['Bytes']>;
  account_gte?: InputMaybe<Scalars['Bytes']>;
  account_lte?: InputMaybe<Scalars['Bytes']>;
  account_in?: InputMaybe<Array<Scalars['Bytes']>>;
  account_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  account_contains?: InputMaybe<Scalars['Bytes']>;
  account_not_contains?: InputMaybe<Scalars['Bytes']>;
  burnedREY?: InputMaybe<Scalars['BigInt']>;
  burnedREY_not?: InputMaybe<Scalars['BigInt']>;
  burnedREY_gt?: InputMaybe<Scalars['BigInt']>;
  burnedREY_lt?: InputMaybe<Scalars['BigInt']>;
  burnedREY_gte?: InputMaybe<Scalars['BigInt']>;
  burnedREY_lte?: InputMaybe<Scalars['BigInt']>;
  burnedREY_in?: InputMaybe<Array<Scalars['BigInt']>>;
  burnedREY_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  yieldAmount?: InputMaybe<Scalars['BigInt']>;
  yieldAmount_not?: InputMaybe<Scalars['BigInt']>;
  yieldAmount_gt?: InputMaybe<Scalars['BigInt']>;
  yieldAmount_lt?: InputMaybe<Scalars['BigInt']>;
  yieldAmount_gte?: InputMaybe<Scalars['BigInt']>;
  yieldAmount_lte?: InputMaybe<Scalars['BigInt']>;
  yieldAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  yieldAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<WithdrawYield_filter>>>;
  or?: InputMaybe<Array<InputMaybe<WithdrawYield_filter>>>;
};

export type WithdrawYield_orderBy =
  | 'id'
  | 'account'
  | 'burnedREY'
  | 'yieldAmount'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['Bytes']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

  export type QuerySdk = {
      /** null **/
  claimMaxGas: InContextSdkMethod<Query['claimMaxGas'], QueryclaimMaxGasArgs, MeshContext>,
  /** null **/
  claimMaxGas_collection: InContextSdkMethod<Query['claimMaxGas_collection'], QueryclaimMaxGas_collectionArgs, MeshContext>,
  /** null **/
  gasManagerTransferred: InContextSdkMethod<Query['gasManagerTransferred'], QuerygasManagerTransferredArgs, MeshContext>,
  /** null **/
  gasManagerTransferreds: InContextSdkMethod<Query['gasManagerTransferreds'], QuerygasManagerTransferredsArgs, MeshContext>,
  /** null **/
  ownershipTransferred: InContextSdkMethod<Query['ownershipTransferred'], QueryownershipTransferredArgs, MeshContext>,
  /** null **/
  ownershipTransferreds: InContextSdkMethod<Query['ownershipTransferreds'], QueryownershipTransferredsArgs, MeshContext>,
  /** null **/
  setForceUnstakeFee: InContextSdkMethod<Query['setForceUnstakeFee'], QuerysetForceUnstakeFeeArgs, MeshContext>,
  /** null **/
  setForceUnstakeFees: InContextSdkMethod<Query['setForceUnstakeFees'], QuerysetForceUnstakeFeesArgs, MeshContext>,
  /** null **/
  setMaxLockupDays: InContextSdkMethod<Query['setMaxLockupDays'], QuerysetMaxLockupDaysArgs, MeshContext>,
  /** null **/
  setMaxLockupDays_collection: InContextSdkMethod<Query['setMaxLockupDays_collection'], QuerysetMaxLockupDays_collectionArgs, MeshContext>,
  /** null **/
  setMinLockupDays: InContextSdkMethod<Query['setMinLockupDays'], QuerysetMinLockupDaysArgs, MeshContext>,
  /** null **/
  setMinLockupDays_collection: InContextSdkMethod<Query['setMinLockupDays_collection'], QuerysetMinLockupDays_collectionArgs, MeshContext>,
  /** null **/
  setOutETHVault: InContextSdkMethod<Query['setOutETHVault'], QuerysetOutETHVaultArgs, MeshContext>,
  /** null **/
  setOutETHVaults: InContextSdkMethod<Query['setOutETHVaults'], QuerysetOutETHVaultsArgs, MeshContext>,
  /** null **/
  extendLockTime: InContextSdkMethod<Query['extendLockTime'], QueryextendLockTimeArgs, MeshContext>,
  /** null **/
  extendLockTimes: InContextSdkMethod<Query['extendLockTimes'], QueryextendLockTimesArgs, MeshContext>,
  /** null **/
  stakeRETH: InContextSdkMethod<Query['stakeRETH'], QuerystakeRETHArgs, MeshContext>,
  /** null **/
  stakeRETHs: InContextSdkMethod<Query['stakeRETHs'], QuerystakeRETHsArgs, MeshContext>,
  /** null **/
  unstake: InContextSdkMethod<Query['unstake'], QueryunstakeArgs, MeshContext>,
  /** null **/
  unstakes: InContextSdkMethod<Query['unstakes'], QueryunstakesArgs, MeshContext>,
  /** null **/
  withdrawYield: InContextSdkMethod<Query['withdrawYield'], QuerywithdrawYieldArgs, MeshContext>,
  /** null **/
  withdrawYields: InContextSdkMethod<Query['withdrawYields'], QuerywithdrawYieldsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  claimMaxGas: InContextSdkMethod<Subscription['claimMaxGas'], SubscriptionclaimMaxGasArgs, MeshContext>,
  /** null **/
  claimMaxGas_collection: InContextSdkMethod<Subscription['claimMaxGas_collection'], SubscriptionclaimMaxGas_collectionArgs, MeshContext>,
  /** null **/
  gasManagerTransferred: InContextSdkMethod<Subscription['gasManagerTransferred'], SubscriptiongasManagerTransferredArgs, MeshContext>,
  /** null **/
  gasManagerTransferreds: InContextSdkMethod<Subscription['gasManagerTransferreds'], SubscriptiongasManagerTransferredsArgs, MeshContext>,
  /** null **/
  ownershipTransferred: InContextSdkMethod<Subscription['ownershipTransferred'], SubscriptionownershipTransferredArgs, MeshContext>,
  /** null **/
  ownershipTransferreds: InContextSdkMethod<Subscription['ownershipTransferreds'], SubscriptionownershipTransferredsArgs, MeshContext>,
  /** null **/
  setForceUnstakeFee: InContextSdkMethod<Subscription['setForceUnstakeFee'], SubscriptionsetForceUnstakeFeeArgs, MeshContext>,
  /** null **/
  setForceUnstakeFees: InContextSdkMethod<Subscription['setForceUnstakeFees'], SubscriptionsetForceUnstakeFeesArgs, MeshContext>,
  /** null **/
  setMaxLockupDays: InContextSdkMethod<Subscription['setMaxLockupDays'], SubscriptionsetMaxLockupDaysArgs, MeshContext>,
  /** null **/
  setMaxLockupDays_collection: InContextSdkMethod<Subscription['setMaxLockupDays_collection'], SubscriptionsetMaxLockupDays_collectionArgs, MeshContext>,
  /** null **/
  setMinLockupDays: InContextSdkMethod<Subscription['setMinLockupDays'], SubscriptionsetMinLockupDaysArgs, MeshContext>,
  /** null **/
  setMinLockupDays_collection: InContextSdkMethod<Subscription['setMinLockupDays_collection'], SubscriptionsetMinLockupDays_collectionArgs, MeshContext>,
  /** null **/
  setOutETHVault: InContextSdkMethod<Subscription['setOutETHVault'], SubscriptionsetOutETHVaultArgs, MeshContext>,
  /** null **/
  setOutETHVaults: InContextSdkMethod<Subscription['setOutETHVaults'], SubscriptionsetOutETHVaultsArgs, MeshContext>,
  /** null **/
  extendLockTime: InContextSdkMethod<Subscription['extendLockTime'], SubscriptionextendLockTimeArgs, MeshContext>,
  /** null **/
  extendLockTimes: InContextSdkMethod<Subscription['extendLockTimes'], SubscriptionextendLockTimesArgs, MeshContext>,
  /** null **/
  stakeRETH: InContextSdkMethod<Subscription['stakeRETH'], SubscriptionstakeRETHArgs, MeshContext>,
  /** null **/
  stakeRETHs: InContextSdkMethod<Subscription['stakeRETHs'], SubscriptionstakeRETHsArgs, MeshContext>,
  /** null **/
  unstake: InContextSdkMethod<Subscription['unstake'], SubscriptionunstakeArgs, MeshContext>,
  /** null **/
  unstakes: InContextSdkMethod<Subscription['unstakes'], SubscriptionunstakesArgs, MeshContext>,
  /** null **/
  withdrawYield: InContextSdkMethod<Subscription['withdrawYield'], SubscriptionwithdrawYieldArgs, MeshContext>,
  /** null **/
  withdrawYields: InContextSdkMethod<Subscription['withdrawYields'], SubscriptionwithdrawYieldsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Subscription['_meta'], Subscription_metaArgs, MeshContext>
  };

  export type Context = {
      ["outrunStake"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
