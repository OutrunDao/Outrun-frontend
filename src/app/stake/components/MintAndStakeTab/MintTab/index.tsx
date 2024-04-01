import { observer } from "mobx-react-lite"
import store from '@/app/stake/StakeStore'
import MintBtn from './MintBtn'
import RedeemBtn from './RedeemBtn'

const MintAndRedeem = () => {
  if (store.switchState === 0) {
    return <MintBtn selectedToken={store.selectedToken}></MintBtn>
  }

  return <RedeemBtn></RedeemBtn>
}

export default observer(MintAndRedeem)