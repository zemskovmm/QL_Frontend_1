import { AdminTraitListItemDto } from "../../interfaces/TraitPageDto";
import { ReactTableStore } from "../../stores/table/ReactTableStore";
import { action, observable } from "mobx";
import { PaginatedTable } from "../PaginatedTable/PaginatedTable";

export type TraitLoader = {
  getActiveTraits(): Promise<number[]>;
  getAvailableTraits(): Promise<AdminTraitListItemDto[]>;

  addTraitToItem(traitId: number): Promise<void>;
  deleteTraitToItem(traitId: number): Promise<void>;
  reload(): Promise<void>;
};

type TraitListItem = { active: boolean; item: AdminTraitListItemDto };

export class TraitEditorStore<T extends TraitLoader> extends ReactTableStore<TraitListItem> {
  @observable traitLoader: T;

  constructor(traitLoader: T) {
    super();
    this.traitLoader = traitLoader;
  }

  @action async refresh(_: unknown): Promise<void> {
    const traits = await this.traitLoader.getAvailableTraits();
    const activeTraits = await this.traitLoader.getActiveTraits();
    const traitPage = traits.splice(this.page, this.pageSize);

    this.fillItems(
      traitPage.map((x) => ({ active: activeTraits.includes(x.id), item: x })),
      traits.length
    );
  }

  @action async addTrait(traitId: number) {
    try {
      await this.traitLoader.addTraitToItem(traitId);
      this.fillItems(
        this.items.map((x) => ({ ...x, active: x.item.id === traitId || x.active })),
        this.totalItemsCount
      );
    } catch (e) {
      alert(e);
    }
  }

  @action async deleteTrait(traitId: number) {
    try {
      await this.traitLoader.deleteTraitToItem(traitId);
      this.fillItems(
        this.items.map((x) => (x.item.id === traitId ? { ...x, active: false } : x)),
        this.totalItemsCount
      );
    } catch (e) {
      alert(e);
    }
  }
}

type TraitEditorProps<T extends TraitLoader> = { store: TraitEditorStore<T> };

export function TraitEditor<T extends TraitLoader>({ store }: TraitEditorProps<T>) {
  return (
    <div>
      <PaginatedTable
        store={store}
        renderCell={(item) => ({
          id: item.item.id,
          title: item.item.identifier,
        })}
      />
    </div>
  );
}
