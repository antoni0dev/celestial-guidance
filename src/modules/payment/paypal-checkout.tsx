'use client'

import { PayPalButtons } from '@paypal/react-paypal-js'

type PayPalCaptureResponse = {
  success: boolean
  plan: string
  transactionId: string
}

type PayPalCheckoutProps = {
  plan: string
  amount: string
  onSuccess: (captureData: PayPalCaptureResponse) => void
  onError: (error: string) => void
}

const PayPalCheckout = ({
  plan,
  amount: _amount,
  onSuccess,
  onError,
}: PayPalCheckoutProps) => {
  const handleCreateOrder = async () => {
    const response = await fetch('/api/create-paypal-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan }),
    })

    if (!response.ok) {
      throw new Error('Failed to create PayPal order')
    }

    const data = (await response.json()) as { orderId: string }
    return data.orderId
  }

  const handleApprove = async (data: { orderID: string }) => {
    const response = await fetch('/api/capture-paypal-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId: data.orderID }),
    })

    if (!response.ok) {
      onError('Failed to capture PayPal payment')
      return
    }

    const captureData = (await response.json()) as PayPalCaptureResponse
    onSuccess(captureData)
  }

  return (
    <div className="rounded-xl border border-pink-200/30 bg-white/5 p-4 backdrop-blur-sm">
      <PayPalButtons
        createOrder={handleCreateOrder}
        onApprove={handleApprove}
        onError={(err) => {
          onError(
            err instanceof Error
              ? err.message
              : 'PayPal payment failed. Please try again.'
          )
        }}
        style={{
          layout: 'vertical',
          color: 'gold',
          shape: 'pill',
          label: 'pay',
        }}
      />
    </div>
  )
}

export default PayPalCheckout
