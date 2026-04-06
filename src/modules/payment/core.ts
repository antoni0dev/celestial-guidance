export const paymentProviders = ['stripe', 'paypal'] as const
export type PaymentProvider = (typeof paymentProviders)[number]
