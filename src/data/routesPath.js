const routesPath = {
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

export default routesPath
