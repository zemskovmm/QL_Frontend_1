import { useIntl } from "react-intl";
import { NewsletterBlock } from "@project/components/src/blocks/NewsletterBlock/NewsletterBlock";
import { FirstArticleBlock } from "@project/components/src/blocks/Blog/FirstArticle/firstArticleBlock";
import { ArticleListBlock } from "@project/components/src/blocks/Blog/ArticleList/articleListBlock";
import { FiltersBlock } from "@project/components/src/blocks/Blog/Filters/filtersBlock";
import Link from "next/link";

const BlogPage = () => {
  const lang = useIntl().locale;

  return (
    <div className={`container mx-auto py-12`}>
      <div className={`flex flex-col md:flex-row items-center`}>
        <h1 className={`md:mr-10`}>Blog</h1>
        <div className={`flex w-full md:ml-10`}>
          <Link href={`blog`}>
            <a className={`w-full text-center blogNav_active`}>Blog</a>
          </Link>
          <Link href={`history-clients`}>
            <a className={`w-full text-center blogNav`}>History clients</a>
          </Link>
          <Link href={`blog`}>
            <a className={`w-full text-center blogNav`}>Blog</a>
          </Link>
        </div>
      </div>
      <FirstArticleBlock title={""} img={""} date={""} tags={[]} />
      <FiltersBlock items={[]} />
      <ArticleListBlock items={[]} />
      <NewsletterBlock title={""} buttonName={""} description={""} />
    </div>
  );
};

export default BlogPage;
