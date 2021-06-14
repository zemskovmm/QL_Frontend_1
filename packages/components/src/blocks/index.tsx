import React, { useState } from "react";
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

import cn from "classnames";
import grid from "../styles/grid.module.css";
import { PartnersBlockInfo } from "./PartnersBlock/PartnersBlock";
import { NewsBlockInfo } from "./NewsBlock/NewsBlock";
import { SocialBlockInfo } from "./SocialBlock/SocialBlock";

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
];

export interface IComponentHost {
  showContactUsForm: () => void;
  filters: any;
  lang: string;
}

export const ComponentHostContext = React.createContext<IComponentHost | null>(null);

export function findBlockInfo(blockType: string): BlockTypeInfo | null {
  for (var info of AvailableBlocks) if (info.id == blockType) return info;
  return null;
}

export const BlockPresenter = (props: { blockType: string; blockData: any }) => {
  const info = findBlockInfo(props.blockType);
  if (info == null) return <div>Unknown block type: {props.blockType}</div>;
  const Renderer = info.renderer;
  return <Renderer {...props.blockData} />;
};

const RowPresenter = (props: PageBlockRowDto) => {
  const sortBlocks = [...props.blocks].sort(function (x, y) {
    return x.type === "breadcrumbsBlock" ? -1 : y.type === "breadcrumbsBlock" ? 1 : 0;
  });
  return (
    <section
      style={{ background: props.background, maxWidth: props.maxWidth ? props.maxWidth : "100%" }}
      className={`relative mx-auto`}
    >
      {sortBlocks.map((cell, i) => {
        if (cell.type === "breadcrumbsBlock") return <BlockPresenter blockType={cell.type} blockData={cell.data} />;
        return (
          <div
            key={i}
            className={cn(
              i === 1 && sortBlocks[0].type == "breadcrumbsBlock" ? "block-with-breadcrumbs" : "",
              `inline-block ${grid["col-" + cell.size]} box-border`
            )}
            style={{ verticalAlign: "top", backgroundColor: props.background ? props.background : "" }}
          >
            <BlockPresenter blockType={cell.type} blockData={cell.data} />
          </div>
        );
      })}
    </section>
  );
};

export const RowsPresenter = (props: { rows: PageBlockRowDto[] }) => {
  return (
    <>
      {props.rows.map((row, i) => (
        <RowPresenter key={i} blocks={row.blocks} maxWidth={row.maxWidth} background={row.background} />
      ))}
    </>
  );
};
