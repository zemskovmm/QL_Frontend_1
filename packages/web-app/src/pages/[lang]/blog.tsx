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
import { PageListItemDto } from "../../interfaces/pagesDto";

const traitNameMap: { [key: string]: string } = {
  en: "Tags",
  fr: "Mots clés",
  ru: "Теги",
  esp: "Etiquetas",
  cn: "标签",
};

const BlogPage = () => {
  const lang = useIntl().locale;

  const [pageNumber, setPageNumber] = useState(0);

  const firstArticle = siteApi.useBlogPages(lang, { pageType: "BlogEntry", pageNumber: 0, pageSize: 1 })?.items[0];
  const articles = siteApi.useBlogPages(lang, { pageType: "BlogEntry", pageNumber, pageSize: 9 });
  const tags = siteApi.useTraitByType(traitNameMap[lang]);
  alert(lang);

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
      {firstArticle && (
        <Link href={firstArticle?.url || ""}>
          <a>
            <FirstArticleBlock
              title={firstArticle?.title || ""}
              img={firstArticle?.widePreviewImageId || null}
              date={firstArticle?.date || ""}
              tags={firstArticle?.namedTraits["blog-tags"] || null}
              blog={false}
            />
          </a>
        </Link>
      )}
      <FiltersBlock tags={tags?.map(({ names }) => names[lang])} />

      {articles && (
        <LoadingIf isLoading={articles?.totalPages === undefined}>
          <div className={`flex flex-col lg:flex-row lg:flex-wrap`}>
            {articles.items.map((item) => (
              <Link href={item.url || ""}>
                <a className={`flex flex-col lg:w-4/12 lg:px-10`}>
                  <ArticleBlock
                    title={item.title || ""}
                    img={item.previewImageId || null}
                    date={item.date || ""}
                    tags={item.namedTraits["blog-tags"] || null}
                  />
                </a>
              </Link>
            ))}{" "}
          </div>
        </LoadingIf>
      )}
      {articles && articles?.totalPages > 1 && (
        <Paginator page={pageNumber} totalPages={articles?.totalPages || 0} setPage={setPageNumber} />
      )}
      <NewsletterBlock title={""} buttonName={""} description={""} />
    </div>
  );
};

export default BlogPage;
