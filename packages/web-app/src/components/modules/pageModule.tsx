import { ClientPageDto } from "src/interfaces/clientPageDto";
import { PageBlockRowDto } from "@project/components/src/interfaces/pageSharedDto";
import { BlockPresenter } from "@project/components/src/blocks";
import grid from "@project/components/src/styles/grid.module.css";

const PageRow = (props: PageBlockRowDto) => {
  return (
    <div>
      {props.blocks.map((cell, i) => (
        <div className={`inline-block ${grid["col-" + cell.size]}`} style={{ margin: 3, verticalAlign: "top" }}>
          <BlockPresenter key={i} blockType={cell.type} blockData={cell.data} />
        </div>
      ))}
    </div>
  );
};

export const PageModule = (props: ClientPageDto) => {
  return (
    <div className={"mx-auto max-w-screen-xl px-10"}>
      <h1>{props.title}</h1>
      {props.block.rows.map((row, i) => (
        <PageRow key={i} blocks={row.blocks} />
      ))}
    </div>
  );
};
