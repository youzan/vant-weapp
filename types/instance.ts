import { classNames } from './class-names';

export interface ComponentInstance {
  triggerEvent: never;
  $emit(name: string, detail?: any): void;
  classNames: classNames;
}
