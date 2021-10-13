import { BlockTypeInfo } from "../blocks/blocks-info";
import { CirclesBlockInfo } from "../blocks/CirclesBlock/circles";
import { BasicInputBlockInfo } from "./BasicInputBlock/BasicInputBlock";
import { BasicInputFileBlockInfo } from "./BasicInputFileBlock/BasicInputFileBlock";
import { BasicInputFileListBlockInfo } from "./BasicInputFileListBlock/BasicInputFileListBlock";

export const FormBuilderBlockList: BlockTypeInfo[] = [
  CirclesBlockInfo,
  BasicInputBlockInfo,
  BasicInputFileBlockInfo,
  BasicInputFileListBlockInfo,
];
