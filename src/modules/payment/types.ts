import type { PaymentProvider } from './core'

export type PaymentResult = {
  success: boolean
  provider: PaymentProvider
  transactionId: string
}
