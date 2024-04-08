// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@graphql-mesh/utils';

import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import MeshCache from "@graphql-mesh/cache-localforage";
import { fetch as fetchFn } from '@whatwg-node/fetch';

import { MeshResolvedSource } from '@graphql-mesh/runtime';
import { MeshTransform, MeshPlugin } from '@graphql-mesh/types';
import GraphqlHandler from "@graphql-mesh/graphql"
import StitchingMerger from "@graphql-mesh/merger-stitching";
import { printWithCache } from '@graphql-mesh/utils';
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { OutrunTypes } from './sources/outrun/types';
import type { OutrunStakeTypes } from './sources/outrunStake/types';
import * as importedModule$0 from "./sources/outrun/introspectionSchema";
import * as importedModule$1 from "./sources/outrunStake/introspectionSchema";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };



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

export type Query = {
  pairCreated?: Maybe<PairCreated>;
  pairCreateds: Array<PairCreated>;
  pairTvl?: Maybe<PairTvl>;
  pairTvls: Array<PairTvl>;
  liquidityHolding?: Maybe<LiquidityHolding>;
  liquidityHoldings: Array<LiquidityHolding>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  extendLockTime?: Maybe<ExtendLockTime>;
  extendLockTimes: Array<ExtendLockTime>;
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
  stakeRETH?: Maybe<StakeRETH>;
  stakeRETHs: Array<StakeRETH>;
  unstake?: Maybe<Unstake>;
  unstakes: Array<Unstake>;
  withdrawYield?: Maybe<WithdrawYield>;
  withdrawYields: Array<WithdrawYield>;
};


export type QuerypairCreatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypairCreatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PairCreated_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PairCreated_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypairTvlArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypairTvlsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PairTvl_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PairTvl_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryliquidityHoldingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryliquidityHoldingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LiquidityHolding_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<LiquidityHolding_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
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

export type Subscription = {
  pairCreated?: Maybe<PairCreated>;
  pairCreateds: Array<PairCreated>;
  pairTvl?: Maybe<PairTvl>;
  pairTvls: Array<PairTvl>;
  liquidityHolding?: Maybe<LiquidityHolding>;
  liquidityHoldings: Array<LiquidityHolding>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  extendLockTime?: Maybe<ExtendLockTime>;
  extendLockTimes: Array<ExtendLockTime>;
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
  stakeRETH?: Maybe<StakeRETH>;
  stakeRETHs: Array<StakeRETH>;
  unstake?: Maybe<Unstake>;
  unstakes: Array<Unstake>;
  withdrawYield?: Maybe<WithdrawYield>;
  withdrawYields: Array<WithdrawYield>;
};


export type SubscriptionpairCreatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpairCreatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PairCreated_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PairCreated_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpairTvlArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpairTvlsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PairTvl_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<PairTvl_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionliquidityHoldingArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionliquidityHoldingsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LiquidityHolding_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<LiquidityHolding_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
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

export type LiquidityHolding = {
  id: Scalars['String'];
  pair: Scalars['Bytes'];
  user: Scalars['Bytes'];
  token0: Scalars['Bytes'];
  token1: Scalars['Bytes'];
  amount0: Scalars['BigInt'];
  amount1: Scalars['BigInt'];
  symbol0?: Maybe<Scalars['String']>;
  symbol1?: Maybe<Scalars['String']>;
};

export type LiquidityHolding_filter = {
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
  pair?: InputMaybe<Scalars['Bytes']>;
  pair_not?: InputMaybe<Scalars['Bytes']>;
  pair_gt?: InputMaybe<Scalars['Bytes']>;
  pair_lt?: InputMaybe<Scalars['Bytes']>;
  pair_gte?: InputMaybe<Scalars['Bytes']>;
  pair_lte?: InputMaybe<Scalars['Bytes']>;
  pair_in?: InputMaybe<Array<Scalars['Bytes']>>;
  pair_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  pair_contains?: InputMaybe<Scalars['Bytes']>;
  pair_not_contains?: InputMaybe<Scalars['Bytes']>;
  user?: InputMaybe<Scalars['Bytes']>;
  user_not?: InputMaybe<Scalars['Bytes']>;
  user_gt?: InputMaybe<Scalars['Bytes']>;
  user_lt?: InputMaybe<Scalars['Bytes']>;
  user_gte?: InputMaybe<Scalars['Bytes']>;
  user_lte?: InputMaybe<Scalars['Bytes']>;
  user_in?: InputMaybe<Array<Scalars['Bytes']>>;
  user_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  user_contains?: InputMaybe<Scalars['Bytes']>;
  user_not_contains?: InputMaybe<Scalars['Bytes']>;
  token0?: InputMaybe<Scalars['Bytes']>;
  token0_not?: InputMaybe<Scalars['Bytes']>;
  token0_gt?: InputMaybe<Scalars['Bytes']>;
  token0_lt?: InputMaybe<Scalars['Bytes']>;
  token0_gte?: InputMaybe<Scalars['Bytes']>;
  token0_lte?: InputMaybe<Scalars['Bytes']>;
  token0_in?: InputMaybe<Array<Scalars['Bytes']>>;
  token0_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  token0_contains?: InputMaybe<Scalars['Bytes']>;
  token0_not_contains?: InputMaybe<Scalars['Bytes']>;
  token1?: InputMaybe<Scalars['Bytes']>;
  token1_not?: InputMaybe<Scalars['Bytes']>;
  token1_gt?: InputMaybe<Scalars['Bytes']>;
  token1_lt?: InputMaybe<Scalars['Bytes']>;
  token1_gte?: InputMaybe<Scalars['Bytes']>;
  token1_lte?: InputMaybe<Scalars['Bytes']>;
  token1_in?: InputMaybe<Array<Scalars['Bytes']>>;
  token1_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  token1_contains?: InputMaybe<Scalars['Bytes']>;
  token1_not_contains?: InputMaybe<Scalars['Bytes']>;
  amount0?: InputMaybe<Scalars['BigInt']>;
  amount0_not?: InputMaybe<Scalars['BigInt']>;
  amount0_gt?: InputMaybe<Scalars['BigInt']>;
  amount0_lt?: InputMaybe<Scalars['BigInt']>;
  amount0_gte?: InputMaybe<Scalars['BigInt']>;
  amount0_lte?: InputMaybe<Scalars['BigInt']>;
  amount0_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount0_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount1?: InputMaybe<Scalars['BigInt']>;
  amount1_not?: InputMaybe<Scalars['BigInt']>;
  amount1_gt?: InputMaybe<Scalars['BigInt']>;
  amount1_lt?: InputMaybe<Scalars['BigInt']>;
  amount1_gte?: InputMaybe<Scalars['BigInt']>;
  amount1_lte?: InputMaybe<Scalars['BigInt']>;
  amount1_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount1_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  symbol0?: InputMaybe<Scalars['String']>;
  symbol0_not?: InputMaybe<Scalars['String']>;
  symbol0_gt?: InputMaybe<Scalars['String']>;
  symbol0_lt?: InputMaybe<Scalars['String']>;
  symbol0_gte?: InputMaybe<Scalars['String']>;
  symbol0_lte?: InputMaybe<Scalars['String']>;
  symbol0_in?: InputMaybe<Array<Scalars['String']>>;
  symbol0_not_in?: InputMaybe<Array<Scalars['String']>>;
  symbol0_contains?: InputMaybe<Scalars['String']>;
  symbol0_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol0_not_contains?: InputMaybe<Scalars['String']>;
  symbol0_not_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol0_starts_with?: InputMaybe<Scalars['String']>;
  symbol0_starts_with_nocase?: InputMaybe<Scalars['String']>;
  symbol0_not_starts_with?: InputMaybe<Scalars['String']>;
  symbol0_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  symbol0_ends_with?: InputMaybe<Scalars['String']>;
  symbol0_ends_with_nocase?: InputMaybe<Scalars['String']>;
  symbol0_not_ends_with?: InputMaybe<Scalars['String']>;
  symbol0_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  symbol1?: InputMaybe<Scalars['String']>;
  symbol1_not?: InputMaybe<Scalars['String']>;
  symbol1_gt?: InputMaybe<Scalars['String']>;
  symbol1_lt?: InputMaybe<Scalars['String']>;
  symbol1_gte?: InputMaybe<Scalars['String']>;
  symbol1_lte?: InputMaybe<Scalars['String']>;
  symbol1_in?: InputMaybe<Array<Scalars['String']>>;
  symbol1_not_in?: InputMaybe<Array<Scalars['String']>>;
  symbol1_contains?: InputMaybe<Scalars['String']>;
  symbol1_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol1_not_contains?: InputMaybe<Scalars['String']>;
  symbol1_not_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol1_starts_with?: InputMaybe<Scalars['String']>;
  symbol1_starts_with_nocase?: InputMaybe<Scalars['String']>;
  symbol1_not_starts_with?: InputMaybe<Scalars['String']>;
  symbol1_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  symbol1_ends_with?: InputMaybe<Scalars['String']>;
  symbol1_ends_with_nocase?: InputMaybe<Scalars['String']>;
  symbol1_not_ends_with?: InputMaybe<Scalars['String']>;
  symbol1_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<LiquidityHolding_filter>>>;
  or?: InputMaybe<Array<InputMaybe<LiquidityHolding_filter>>>;
};

