import { useIntl } from "react-intl";
import { FirstArticleBlock } from "@project/components/src/blocks/Blog/FirstArticle/firstArticleBlock";
import { ArticleBlock } from "@project/components/src/blocks/Blog/ArticleList/articleListBlock";
import { FiltersBlock } from "@project/components/src/blocks/Blog/Filters/filtersBlock";
import Link from "next/link";
import { LocalizedText } from "src/components/common/LocalizedText";
import { siteApi } from "src/clients/siteApiClient";
import { useEffect, useMemo, useReducer, useState } from "react";
import { LoadingIf } from "src/components/utilities/Loading";
import { Paginator } from "src/components/utilities/Paginator";
import { useObserver } from "mobx-react";
import { PageListItemDto } from "../../interfaces/pagesDto";
import { computed } from "mobx";

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
  const [filters, setFilters] = useState<number[] | []>([]);

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

  const setFilter = (id: number) => {
    const newFilters: number[] = filters;
    if (!newFilters.find((el: number) => el === id)) {
      newFilters.push(id);
    } else {
      newFilters.splice(
        newFilters.findIndex((el) => el === id),
        1
      );
    }
    setFilters(newFilters);
  };

  return useObserver(() => (
    <div className={`container mx-auto py-12`}>
      <div className={`flex flex-col md:flex-row items-center`}>
        <h1 className={`md:mr-10 whitespace-nowrap`}>
          <LocalizedText id={"blog_blog"} />
          {filters}
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
      {/*{filters.map((el) => el)}*/}
      <FiltersBlock tags={tags} click={(id: number) => setFilter(id)} />

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
  ));
};

export default BlogPage;
