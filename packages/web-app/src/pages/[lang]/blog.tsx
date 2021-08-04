import { useIntl } from "react-intl";
import { NewsletterBlock } from "@project/components/src/blocks/NewsletterBlock/NewsletterBlock";
import { FirstArticleBlock } from "@project/components/src/blocks/Blog/FirstArticle/firstArticleBlock";
import { ArticleBlock } from "@project/components/src/blocks/Blog/ArticleList/articleListBlock";
import { FiltersBlock } from "@project/components/src/blocks/Blog/Filters/filtersBlock";
import Link from "next/link";
import { LocalizedText } from "src/components/common/LocalizedText";
import { siteApi } from "src/clients/siteApiClient";
import { useState } from "react";
import { LoadingIf } from "src/components/utilities/Loading";
import { Paginator } from "src/components/utilities/Paginator";

const BlogPage = () => {
  const lang = useIntl().locale;

  const [page, setPage] = useState(0);

  const articles = siteApi.useBlogPages(page, "", "blog");

  const firstArticle = siteApi.useBlogPages(0, "", "blog")?.results[0];

  console.log(firstArticle);

  return (
    <div className={`container mx-auto py-12`}>
      <div className={`flex flex-col md:flex-row items-center`}>
        <h1 className={`md:mr-10 whitespace-nowrap`}>
          <LocalizedText id={"blog_blog"} />
        </h1>
        <div className={`flex w-full md:ml-10`}>
          <Link href={`blog`}>
            <a className={`w-full text-center blogNav_active`}>
              <LocalizedText id={"blog_blog"} />
            </a>
          </Link>
          <Link href={`history-clients`}>
            <a className={`w-full text-center blogNav`}>
              <LocalizedText id={"blog_historyClients"} />
            </a>
          </Link>
          <Link href={`live-journal`}>
            <a className={`w-full text-center blogNav`}>
              <LocalizedText id={"blog_liveJournal"} />
            </a>
          </Link>
        </div>
      </div>
      <Link href={firstArticle?.urls[lang] || ""}>
        <a>
          <FirstArticleBlock
            title={firstArticle?.titles[lang] || ""}
            img={firstArticle?.widePreviewImages[lang] || null}
            date={firstArticle?.date[lang] || ""}
            tags={[]}
            blog={false}
          />
        </a>
      </Link>
      <FiltersBlock items={[]} />

      {articles && (
        <LoadingIf isLoading={articles == undefined}>
          <div className={`flex flex-col lg:flex-row lg:flex-wrap`}>
            {articles.results.map((item) => (
              <Link href={item.urls[lang] || ""}>
                <a className={`flex flex-col lg:w-4/12 lg:px-10`}>
                  <ArticleBlock
                    title={item.titles[lang] || ""}
                    img={item.previewImages[lang] || null}
                    date={item.date[lang] || ""}
                    tags={[]}
                  />
                </a>
              </Link>
            ))}{" "}
          </div>
        </LoadingIf>
      )}
      {articles && <Paginator page={page} totalPages={articles?.totalPages || 0} setPage={setPage} />}
      <NewsletterBlock title={""} buttonName={""} description={""} />
    </div>
  );
};

export default BlogPage;
