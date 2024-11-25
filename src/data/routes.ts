

export const routesPath = {
  initial: '/',
  login: '/login',
  home: '/home',
  repassword: '/repassword',
  sendEmail: '/send-email',
  changePassword: '/change-password/:token',
  confirmChangePassword:'/change-password/complete',
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
  sendEmail: '/auth/sendemail',
  repassword:'/auth/reset-password',
  verifyAccount: '/create-account/verify ',
  caCreate: '/create-account/create ',
  caCreateCustomer: '/create-account/create-customer',
  caStripePayment: '/create-account/create-payment-stripe'
}
