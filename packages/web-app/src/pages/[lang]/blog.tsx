import { useIntl } from "react-intl";
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
  en: "blog-tags",
  fr: "blog-tags",
  ru: "blog-tags",
  esp: "blog-tags",
  cn: "blog-tags",
};

const BlogPage = () => {
  const lang = useIntl().locale;
  const [pageNumber, setPageNumber] = useState(0);
  const [filters, setFilters] = useState<number[]>([]);

  const articles = siteApi.useBlogPages(lang, {
    pageType: "BlogEntry",
    pageNumber,
    pageSize: 9,
    filters: [
      {
        identifier: "string",
        values: filters,
      },
    ],
  });

  const firstArticle = siteApi.useBlogPages(lang, {
    pageType: "BlogEntry",
    pageNumber: 0,
    pageSize: 1,
    filters: [
      {
        identifier: "string",
        values: filters,
      },
    ],
  })?.items[0];

  const tags = siteApi.useTraitByType(traitNameMap[lang]);

  const toggleFilter = (id: number) => {
    const exists = filters != null && filters.indexOf(id) != -1;
    let newFilters = [...filters];
    if (exists) newFilters = newFilters.filter((v) => v != id);
    else newFilters.push(id);
    setFilters(newFilters);
  };

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

      <FiltersBlock tags={tags} click={(id: number) => toggleFilter(id)} />

      {articles && (
        <LoadingIf isLoading={articles?.totalPages === undefined}>
          <div className={`flex flex-col lg:flex-row lg:flex-wrap`}>
            {articles.items?.map((item: PageListItemDto) => (
              <Link href={item.url || ""} key={item.url}>
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
    </div>
  );
};

export default BlogPage;
