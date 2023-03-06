import { getCookie } from 'cookies-next';

import FormatUrl from './formatUrl';

export default async function JsonFetcher(url) {
  const token = getCookie('token');
  const res = await fetch(FormatUrl(url, token));

  if (!res.ok) {
    const { response } = await res.json();
    const error = new Error(response.message);
    error.status = res.status;
    throw error;
  }

  return res.json();
}
