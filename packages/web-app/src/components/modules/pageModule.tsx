import { ClientPageDto } from "src/interfaces/clientPageDto";
import { PageBlockRowDto } from "@project/components/src/interfaces/pageSharedDto";
import { BlockPresenter, RowsPresenter } from "@project/components/src/blocks";

export const PageModule = (props: ClientPageDto) => {
  return (
    <div className={"mx-auto "}>
      <h1>{props.title}</h1>
      <RowsPresenter rows={props.block.rows} />
    </div>
  );
};
