import {
  PageEditorCellDialogStore,
  PageEditorCellStore,
  PageEditorRowStore,
  PageEditorStore,
  PageLanguageEditorStore,
  PageRowsEditorStore,
} from "./PageEditorStore";
import { useObserver } from "mobx-react";
import { AdminRemoteUiHtmlEditor, AdminRemoteUiHtmlEditorStore } from "src/components/remoteui/AdminRemoteUiHtmlEditor";
import {
  AdminRemoteUiImageFieldEditor,
  AdminRemoteUiImageFieldStore,
} from "src/components/remoteui/AdminRemoteUiImageEditor";
import { AvailableBlocks, BlockPresenter } from "@project/components/src/blocks";
import { AdminButton } from "src/components/common/AdminButton";
import { IRemoteUiData, IRemoteUiEditorCustomization, RemoteUiEditor } from "@kekekeks/remoteui/src";
import { AdminSlider } from "src/components/common/AdminSlider";
import { AdminOverlayDialog } from "src/components/common/AdminOverlayDialog";
import { bind, dmap } from "src/utils/util";
import { AdminTabControl } from "src/components/common/AdminTabControl";
import "@kekekeks/remoteui/src/RemoteUiEditor.css";
import { AdminTextBox } from "src/components/common/AdminTextBox";
import { AllLanguages } from "@project/components/src/utils/langs";
import grid from "@project/components/src/styles/grid.module.css";
import { AdminRemoteUiRowsEditor, AdminRemoteUiRowsStore } from "src/components/remoteui/AdminRemoteUiRowsEditor";
import { useEffect, useRef, useState } from "react";
import Carousel from "react-multi-carousel";
import styles from "./PageEditor.module.css";

import GoogleMapBlockPreview from "src/assets/img/blocks/GoogleMapBlock.png";
import FeedbackSliderBlockPreview from "src/assets/img/blocks/FeedbackSliderBlock.png";
import CirclesPreview from "src/assets/img/blocks/Circles.png";
import ImageBlockPreview from "src/assets/img/blocks/ImageBlock.png";
import BasicHTMLPreview from "src/assets/img/blocks/BasicHTML.png";
import ReadMoreBlockPreview from "src/assets/img/blocks/ReadMoreBlock.png";
import ArticleBeforeImageBlockPreview from "src/assets/img/blocks/ArticleBeforeImageBlock.png";
import BigCardsListBlockPreview from "src/assets/img/blocks/BigCardsListBlock.png";
import BreadCrumbsBlockPreview from "src/assets/img/blocks/BreadCrumbsBlock.png";
import ButtonFormBlockPreview from "src/assets/img/blocks/ButtonFormBlock.png";
import CardsWithLinksBlockPreview from "src/assets/img/blocks/CardsWithLinksBlock.png";
import LeftAlignBlockPreview from "src/assets/img/blocks/LeftAlignBlock.png";
import LeftTabsRightContentBlockPreview from "src/assets/img/blocks/LeftTabsRightContentBlock.png";
import ReasonsAcceptIconBlockPreview from "src/assets/img/blocks/ReasonsAcceptIconBlock.png";
import ReasonsAcceptCardBlockPreview from "src/assets/img/blocks/ReasonsAcceptCardBlock.png";
import ReasonsCustomIconBlockPreview from "src/assets/img/blocks/ReasonsCustomIconBlock.png";
import TabsWithContentPreview from "src/assets/img/blocks/TabsWithContent.png";
import ImgAndTextEditorBlockPreview from "src/assets/img/blocks/ImgAndTextEditorBlock.png";
import TitleAndCallBackBlockPreview from "src/assets/img/blocks/TitleAndCallBackBlock.png";
import TitleAndTabsBlockPreview from "src/assets/img/blocks/TitleAndTabsBlock.png";
import StringReasonsBlockPreview from "src/assets/img/blocks/StringReasonsBlock.png";

const PageEditorCell = (props: { store: PageEditorCellStore }) => {
  const s = props.store;
  return useObserver(() => (
    <div>
      <div className="bg-white">
        <div className="relative">
          <div className={`py-12`}>
            {s.blockData == null ? null : <BlockPresenter blockType={s.blockType} blockData={s.blockData} />}
          </div>
          <div className="absolute top-0 right-0">
            <AdminButton color={"primary"} onClick={() => s.triggerEdit()}>
              ...
            </AdminButton>
            &nbsp;
            <AdminButton color={"danger"} onClick={() => s.triggerDelete()}>
              X
            </AdminButton>
          </div>
        </div>
      </div>
    </div>
  ));
};