export type LiquidityHolding_orderBy =
  | 'id'
  | 'pair'
  | 'user'
  | 'token0'
  | 'token1'
  | 'amount0'
  | 'amount1'
  | 'symbol0'
  | 'symbol1';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type PairCreated = {
  id: Scalars['Bytes'];
  token0: Scalars['Bytes'];
  token1: Scalars['Bytes'];
  pair: Scalars['Bytes'];
};

export type PairCreated_filter = {
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
  token0?: InputMaybe<Scalars['Bytes']>;
  token0_not?: InputMaybe<Scalars['Bytes']>;
  token0_gt?: InputMaybe<Scalars['Bytes']>;
  token0_lt?: InputMaybe<Scalars['Bytes']>;
  token0_gte?: InputMaybe<Scalars['Bytes']>;
  token0_lte?: InputMaybe<Scalars['Bytes']>;
  token0_in?: InputMaybe<Array<Scalars['Bytes']>>;
  token0_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  token0_contains?: InputMaybe<Scalars['Bytes']>;
  token0_not_contains?: InputMaybe<Scalars['Bytes']>;
  token1?: InputMaybe<Scalars['Bytes']>;
  token1_not?: InputMaybe<Scalars['Bytes']>;
  token1_gt?: InputMaybe<Scalars['Bytes']>;
  token1_lt?: InputMaybe<Scalars['Bytes']>;
  token1_gte?: InputMaybe<Scalars['Bytes']>;
  token1_lte?: InputMaybe<Scalars['Bytes']>;
  token1_in?: InputMaybe<Array<Scalars['Bytes']>>;
  token1_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  token1_contains?: InputMaybe<Scalars['Bytes']>;
  token1_not_contains?: InputMaybe<Scalars['Bytes']>;
  pair?: InputMaybe<Scalars['Bytes']>;
  pair_not?: InputMaybe<Scalars['Bytes']>;
  pair_gt?: InputMaybe<Scalars['Bytes']>;
  pair_lt?: InputMaybe<Scalars['Bytes']>;
  pair_gte?: InputMaybe<Scalars['Bytes']>;
  pair_lte?: InputMaybe<Scalars['Bytes']>;
  pair_in?: InputMaybe<Array<Scalars['Bytes']>>;
  pair_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  pair_contains?: InputMaybe<Scalars['Bytes']>;
  pair_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<PairCreated_filter>>>;
  or?: InputMaybe<Array<InputMaybe<PairCreated_filter>>>;
};

export type PairCreated_orderBy =
  | 'id'
  | 'token0'
  | 'token1'
  | 'pair';

export type PairTvl = {
  id: Scalars['String'];
  pair: Scalars['Bytes'];
  reserve0: Scalars['BigInt'];
  reserve1: Scalars['BigInt'];
  symbol0?: Maybe<Scalars['String']>;
  symbol1?: Maybe<Scalars['String']>;
  token0: Scalars['Bytes'];
  token1: Scalars['Bytes'];
};

