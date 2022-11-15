import cookie from 'js-cookie';

import { get } from '../../lib/httpRequest';

const hour = 0.1;

export const getSubscriptionStatus = async () => {
  const token = cookie.get('token');
  const params = token ? `token=${token}` : '';
  return get({ request: '/subscribed', params });
};

export const getRelated = async () => {
  const expires = window.localStorage.getItem('expires');
  if (expires && new Date().getTime() < expires) {
    return JSON.parse(window.localStorage.getItem('related'));
  }
  const response = await get({ request: '/related' });
  window.localStorage.setItem('expires', new Date().getTime() + hour * 60 * 60 * 1000);
  window.localStorage.setItem('related', JSON.stringify(response));
  return response;
};

export const getSite = async (host) => {
  const token = cookie.get('token');
  const params = token ? `token=${token}` : '';
  return get({ request: '/service', params, host });
};

export const getCompleted = async (host) => {
  const token = cookie.get('token');
  const params = token ? `token=${token}` : '';
  return get({ request: '/completed', params, host });
};

export const getTermsConditions = async () => get({ request: '/terms-conditions' });
