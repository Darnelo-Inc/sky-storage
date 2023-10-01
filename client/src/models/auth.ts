import { ChangeEvent } from "react"

export interface IAuth {
  email: string
  password: string
}

export type AuthOnChange = (
  e: ChangeEvent<HTMLInputElement>,
  type: string
) => void

export interface AuthRequest {
  email: string
  password: string
}
