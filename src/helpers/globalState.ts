import { useState, useCallback } from 'react';

import constate from 'constate';

export type TInstance = {
  idInstance: number;
  apiTokenInstance: string;
};
function useGlobalState() {
  //-------INSTANCE-------
  const initialInstance = JSON.parse(localStorage.getItem('instance') || '{}');
  const [instance, setInstance] = useState(initialInstance);
  const saveInstance = (instanceData: TInstance) => {
    setInstance(instanceData);
    localStorage.setItem('instance', JSON.stringify(instanceData));
  };
  const clearInstance = () => {
    localStorage.removeItem('instance');
    setInstance({});
  };

  type TMessage = { timestamp: number; message: string; self: boolean; idMessage: number };
  //-------MESSAGES-------
  const [messages, setMessages] = useState<TMessage[]>([]);
  const addMessage = useCallback((message: TMessage) => {
    setMessages(prev => {
      if (prev.some(m => m.idMessage === message.idMessage)) return prev;
      return [...prev, message];
    });
  }, []);

  return {
    instance,
    saveInstance,
    clearInstance,
    messages,
    addMessage,
  };
}

const [StateProvider, useInstance, useMessages] = constate(
  useGlobalState,
  v => ({ instance: v.instance, saveInstance: v.saveInstance, clearInstance: v.clearInstance }),
  v => ({ messages: v.messages, addMessage: v.addMessage }),
);

export { StateProvider, useInstance, useMessages };
