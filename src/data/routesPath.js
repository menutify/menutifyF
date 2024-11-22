export const routesPath = {
  initial: '/',
  login: '/login',
  home: '/home',
  repassword: '/repassword',
  sendEmail: '/send-email',
  changePassword: '/change-password/:token',
  createAccount: '/create-account',
  caVerifyAccount: '/create-account/verify-account',
  caReadyAccount: '/create-account/ready-account/:token',
  caPayment: '/create-account/payment',
  caPayMp: '/create-account/payment/MercadoPago',
  caPaySt: '/create-account/payment/Stripe',
  payment: '/payment'
}

//axios instance in utils have all url
export const routesApi = {
  authMe: '/auth/me',
  login: '/login',
  logout: '/login/logout',
  createAccount: '/create-account/verify ',
  caCreate: '/create-account/create ',
  caCreateCustomer: '/create-account/create-customer',
  caStripePayment: '/create-account/create-payment-stripe'
}
