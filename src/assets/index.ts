import favorite from './icones/favorite.svg'
import fast from './icones/fast.svg'
import easy from './icones/easy.svg'
import dessert from './icones/dessert.svg'
import asian from './icones/asian.svg'
import light from './icones/light.svg'
import clock from './icones/clock.svg'
import oven from './icones/oven.svg'
import upload from './icones/upload.svg'
import trash from './icones/trash.svg'
import left from './icones/left.svg'
import pencil from './icones/pencil.svg'

const IconSvg: Record<string, string> = {
  favorite,
  fast,
  easy,
  dessert,
  asian,
  light,
  clock,
  oven,
  upload,
  trash,
  left,
  pencil,
}

export default IconSvg

export type IconKeys = keyof typeof IconSvg
