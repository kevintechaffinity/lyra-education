import { setCookie } from 'cookies-next';

import { post } from '../utilities/httpRequest';

export const login = async ({ msisdn }) => {
  const response = await post({ request: '/login', body: { msisdn } });
  return response;
};

export const signin = async (payload) => {
  const response = await post({ request: '/signin', body: { email: payload.email, password: payload.password } });
  return response;
};

export const autologin = async (t) => {
  setCookie('token', t, { sameSite: true, maxAge: 31556952, secure: false });
};

export const oneTimePassword = async ({ msisdn, otp }) => {
  const response = await post({ request: '/otp', body: { msisdn, otp } });
  return response;
};
