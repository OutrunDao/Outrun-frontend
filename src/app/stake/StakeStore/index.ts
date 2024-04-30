import { makeAutoObservable, toJS } from 'mobx';
import { TabType, BtnHandleState, MintType, StakeType } from '@/app/stake/types';
import { LocalTokenSymbol } from '@/types/index.d';

const BtnBaseStyle = {
  colorScheme: 'rgb(52 30 56 / 50%)',
  width: '100%',
  border: '.5px solid rgb(252 252 3)',
  color: 'rgb(252 252 3)',
  backgroundColor: 'rgba(252, 252, 3, 0.1)',
  marginTop: '22px',
};

class StakeStore {
  inputValue: string = '0';
  currentTabType: TabType = TabType.Mint;
  selectedToken: LocalTokenSymbol = LocalTokenSymbol.ETH;
  switchState: 0 | 1 = 0;
  balance: number = 0;
  isLoadingBtn = false;
  // approve授权
  isApproving: boolean = false;
  isMinting: boolean = false;
  isRedeeming: boolean = false;
  isStaking: boolean = false;
  stakeDays = 30;
  btnDisabled: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  get isBtnLoading() {
    return this.isApproving || this.isMinting || this.isRedeeming || this.isStaking;
  }

  get loadingText() {
    if (this.isApproving) {
      return 'Approving...';
    }

    if (this.isMinting) {
      return 'Minting...';
    }

    if (this.isRedeeming) {
      return 'Redeeming...';
    }

    if (this.isStaking) {
      return 'Staking...';
    }

    return 'Loading...';
  }

  get btnStyle() {
    if (this.btnDisabled) {
      return {
        ...BtnBaseStyle,
        border: '.5px solid #999',
        color: '#fff',
      };
    }

    return BtnBaseStyle;
  }
  get BtnText() {
    if (Number(this.inputValue) > this.balance) {
      this.btnDisabled = true;
      return 'Insufficient Balance';
    }

    if (Number(this.inputValue) <= 0) {
      this.btnDisabled = true;
      return 'Invalid Value';
    }

    this.btnDisabled = false;

    if (this.currentTabType === TabType.Mint) {
      if (this.switchState === 0) {
        return 'Mint';
      }
      return 'Redeem';
    } else {
      if (this.switchState === 0) {
        return 'Stake';
      }
      return 'Unstake';
    }
  }

  get btnHandleState(): BtnHandleState {
    if (this.currentTabType === TabType.Mint) {
      if (this.switchState === 0) {
        return MintType.Mint;
      }
      return MintType.Redeem;
    } else {
      if (this.switchState === 0) {
        return StakeType.Stake;
      }
      return StakeType.Unstake;
    }
  }

  setSwitchState(switchState: 0 | 1) {
    this.switchState = switchState;
  }

  setInputValue(val: string) {
    this.inputValue = val;
  }

  setBalance(balance: string) {
    this.balance = Number(balance);
  }
}

const stakeStore = new StakeStore();

export default stakeStore;