const PageEditorRow = (props: { store: PageEditorRowStore }) => {
  const s = props.store;
  return useObserver(() => (
    <div className="bg-gray-100 pt-2 pb-2">
      <div style={{ width: "100%" }}>
        <div>
          <div>
            <div style={{ width: "100%" }} className={`p-4`}>
              <div className={`flex mb-3`}>
                <div className={`flex flex-col mr-6`}>
                  <span>MaxWidth</span>
                  <label className={`flex items-center mr-6`}>
                    <input
                      type={"radio"}
                      name={"width"}
                      onChange={(e) => (props.store.maxWidth = e.target.value)}
                      value={"100%"}
                      checked={props.store.maxWidth === "100%"}
                    />
                    <span className={`ml-3`}>100%</span>
                  </label>
                  <label className={`flex items-center mr-6`}>
                    <input
                      type={"radio"}
                      name={"width"}
                      onChange={(e) => (props.store.maxWidth = e.target.value)}
                      value={"1170px"}
                      checked={props.store.maxWidth === "1170px"}
                    />
                    <span className={`ml-3`}>1170px</span>
                  </label>
                </div>
                <div className={`flex flex-col`}>
                  <span>backGround</span>
                  <label className={`flex items-center mr-6`}>
                    <input
                      type={"radio"}
                      name={"bg"}
                      onChange={(e) => (props.store.backGround = e.target.value)}
                      value={`#fff`}
                      checked={props.store.backGround === "#fff"}
                    />
                    <span className={`ml-3`}>White</span>
                  </label>
                  <label className={`flex items-center mr-6`}>
                    <input
                      type={"radio"}
                      name={"bg"}
                      onChange={(e) => (props.store.backGround = e.target.value)}
                      value={`#F9FAFD`}
                      checked={props.store.backGround === "#F9FAFD"}
                    />
                    <span className={`ml-3`}>White-Gray</span>
                  </label>
                </div>
              </div>
              <div>
                {props.store.cells.map((cell, i) => (
                  <div
                    className={`inline-block ${
                      grid["col-" + cell.size]
                    } border border-blue-400 box-border relative py-10`}
                    style={{ verticalAlign: "top" }}
                  >
                    <PageEditorCell key={i.toString()} store={cell} />
                  </div>
                ))}
                <div className="inline-block m-4" style={{ verticalAlign: "bottom" }}>
                  <AdminButton color={"primary"} onClick={() => props.store.addNewCell()}>
                    +
                  </AdminButton>
                </div>
              </div>
            </div>
            <td style={{ width: "0%", verticalAlign: "top" }}>
              <AdminButton color={"danger"} onClick={() => props.store.remove()}>
                X
              </AdminButton>
              {props.store.canMoveUp ? (
                <>
                  &nbsp;
                  <AdminButton color={"default"} onClick={() => s.moveUp()}>
                    ↑
                  </AdminButton>
                </>
              ) : null}
              {props.store.canMoveDown ? (
                <>
                  &nbsp;
                  <AdminButton color={"default"} onClick={() => s.moveDown()}>
                    ↓
                  </AdminButton>
                </>
              ) : null}
            </td>
          </div>
        </div>
      </div>
    </div>
  ));
};

class RemoteUiCustomization implements IRemoteUiEditorCustomization {
  getEditorFor(store: IRemoteUiData): any {
    if (store instanceof AdminRemoteUiHtmlEditorStore) return <AdminRemoteUiHtmlEditor store={store} />;
    if (store instanceof AdminRemoteUiImageFieldStore) return <AdminRemoteUiImageFieldEditor store={store} />;
    if (store instanceof AdminRemoteUiRowsStore) return <AdminRemoteUiRowsEditor store={store} />;
    return null;
  }
}

const PreviewChooser: React.FC<{ block: string }> = ({ block }) => {
  switch (block) {
    case "GoogleMapBlock":
      return <img src={GoogleMapBlockPreview} alt={block} />;
    case "FeedbackSliderBlock":
      return <img src={FeedbackSliderBlockPreview} alt={block} />;
    case "Circles":
      return <img src={CirclesPreview} alt={block} />;
    case "Basic HTML":
      return <img src={BasicHTMLPreview} alt={block} />;
    case "ImageBlock":
      return <img src={ImageBlockPreview} alt={block} />;
    case "ReadMoreBlock":
      return <img src={ReadMoreBlockPreview} alt={block} />;
    case "ArticleBeforeImageBlock":
      return <img src={ArticleBeforeImageBlockPreview} alt={block} />;
    case "BigCardsListBlock":
      return <img src={BigCardsListBlockPreview} alt={block} />;
    case "BreadcrumbsBlock":
      return <img src={BreadCrumbsBlockPreview} alt={block} />;
    case "ButtonFormBlock":
      return <img src={ButtonFormBlockPreview} alt={block} />;
    case "CardsWithLinksBlock":
      return <img src={CardsWithLinksBlockPreview} alt={block} />;
    case "ImageBlock":
      return <img src={ImageBlockPreview} alt={block} />;
    case "ImgAndTextEditorBlock":
      return <img src={ImgAndTextEditorBlockPreview} alt={block} />;
    case "LeftAlignBlock":
      return <img src={LeftAlignBlockPreview} alt={block} />;
    case "LeftTabsRightContentBlock":
      return <img src={LeftTabsRightContentBlockPreview} alt={block} />;
    case "ReasonsAcceptIconBlock":
      return <img src={ReasonsAcceptIconBlockPreview} alt={block} />;
    case "ReasonsAcceptCardBlock":
      return <img src={ReasonsAcceptCardBlockPreview} alt={block} />;
    case "ReasonsCustomIconBlock":
      return <img src={ReasonsCustomIconBlockPreview} alt={block} />;
    case "Tabs with content":
      return <img src={TabsWithContentPreview} alt={block} />;
    case "TitleAndCallBackBlock":
      return <img src={TitleAndCallBackBlockPreview} alt={block} />;
    case "TitleAndTabsBlock":
      return <img src={TitleAndTabsBlockPreview} alt={block} />;
    case "StringReasonsBlock":
      return <img src={StringReasonsBlockPreview} alt={block} />;
    default:
      return <span>"Для этого блока нет превью"</span>;
  }
};

