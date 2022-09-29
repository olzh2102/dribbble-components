import { append, syncSession } from '@common/utils';
import { useEffect, useRef, useState } from 'react';

const META_KEYS = [
  'clear',
  'getItem',
  'key',
  'length',
  'removeItem',
  'setItem',
];

export default function useSessionStorage() {
  const [state, setState] = useState<any>({});

  console.log('state', state);

  for (const key in sessionStorage) {
    if (META_KEYS.includes(key)) continue;
    state[key] = syncSession().getItem(key);
  }

  function setItem(key: string) {
    return (val: unknown) => {
      syncSession().persist(key, val);
      for (const key in sessionStorage) {
        if (META_KEYS.includes(key)) continue;
        state[key] = syncSession().getItem(key);
      }
    };
  }

  function swap(prop: string) {
    return (key: string) => {
      console.log('prop:', prop);
      console.log('peer id:', key);
      console.log('session:', state);
      // if (!(key in state)) {
      //   state[key] = {};
      // }
      // const obj = state[key];
      // if (!(prop in obj)) obj[prop] = false;
      // else obj[prop] = !obj[prop];
      const obj = state[key];
      obj[prop] = !obj[prop];
      syncSession().persist(key, obj);
      state[key] = obj;
      setState(append({ [key]: obj }));
      return;
    };
  }

  function remove(key: string) {
    sessionStorage.removeItem(key);
    for (const key in sessionStorage) {
      if (META_KEYS.includes(key)) continue;
      state[key] = syncSession().getItem(key);
    }
  }

  return [state, swap, remove, setItem];
}
