import BN from 'bn.js';
import BigNumber from 'bignumber.js';
import {
  PromiEvent,
  TransactionReceipt,
  EventResponse,
  EventData,
  Web3ContractContext,
} from 'ethereum-abi-types-generator';

export interface CallOptions {
  from?: string;
  gasPrice?: string;
  gas?: number;
}

export interface SendOptions {
  from: string;
  value?: number | string | BN | BigNumber;
  gasPrice?: string;
  gas?: number;
}

export interface EstimateGasOptions {
  from?: string;
  value?: number | string | BN | BigNumber;
  gas?: number;
}

export interface MethodPayableReturnContext {
  send(options: SendOptions): PromiEvent<TransactionReceipt>;
  send(
    options: SendOptions,
    callback: (error: Error, result: any) => void
  ): PromiEvent<TransactionReceipt>;
  estimateGas(options: EstimateGasOptions): Promise<number>;
  estimateGas(
    options: EstimateGasOptions,
    callback: (error: Error, result: any) => void
  ): Promise<number>;
  encodeABI(): string;
}

export interface MethodConstantReturnContext<TCallReturn> {
  call(): Promise<TCallReturn>;
  call(options: CallOptions): Promise<TCallReturn>;
  call(
    options: CallOptions,
    callback: (error: Error, result: TCallReturn) => void
  ): Promise<TCallReturn>;
  encodeABI(): string;
}

export interface MethodReturnContext extends MethodPayableReturnContext {}

export type ContractContext = Web3ContractContext<
  RETHStakeManager,
  RETHStakeManagerMethodNames,
  RETHStakeManagerEventsContext,
  RETHStakeManagerEvents
>;
export type RETHStakeManagerEvents =
  | 'ClaimMaxGas'
  | 'ExtendLockTime'
  | 'GasManagerTransferred'
  | 'OwnershipTransferred'
  | 'SetForceUnstakeFee'
  | 'SetMaxLockupDays'
  | 'SetMinLockupDays'
  | 'SetOutETHVault'
  | 'StakeRETH'
  | 'Unstake'
  | 'WithdrawYield';
