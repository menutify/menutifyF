export const routesPath = {
  initial: '/',
  login: '/login',
  dashboard: '/dashboard',
  repassword: '/repassword',
  sendEmail: '/send-email',
  changePassword: '/change-password/:token',
  confirmChangePassword: '/change-password/complete',
  createAccount: '/create-account',
  caVerifyAccount: '/create-account/verify-account',
  caReadyAccount: '/create-account/ready-account/:token',
  caPayment: '/create-account/payment',
  caPayMp: '/create-account/payment/MercadoPago',
  caPaySt: '/create-account/payment/Stripe',
  payment: '/payment',
  completePayment: '/create-account/complete',

  restaurant: '/dashboard/restaurant',
  seeMenu: '/dashboard/menus',
  createMenu: '/dashboard/create',
  settingsMenu: '/dashboard/settings',
  account: '/dashboard/account'
}

//axios instance in utils have all url
export const routesApi = {
  google: '/login/google',
  facebook: '/login/facebook',
  authMe: '/auth/me',
  login: '/login',
  logout: '/login/logout',
  sendEmail: '/auth/sendemail',
  repassword: '/auth/reset-password',
  verifyAccount: '/create-account/verify',
  caCreate: '/create-account/create ',
  caCreateCustomer: '/create-account/create-customer',
  caStripePayment: '/create-account/create-payment-stripe',
  caComplete: '/create-account/complete',
  logoRestaurant: '/restaurant/resturant-logo',
  restaurant: '/restaurant',
  menu: '/menu',
  cat: '/cat',
  food: '/cat/food',
  
  catCascade: '/cat/cascade_categories'
}
