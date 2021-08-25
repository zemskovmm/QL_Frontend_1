import React from "react";
import { AdminTraitTypeDto } from "../../interfaces/TraitPageDto";
import { ReactTableStore } from "../../stores/table/ReactTableStore";
import { action, observable, runInAction } from "mobx";
import { PaginatedTable } from "../PaginatedTable/PaginatedTable";
import { slice } from "lodash";
import { AdminApi } from "../../clients/adminApiClient";

type TraitListItem = { active: boolean; item: AdminTraitTypeDto };

export type TraitLoader = {
  getCurrentTraitType(): number;
  getTraitTypes(): AdminTraitTypeDto[];

  getActiveTraits(): number[];
  getAvailableTraits(): AdminTraitTypeDto[];

  setTraitType(traitId: number): Promise<void>;
  addTraitToItem(traitId: number): Promise<void>;
  deleteTraitToItem(traitId: number): Promise<void>;

  reload(): Promise<void>;
};

export abstract class TraitLoaderWithCache implements TraitLoader {
  @observable traitCache: AdminTraitTypeDto[] = [];
  @observable traitTypes: AdminTraitTypeDto[] = [];
  @observable activeTraits: number[] = [];
  @observable activeType = 1;

  abstract loadActiveTraits(): Promise<number[]>;
  abstract addTraitToItem(traitId: number): Promise<void>;
  abstract deleteTraitToItem(traitId: number): Promise<void>;

  @action getActiveTraits() {
    return this.activeTraits;
  }

  @action async reload(): Promise<void> {
    const traitTypes = this.traitTypes.length === 0 ? await AdminApi.getTraitTypeList() : this.traitTypes;
    const traitList = await AdminApi.getTraitsListOfType(this.activeType);
    const activeTraits = await this.loadActiveTraits();

    runInAction(() => {
      this.traitTypes = traitTypes;
      this.traitCache = [...traitList];
      this.activeTraits = [...activeTraits];
    });
  }

  getAvailableTraits(): AdminTraitTypeDto[] {
    return this.traitCache;
  }

  getCurrentTraitType() {
    return this.activeType;
  }

  getTraitTypes(): AdminTraitTypeDto[] {
    return this.traitTypes;
  }

  @observable async setTraitType(trait: number) {
    this.activeType = trait;
    await this.reload();
  }
}

export class TraitEditorStore<T extends TraitLoader> extends ReactTableStore<TraitListItem> {
  @observable traitLoader: T;

  constructor(traitLoader: T) {
    super();
    this.traitLoader = traitLoader;
    this.pageSize = 15;
  }

  @action async refresh(_: unknown): Promise<void> {
    const sliceIndex = this.page * this.pageSize;
    const traits = [...this.traitLoader.getAvailableTraits()];
    const activeTraits = [...this.traitLoader.getActiveTraits()];
    const traitPage = slice(traits, sliceIndex, sliceIndex + this.pageSize);

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
    <div className="container mx-auto px-4 sm:px-8 max-w-/xl">
      <div className="py-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto flex flex-col">
          <div className={`mb-4 flex items-center flex-wrap`}>
            Traits:
            {store.traitLoader.getTraitTypes().map((el) => (
              <button
                className={
                  "d-flex ml-4 text-white font-bold py-2 px-4 rounded inline-block bg-blue-500 hover:bg-blue-100 hover:text-black"
                }
                onClick={async () => {
                  store.page = 0;
                  await store.traitLoader.setTraitType(el.id);
                  await store.refresh({});
                }}
              >
                {el.names["en"]}
              </button>
            ))}
          </div>
          <div>
            <PaginatedTable
              store={store}
              Cell={({ item, index }) => (
                <div className={"flex"}>
                  <div>
                    <input
                      type={"checkbox"}
                      checked={item.active}
                      onClick={() => (item.active ? store.deleteTrait(item.item.id) : store.addTrait(item.item.id))}
                    />
                  </div>
                  <div>{item.item.names["en"]}</div>
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
