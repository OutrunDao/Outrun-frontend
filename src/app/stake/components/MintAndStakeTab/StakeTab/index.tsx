import { Button } from "@chakra-ui/react";
import { observer } from "mobx-react-lite"
import store from '@/app/stake/StakeStore'
import StakeBtn from './StakeBtn'
import UnstakeBtn from './UnstakeBtn'

const StakeAndUnstake =() => {
  if (store.switchState === 0) {
    return <StakeBtn></StakeBtn>
  }

  return <UnstakeBtn></UnstakeBtn>
}

export default observer(StakeAndUnstake);