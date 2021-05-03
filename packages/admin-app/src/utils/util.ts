import {ChangeEvent} from "react";
import exp from "constants";

export function dmap<TValue, TRes>(d: { [key: string]: TValue }, cb: (key: string, value: TValue) => TRes): TRes[] {
  const rv: TRes[] = [];
  for (const k in d) {
    if (d.hasOwnProperty(k))
      rv.push(cb(k, d[k]));
  }
  return rv;
}

export function dictMap<TValue, TRes>(d: { [key: string]: TValue }, cb: (key: string, value: TValue) => TRes): { [key: string]: TRes } {
  const rv: { [key: string]: TRes } = {};
  for (const k in d) {
    if (d.hasOwnProperty(k))
      rv[k] = cb(k, d[k]);
  }
  return rv;
}


export function isNullOrWhitespace(s: string | undefined | null): boolean {
  if (s) {
    if (s.length == 0)
      return true;
    return s.match(/^\s+$/) != null;
  } else return true;
}

export const nameof = <T>(name: keyof T) => name;
export const nameofFactory = <T>() => (name: keyof T) => name;

export function bind<T>(mdl: T, name: keyof T, type?: string): {
  value: string,
  onChange: any
} {
  const model = <any>mdl;
  let rv = {
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      var value: any;
      if (e.currentTarget.type == "checkbox") {
        value = e.currentTarget.checked;
      } else if (e.currentTarget.type == "number") {
        if (isNullOrWhitespace(e.currentTarget.value)) {
          e.currentTarget.value = "0";
        }
        value = e.currentTarget.value;
      } else
        value = e.currentTarget.value;

      const skey = name as string;
      const setter = "set" + skey.charAt(0).toUpperCase() + skey.substr(1);
      if (model[setter] != null) {
        model[setter](value);
      } else
        model[name as string] = value;
    },

  } as any;
  if (type == "checkbox")
    rv.checked = model[name as string];
  else
    rv.value = model[name as string];
  if (type != null)
    rv.type = type;
  return rv;
}

export const bindFactory = <T>(model: T) => (name: keyof T, type?: string) => bind<T>(model, name, type);

export function fireAndAlertOnError(cb: () => Promise<void>) : void
{
  const call = async ()=> {
    try {
      await cb();
    } catch (e) {
      alert(e.toString());
    }
  }
  call();
}
