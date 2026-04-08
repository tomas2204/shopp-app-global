import type { Article } from '@/types';
import articles from '../../articles.json';


export async function getArticles(): Promise<Article[]> {
  await new Promise((res) => setTimeout(res, 0));
  return articles;
}

export async function getArticleById(id: number): Promise<Article | undefined> {
  await new Promise((res) => setTimeout(res, 0));
  return articles.find((a) => a.id === id);
}

export function getAllArticleIds(): number[] {
  return articles.map((a) => a.id);
}
