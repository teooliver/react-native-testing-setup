import { useQuery } from 'react-query';
import { API_URL_GET_BY_ID } from '../../secrets';
import { Title } from '../../utils/types/titles';

// ?i = tt0167260
const getTitleById = async (id: string) => {
  const res = await fetch(`${API_URL_GET_BY_ID}${id}`).then((res) =>
    res.json()
  );
  return res as Title;
};

export const useGetTitleById = (id: string) => {
  return useQuery(`title-${id}`, () => getTitleById(id));
};
