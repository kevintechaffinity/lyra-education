import useSWR from 'swr';

import JsonFetcher from '../utilities/jsonFetcher';

export default function UseService() {
  const { data, error, mutate, isLoading } = useSWR('/service?', JsonFetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    refreshWhenHidden: true,
    refreshWhenOffline: true,
  });

  return {
    isLoading,
    isError: error,
    service: data,
    mutateService: mutate,
  };
}
