import {computed, observable, runInAction} from "mobx";


export abstract class RequestTracking {
    @observable __loadingCounter: number = 0;

    @computed get isLoading(): boolean {
        return this.__loadingCounter > 0;
    }

    public async track<T>(cb: () => Promise<T>): Promise<T> {
        runInAction(() => this.__loadingCounter++);
        try {
            return await cb();
        }
        finally {
            runInAction(() => this.__loadingCounter--);
        }
    }
}

export abstract class Loadable extends RequestTracking {
    @observable isLoaded: boolean = false;
    public async ensureLoaded() : Promise<void> {
        if (this.isLoaded)
            return;
        await this.track<void>(async () => {
            await this.load();
            runInAction(() => {
                this.isLoaded = true;
            });
        });
    }

    abstract load(): Promise<void>;
}
