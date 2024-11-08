export const styleFormStripe = {
  mode: 'payment', //payment | setup | subscription
  amount: 2000,
  currency: 'usd',
  // Fully customizable with appearance API.
  appearance: {
    theme: 'nigth',

    variables: {
      colorPrimary: '#232325', //color de border select
      colorBackground: '#101010', //bg input
      colorText: '#fff',
      colorDanger: '#df1b41',
      fontFamily: 'Arial, system-ui, sans-serif',
      spacingUnit: '3px',
      borderRadius: '12px'

      // See all possible variables below
    },
    rules: {
      '.Label': {
        border: '1px solid red'
      }
    }
  },
  locale: 'en'
}

export const styleFormStripeSub = {
  mode: 'subscription', //payment | setup | subscription
  amount: 2000,
  currency: 'usd',
  description: 'Subscription creation',
  confirmation_method: 'automatic',
  confirm: true,
  setup_future_usage: 'off_session',
  // Fully customizable with appearance API.
  appearance: {
    theme: 'nigth',

    variables: {
      colorPrimary: '#232325', //color de border select
      colorBackground: '#101010', //bg input
      colorText: '#fff',
      colorDanger: '#df1b41',
      fontFamily: 'Arial, system-ui, sans-serif',
      spacingUnit: '3px',
      borderRadius: '12px'

      // See all possible variables below
    },
    rules: {
      '.Label': {
        border: '1px solid red'
      }
    }
  },
  locale: 'en'
}