const PageEditorCellDialog = (props: { store: PageEditorCellDialogStore }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 1920, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const slides = useRef<any>(null);
  const [currentSlide, setCurrentSlide] = useState({});

  useEffect(() => {
    const ind = AvailableBlocks.findIndex((el) => {
      return el.id === props.store.blockType;
    });

    slides?.current?.goToSlide(ind, true);
  }, [props.store.blockType]);

  return useObserver(() => (
    <div>
      Size:
      <br />
      <AdminSlider min={1} max={12} value={props.store.size} onChange={(v) => (props.store.size = v)} />
      <br />
      Type:
      <div style={{ maxWidth: "90vw" }}>
        <Carousel
          ref={slides}
          responsive={responsive}
          itemClass={styles.item}
          afterChange={(previousSlide, { currentSlide }) => {
            props.store.blockType = AvailableBlocks[currentSlide].id;
          }}
        >
          {AvailableBlocks.map((b, ind) => (
            <div key={ind}>
              {b.name}
              <PreviewChooser block={b.name} />
            </div>
          ))}
        </Carousel>
      </div>
      {props.store.currentEditor == null ? null : (
        <div>
          <div style={{ margin: "5px", width: "100%", maxWidth: "90vw", maxHeight: "70vh", overflow: "scroll" }}>
            <RemoteUiEditor store={props.store.currentEditor} customization={new RemoteUiCustomization()} />
          </div>
          <br />
          <AdminButton color={"primary"} onClick={() => props.store.save()}>
            Save
          </AdminButton>
        </div>
      )}
    </div>
  ));
};

export const PageRowsEditor = (props: { store: PageRowsEditorStore }) => {
  const s = props.store;

  return useObserver(() => (
    <>
      {s.cellEditor == null ? null : (
        <AdminOverlayDialog cancel={() => (s.cellEditor = null)}>
          <PageEditorCellDialog store={s.cellEditor} />
        </AdminOverlayDialog>
      )}

      {s.rows.map((r, i) => (
        <PageEditorRow key={i.toString()} store={r} />
      ))}
      <div className="content-center mt-8">
        <AdminButton color="primary" onClick={() => s.addRow()}>
          Add row
        </AdminButton>
      </div>
    </>
  ));
};

export const PageLanguageEditor = (props: { store: PageLanguageEditorStore }) => {
  return useObserver(() => (
    <div>
      <AdminTextBox id={"title"} label="Title" {...bind(props.store, "title")} />
      <AdminTextBox id={"url"} label="Url" {...bind(props.store, "url")} />
      <br />
      <PageRowsEditor store={props.store} />
    </div>
  ));
};

const CreatePage = (props: {
  availableLangs: { lang: string; name: string }[];
  createPage: (copyFrom?: string) => void;
}) => {
  const noneLang = "<none>";
  const [selectedLang, setSelectedLang] = useState(noneLang);
  return (
    <div className="content-center m-4">
      {props.availableLangs.length == 0 ? null : (
        <>
          Copy from
          <select value={selectedLang} onChange={(e) => setSelectedLang(e.target.value)}>
            <option value={noneLang}>Create new</option>
            {props.availableLangs.map((l) => (
              <option value={l.lang}>{l.name}</option>
            ))}
          </select>
          <br />
        </>
      )}

      <AdminButton
        color="primary"
        onClick={(e) => props.createPage(selectedLang == noneLang ? undefined : selectedLang)}
      >
        Create Page Version
      </AdminButton>
    </div>
  );
};

export const PageEditor = (props: { store: PageEditorStore }) => {
  const s = props.store;
  return useObserver(() => {
    const availableLangs = dmap(AllLanguages, (id, lang) => ({
      lang: id,
      name: lang.title,
      isAvailable: props.store.langs[id] != null,
    })).filter((l) => l.isAvailable);
    return (
      <div>
        <AdminButton color="primary" onClick={() => s.save()}>
          Save
        </AdminButton>
        <br />
        <AdminTabControl
          tabs={dmap(AllLanguages, (lang, data) => ({
            id: lang,
            title: data.title,
            renderer:
              props.store.langs[lang] == null
                ? () => (
                    <CreatePage availableLangs={availableLangs} createPage={(copyFrom) => s.addLang(lang, copyFrom)} />
                  )
                : () => <PageLanguageEditor store={props.store.langs[lang]} />,
          }))}
        />
      </div>
    );
  });
};
