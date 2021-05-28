import React from "react";
import { BasicHtmlBlockInfo } from "./BasicHtmlBlock/basic-html";
import { CirclesBlockInfo } from "./circles";
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
import grid from "../styles/grid.module.css";
import { TabControlBlockInfo } from "./TabControlBlock/TabControlBlock";
import { TitleAndTabsBlockInfo } from "./TitleAndTabsBlock/titleAndTabsBlock";
import { BreadcrumbsBlockInfo } from "./BreadcrumbsBlock/breadcrumbsBlock";
import { TitleAndCallBackBlockInfo } from "./TitleAndCallBackBlock/titleAndCallBackBlock";
import { ImgAndTextEditorBlockInfo } from "./ImgAndTextEditorBlock/imgAndTextEditorBlock";
import { LeftTabsRightContentBlockInfo } from "./LeftTabsRightContentBlock/LeftTabsRightContentBlock";
import { GoogleMapBlockInfo } from "./GoogleMapBlock/googleMapBlock";

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
  GoogleMapBlockInfo,
  TitleAndTabsBlockInfo,
  BreadcrumbsBlockInfo,
  TitleAndCallBackBlockInfo,
  ImgAndTextEditorBlockInfo,
  LeftTabsRightContentBlockInfo,
  GoogleMapBlockInfo,
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
  return (
    <div style={{ background: props.background }} className={`relative`}>
      {props.blocks.map((cell, i) => {
        if (cell.type !== "breadcrumbsBlock") {
          return (
            <div
              key={i}
              className={`inline-block ${grid["col-" + cell.size]} box-border`}
              style={{ verticalAlign: "top", maxWidth: props.maxWidth }}
            >
              <BlockPresenter blockType={cell.type} blockData={cell.data} />
            </div>
          );
        } else {
          return <BlockPresenter blockType={cell.type} blockData={cell.data} />;
        }
      })}
    </div>
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
