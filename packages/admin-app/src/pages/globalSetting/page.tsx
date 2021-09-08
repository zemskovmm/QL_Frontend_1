import { useRootStore } from "../../utils/rootStoreUtils";
import { useObserver } from "mobx-react";
import React, { FC, Suspense, useState } from "react";
import { AdminInputBox } from "../../components/common/AdminInputBox";
import { GlobalSettingsPageStore } from "../../stores/pages/globalSettings/globalSettingsPageStore";
import { AdminButton } from "../../components/common/AdminButton";
import { AlertComponent } from "../../components/common/AlertComponent";
import { DropDownList } from "@project/components/src/blocks/FaqBlock/faqBlock";
import { Editor } from "../../components/remoteui/AdminRemoteUiHtmlEditor";
import styles from "../../components/remoteui/AdminRemoteUiHtmlEditor.module.css";
import { LinkDto, SocialLinkDto } from "../../interfaces/GlobalSettingsDto";
import { RouterLink } from "mobx-state-router";
import { RouteNames } from "../../routing/routes";

const GlobalSocialLink: FC<{ value: SocialLinkDto[]; name: string }> = ({ value, name }) => {
  return useObserver(() => (
    <div className={`flex justify-between pb-4 mb-4 border-b-2	`}>
      <span className="text-gray-700 text-xl pr-4 flex flex-col">
        {name}
        <span>We have: telegram, vk, facebook, instagram, linkedIn, G+, twitter, youtube</span>
      </span>
      <div className={`flex flex-col w-3/4`}>
        {value &&
          value.map((el, index) => (
            <div key={index} className={`flex flex-col`}>
              <AdminInputBox value={el.icon} label={"social name"} onChange={(e) => (el.icon = e.target.value)} />
              <AdminInputBox value={el.link} label={"link"} onChange={(e) => (el.link = e.target.value)} />
              <button
                onClick={() => value.splice(index, 1)}
                className={`text-white font-bold py-2 px-4 rounded inline-block bg-red-600 hover:bg-red-900 mb-4`}
              >
                remove
              </button>
            </div>
          ))}
        <button
          onClick={() => value.push({ icon: "", link: "" })}
          className={`text-white font-bold py-2 px-4 rounded inline-block bg-blue-500 hover:bg-blue-100 hover:text-black`}
        >
          Add
        </button>
      </div>
    </div>
  ));
};

const GlobalLink: FC<{ value: LinkDto[]; name: string }> = ({ value, name }) => {
  return useObserver(() => (
    <div className={`flex justify-between pb-4 mb-4 border-b-2	`}>
      <span className="text-gray-700 text-xl pr-4">{name}</span>
      <div className={`flex flex-col w-3/4`}>
        {value &&
          value.map((el, index) => (
            <div key={index} className={`flex flex-col`}>
              <AdminInputBox value={el.name} label={"name"} onChange={(e) => (el.name = e.target.value)} />
              <AdminInputBox value={el.link} label={"link"} onChange={(e) => (el.link = e.target.value)} />
              <button
                onClick={() => value.splice(index, 1)}
                className={`text-white font-bold py-2 px-4 rounded inline-block bg-red-600 hover:bg-red-900 mb-4`}
              >
                remove
              </button>
            </div>
          ))}
        <button
          onClick={() => value.push({ name: "", link: "" })}
          className={`text-white font-bold py-2 px-4 rounded inline-block bg-blue-500 hover:bg-blue-100 hover:text-black`}
        >
          Add
        </button>
      </div>
    </div>
  ));
};

const RequestFormSettings: FC<{ s: GlobalSettingsPageStore }> = ({ s }) => {
  return useObserver(() => (
    <div className={`px-1`}>
      <AdminInputBox
        label={`Title`}
        value={s.requestFormTitle}
        onChange={(e) => (s.requestFormTitle = e.target.value)}
      />
      <AdminInputBox
        label={`Subtitle Left`}
        value={s.requestFormLeftTitle}
        onChange={(e) => (s.requestFormLeftTitle = e.target.value)}
      />
      <AdminInputBox
        label={`Subtitle Right`}
        value={s.requestFormRightTitle}
        onChange={(e) => (s.requestFormRightTitle = e.target.value)}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <div className={`flex flex-col`}>
          <span className="text-gray-700 text-xl pr-4 text-center mb-3">Post script</span>
          <Editor
            toolbarClassName={styles.rdwStorybookToolbar}
            wrapperClassName={styles.rdwStorybookWrapper}
            editorClassName={styles.rdwStorybookEditor}
            editorState={s.requestFormPostScriptText}
            onEditorStateChange={(w) => (s.requestFormPostScriptText = w)}
            placeholder="Lorem ipsum dolor sit amet"
          />
        </div>
      </Suspense>
    </div>
  ));
};

