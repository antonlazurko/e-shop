import {
  PayPalButtons,
  PayPalScriptProvider,
} from '@paypal/react-paypal-js'

export const PayPalButtonWrapper = ({ clientId, amount, currency = 'USD', showSpinner, successPaymentHandler, ...otherPops }) => (
  <PayPalScriptProvider
    options={ {
      'client-id': clientId,
      components: 'buttons',
    } }
  >
    <PayPalButtons
      style= { { 'layout':'vertical', 'label': 'buynow', color: 'silver', 'shape': 'pill'  } }
      disabled={ otherPops?.disabled }
      forceReRender={ [amount, currency] }
      createOrder={ (data, actions) => {
        return actions.order
          .create({
            purchase_units: [
              {
                amount: {
                  currency_code: currency,
                  value: amount,
                },
              },
            ],
          })
          .then((orderId) => {
            return orderId
          })
      } }
      fundingSource='paypal'
      onApprove={ function (data, actions) {
        return actions.order.capture().then(function (paymentResult) {
          successPaymentHandler(paymentResult)
        })
      }
      }
    />
  </PayPalScriptProvider>
)
