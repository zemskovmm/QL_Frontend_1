import React from "react";
import { BasicHtmlBlockInfo } from "./BasicHtmlBlock/basic-html";
import { CirclesBlockInfo } from "./CirclesBlock/circles";
import { ReadMoreBlockInfo } from "./ReadMoreBlock/readMoreBlock";
import { ReasonsAcceptIconBlockInfo } from "./ReasonsAcceptIconBlock/reasonsAcceptIconBlock";
import { ReasonsCustomIconBlockInfo } from "./ReasonsCustomIconBlock/reasonsCustomIconBlock";
import { LeftAlignBlockInfo } from "./LeftAlignBlock/leftAlignBlock";
import { ArticleBeforeImageBlockInfo } from "./ArticleBeforeImageBlock/articleBeforeImageBlock";
import { BigCardsListBlockInfo } from "./BigCardsListBlock/bigCardsListBlock";
import { ButtonFormBlockInfo } from "./ButtonFormBlock/buttonFormBlock";
import { ImageBlockInfo } from "./ImageBlock/imageBlock";
import { ReasonsAcceptCardBlockInfo } from "./ReasonsAcceptCardBlock/reasonsAcceptCardBlock";
import { CardsWithLinksBlockInfo } from "./CardsWithLinksBlock/cardsWithLinksBlock";
import { GoogleMapBlockInfo } from "./GoogleMapBlock/googleMapBlock";
import { BlockTypeInfo } from "./blocks-info";
import { PageBlockRowDto } from "../interfaces/pageSharedDto";
import { TabControlBlockInfo } from "./TabControlBlock/TabControlBlock";
import { TitleAndTabsBlockInfo } from "./TitleAndTabsBlock/titleAndTabsBlock";
import { BreadcrumbsBlockInfo } from "./BreadcrumbsBlock/breadcrumbsBlock";
import { TitleAndCallBackBlockInfo } from "./TitleAndCallBackBlock/titleAndCallBackBlock";
import { ImgAndTextEditorBlockInfo } from "./ImgAndTextEditorBlock/imgAndTextEditorBlock";
import { LeftTabsRightContentBlockInfo } from "./LeftTabsRightContentBlock/LeftTabsRightContentBlock";
import { FeedbackSliderBlockInfo } from "./FeedbackSliderBlock/feedbackSliderBlock";
import { StringReasonsBlockInfo } from "./StringReasonsBlock/stringReasonsBlock";
import { FaqBlockInfo } from "./FaqBlock/faqBlock";
import { HtmlWithIconBlockInfo } from "./HtmlWithIconBlock/htmlWithIconBlock";
import { FramesWithArrowBlockInfo } from "./FramesWithArrowBlock/framesWithArrowBlock";
import { FixedHeightBlockInfo } from "./FixedHeightBlock/fixedHeightBlock";
import { TableBlockInfo } from "./TableBlock/TableBlock";
import { NewsletterBlockInfo } from "./NewsletterBlock/NewsletterBlock";
import { HistoryClientsBlockInfo } from "./Blog/HistoryClients/historyClientsBlock";
import { FirstArticleBlockInfo } from "./Blog/FirstArticle/firstArticleBlock";

import cn from "classnames";
import grid from "../styles/grid.module.css";
import { PartnersBlockInfo } from "./PartnersBlock/PartnersBlock";
import { NewsBlockInfo } from "./NewsBlock/NewsBlock";
import { SocialBlockInfo } from "./SocialBlock/SocialBlock";
import { GallerySliderBlockInfo } from "./GallerySliderBlock/gallerySliderBlock";
import { CommentsBlockInfo } from "./CommentsBlock/commentsBlock";
import { SkipHistoryBlockInfo } from "./SkipHistoryBlock/skip-history";
import { MultiImgBlockInfo } from "./MultiImgBlock/MultiImgBlock";
import { RequestFormDto } from "admin-app/src/interfaces/GlobalSettingsDto";
import { FormBuilderBlockList } from "../FormBuilderBlocks/FormBuilderBlockList";