export interface RETHStakeManagerEventsContext {
  ClaimMaxGas(
    parameters: {
      filter?: { recipient?: string | string[] };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
  ExtendLockTime(
    parameters: {
      filter?: { positionId?: string | string[] };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
  GasManagerTransferred(
    parameters: {
      filter?: {
        previousGasManager?: string | string[];
        newGasManager?: string | string[];
      };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
  OwnershipTransferred(
    parameters: {
      filter?: {
        previousOwner?: string | string[];
        newOwner?: string | string[];
      };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
  SetForceUnstakeFee(
    parameters: {
      filter?: {};
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
  SetMaxLockupDays(
    parameters: {
      filter?: {};
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
  SetMinLockupDays(
    parameters: {
      filter?: {};
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
  SetOutETHVault(
    parameters: {
      filter?: {};
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
  StakeRETH(
    parameters: {
      filter?: {
        _positionId?: string | string[];
        _account?: string | string[];
      };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
  Unstake(
    parameters: {
      filter?: {
        _positionId?: string | string[];
        _account?: string | string[];
      };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
  WithdrawYield(
    parameters: {
      filter?: { user?: string | string[] };
      fromBlock?: number;
      toBlock?: 'latest' | number;
      topics?: string[];
    },
    callback?: (error: Error, event: EventData) => void
  ): EventResponse;
}
export type RETHStakeManagerMethodNames =
  | 'new'
  | 'BLAST'
  | 'DAY'
  | 'MINSTAKE'
  | 'PETH'
  | 'RATIO'
  | 'RETH'
  | 'REY'
  | 'accumYieldPool'
  | 'avgStakeDays'
  | 'calcPETHAmount'
  | 'claimMaxGas'
  | 'count'
  | 'extendLockTime'
  | 'forceUnstakeFee'
  | 'gasManager'
  | 'getStakedRETH'
  | 'initialize'
  | 'initialized'
  | 'maxLockupDays'
  | 'minLockupDays'
  | 'nextId'
  | 'outETHVault'
  | 'owner'
  | 'positionsOf'
  | 'readGasBalance'
  | 'renounceOwnership'
  | 'setForceUnstakeFee'
  | 'setMaxLockupDays'
  | 'setMinLockupDays'
  | 'setOutETHVault'
  | 'stake'
  | 'totalStaked'
  | 'totalYieldPool'
  | 'transferGasManager'
  | 'transferOwnership'
  | 'unstake'
  | 'withdrawYield';
export interface PositionResponse {
  RETHAmount: string;
  PETHAmount: string;
  deadline: string;
  closed: boolean;
  owner: string;
}
export interface ClaimMaxGasEventEmittedResponse {
  recipient: string;
  gasAmount: string;
}
export interface ExtendLockTimeEventEmittedResponse {
  positionId: string;
  extendDays: string;
  mintedREY: string;
}
export interface GasManagerTransferredEventEmittedResponse {
  previousGasManager: string;
  newGasManager: string;
}
export interface OwnershipTransferredEventEmittedResponse {
  previousOwner: string;
  newOwner: string;
}
export interface SetForceUnstakeFeeEventEmittedResponse {
  _forceUnstakeFee: string;
}
export interface SetMaxLockupDaysEventEmittedResponse {
  _maxLockupDays: string | number;
}
export interface SetMinLockupDaysEventEmittedResponse {
  _minLockupDays: string | number;
}
export interface SetOutETHVaultEventEmittedResponse {
  _outETHVault: string;
}
export interface StakeRETHEventEmittedResponse {
  _positionId: string;
  _account: string;
  _amountInRETH: string;
  _deadline: string;
}
export interface UnstakeEventEmittedResponse {
  _positionId: string;
  _account: string;
  _amountInRETH: string;
}
export interface WithdrawYieldEventEmittedResponse {
  user: string;
  amountInREY: string;
  yieldAmount: string;
}
export interface RETHStakeManager {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   * @param owner Type: address, Indexed: false
   * @param gasManager Type: address, Indexed: false
   * @param reth Type: address, Indexed: false
   * @param peth Type: address, Indexed: false
   * @param rey Type: address, Indexed: false
   */
  'new'(
    owner: string,
    gasManager: string,
    reth: string,
    peth: string,
    rey: string
  ): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  BLAST(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  DAY(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  MINSTAKE(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  PETH(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  RATIO(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  RETH(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  REY(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param nativeYield Type: uint256, Indexed: false
   */
  accumYieldPool(nativeYield: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  avgStakeDays(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param amountInRETH Type: uint256, Indexed: false
   */
  calcPETHAmount(amountInRETH: string): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param recipient Type: address, Indexed: false
   */
  claimMaxGas(recipient: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  count(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param positionId Type: uint256, Indexed: false
   * @param extendDays Type: uint256, Indexed: false
   */
  extendLockTime(positionId: string, extendDays: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  forceUnstakeFee(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  gasManager(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getStakedRETH(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param outETHVault_ Type: address, Indexed: false
   * @param forceUnstakeFee_ Type: uint256, Indexed: false
   * @param minLockupDays_ Type: uint16, Indexed: false
   * @param maxLockupDays_ Type: uint16, Indexed: false
   */
  initialize(
    outETHVault_: string,
    forceUnstakeFee_: string,
    minLockupDays_: string | number,
    maxLockupDays_: string | number
  ): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  initialized(): MethodConstantReturnContext<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  maxLockupDays(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  minLockupDays(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  nextId(): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  outETHVault(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  owner(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param positionId Type: uint256, Indexed: false
   */
  positionsOf(
    positionId: string
  ): MethodConstantReturnContext<PositionResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  readGasBalance(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  renounceOwnership(): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param forceUnstakeFee_ Type: uint256, Indexed: false
   */
  setForceUnstakeFee(forceUnstakeFee_: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param maxLockupDays_ Type: uint16, Indexed: false
   */
  setMaxLockupDays(maxLockupDays_: string | number): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param minLockupDays_ Type: uint16, Indexed: false
   */
  setMinLockupDays(minLockupDays_: string | number): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param outETHVault_ Type: address, Indexed: false
   */
  setOutETHVault(outETHVault_: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param amountInRETH Type: uint256, Indexed: false
   * @param lockupDays Type: uint16, Indexed: false
   * @param positionOwner Type: address, Indexed: false
   * @param pethTo Type: address, Indexed: false
   * @param reyTo Type: address, Indexed: false
   */
  stake(
    amountInRETH: string,
    lockupDays: string | number,
    positionOwner: string,
    pethTo: string,
    reyTo: string
  ): MethodReturnContext;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  totalStaked(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  totalYieldPool(): MethodConstantReturnContext<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param newGasManager Type: address, Indexed: false
   */
  transferGasManager(newGasManager: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param newOwner Type: address, Indexed: false
   */
  transferOwnership(newOwner: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param positionId Type: uint256, Indexed: false
   */
  unstake(positionId: string): MethodReturnContext;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param amountInREY Type: uint256, Indexed: false
   */
  withdrawYield(amountInREY: string): MethodReturnContext;
}
