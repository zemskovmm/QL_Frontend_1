import { useIntl } from "react-intl";
import { HistoryClientsBlock } from "@project/components/src/blocks/Blog/HistoryClients/historyClientsBlock";
import Link from "next/link";

const HistoryClientsPage = () => {
  const lang = useIntl().locale;

  return (
    <div className={`container mx-auto py-12`}>
      <div className={`flex flex-col md:flex-row items-center`}>
        <h1 className={`md:mr-10 whitespace-nowrap`}>Blog</h1>
        <div className={`flex w-full md:ml-10`}>
          <Link href={`blog`}>
            <a className={`w-full text-center blogNav`}>Blog</a>
          </Link>
          <Link href={`history-clients`}>
            <a className={`w-full text-center blogNav_active`}>History clients</a>
          </Link>
          <Link href={`blog`}>
            <a className={`w-full text-center blogNav`}>Blog</a>
          </Link>
        </div>
      </div>
      <HistoryClientsBlock
        img={""}
        name={"Вероника Кудряшова"}
        age={"20 лет"}
        text={
          "Меня зовут Вероника, мне 20 лет. Я родилась и выросла в малень- ком городе Вологде, училась в школе с углубленным изучением английского языка. Мне всегда..."
        }
        city={"Россия"}
        textAfter={
          "Меня зовут Вероника, мне 20 лет. Я родилась и выросла в малень- ком городе Вологде, училась в школе с углубленным изучением английского языка. Мне всегда..."
        }
      />
    </div>
  );
};

export default HistoryClientsPage;
