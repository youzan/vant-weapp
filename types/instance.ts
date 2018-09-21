import { classNames } from './class-names';

export interface ComponentInstance {
  $emit(name: string, detail?: any): void;
  classNames: classNames;
}
