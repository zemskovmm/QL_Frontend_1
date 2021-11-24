import { FunctionalComponent } from "preact";
import { ChatTab, ApplicationTab } from "./_components";
import { useLocalesStore } from "stores/LocalesStore";
import { LeftNavigationLayout } from "layouts/LeftNavigationLayout";
import { useState } from "preact/hooks";

const MyApplicationsPage: FunctionalComponent<{ applicationId: string }> = ({ applicationId }) => {
  const [isAppTab, setAppTab] = useState(false);
  const { APPLICATION_LANG, CHAT_LANG } = useLocalesStore();
  const applicationIdInt = Number.parseInt(applicationId);

  return (
    <LeftNavigationLayout title={`${APPLICATION_LANG} ${applicationId}`}>
      <div className="flex flex-col h-full pt-6 pr-2.5 pl-3 pb-2 md:py-7 md:pr-4 md:pl-10">
        <div className="flex my-2 mr-auto" style={{ border: "1px solid #D7D7D7" }}>
          <button
            className={`px-8 py-1 hover:bg-blue-50 transition ${!isAppTab ? "bg-blue-50" : ""}`}
            style={{ borderRight: "1px solid #D7D7D7" }}
            onClick={() => setAppTab(false)}
          >
            {CHAT_LANG}
          </button>
          <button
            className={`px-6 py-1 hover:bg-blue-50 transition ${isAppTab ? "bg-blue-50" : ""}`}
            onClick={() => setAppTab(true)}
          >
            {APPLICATION_LANG}
          </button>
        </div>
        <div className="flex-grow">
          {isAppTab ? (
            <ApplicationTab className="h-full" applicationId={applicationIdInt} />
          ) : (
            <ChatTab className="h-full" applicationId={applicationIdInt} />
          )}
        </div>
      </div>
    </LeftNavigationLayout>
  );
};

export default MyApplicationsPage;
