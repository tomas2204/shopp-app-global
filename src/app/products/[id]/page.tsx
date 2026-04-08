import { notFound } from 'next/navigation';
import { getArticleById, getAllArticleIds } from '@/data/articles';
import ArticleDetail from '@/components/ArticleDetail/ArticleDetail';

export async function generateStaticParams() {
  return getAllArticleIds().map((id) => ({ id: String(id) }));
}

export default async function ProductPage(props: PageProps<'/products/[id]'>) {
  const { id } = await props.params;
  const article = await getArticleById(Number(id));

  if (!article) {
    notFound();
  }

  return <ArticleDetail article={article} />;
}