export type PairTvl_filter = {
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
  pair?: InputMaybe<Scalars['Bytes']>;
  pair_not?: InputMaybe<Scalars['Bytes']>;
  pair_gt?: InputMaybe<Scalars['Bytes']>;
  pair_lt?: InputMaybe<Scalars['Bytes']>;
  pair_gte?: InputMaybe<Scalars['Bytes']>;
  pair_lte?: InputMaybe<Scalars['Bytes']>;
  pair_in?: InputMaybe<Array<Scalars['Bytes']>>;
  pair_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  pair_contains?: InputMaybe<Scalars['Bytes']>;
  pair_not_contains?: InputMaybe<Scalars['Bytes']>;
  reserve0?: InputMaybe<Scalars['BigInt']>;
  reserve0_not?: InputMaybe<Scalars['BigInt']>;
  reserve0_gt?: InputMaybe<Scalars['BigInt']>;
  reserve0_lt?: InputMaybe<Scalars['BigInt']>;
  reserve0_gte?: InputMaybe<Scalars['BigInt']>;
  reserve0_lte?: InputMaybe<Scalars['BigInt']>;
  reserve0_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reserve0_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reserve1?: InputMaybe<Scalars['BigInt']>;
  reserve1_not?: InputMaybe<Scalars['BigInt']>;
  reserve1_gt?: InputMaybe<Scalars['BigInt']>;
  reserve1_lt?: InputMaybe<Scalars['BigInt']>;
  reserve1_gte?: InputMaybe<Scalars['BigInt']>;
  reserve1_lte?: InputMaybe<Scalars['BigInt']>;
  reserve1_in?: InputMaybe<Array<Scalars['BigInt']>>;
  reserve1_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  symbol0?: InputMaybe<Scalars['String']>;
  symbol0_not?: InputMaybe<Scalars['String']>;
  symbol0_gt?: InputMaybe<Scalars['String']>;
  symbol0_lt?: InputMaybe<Scalars['String']>;
  symbol0_gte?: InputMaybe<Scalars['String']>;
  symbol0_lte?: InputMaybe<Scalars['String']>;
  symbol0_in?: InputMaybe<Array<Scalars['String']>>;
  symbol0_not_in?: InputMaybe<Array<Scalars['String']>>;
  symbol0_contains?: InputMaybe<Scalars['String']>;
  symbol0_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol0_not_contains?: InputMaybe<Scalars['String']>;
  symbol0_not_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol0_starts_with?: InputMaybe<Scalars['String']>;
  symbol0_starts_with_nocase?: InputMaybe<Scalars['String']>;
  symbol0_not_starts_with?: InputMaybe<Scalars['String']>;
  symbol0_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  symbol0_ends_with?: InputMaybe<Scalars['String']>;
  symbol0_ends_with_nocase?: InputMaybe<Scalars['String']>;
  symbol0_not_ends_with?: InputMaybe<Scalars['String']>;
  symbol0_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  symbol1?: InputMaybe<Scalars['String']>;
  symbol1_not?: InputMaybe<Scalars['String']>;
  symbol1_gt?: InputMaybe<Scalars['String']>;
  symbol1_lt?: InputMaybe<Scalars['String']>;
  symbol1_gte?: InputMaybe<Scalars['String']>;
  symbol1_lte?: InputMaybe<Scalars['String']>;
  symbol1_in?: InputMaybe<Array<Scalars['String']>>;
  symbol1_not_in?: InputMaybe<Array<Scalars['String']>>;
  symbol1_contains?: InputMaybe<Scalars['String']>;
  symbol1_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol1_not_contains?: InputMaybe<Scalars['String']>;
  symbol1_not_contains_nocase?: InputMaybe<Scalars['String']>;
  symbol1_starts_with?: InputMaybe<Scalars['String']>;
  symbol1_starts_with_nocase?: InputMaybe<Scalars['String']>;
  symbol1_not_starts_with?: InputMaybe<Scalars['String']>;
  symbol1_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  symbol1_ends_with?: InputMaybe<Scalars['String']>;
  symbol1_ends_with_nocase?: InputMaybe<Scalars['String']>;
  symbol1_not_ends_with?: InputMaybe<Scalars['String']>;
  symbol1_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  token0?: InputMaybe<Scalars['Bytes']>;
  token0_not?: InputMaybe<Scalars['Bytes']>;
  token0_gt?: InputMaybe<Scalars['Bytes']>;
  token0_lt?: InputMaybe<Scalars['Bytes']>;
  token0_gte?: InputMaybe<Scalars['Bytes']>;
  token0_lte?: InputMaybe<Scalars['Bytes']>;
  token0_in?: InputMaybe<Array<Scalars['Bytes']>>;
  token0_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  token0_contains?: InputMaybe<Scalars['Bytes']>;
  token0_not_contains?: InputMaybe<Scalars['Bytes']>;
  token1?: InputMaybe<Scalars['Bytes']>;
  token1_not?: InputMaybe<Scalars['Bytes']>;
  token1_gt?: InputMaybe<Scalars['Bytes']>;
  token1_lt?: InputMaybe<Scalars['Bytes']>;
  token1_gte?: InputMaybe<Scalars['Bytes']>;
  token1_lte?: InputMaybe<Scalars['Bytes']>;
  token1_in?: InputMaybe<Array<Scalars['Bytes']>>;
  token1_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  token1_contains?: InputMaybe<Scalars['Bytes']>;
  token1_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<PairTvl_filter>>>;
  or?: InputMaybe<Array<InputMaybe<PairTvl_filter>>>;
};

export type PairTvl_orderBy =
  | 'id'
  | 'pair'
  | 'reserve0'
  | 'reserve1'
  | 'symbol0'
  | 'symbol1'
  | 'token0'
  | 'token1';

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

