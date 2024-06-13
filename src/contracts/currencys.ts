import { Ether } from "@/packages/swap-core"
import { USDB } from "./usdb"
import { RETH } from "./reth"
import { REY } from "./rey"
import { RUSD } from "./rusd"
import { OSUSD } from "./osusd"
import { RUY } from "./ruy"
import { OSETH } from "./oseth"


export const currencySelectList = [
  Ether,
  USDB,
  RETH,
  RUSD,
  OSUSD,
  OSETH,
  REY,
  RUY,
]

export const currencyMintPageSelectList = [
  Ether, USDB, RETH, RUSD
]

export const currencyStakePageSelectList = [
  RETH, RUSD
]

export const currencyStakePageSelectList2 = [
  OSETH, OSUSD
]

export type CurrencySelectListType = typeof currencySelectList