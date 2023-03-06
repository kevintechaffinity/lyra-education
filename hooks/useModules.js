import useSWR from 'swr';

import JsonFetcher from '../utilities/jsonFetcher';

export default function useModules() {
  const { data, error, mutate, isLoading } = useSWR('/modules?', JsonFetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    refreshWhenHidden: true,
    refreshWhenOffline: true,
  });

  return {
    isLoading,
    isError: error,
    modules: data,
    mutateModules: mutate,
  };
}
