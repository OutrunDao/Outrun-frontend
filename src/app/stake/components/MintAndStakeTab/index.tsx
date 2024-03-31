import { Box } from "@chakra-ui/react"
import { TabType, MintType, StakeType } from '@/app/stake/types'
import MintAndRedeem from '@/app/stake/components/MintAndStakeTab/MintTab'
import StakeAndUnstake from '@/app/stake/components/MintAndStakeTab/StakeTab'
import { LocalTokenSymbol } from "@/types"

interface IProps {
  currentTabType: TabType,
  switchState: 0 | 1,
  selectedToken: LocalTokenSymbol
}

const HandleButton =(props: IProps) => {
  const { currentTabType, switchState, selectedToken }  = props

  if (currentTabType === TabType.Mint) {
    return <MintAndRedeem selectedToken={selectedToken} switchState={switchState}></MintAndRedeem>
  }

  return <StakeAndUnstake></StakeAndUnstake>
}

export default HandleButton