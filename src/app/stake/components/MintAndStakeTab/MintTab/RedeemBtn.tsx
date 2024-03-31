import { Button } from "@chakra-ui/react"
import { observer } from "mobx-react-lite"
import store from '@/app/stake/StakeStore'

const RedeemBtn = () => {
  
  const onHandleRedeem = () => {

  }

  return (
    <Button style={store.BtnStyle} onClick={onHandleRedeem}>Redeem</Button>
  )
}

export default observer(RedeemBtn)