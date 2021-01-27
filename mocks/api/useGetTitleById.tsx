import { Title } from '../../utils/types/titles';
import { mockData } from './mockData';

export const useGetTitleById = async () => {
  return mockData.Search[0] as Title;
};
