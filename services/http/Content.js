import cookie from 'js-cookie';
import NProgress from 'nprogress';

import { get, post } from '../../lib/httpRequest';

NProgress.configure({ showSpinner: false });

export const getModule = async (slug) => {
  NProgress.start();
  const token = cookie.get('token');
  const response = await get({
    request: '/module',
    params: `&slug=${encodeURI(slug)}&token=${token}`,
  });
  NProgress.done();
  return response;
};

export const getModules = async () => {
  NProgress.start();
  const token = cookie.get('token');
  const params = token ? `token=${token}` : '';
  const response = await get({ request: '/modules', params });
  NProgress.done();
  return response;
};

export const getPage = async (slug, preview) => {
  NProgress.start();
  const token = cookie.get('token');
  const params = token ? `token=${token}&slug=${encodeURI(slug)}` : `&slug=${encodeURI(slug)}`;
  if (!preview) {
    await post({ request: '/progress', body: { slug: encodeURI(slug), token } });
  }
  const response = get({ request: '/page', params });
  NProgress.done();
  return response;
};
