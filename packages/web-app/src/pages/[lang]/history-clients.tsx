import { useIntl } from "react-intl";
import Link from "next/link";
import { LocalizedText } from "src/components/common/LocalizedText";
import { siteApi } from "../../clients/siteApiClient";
import { RowsPresenter } from "@project/components/src/blocks";
import React, { FC } from "react";
import { PageListDto, PageListItemDto } from "../../interfaces/pagesDto";

type HistoryItemType = {
  title: string;
  link: string;
  date: string;
};

const HistoryItem: FC<HistoryItemType> = ({ title, link, date, children }) => {
  return (
    <div
      className={`mx-4 md:mx-0 my-2.5 md:my-5 rounded-md flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start pt-4 px-4 pb-10 md:p-9`}
      style={{ border: "1px solid #EFF3FA" }}
    >
      <div className={`flex flex-col items-center md:items-start justify-center md:justify-start w-full`}>
        <div className={`font-bold md:text-lg`}>{title}</div>
        <div className={`text-xs mb-2 md:mb-4`} style={{ color: "#646F83" }}>
          {date}
        </div>
        {children}
        <Link href={link}>
          <div
            className={`mt-2 mb:mt-3 text-xs md:text-sm border-dashed border-b cursor-pointer`}
            style={{ color: "#567DD0" }}
          >
            <LocalizedText id={`readMore`} />
          </div>
        </Link>
      </div>
    </div>
  );
};

const HistoryClientsPage: FC = () => {
  const lang = useIntl().locale;
  const historyList = siteApi.useBlogPages(lang, { pageType: "UserReview", pageNumber: 0, pageSize: 100 });

  return (
    <div className={`container mx-auto py-12`}>
      <div className={`flex flex-col md:flex-row items-center`}>
        <h1 className={`md:mr-10 whitespace-nowrap`}>
          <LocalizedText id={"blog_historyClients"} />
        </h1>
        <div className={`flex w-full md:ml-10`}>
          <Link href={`blog`}>
            <div className={`w-full text-center blogNav cursor-pointer`}>
              <LocalizedText id={"blog_blog"} />
            </div>
          </Link>
          <Link href={`history-clients`}>
            <div className={`w-full text-center blogNav_active cursor-pointer`}>
              <LocalizedText id={"blog_historyClients"} />
            </div>
          </Link>
          <Link href={`live-journal`}>
            <div className={`w-full text-center blogNav cursor-pointer`}>
              <LocalizedText id={"blog_liveJournal"} />
            </div>
          </Link>
        </div>
      </div>
      <div className={`flex flex-col`}>
        {historyList?.items.map((el: PageListItemDto) => (
          <div key={el.url}>
            <HistoryItem title={el.title} link={el.url} date={el.date ?? ""}>
              <RowsPresenter rows={el.block.rows} hideHistory={true} />
            </HistoryItem>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryClientsPage;
