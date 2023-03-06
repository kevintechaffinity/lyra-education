import { getCookie } from 'cookies-next';

import { get, post } from '../utilities/httpRequest';

export const getPage = async (slug, preview) => {
  const token = getCookie('token');
  const params = token ? `token=${token}&slug=${encodeURI(slug)}` : `&slug=${encodeURI(slug)}`;
  if (!preview) {
    await post({ request: '/progress', body: { slug: encodeURI(slug), token } });
  }
  const response = get({ request: '/page', params });
  return response;
};

export const getModule = async (slug) => {
  const token = getCookie('token');
  const response = await get({
    request: '/module',
    params: `&slug=${encodeURI(slug)}&token=${token}`,
  });
  return response;
};
