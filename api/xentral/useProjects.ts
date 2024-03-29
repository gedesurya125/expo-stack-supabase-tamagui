import { useQuery } from '@tanstack/react-query';
import { fetchXentral } from './fetchXentral';
import { XentralExtra, XentralProjectData } from './types';

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: getProjects
  });
};

const getProjects = async () => {
  const products = await fetchXentral<GetProjectListResponse>('/projects');
  return products;
};

interface GetProjectListResponse {
  data: XentralProjectData[];
  extra: XentralExtra;
}
