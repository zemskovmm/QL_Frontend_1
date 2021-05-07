import { ClientPageDto } from "src/interfaces/clientPageDto";
import { PageBlockRowDto } from "@project/components/src/interfaces/pageSharedDto";
import {BlockPresenter} from "@project/components/src/blocks";

const PageRow = (props: PageBlockRowDto) => {
  return (
    <div>
      {props.blocks.map((cell, i) => (
        <div
          className="inline-block"
          style={{ width: `calc(${8 * cell.size}% - 6px)`, margin: 3, verticalAlign: "top" }}
        >
          <BlockPresenter key={i} blockType={cell.type} blockData={cell.data}/>
        </div>
      ))}
    </div>
  );
};

export const PageModule = (props: ClientPageDto) => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.block.rows.map((row, i)=><PageRow key={i} blocks={row.blocks}/>)}
    </div>
  );
};
