import { TimeTrackingAction } from '../models';

export const createUuidV4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    const random = (Math.random() * 16) | 0;
    const value = char === 'x' ? random : (random % 4) + 8;
    return value.toString(16);
  });
};

export const createNewTimeTrackingAction = (): TimeTrackingAction => {
  return {
    id: createUuidV4(),
    name: '',
    type: '',
  } as TimeTrackingAction;
};

export const toMap = (
  storageKeyValue: string
): Map<string, TimeTrackingAction> => {
  const item = localStorage.getItem(storageKeyValue);
  if (!item) {
    return new Map<string, TimeTrackingAction>();
  }

  const obj = JSON.parse(item);

  return new Map<string, TimeTrackingAction>(Object.entries(obj));
};

export const toJson = (value: Map<string, TimeTrackingAction>): string => {
  return JSON.stringify(Object.fromEntries(value));
};