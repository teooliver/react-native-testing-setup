import { useQuery } from 'react-query';
import { API_URL } from '../../secrets';
import { Titles } from '../../utils/types/titles';

const getTitles = async () => {
  const res = await fetch(API_URL).then((res) => res.json());
  return res as Titles;
};

/**
 * Gets all Titles.
 * Returns: data, isLoading, isSuccess, isError
 */
export const useGetTitles = () => {
  return useQuery('titles', getTitles);
};
