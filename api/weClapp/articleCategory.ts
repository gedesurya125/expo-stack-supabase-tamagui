import { useQuery } from '@tanstack/react-query';
import { weClappAPI } from './fetchWeClapp';
import { ArticleCategoryType } from './types/articleCategory';

export const useArticleCategory = () => {
  return useQuery({
    queryKey: ['weClap', 'article-categories'],
    queryFn: () => getArticleCategory()
  });
};

const getArticleCategory = async (props?: { endpoint?: string; operation?: string }) => {
  const data = await weClappAPI.GET<GetArticleCategoryResponse>(
    `/articleCategory${props?.endpoint || ''}?serializeNulls${props?.operation || ''}`
  );
  return data;
};

type GetArticleCategoryResponse = {
  result: ArticleCategoryType[];
};
