import { useIntl } from "react-intl";
import Link from "next/link";
import { CommentsBlock } from "@project/components/src/blocks/CommentsBlock/commentsBlock";
import { LocalizedText } from "src/components/common/LocalizedText";

type hrefsType = {
  [key in string]: string;
};

const hrefs: hrefsType = {
  ru: "/zhivaja-lenta-otzyvov",
  en: "/en/zhivaja-lenta-otzyvov",
  fr: "/fr/zhivaja-lenta-otzyvov",
  esp: "/esp/zhivaja-lenta-otzyvov",
  cn: "/cn/zhivaja-lenta-otzyvov",
};

const LiveJournalPage = () => {
  const lang = useIntl().locale;

  return (
    <div className={`container mx-auto py-12`}>
      <div className={`flex flex-col md:flex-row items-center`}>
        <h1 className={`md:mr-10 whitespace-nowrap`}>
          <LocalizedText id={"blog_liveJournal"} />
        </h1>
        <div className={`flex w-full md:ml-10`}>
          <Link href={`blog`}>
            <a className={`w-full text-center blogNav`}>
              <LocalizedText id={"blog_blog"} />
            </a>
          </Link>
          <Link href={`history-clients`}>
            <a className={`w-full text-center blogNav`}>
              <LocalizedText id={"blog_historyClients"} />
            </a>
          </Link>
          <Link href={`live-journal`}>
            <a className={`w-full text-center blogNav_active`}>
              <LocalizedText id={"blog_liveJournal"} />
            </a>
          </Link>
        </div>
      </div>
      <CommentsBlock lang={lang} widgetId={78694} href={"quartier-latin.com" + hrefs[lang]} />
    </div>
  );
};

export default LiveJournalPage;
