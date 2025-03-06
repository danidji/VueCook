import {EErrorCodes} from '../enums/app.enums'

export type TRadioGroupItem = {
  label: string
  value: string
}

export type TSvgProps = {
  size?: string
  color?: string
  height?: string
}

export type TError = {
  statusCode: number
  message: string
  code: EErrorCodes
  data?: any
  error: string
}

export type TFetchResponse<T> = {
  status: number
  ok: boolean
  statusText: string
  data?: T
}

export class ErrorHelper extends Error {
  statusCode: number
  code: EErrorCodes
  data: any
  error: string

  constructor({statusCode, message, code, data, error}: TError) {
    super(message)
    this.statusCode = statusCode
    this.code = code
    this.data = data
    this.error = error
  }
}

export type TPopup = {
  messages: string[]
  buttons: TPopupButton[]
  icon: string
}

export type TPopupButton = {
  text: string
  onClick: () => void
}