const HeaderSettings: FC<{ s: GlobalSettingsPageStore }> = ({ s }) => {
  return useObserver(() => (
    <div>
      <GlobalLink value={s.headerTopLink} name={`Top Link`} />
      <GlobalSocialLink value={s.headerSocialLink} name={"Social link"} />
      <GlobalLink value={s.headerBottomLink} name={`Bottom Link`} />
    </div>
  ));
};

const FooterSettings: FC<{ s: GlobalSettingsPageStore }> = ({ s }) => {
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
      <Suspense fallback={<div>Loading...</div>}>
        <div className={`flex flex-col`}>
          <span className="text-gray-700 text-xl pr-4 text-center mb-3">Post script</span>
          <Editor
            toolbarClassName={styles.rdwStorybookToolbar}
            wrapperClassName={styles.rdwStorybookWrapper}
            editorClassName={styles.rdwStorybookEditor}
            editorState={s.footerContactText}
            onEditorStateChange={(w) => (s.footerContactText = w)}
            placeholder="Lorem ipsum dolor sit amet"
          />
        </div>
      </Suspense>
      <GlobalSocialLink value={s.footerSocialLink} name={`Social Link`} />
    </div>
  ));
};

export const AdminGlobalSettingEditor = () => {
  const { globalSettingsPage: s } = useRootStore();
  const [name, setName] = useState("");

  return useObserver(() => (
    <div className={`max-w-7xl py-10 mx-auto px-10`}>
      <div className={`flex justify-between mb-4 w-full`}>
        <RouterLink routeName={RouteNames.globalSettingsEditor} params={{ lang: "en" }}>
          <a
            className={`text-white font-bold py-2 px-4 rounded inline-block bg-blue-500 hover:bg-blue-100 hover:text-black`}
          >
            English
          </a>
        </RouterLink>

        <RouterLink routeName={RouteNames.globalSettingsEditor} params={{ lang: "ru" }}>
          <a
            className={`text-white font-bold py-2 px-4 rounded inline-block bg-blue-500 hover:bg-blue-100 hover:text-black`}
          >
            Russian
          </a>
        </RouterLink>

        <RouterLink routeName={RouteNames.globalSettingsEditor} params={{ lang: "fr" }}>
          <a
            className={`text-white font-bold py-2 px-4 rounded inline-block bg-blue-500 hover:bg-blue-100 hover:text-black`}
          >
            France
          </a>
        </RouterLink>

        <RouterLink routeName={RouteNames.globalSettingsEditor} params={{ lang: "esp" }}>
          <a
            className={`text-white font-bold py-2 px-4 rounded inline-block bg-blue-500 hover:bg-blue-100 hover:text-black`}
          >
            Spaien
          </a>
        </RouterLink>

        <RouterLink routeName={RouteNames.globalSettingsEditor} params={{ lang: "ch" }}>
          <a
            className={`text-white font-bold py-2 px-4 rounded inline-block bg-blue-500 hover:bg-blue-100 hover:text-black`}
          >
            China
          </a>
        </RouterLink>
      </div>
      <DropDownList name={`Header`} active={name === "Header"} onClick={() => setName(`Header`)}>
        <HeaderSettings s={s} />
      </DropDownList>
      <DropDownList name={`Request Form`} active={name === "Request Form"} onClick={() => setName(`Request Form`)}>
        <RequestFormSettings s={s} />
      </DropDownList>
      <DropDownList name={`Footer`} active={name === "Footer"} onClick={() => setName(`Footer`)}>
        <FooterSettings s={s} />
      </DropDownList>
      <AdminButton color={`save`} onClick={() => s.save()}>
        Save
      </AdminButton>
      {/*{s.alert && <AlertComponent text={`save`} />}*/}
    </div>
  ));
};
