import useSWR from 'swr';

import JsonFetcher from '../utilities/jsonFetcher';

export default function useTermsAndConditions() {
  const { data, error, mutate, isLoading } = useSWR('/terms-conditions?', JsonFetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    refreshWhenHidden: true,
    refreshWhenOffline: true,
  });

  return {
    isLoading,
    isError: error,
    page: data?.body,
    mutatePage: mutate,
  };
}
