"use client"
import { useRouter } from 'next/navigation'
import { observer } from "mobx-react-lite"
import { Button, Text } from '@chakra-ui/react'
import store from '@/app/stake/StakeStore'

const UnstakeBtn = () => {
  const router = useRouter()
  const onRoute =() => {
    console.log('to position');
    router.push('/position') 
  }
  return (
    <Button isLoading={store.isLoadingBtn} style={store.BtnStyle}>
      <Text onClick={onRoute}>Unstake</Text>
    </Button>
  )
}

export default observer(UnstakeBtn)