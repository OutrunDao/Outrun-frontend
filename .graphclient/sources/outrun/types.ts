// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace OutrunTypes {
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
  | 'amount1';

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

export type Query = {
  pairCreated?: Maybe<PairCreated>;
  pairCreateds: Array<PairCreated>;
  liquidityHolding?: Maybe<LiquidityHolding>;
  liquidityHoldings: Array<LiquidityHolding>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
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

export type Subscription = {
  pairCreated?: Maybe<PairCreated>;
  pairCreateds: Array<PairCreated>;
  liquidityHolding?: Maybe<LiquidityHolding>;
  liquidityHoldings: Array<LiquidityHolding>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
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
  pairCreated: InContextSdkMethod<Query['pairCreated'], QuerypairCreatedArgs, MeshContext>,
  /** null **/
  pairCreateds: InContextSdkMethod<Query['pairCreateds'], QuerypairCreatedsArgs, MeshContext>,
  /** null **/
  liquidityHolding: InContextSdkMethod<Query['liquidityHolding'], QueryliquidityHoldingArgs, MeshContext>,
  /** null **/
  liquidityHoldings: InContextSdkMethod<Query['liquidityHoldings'], QueryliquidityHoldingsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  pairCreated: InContextSdkMethod<Subscription['pairCreated'], SubscriptionpairCreatedArgs, MeshContext>,
  /** null **/
  pairCreateds: InContextSdkMethod<Subscription['pairCreateds'], SubscriptionpairCreatedsArgs, MeshContext>,
  /** null **/
  liquidityHolding: InContextSdkMethod<Subscription['liquidityHolding'], SubscriptionliquidityHoldingArgs, MeshContext>,
  /** null **/
  liquidityHoldings: InContextSdkMethod<Subscription['liquidityHoldings'], SubscriptionliquidityHoldingsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Subscription['_meta'], Subscription_metaArgs, MeshContext>
  };

  export type Context = {
      ["outrun"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
