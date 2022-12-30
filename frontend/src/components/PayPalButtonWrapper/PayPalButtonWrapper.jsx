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