export type ExtendLockTime = {
  id: Scalars['Bytes'];
  positionId: Scalars['BigInt'];
  extendDays: Scalars['BigInt'];
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
  | 'mintedREY'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

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

export type SetForceUnstakeFee = {
  id: Scalars['Bytes'];
  _forceUnstakeFee: Scalars['BigInt'];
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
  _forceUnstakeFee?: InputMaybe<Scalars['BigInt']>;
  _forceUnstakeFee_not?: InputMaybe<Scalars['BigInt']>;
  _forceUnstakeFee_gt?: InputMaybe<Scalars['BigInt']>;
  _forceUnstakeFee_lt?: InputMaybe<Scalars['BigInt']>;
  _forceUnstakeFee_gte?: InputMaybe<Scalars['BigInt']>;
  _forceUnstakeFee_lte?: InputMaybe<Scalars['BigInt']>;
  _forceUnstakeFee_in?: InputMaybe<Array<Scalars['BigInt']>>;
  _forceUnstakeFee_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  | '_forceUnstakeFee'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type SetMaxLockupDays = {
  id: Scalars['Bytes'];
  _maxLockupDays: Scalars['Int'];
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
  _maxLockupDays?: InputMaybe<Scalars['Int']>;
  _maxLockupDays_not?: InputMaybe<Scalars['Int']>;
  _maxLockupDays_gt?: InputMaybe<Scalars['Int']>;
  _maxLockupDays_lt?: InputMaybe<Scalars['Int']>;
  _maxLockupDays_gte?: InputMaybe<Scalars['Int']>;
  _maxLockupDays_lte?: InputMaybe<Scalars['Int']>;
  _maxLockupDays_in?: InputMaybe<Array<Scalars['Int']>>;
  _maxLockupDays_not_in?: InputMaybe<Array<Scalars['Int']>>;
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
  | '_maxLockupDays'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type SetMinLockupDays = {
  id: Scalars['Bytes'];
  _minLockupDays: Scalars['Int'];
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
  _minLockupDays?: InputMaybe<Scalars['Int']>;
  _minLockupDays_not?: InputMaybe<Scalars['Int']>;
  _minLockupDays_gt?: InputMaybe<Scalars['Int']>;
  _minLockupDays_lt?: InputMaybe<Scalars['Int']>;
  _minLockupDays_gte?: InputMaybe<Scalars['Int']>;
  _minLockupDays_lte?: InputMaybe<Scalars['Int']>;
  _minLockupDays_in?: InputMaybe<Array<Scalars['Int']>>;
  _minLockupDays_not_in?: InputMaybe<Array<Scalars['Int']>>;
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
  | '_minLockupDays'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type SetOutETHVault = {
  id: Scalars['Bytes'];
  _outETHVault: Scalars['Bytes'];
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
  _outETHVault?: InputMaybe<Scalars['Bytes']>;
  _outETHVault_not?: InputMaybe<Scalars['Bytes']>;
  _outETHVault_gt?: InputMaybe<Scalars['Bytes']>;
  _outETHVault_lt?: InputMaybe<Scalars['Bytes']>;
  _outETHVault_gte?: InputMaybe<Scalars['Bytes']>;
  _outETHVault_lte?: InputMaybe<Scalars['Bytes']>;
  _outETHVault_in?: InputMaybe<Array<Scalars['Bytes']>>;
  _outETHVault_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  _outETHVault_contains?: InputMaybe<Scalars['Bytes']>;
  _outETHVault_not_contains?: InputMaybe<Scalars['Bytes']>;
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
  | '_outETHVault'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type StakeRETH = {
  id: Scalars['Bytes'];
  _positionId: Scalars['BigInt'];
  _account: Scalars['Bytes'];
  _amountInRETH: Scalars['BigInt'];
  _deadline: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type StakeRETH_filter = {
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
  _positionId?: InputMaybe<Scalars['BigInt']>;
  _positionId_not?: InputMaybe<Scalars['BigInt']>;
  _positionId_gt?: InputMaybe<Scalars['BigInt']>;
  _positionId_lt?: InputMaybe<Scalars['BigInt']>;
  _positionId_gte?: InputMaybe<Scalars['BigInt']>;
  _positionId_lte?: InputMaybe<Scalars['BigInt']>;
  _positionId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  _positionId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  _account?: InputMaybe<Scalars['Bytes']>;
  _account_not?: InputMaybe<Scalars['Bytes']>;
  _account_gt?: InputMaybe<Scalars['Bytes']>;
  _account_lt?: InputMaybe<Scalars['Bytes']>;
  _account_gte?: InputMaybe<Scalars['Bytes']>;
  _account_lte?: InputMaybe<Scalars['Bytes']>;
  _account_in?: InputMaybe<Array<Scalars['Bytes']>>;
  _account_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  _account_contains?: InputMaybe<Scalars['Bytes']>;
  _account_not_contains?: InputMaybe<Scalars['Bytes']>;
  _amountInRETH?: InputMaybe<Scalars['BigInt']>;
  _amountInRETH_not?: InputMaybe<Scalars['BigInt']>;
  _amountInRETH_gt?: InputMaybe<Scalars['BigInt']>;
  _amountInRETH_lt?: InputMaybe<Scalars['BigInt']>;
  _amountInRETH_gte?: InputMaybe<Scalars['BigInt']>;
  _amountInRETH_lte?: InputMaybe<Scalars['BigInt']>;
  _amountInRETH_in?: InputMaybe<Array<Scalars['BigInt']>>;
  _amountInRETH_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  _deadline?: InputMaybe<Scalars['BigInt']>;
  _deadline_not?: InputMaybe<Scalars['BigInt']>;
  _deadline_gt?: InputMaybe<Scalars['BigInt']>;
  _deadline_lt?: InputMaybe<Scalars['BigInt']>;
  _deadline_gte?: InputMaybe<Scalars['BigInt']>;
  _deadline_lte?: InputMaybe<Scalars['BigInt']>;
  _deadline_in?: InputMaybe<Array<Scalars['BigInt']>>;
  _deadline_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  | '_positionId'
  | '_account'
  | '_amountInRETH'
  | '_deadline'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type Unstake = {
  id: Scalars['Bytes'];
  _positionId: Scalars['BigInt'];
  _account: Scalars['Bytes'];
  _amountInRETH: Scalars['BigInt'];
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
  _positionId?: InputMaybe<Scalars['BigInt']>;
  _positionId_not?: InputMaybe<Scalars['BigInt']>;
  _positionId_gt?: InputMaybe<Scalars['BigInt']>;
  _positionId_lt?: InputMaybe<Scalars['BigInt']>;
  _positionId_gte?: InputMaybe<Scalars['BigInt']>;
  _positionId_lte?: InputMaybe<Scalars['BigInt']>;
  _positionId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  _positionId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  _account?: InputMaybe<Scalars['Bytes']>;
  _account_not?: InputMaybe<Scalars['Bytes']>;
  _account_gt?: InputMaybe<Scalars['Bytes']>;
  _account_lt?: InputMaybe<Scalars['Bytes']>;
  _account_gte?: InputMaybe<Scalars['Bytes']>;
  _account_lte?: InputMaybe<Scalars['Bytes']>;
  _account_in?: InputMaybe<Array<Scalars['Bytes']>>;
  _account_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  _account_contains?: InputMaybe<Scalars['Bytes']>;
  _account_not_contains?: InputMaybe<Scalars['Bytes']>;
  _amountInRETH?: InputMaybe<Scalars['BigInt']>;
  _amountInRETH_not?: InputMaybe<Scalars['BigInt']>;
  _amountInRETH_gt?: InputMaybe<Scalars['BigInt']>;
  _amountInRETH_lt?: InputMaybe<Scalars['BigInt']>;
  _amountInRETH_gte?: InputMaybe<Scalars['BigInt']>;
  _amountInRETH_lte?: InputMaybe<Scalars['BigInt']>;
  _amountInRETH_in?: InputMaybe<Array<Scalars['BigInt']>>;
  _amountInRETH_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  | '_positionId'
  | '_account'
  | '_amountInRETH'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type WithdrawYield = {
  id: Scalars['Bytes'];
  user: Scalars['Bytes'];
  amountInREY: Scalars['BigInt'];
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
  user?: InputMaybe<Scalars['Bytes']>;
  user_not?: InputMaybe<Scalars['Bytes']>;
  user_gt?: InputMaybe<Scalars['Bytes']>;
  user_lt?: InputMaybe<Scalars['Bytes']>;
  user_gte?: InputMaybe<Scalars['Bytes']>;
  user_lte?: InputMaybe<Scalars['Bytes']>;
  user_in?: InputMaybe<Array<Scalars['Bytes']>>;
  user_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  user_contains?: InputMaybe<Scalars['Bytes']>;
  user_not_contains?: InputMaybe<Scalars['Bytes']>;
  amountInREY?: InputMaybe<Scalars['BigInt']>;
  amountInREY_not?: InputMaybe<Scalars['BigInt']>;
  amountInREY_gt?: InputMaybe<Scalars['BigInt']>;
  amountInREY_lt?: InputMaybe<Scalars['BigInt']>;
  amountInREY_gte?: InputMaybe<Scalars['BigInt']>;
  amountInREY_lte?: InputMaybe<Scalars['BigInt']>;
  amountInREY_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amountInREY_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
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
  | 'user'
  | 'amountInREY'
  | 'yieldAmount'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>;
  Subscription: ResolverTypeWrapper<{}>;
  Aggregation_interval: Aggregation_interval;
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Int8: ResolverTypeWrapper<Scalars['Int8']>;
  LiquidityHolding: ResolverTypeWrapper<LiquidityHolding>;
  LiquidityHolding_filter: LiquidityHolding_filter;
  LiquidityHolding_orderBy: LiquidityHolding_orderBy;
  OrderDirection: OrderDirection;
  PairCreated: ResolverTypeWrapper<PairCreated>;
  PairCreated_filter: PairCreated_filter;
  PairCreated_orderBy: PairCreated_orderBy;
  PairTvl: ResolverTypeWrapper<PairTvl>;
  PairTvl_filter: PairTvl_filter;
  PairTvl_orderBy: PairTvl_orderBy;
  String: ResolverTypeWrapper<Scalars['String']>;
  Timestamp: ResolverTypeWrapper<Scalars['Timestamp']>;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
  ExtendLockTime: ResolverTypeWrapper<ExtendLockTime>;
  ExtendLockTime_filter: ExtendLockTime_filter;
  ExtendLockTime_orderBy: ExtendLockTime_orderBy;
  OwnershipTransferred: ResolverTypeWrapper<OwnershipTransferred>;
  OwnershipTransferred_filter: OwnershipTransferred_filter;
  OwnershipTransferred_orderBy: OwnershipTransferred_orderBy;
  SetForceUnstakeFee: ResolverTypeWrapper<SetForceUnstakeFee>;
  SetForceUnstakeFee_filter: SetForceUnstakeFee_filter;
  SetForceUnstakeFee_orderBy: SetForceUnstakeFee_orderBy;
  SetMaxLockupDays: ResolverTypeWrapper<SetMaxLockupDays>;
  SetMaxLockupDays_filter: SetMaxLockupDays_filter;
  SetMaxLockupDays_orderBy: SetMaxLockupDays_orderBy;
  SetMinLockupDays: ResolverTypeWrapper<SetMinLockupDays>;
  SetMinLockupDays_filter: SetMinLockupDays_filter;
  SetMinLockupDays_orderBy: SetMinLockupDays_orderBy;
  SetOutETHVault: ResolverTypeWrapper<SetOutETHVault>;
  SetOutETHVault_filter: SetOutETHVault_filter;
  SetOutETHVault_orderBy: SetOutETHVault_orderBy;
  StakeRETH: ResolverTypeWrapper<StakeRETH>;
  StakeRETH_filter: StakeRETH_filter;
  StakeRETH_orderBy: StakeRETH_orderBy;
  Unstake: ResolverTypeWrapper<Unstake>;
  Unstake_filter: Unstake_filter;
  Unstake_orderBy: Unstake_orderBy;
  WithdrawYield: ResolverTypeWrapper<WithdrawYield>;
  WithdrawYield_filter: WithdrawYield_filter;
  WithdrawYield_orderBy: WithdrawYield_orderBy;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {};
  Subscription: {};
  BigDecimal: Scalars['BigDecimal'];
  BigInt: Scalars['BigInt'];
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: Scalars['Boolean'];
  Bytes: Scalars['Bytes'];
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Int8: Scalars['Int8'];
  LiquidityHolding: LiquidityHolding;
  LiquidityHolding_filter: LiquidityHolding_filter;
  PairCreated: PairCreated;
  PairCreated_filter: PairCreated_filter;
  PairTvl: PairTvl;
  PairTvl_filter: PairTvl_filter;
  String: Scalars['String'];
  Timestamp: Scalars['Timestamp'];
  _Block_: _Block_;
  _Meta_: _Meta_;
  ExtendLockTime: ExtendLockTime;
  ExtendLockTime_filter: ExtendLockTime_filter;
  OwnershipTransferred: OwnershipTransferred;
  OwnershipTransferred_filter: OwnershipTransferred_filter;
  SetForceUnstakeFee: SetForceUnstakeFee;
  SetForceUnstakeFee_filter: SetForceUnstakeFee_filter;
  SetMaxLockupDays: SetMaxLockupDays;
  SetMaxLockupDays_filter: SetMaxLockupDays_filter;
  SetMinLockupDays: SetMinLockupDays;
  SetMinLockupDays_filter: SetMinLockupDays_filter;
  SetOutETHVault: SetOutETHVault;
  SetOutETHVault_filter: SetOutETHVault_filter;
  StakeRETH: StakeRETH;
  StakeRETH_filter: StakeRETH_filter;
  Unstake: Unstake;
  Unstake_filter: Unstake_filter;
  WithdrawYield: WithdrawYield;
  WithdrawYield_filter: WithdrawYield_filter;
}>;

export type entityDirectiveArgs = { };

export type entityDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = entityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type subgraphIdDirectiveArgs = {
  id: Scalars['String'];
};

export type subgraphIdDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = subgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type derivedFromDirectiveArgs = {
  field: Scalars['String'];
};

export type derivedFromDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = derivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  pairCreated?: Resolver<Maybe<ResolversTypes['PairCreated']>, ParentType, ContextType, RequireFields<QuerypairCreatedArgs, 'id' | 'subgraphError'>>;
  pairCreateds?: Resolver<Array<ResolversTypes['PairCreated']>, ParentType, ContextType, RequireFields<QuerypairCreatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  pairTvl?: Resolver<Maybe<ResolversTypes['PairTvl']>, ParentType, ContextType, RequireFields<QuerypairTvlArgs, 'id' | 'subgraphError'>>;
  pairTvls?: Resolver<Array<ResolversTypes['PairTvl']>, ParentType, ContextType, RequireFields<QuerypairTvlsArgs, 'skip' | 'first' | 'subgraphError'>>;
  liquidityHolding?: Resolver<Maybe<ResolversTypes['LiquidityHolding']>, ParentType, ContextType, RequireFields<QueryliquidityHoldingArgs, 'id' | 'subgraphError'>>;
  liquidityHoldings?: Resolver<Array<ResolversTypes['LiquidityHolding']>, ParentType, ContextType, RequireFields<QueryliquidityHoldingsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_metaArgs>>;
  extendLockTime?: Resolver<Maybe<ResolversTypes['ExtendLockTime']>, ParentType, ContextType, RequireFields<QueryextendLockTimeArgs, 'id' | 'subgraphError'>>;
  extendLockTimes?: Resolver<Array<ResolversTypes['ExtendLockTime']>, ParentType, ContextType, RequireFields<QueryextendLockTimesArgs, 'skip' | 'first' | 'subgraphError'>>;
  ownershipTransferred?: Resolver<Maybe<ResolversTypes['OwnershipTransferred']>, ParentType, ContextType, RequireFields<QueryownershipTransferredArgs, 'id' | 'subgraphError'>>;
  ownershipTransferreds?: Resolver<Array<ResolversTypes['OwnershipTransferred']>, ParentType, ContextType, RequireFields<QueryownershipTransferredsArgs, 'skip' | 'first' | 'subgraphError'>>;
  setForceUnstakeFee?: Resolver<Maybe<ResolversTypes['SetForceUnstakeFee']>, ParentType, ContextType, RequireFields<QuerysetForceUnstakeFeeArgs, 'id' | 'subgraphError'>>;
  setForceUnstakeFees?: Resolver<Array<ResolversTypes['SetForceUnstakeFee']>, ParentType, ContextType, RequireFields<QuerysetForceUnstakeFeesArgs, 'skip' | 'first' | 'subgraphError'>>;
  setMaxLockupDays?: Resolver<Maybe<ResolversTypes['SetMaxLockupDays']>, ParentType, ContextType, RequireFields<QuerysetMaxLockupDaysArgs, 'id' | 'subgraphError'>>;
  setMaxLockupDays_collection?: Resolver<Array<ResolversTypes['SetMaxLockupDays']>, ParentType, ContextType, RequireFields<QuerysetMaxLockupDays_collectionArgs, 'skip' | 'first' | 'subgraphError'>>;
  setMinLockupDays?: Resolver<Maybe<ResolversTypes['SetMinLockupDays']>, ParentType, ContextType, RequireFields<QuerysetMinLockupDaysArgs, 'id' | 'subgraphError'>>;
  setMinLockupDays_collection?: Resolver<Array<ResolversTypes['SetMinLockupDays']>, ParentType, ContextType, RequireFields<QuerysetMinLockupDays_collectionArgs, 'skip' | 'first' | 'subgraphError'>>;
  setOutETHVault?: Resolver<Maybe<ResolversTypes['SetOutETHVault']>, ParentType, ContextType, RequireFields<QuerysetOutETHVaultArgs, 'id' | 'subgraphError'>>;
  setOutETHVaults?: Resolver<Array<ResolversTypes['SetOutETHVault']>, ParentType, ContextType, RequireFields<QuerysetOutETHVaultsArgs, 'skip' | 'first' | 'subgraphError'>>;
  stakeRETH?: Resolver<Maybe<ResolversTypes['StakeRETH']>, ParentType, ContextType, RequireFields<QuerystakeRETHArgs, 'id' | 'subgraphError'>>;
  stakeRETHs?: Resolver<Array<ResolversTypes['StakeRETH']>, ParentType, ContextType, RequireFields<QuerystakeRETHsArgs, 'skip' | 'first' | 'subgraphError'>>;
  unstake?: Resolver<Maybe<ResolversTypes['Unstake']>, ParentType, ContextType, RequireFields<QueryunstakeArgs, 'id' | 'subgraphError'>>;
  unstakes?: Resolver<Array<ResolversTypes['Unstake']>, ParentType, ContextType, RequireFields<QueryunstakesArgs, 'skip' | 'first' | 'subgraphError'>>;
  withdrawYield?: Resolver<Maybe<ResolversTypes['WithdrawYield']>, ParentType, ContextType, RequireFields<QuerywithdrawYieldArgs, 'id' | 'subgraphError'>>;
  withdrawYields?: Resolver<Array<ResolversTypes['WithdrawYield']>, ParentType, ContextType, RequireFields<QuerywithdrawYieldsArgs, 'skip' | 'first' | 'subgraphError'>>;
}>;

export type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  pairCreated?: SubscriptionResolver<Maybe<ResolversTypes['PairCreated']>, "pairCreated", ParentType, ContextType, RequireFields<SubscriptionpairCreatedArgs, 'id' | 'subgraphError'>>;
  pairCreateds?: SubscriptionResolver<Array<ResolversTypes['PairCreated']>, "pairCreateds", ParentType, ContextType, RequireFields<SubscriptionpairCreatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  pairTvl?: SubscriptionResolver<Maybe<ResolversTypes['PairTvl']>, "pairTvl", ParentType, ContextType, RequireFields<SubscriptionpairTvlArgs, 'id' | 'subgraphError'>>;
  pairTvls?: SubscriptionResolver<Array<ResolversTypes['PairTvl']>, "pairTvls", ParentType, ContextType, RequireFields<SubscriptionpairTvlsArgs, 'skip' | 'first' | 'subgraphError'>>;
  liquidityHolding?: SubscriptionResolver<Maybe<ResolversTypes['LiquidityHolding']>, "liquidityHolding", ParentType, ContextType, RequireFields<SubscriptionliquidityHoldingArgs, 'id' | 'subgraphError'>>;
  liquidityHoldings?: SubscriptionResolver<Array<ResolversTypes['LiquidityHolding']>, "liquidityHoldings", ParentType, ContextType, RequireFields<SubscriptionliquidityHoldingsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, Partial<Subscription_metaArgs>>;
  extendLockTime?: SubscriptionResolver<Maybe<ResolversTypes['ExtendLockTime']>, "extendLockTime", ParentType, ContextType, RequireFields<SubscriptionextendLockTimeArgs, 'id' | 'subgraphError'>>;
  extendLockTimes?: SubscriptionResolver<Array<ResolversTypes['ExtendLockTime']>, "extendLockTimes", ParentType, ContextType, RequireFields<SubscriptionextendLockTimesArgs, 'skip' | 'first' | 'subgraphError'>>;
  ownershipTransferred?: SubscriptionResolver<Maybe<ResolversTypes['OwnershipTransferred']>, "ownershipTransferred", ParentType, ContextType, RequireFields<SubscriptionownershipTransferredArgs, 'id' | 'subgraphError'>>;
  ownershipTransferreds?: SubscriptionResolver<Array<ResolversTypes['OwnershipTransferred']>, "ownershipTransferreds", ParentType, ContextType, RequireFields<SubscriptionownershipTransferredsArgs, 'skip' | 'first' | 'subgraphError'>>;
  setForceUnstakeFee?: SubscriptionResolver<Maybe<ResolversTypes['SetForceUnstakeFee']>, "setForceUnstakeFee", ParentType, ContextType, RequireFields<SubscriptionsetForceUnstakeFeeArgs, 'id' | 'subgraphError'>>;
  setForceUnstakeFees?: SubscriptionResolver<Array<ResolversTypes['SetForceUnstakeFee']>, "setForceUnstakeFees", ParentType, ContextType, RequireFields<SubscriptionsetForceUnstakeFeesArgs, 'skip' | 'first' | 'subgraphError'>>;
  setMaxLockupDays?: SubscriptionResolver<Maybe<ResolversTypes['SetMaxLockupDays']>, "setMaxLockupDays", ParentType, ContextType, RequireFields<SubscriptionsetMaxLockupDaysArgs, 'id' | 'subgraphError'>>;
  setMaxLockupDays_collection?: SubscriptionResolver<Array<ResolversTypes['SetMaxLockupDays']>, "setMaxLockupDays_collection", ParentType, ContextType, RequireFields<SubscriptionsetMaxLockupDays_collectionArgs, 'skip' | 'first' | 'subgraphError'>>;
  setMinLockupDays?: SubscriptionResolver<Maybe<ResolversTypes['SetMinLockupDays']>, "setMinLockupDays", ParentType, ContextType, RequireFields<SubscriptionsetMinLockupDaysArgs, 'id' | 'subgraphError'>>;
  setMinLockupDays_collection?: SubscriptionResolver<Array<ResolversTypes['SetMinLockupDays']>, "setMinLockupDays_collection", ParentType, ContextType, RequireFields<SubscriptionsetMinLockupDays_collectionArgs, 'skip' | 'first' | 'subgraphError'>>;
  setOutETHVault?: SubscriptionResolver<Maybe<ResolversTypes['SetOutETHVault']>, "setOutETHVault", ParentType, ContextType, RequireFields<SubscriptionsetOutETHVaultArgs, 'id' | 'subgraphError'>>;
  setOutETHVaults?: SubscriptionResolver<Array<ResolversTypes['SetOutETHVault']>, "setOutETHVaults", ParentType, ContextType, RequireFields<SubscriptionsetOutETHVaultsArgs, 'skip' | 'first' | 'subgraphError'>>;
  stakeRETH?: SubscriptionResolver<Maybe<ResolversTypes['StakeRETH']>, "stakeRETH", ParentType, ContextType, RequireFields<SubscriptionstakeRETHArgs, 'id' | 'subgraphError'>>;
  stakeRETHs?: SubscriptionResolver<Array<ResolversTypes['StakeRETH']>, "stakeRETHs", ParentType, ContextType, RequireFields<SubscriptionstakeRETHsArgs, 'skip' | 'first' | 'subgraphError'>>;
  unstake?: SubscriptionResolver<Maybe<ResolversTypes['Unstake']>, "unstake", ParentType, ContextType, RequireFields<SubscriptionunstakeArgs, 'id' | 'subgraphError'>>;
  unstakes?: SubscriptionResolver<Array<ResolversTypes['Unstake']>, "unstakes", ParentType, ContextType, RequireFields<SubscriptionunstakesArgs, 'skip' | 'first' | 'subgraphError'>>;
  withdrawYield?: SubscriptionResolver<Maybe<ResolversTypes['WithdrawYield']>, "withdrawYield", ParentType, ContextType, RequireFields<SubscriptionwithdrawYieldArgs, 'id' | 'subgraphError'>>;
  withdrawYields?: SubscriptionResolver<Array<ResolversTypes['WithdrawYield']>, "withdrawYields", ParentType, ContextType, RequireFields<SubscriptionwithdrawYieldsArgs, 'skip' | 'first' | 'subgraphError'>>;
}>;

export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export interface Int8ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Int8'], any> {
  name: 'Int8';
}

export type LiquidityHoldingResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['LiquidityHolding'] = ResolversParentTypes['LiquidityHolding']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pair?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  token0?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  token1?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  amount0?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  amount1?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  symbol0?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  symbol1?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PairCreatedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['PairCreated'] = ResolversParentTypes['PairCreated']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  token0?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  token1?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  pair?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PairTvlResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['PairTvl'] = ResolversParentTypes['PairTvl']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pair?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  reserve0?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  reserve1?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  symbol0?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  symbol1?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  token0?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  token1?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface TimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Timestamp'], any> {
  name: 'Timestamp';
}

export type _Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  parentHash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ExtendLockTimeResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['ExtendLockTime'] = ResolversParentTypes['ExtendLockTime']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  positionId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  extendDays?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  mintedREY?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type OwnershipTransferredResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['OwnershipTransferred'] = ResolversParentTypes['OwnershipTransferred']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  previousOwner?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  newOwner?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SetForceUnstakeFeeResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['SetForceUnstakeFee'] = ResolversParentTypes['SetForceUnstakeFee']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  _forceUnstakeFee?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SetMaxLockupDaysResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['SetMaxLockupDays'] = ResolversParentTypes['SetMaxLockupDays']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  _maxLockupDays?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SetMinLockupDaysResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['SetMinLockupDays'] = ResolversParentTypes['SetMinLockupDays']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  _minLockupDays?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SetOutETHVaultResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['SetOutETHVault'] = ResolversParentTypes['SetOutETHVault']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  _outETHVault?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type StakeRETHResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['StakeRETH'] = ResolversParentTypes['StakeRETH']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  _positionId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  _account?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  _amountInRETH?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  _deadline?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UnstakeResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Unstake'] = ResolversParentTypes['Unstake']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  _positionId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  _account?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  _amountInRETH?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type WithdrawYieldResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['WithdrawYield'] = ResolversParentTypes['WithdrawYield']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  amountInREY?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  yieldAmount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Bytes?: GraphQLScalarType;
  Int8?: GraphQLScalarType;
  LiquidityHolding?: LiquidityHoldingResolvers<ContextType>;
  PairCreated?: PairCreatedResolvers<ContextType>;
  PairTvl?: PairTvlResolvers<ContextType>;
  Timestamp?: GraphQLScalarType;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
  ExtendLockTime?: ExtendLockTimeResolvers<ContextType>;
  OwnershipTransferred?: OwnershipTransferredResolvers<ContextType>;
  SetForceUnstakeFee?: SetForceUnstakeFeeResolvers<ContextType>;
  SetMaxLockupDays?: SetMaxLockupDaysResolvers<ContextType>;
  SetMinLockupDays?: SetMinLockupDaysResolvers<ContextType>;
  SetOutETHVault?: SetOutETHVaultResolvers<ContextType>;
  StakeRETH?: StakeRETHResolvers<ContextType>;
  Unstake?: UnstakeResolvers<ContextType>;
  WithdrawYield?: WithdrawYieldResolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  entity?: entityDirectiveResolver<any, any, ContextType>;
  subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
  derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = OutrunTypes.Context & OutrunStakeTypes.Context & BaseMeshContext;


import { fileURLToPath } from '@graphql-mesh/utils';
const baseDir = pathModule.join(pathModule.dirname(fileURLToPath(import.meta.url)), '..');

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    case ".graphclient/sources/outrun/introspectionSchema":
      return Promise.resolve(importedModule$0) as T;
    
    case ".graphclient/sources/outrunStake/introspectionSchema":
      return Promise.resolve(importedModule$1) as T;
    
    default:
      return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
  }
};

const rootStore = new MeshStore('.graphclient', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: "ts",
}), {
  readonly: true,
  validate: false
});

