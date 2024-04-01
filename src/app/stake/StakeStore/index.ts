import { makeAutoObservable } from 'mobx';
import { TabType } from '@/app/stake/types';
import { LocalTokenSymbol } from '@/types/index.d';

const BtnStyle = {
  colorScheme: 'rgb(52 30 56 / 50%)',
  width: '100%',
  border: '0.5px solid rgb(252 252 3)',
  color: 'rgb(252 252 3)',
  backgroundColor: 'rgb(52 30 z56 / 50%)',
  marginTop: '22px',
};

class StakeStore {
  inputValue: string = '';
  currentTabType: TabType = TabType.Stake;
  selectedToken: LocalTokenSymbol = LocalTokenSymbol.ETH;
  switchState: 0 | 1 = 0;
  balance: string = '0';
  isLoadingBtn = false;

  constructor() {
    makeAutoObservable(this);
  }

  get BtnStyle() {
    return BtnStyle;
  }

  setBalance(balance: string) {
    this.balance = balance;
  }
}

export default new StakeStore();
