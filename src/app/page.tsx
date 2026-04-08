import { getArticles } from '@/data/articles';
import HeroBanner from '@/components/HeroBanner/HeroBanner';
import ArticleList from '@/components/ArticleList/ArticleList';

export default async function HomePage() {
  const articles = await getArticles();

  return (
    <>
      <HeroBanner />
      <ArticleList articles={articles} />
    </>
  );
}
