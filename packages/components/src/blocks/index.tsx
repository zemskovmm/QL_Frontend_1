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
import { ImageBlockInfo } from "./ImageBlock/imageBlock";
import { BlockTypeInfo } from "./blocks-info";
import { PageBlockRowDto } from "../interfaces/pageSharedDto";
import grid from "../styles/grid.module.css";
import { TabControlBlockInfo } from "./TabControlBlock/TabControlBlock";

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
  TabControlBlockInfo,
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

const RowPresenter = (props: PageBlockRowDto) => {
  return (
    <div style={{ background: props.background }}>
      {props.blocks.map((cell, i) => (
        <div
          className={`inline-block ${grid["col-" + cell.size]}`}
          style={{ margin: 3, verticalAlign: "top", maxWidth: props.maxWidth }}
        >
          <BlockPresenter key={i} blockType={cell.type} blockData={cell.data} />
        </div>
      ))}
    </div>
  );
};

export const RowsPresenter = (props: { rows: PageBlockRowDto[] }) => {
  return (
    <>
      {props.rows.map((row, i) => (
        <RowPresenter key={i} blocks={row.blocks} maxWidth={row.maxWidth} background={row.background}/>
      ))}
    </>
  );
}
