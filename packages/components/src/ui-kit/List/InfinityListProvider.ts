import { timeStamp } from "console";
import { ListItemType } from "./_types";

export class InfinityListProvider {
  items: Array<ListItemType | undefined> = [];

  constructor(old?: InfinityListProvider) {
    if (old) {
      this.items = old.items;
    }
  }

  get count(): number {
    return this.items.length;
  }

  push({ count, start, rows }: { count: number; start: number; rows: Array<ListItemType> }): InfinityListProvider {
    const out = new InfinityListProvider(this);
    if (count !== out.count) {
      out.items = new Array(count);
    }
    rows.forEach((item, index) => {
      out.items[start + index] = item;
    });
    return out;
  }
}

export const InfinityListProviderInit = (count: number): InfinityListProvider => {
  const out = new InfinityListProvider();
  out.items = new Array(count);
  return out;
};
