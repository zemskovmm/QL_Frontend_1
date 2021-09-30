import React, { FC } from "react";
import { useObserver } from "mobx-react";
import { AdminInputBox } from "../../../components/common/AdminInputBox";
import { GlobalSettingsPageStore } from "../../../stores/pages/globalSettings/globalSettingsPageStore";
import { GlobalLink, GlobalSocialLink } from "../common/commonGlobal";

export const FooterSettings: FC<{ s: GlobalSettingsPageStore }> = ({ s }) => {
  return useObserver(() => (
    <div>
      <GlobalLink value={s.footerTopLink} name={`Top Link`} />
      <div className={`flex justify-between pb-4 mb-4 border-b-2	`}>
        <span className="text-gray-700 text-xl pr-4">Link list</span>
        <div className={`flex flex-col w-3/4`}>
          {s.footerLinkList &&
            s.footerLinkList.map((el, index) => (
              <div key={index} className={`flex flex-col`}>
                <AdminInputBox value={el.title} label={"Title"} onChange={(e) => (el.title = e.target.value)} />
                <AdminInputBox value={el.url} label={"Url"} onChange={(e) => (el.url = e.target.value)} />
                <GlobalLink value={el.list} name={`Link List`} />
                <button
                  onClick={() => s.footerLinkList.splice(index, 1)}
                  className={`text-white font-bold py-2 px-4 rounded inline-block bg-red-600 hover:bg-red-900 mb-4`}
                >
                  remove
                </button>
              </div>
            ))}
          <button
            onClick={() => s.footerLinkList.push({ title: "", url: "", list: [] })}
            className={`text-white font-bold py-2 px-4 rounded inline-block bg-blue-500 hover:bg-blue-100 hover:text-black`}
          >
            Add
          </button>
        </div>
      </div>
      <div className="text-gray-700 text-xl py-4">
        We have: call, email, facebook, instagram, telegram, linkedin, location, skype, g+, twitter, vk, whatsapp,
        youtube
      </div>
      <div className={`flex justify-between pb-4 mb-4 border-b-2	`}>
        <span className="text-gray-700 text-xl pr-4 flex-col">Contact list</span>

        <div className={`flex flex-col w-3/4`}>
          {s.footerContactLinkList &&
            s.footerContactLinkList.map((el, index) => (
              <div key={index} className={`flex flex-col`}>
                <AdminInputBox value={el.icon} label={"Icon"} onChange={(e) => (el.icon = e.target.value)} />
                <AdminInputBox value={el.link} label={"Url"} onChange={(e) => (el.link = e.target.value)} />
                <AdminInputBox value={el.text} label={"Text"} onChange={(e) => (el.text = e.target.value)} />
                <button
                  onClick={() => s.footerContactLinkList.splice(index, 1)}
                  className={`text-white font-bold py-2 px-4 rounded inline-block bg-red-600 hover:bg-red-900 mb-4`}
                >
                  remove
                </button>
              </div>
            ))}
          <button
            onClick={() => s.footerContactLinkList.push({ icon: "", link: "", text: "" })}
            className={`text-white font-bold py-2 px-4 rounded inline-block bg-blue-500 hover:bg-blue-100 hover:text-black`}
          >
            Add
          </button>
        </div>
      </div>

      <GlobalSocialLink value={s.footerSocialLink} name={`Social Link`} />
    </div>
  ));
};
