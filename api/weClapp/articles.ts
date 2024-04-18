import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { weClappAPI } from './fetchWeClapp';
import { ArticleAdditionalProperties, ArticleType } from './types/articles';

export const useWeClappArticles = (operation?: string) => {
  const initialPageParam = 1;
  const pageSize = 10;

  return useInfiniteQuery({
    queryKey: ['weClapp', 'articles', operation || ''],
    queryFn: ({ pageParam = initialPageParam }) =>
      getWeClapArticles(undefined, `&page=${pageParam}&pageSize=${pageSize}${operation || ''}`),
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.result?.length < pageSize) return;
      return (pages.length + 1).toString();
    },
    initialPageParam: initialPageParam.toString()
  });
};

export const useSingleArticle = (articleId: string) => {
  return useQuery({
    queryKey: ['weClapp', 'single-article', articleId],
    queryFn: () => getWeClapSingleArticle(articleId)
  });
};

const getWeClapSingleArticle = async (articleId: string, operation?: string) => {
  const data = await weClappAPI.GET<ArticleType>(
    `/article/id/${articleId}?serializeNulls${operation || ''}`
  );
  return data;
};

const getWeClapArticles = async (endpoint?: string, operation?: string) => {
  const data = await weClappAPI.GET<GetWeClappArticlesResponse>(
    `/article${endpoint || ''}?serializeNulls${operation || ''}`
  );
  return data;
};

type GetWeClappArticlesResponse = {
  additonalProperties: ArticleAdditionalProperties;
  result: ArticleType[];
};
