import React from "react";
import { BasicHtmlBlockInfo } from "./basic-html";
import { CirclesBlockInfo } from "./circles";
import { ReadMoreBlockInfo } from "./ReadMoreBlock/readMoreBlock";
import { ReasonsAcceptIconBlockInfo } from "./ReasonsAcceptIconBlock/reasonsAcceptIconBlock";
import { ReasonsCustomIconBlockInfo } from "./ReasonsCustomIconBlock/reasonsCustomIconBlock";
import { LeftAlignBlockInfo } from "./LeftAlignBlock/leftAlignBlock";
import { ArticleBeforeImageBlockInfo } from "./ArticleBeforeImageBlock/articleBeforeImageBlock";
import { BigCardsListBlockInfo } from "./BigCardsListBlock/bigCardsListBlock";
import { ButtonFormBlockInfo } from "./ButtonFormBlock/buttonFormBlock";
import { BlockTypeInfo } from "./blocks-info";

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
];

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
