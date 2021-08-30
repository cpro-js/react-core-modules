// config
import { IPromiseBasedObservable } from "mobx-utils";

export { configure } from "mobx";

// Creating observables
export { makeAutoObservable, makeObservable, observable, computed } from "mobx";

// Actions
export { action, runInAction } from "mobx";

// Collection utilities
export { values, keys, entries, get, has, set, remove } from "mobx";

// Reactions
export { autorun, reaction, when } from "mobx";

// react
export { observer, Observer, disposeOnUnmount } from "mobx-react";

// utilies
export { toJS } from "mobx";

// debug, see https://mobx.js.org/analyzing-reactivity.html
export { trace } from "mobx";

// utils
export { fromPromise, computedFn } from "mobx-utils";
export type ObservablePromise<T> = IPromiseBasedObservable<T>;