export const rawServeConfig: YamlConfig.Config['serve'] = undefined as any
export async function getMeshOptions(): Promise<GetMeshOptions> {
const pubsub = new PubSub();
const sourcesStore = rootStore.child('sources');
const logger = new DefaultLogger("GraphClient");
const cache = new (MeshCache as any)({
      ...({} as any),
      importFn,
      store: rootStore.child('cache'),
      pubsub,
      logger,
    } as any)

const sources: MeshResolvedSource[] = [];
const transforms: MeshTransform[] = [];
const additionalEnvelopPlugins: MeshPlugin<any>[] = [];
const outrunTransforms = [];
const outrunStakeTransforms = [];
const additionalTypeDefs = [] as any[];
const outrunHandler = new GraphqlHandler({
              name: "outrun",
              config: {"endpoint":"https://api.studio.thegraph.com/query/68891/outrun/0.0.89"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("outrun"),
              logger: logger.child("outrun"),
              importFn,
            });
const outrunStakeHandler = new GraphqlHandler({
              name: "outrunStake",
              config: {"endpoint":"https://api.studio.thegraph.com/query/64787/outrun/v0.0.1"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("outrunStake"),
              logger: logger.child("outrunStake"),
              importFn,
            });
sources[0] = {
          name: 'outrun',
          handler: outrunHandler,
          transforms: outrunTransforms
        }
sources[1] = {
          name: 'outrunStake',
          handler: outrunStakeHandler,
          transforms: outrunStakeTransforms
        }
const additionalResolvers = [] as any[]
const merger = new(StitchingMerger as any)({
        cache,
        pubsub,
        logger: logger.child('stitchingMerger'),
        store: rootStore.child('stitchingMerger')
      })

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    additionalEnvelopPlugins,
    get documents() {
      return [
      {
        document: PairCreatedsDocument,
        get rawSDL() {
          return printWithCache(PairCreatedsDocument);
        },
        location: 'PairCreatedsDocument.graphql'
      },{
        document: PairTargetDocument,
        get rawSDL() {
          return printWithCache(PairTargetDocument);
        },
        location: 'PairTargetDocument.graphql'
      },{
        document: UserLiquiditiesDocument,
        get rawSDL() {
          return printWithCache(UserLiquiditiesDocument);
        },
        location: 'UserLiquiditiesDocument.graphql'
      },{
        document: PairTvlsDocument,
        get rawSDL() {
          return printWithCache(PairTvlsDocument);
        },
        location: 'PairTvlsDocument.graphql'
      },{
        document: StakeRethDocument,
        get rawSDL() {
          return printWithCache(StakeRethDocument);
        },
        location: 'StakeRethDocument.graphql'
      }
    ];
    },
    fetchFn,
  };
}

export function createBuiltMeshHTTPHandler<TServerContext = {}>(): MeshHTTPHandler<TServerContext> {
  return createMeshHTTPHandler<TServerContext>({
    baseDir,
    getBuiltMesh: getBuiltGraphClient,
    rawServeConfig: undefined,
  })
}


let meshInstance$: Promise<MeshInstance> | undefined;

export function getBuiltGraphClient(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh(meshOptions)).then(mesh => {
      const id = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        mesh.pubsub.unsubscribe(id);
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltGraphClient().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));
export function getBuiltGraphSDK<TGlobalContext = any, TOperationContext = any>(globalContext?: TGlobalContext) {
  const sdkRequester$ = getBuiltGraphClient().then(({ sdkRequesterFactory }) => sdkRequesterFactory(globalContext));
  return getSdk<TOperationContext, TGlobalContext>((...args) => sdkRequester$.then(sdkRequester => sdkRequester(...args)));
}
export type PairCreatedsQueryVariables = Exact<{ [key: string]: never; }>;


export type PairCreatedsQuery = { pairCreateds: Array<Pick<PairCreated, 'id' | 'token0' | 'token1' | 'pair'>> };

export type PairTargetQueryVariables = Exact<{
  addr?: InputMaybe<Scalars['Bytes']>;
}>;


export type PairTargetQuery = { pairCreateds: Array<Pick<PairCreated, 'id' | 'token0' | 'token1' | 'pair'>> };

export type UserLiquiditiesQueryVariables = Exact<{
  user?: InputMaybe<Scalars['Bytes']>;
}>;


export type UserLiquiditiesQuery = { liquidityHoldings: Array<Pick<LiquidityHolding, 'id' | 'pair' | 'user' | 'amount0' | 'amount1' | 'token0' | 'token1'>> };

export type PairTvlsQueryVariables = Exact<{ [key: string]: never; }>;


export type PairTvlsQuery = { pairTvls: Array<Pick<PairTvl, 'id' | 'pair' | 'reserve0' | 'reserve1' | 'token0' | 'token1' | 'symbol0' | 'symbol1'>> };

export type StakeRETHQueryVariables = Exact<{
  account?: InputMaybe<Scalars['Bytes']>;
}>;


export type StakeRETHQuery = { stakeRETHs: Array<Pick<StakeRETH, '_positionId' | '_account' | '_amountInRETH' | '_deadline'>> };


export const PairCreatedsDocument = gql`
    query PairCreateds {
  pairCreateds(first: 10) {
    id
    token0
    token1
    pair
  }
}
    ` as unknown as DocumentNode<PairCreatedsQuery, PairCreatedsQueryVariables>;
export const PairTargetDocument = gql`
    query PairTarget($addr: Bytes) {
  pairCreateds(first: 1, where: {pair: $addr}) {
    id
    token0
    token1
    pair
  }
}
    ` as unknown as DocumentNode<PairTargetQuery, PairTargetQueryVariables>;
export const UserLiquiditiesDocument = gql`
    query UserLiquidities($user: Bytes) {
  liquidityHoldings(first: 20, where: {user: $user}) {
    id
    pair
    user
    amount0
    amount1
    token0
    token1
  }
}
    ` as unknown as DocumentNode<UserLiquiditiesQuery, UserLiquiditiesQueryVariables>;
export const PairTvlsDocument = gql`
    query PairTvls {
  pairTvls(first: 20) {
    id
    pair
    reserve0
    reserve1
    token0
    token1
    symbol0
    symbol1
  }
}
    ` as unknown as DocumentNode<PairTvlsQuery, PairTvlsQueryVariables>;
export const StakeRETHDocument = gql`
    query StakeRETH($account: Bytes) {
  stakeRETHs(first: 10, where: {_account: $account}) {
    _positionId
    _account
    _amountInRETH
    _deadline
  }
}
    ` as unknown as DocumentNode<StakeRETHQuery, StakeRETHQueryVariables>;






export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    PairCreateds(variables?: PairCreatedsQueryVariables, options?: C): Promise<PairCreatedsQuery> {
      return requester<PairCreatedsQuery, PairCreatedsQueryVariables>(PairCreatedsDocument, variables, options) as Promise<PairCreatedsQuery>;
    },
    PairTarget(variables?: PairTargetQueryVariables, options?: C): Promise<PairTargetQuery> {
      return requester<PairTargetQuery, PairTargetQueryVariables>(PairTargetDocument, variables, options) as Promise<PairTargetQuery>;
    },
    UserLiquidities(variables?: UserLiquiditiesQueryVariables, options?: C): Promise<UserLiquiditiesQuery> {
      return requester<UserLiquiditiesQuery, UserLiquiditiesQueryVariables>(UserLiquiditiesDocument, variables, options) as Promise<UserLiquiditiesQuery>;
    },
    PairTvls(variables?: PairTvlsQueryVariables, options?: C): Promise<PairTvlsQuery> {
      return requester<PairTvlsQuery, PairTvlsQueryVariables>(PairTvlsDocument, variables, options) as Promise<PairTvlsQuery>;
    },
    StakeRETH(variables?: StakeRETHQueryVariables, options?: C): Promise<StakeRETHQuery> {
      return requester<StakeRETHQuery, StakeRETHQueryVariables>(StakeRETHDocument, variables, options) as Promise<StakeRETHQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;