import { Box } from "@chakra-ui/react"
import { TabType, MintType, StakeType } from '@/app/stake/types'
import MintAndRedeem from '@/app/stake/components/MintAndStakeTab/MintTab'
import StakeAndUnstake from '@/app/stake/components/MintAndStakeTab/StakeTab'
import { LocalTokenSymbol } from "@/types"

interface IProps {
  currentTabType: TabType,
}

const HandleButton =(props: IProps) => {
  const { currentTabType }  = props

  if (currentTabType === TabType.Mint) {
    return <MintAndRedeem></MintAndRedeem>
  }

  return <StakeAndUnstake></StakeAndUnstake>
}

export default HandleButton