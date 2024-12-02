import favorite from './icones/favorite.svg'
import fast from './icones/fast.svg'
import easy from './icones/easy.svg'
import dessert from './icones/dessert.svg'
import asian from './icones/asian.svg'
import light from './icones/light.svg'

const IconSvg: Record<string, string> = {favorite, fast, easy, dessert, asian, light}

export default IconSvg

export type IconKeys = keyof typeof IconSvg
