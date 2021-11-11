import { FunctionalComponent } from "preact";
import { ChatTab, ApplicationTab } from "./_components";
import { useChatStore } from "./_components/ChatTab/ChatStore";
import { useLocalesStore } from "stores/LocalesStore";
import { LeftNavigationLayout } from "layouts/LeftNavigationLayout";
import { useState } from "preact/hooks";

const MyApplicationsPage: FunctionalComponent<{ applicationId: string }> = ({ applicationId }) => {
  const [tabId, setTabId] = useState(false);
  const { APPLICATION_LANG, CHAT_LANG } = useLocalesStore();
  const applicationIdInt = Number.parseInt(applicationId);
  const chatStore = useChatStore();

  return (
    <LeftNavigationLayout title={`${APPLICATION_LANG} ${applicationId}`}>
      <div className="flex flex-col h-full py-7 pr-4 pl-10">
        <div className="flex my-2 mr-auto" style={{ border: "1px solid #D7D7D7" }}>
          <button
            className={`px-8 py-1 hover:bg-blue-50 transition ${!tabId ? "bg-blue-50" : ""}`}
            style={{ borderRight: "1px solid #D7D7D7" }}
            onClick={() => setTabId(false)}
          >
            {CHAT_LANG}
          </button>
          <button
            className={`px-6 py-1 hover:bg-blue-50 transition ${tabId ? "bg-blue-50" : ""}`}
            onClick={() => setTabId(true)}
          >
            {APPLICATION_LANG}
          </button>
        </div>
        <div className="flex-grow">
          {tabId ? (
            <ApplicationTab className="h-full" applicationId={applicationIdInt} />
          ) : (
            <ChatTab className="h-full" applicationId={applicationIdInt} store={chatStore} />
          )}
        </div>
      </div>
    </LeftNavigationLayout>
  );
};

export default MyApplicationsPage;
