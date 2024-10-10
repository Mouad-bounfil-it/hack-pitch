import request2 from "@/lib/request2";
import useSWR from "swr";
import qs from "qs";

type useFindQuery = Record<string, any>;

export function useFirstCom() {
  const key = `/public/ping`;

  const { data, error, isValidating, isLoading, mutate } = useSWR<any, any>(
    key,
    (url) => request2.get(url)
  );

  return { data, error, isValidating, isLoading, mutate };
}
