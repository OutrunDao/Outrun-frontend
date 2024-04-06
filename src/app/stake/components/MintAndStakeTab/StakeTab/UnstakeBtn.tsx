import { observer } from "mobx-react-lite"
import {Button} from '@chakra-ui/react'
import store from '@/app/stake/StakeStore'
import Link from 'next/link';

const UnstakeBtn = () => {
  
  return (
    <Button isLoading={store.isLoadingBtn} style={store.BtnStyle}>
      <Link href="/position">Unstake</Link>
    </Button>
  )
}

export default observer(UnstakeBtn)