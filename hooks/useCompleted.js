import useSWR from 'swr';

import JsonFetcher from '../utilities/jsonFetcher';

export default function useCompleted() {
  const { data, error, mutate, isLoading } = useSWR('/completed?', JsonFetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    refreshWhenHidden: true,
    refreshWhenOffline: true,
    refreshInterval: 5000,
  });

  return {
    isLoading,
    isError: error,
    completionStatus: data,
    mutateCompletionStatus: mutate,
  };
}