export const AvailableBlocks: BlockTypeInfo[] = [
  CirclesBlockInfo,
  BasicHtmlBlockInfo,
  ReadMoreBlockInfo,
  ReasonsAcceptIconBlockInfo,
  ReasonsCustomIconBlockInfo,
  LeftAlignBlockInfo,
  ArticleBeforeImageBlockInfo,
  BigCardsListBlockInfo,
  ButtonFormBlockInfo,
  ImageBlockInfo,
  ReasonsAcceptCardBlockInfo,
  CardsWithLinksBlockInfo,
  TabControlBlockInfo,
  TitleAndTabsBlockInfo,
  BreadcrumbsBlockInfo,
  TitleAndCallBackBlockInfo,
  ImgAndTextEditorBlockInfo,
  LeftTabsRightContentBlockInfo,
  GoogleMapBlockInfo,
  FeedbackSliderBlockInfo,
  StringReasonsBlockInfo,
  FaqBlockInfo,
  HtmlWithIconBlockInfo,
  TableBlockInfo,
  FramesWithArrowBlockInfo,
  FixedHeightBlockInfo,
  PartnersBlockInfo,
  NewsBlockInfo,
  SocialBlockInfo,
  GallerySliderBlockInfo,
  NewsletterBlockInfo,
  HistoryClientsBlockInfo,
  FirstArticleBlockInfo,
  CommentsBlockInfo,
  SkipHistoryBlockInfo,
  MultiImgBlockInfo,
];

export interface IComponentHost {
  showContactUsForm: () => void;
  filters: any;
  lang: string;
  linkComponent: (props: { href: string; children: any }) => React.ReactElement;
  requestSetting: RequestFormDto;
}

export const ComponentHostContext = React.createContext<IComponentHost | null>(null);

export function findBlockInfo(blockType: string, formBuilder?: boolean): BlockTypeInfo | null {
  if (formBuilder) {
    for (const info of FormBuilderBlockList) if (info.id == blockType) return info;
  } else {
    for (const info of AvailableBlocks) if (info.id == blockType) return info;
  }
  return null;
}

export const BlockPresenter = (props: { blockType: string; blockData: any }) => {
  const info = findBlockInfo(props.blockType) ?? findBlockInfo(props.blockType, true);
  if (info == null) return <div>Unknown block type: {props.blockType}</div>;
  const Renderer = info.renderer;
  return <Renderer {...props.blockData} />;
};

const RowPresenter = (props: PageBlockRowDto) => {
  const sortBlocks = [...props.blocks].sort(function (x, y) {
    return x.type === "breadcrumbsBlock" ? -1 : y.type === "breadcrumbsBlock" ? 1 : 0;
  });
  const findSkip = [...props.blocks].findIndex((x) => x.type === "skipHistoryBlock");

  return (
    <section
      style={{
        background: props.background,
        alignItems: props.vertical,
      }}
      className={`relative ${props.marginAuto ? "" : "mx-auto"} flex-wrap flex`}
    >
      {sortBlocks.map((cell, i) => {
        if (cell.hide) return;
        if (props.hideHistory && i >= findSkip && findSkip !== -1) return;
        if (cell.type === "breadcrumbsBlock") return <BlockPresenter blockType={cell.type} blockData={cell.data} />;
        return (
          <div
            key={i}
            className={cn(
              i === 1 && sortBlocks[0].type == "breadcrumbsBlock" ? "block-with-breadcrumbs" : "",
              `inline-block ${grid["col-" + cell.size]} box-border mx-auto`
            )}
            style={{
              verticalAlign: "top",
              maxWidth: props.maxWidth ? props.maxWidth : "100%",
              backgroundColor: props.background ? props.background : "",
            }}
          >
            <BlockPresenter blockType={cell.type} blockData={cell.data} />
          </div>
        );
      })}
    </section>
  );
};

export const RowsPresenter = (props: { rows: PageBlockRowDto[]; hideHistory?: boolean; marginAuto?: boolean }) => {
  return (
    <>
      {props.rows.map(
        (row, ind) =>
          !row.hide && (
            <React.Fragment key={ind}>
              <RowPresenter
                marginAuto={props.marginAuto}
                blocks={row.blocks}
                maxWidth={row.maxWidth}
                background={row.background}
                hide={row.hide}
                vertical={row.vertical}
                hideHistory={props.hideHistory}
              />
            </React.Fragment>
          )
      )}
    </>
  );
};
