import { append, syncSession } from '@common/utils';
import { useEffect, useRef, useState } from 'react';

export default function useSessionStorage() {
  const [state, setState] = useState<any>({});

  console.log('state', state);

  for (const key in sessionStorage) {
    if (['clear', 'getItem', 'key', 'length', 'removeItem', 'setItem'].includes(key)) continue;
    state[key] = syncSession().getItem(key);
  }

  function swap(prop: string) {
    return (key: string) => {
      console.log('prop:', prop);
      console.log('peer id:', key);
      console.log('session:', state);
      const obj = state[key];
      obj[prop] = !obj[prop];
      syncSession().persist(key, obj);
      state[key] = obj;
      setState(append({ [key]: obj }));
    };
  }

  return [state, swap];
}
