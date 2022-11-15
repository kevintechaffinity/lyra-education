import { post } from '../../lib/httpRequest';

export const login = async ({ msisdn }) => post({ request: '/login', body: { msisdn } });

export const oneTimePassword = async ({ msisdn, otp }) =>
  post({ request: '/otp', body: { msisdn, otp } });
