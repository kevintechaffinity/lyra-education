import useSWR from 'swr';

import JsonFetcher from '../utilities/jsonFetcher';

export default function useSubscribed() {
  const { data, error, mutate, isLoading } = useSWR('/subscribed?', JsonFetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    refreshWhenHidden: true,
    refreshWhenOffline: true,
    refreshInterval: 5000,
  });

  return {
    isLoading,
    isError: error,
    subscriptionStatus: data,
    mutateSubscriptionStatus: mutate,
  };
}
