/// <reference path="./weapp.d.ts" />
import { ComponentInstance } from './instance';

type Mixins = any[];
type ExternalClasses = string[];
type LooseObject = {
  [key: string]: any;
};
type Relations<Instance> = {
  [key: string]: {
    type: string;
    linked?: (this: Instance, target?: any) => void;
    unlinked?: (this: Instance, target?: any) => void;
  };
};
type RecordToAny<T> = { [K in keyof T]: any };
type RecordToReturn<T> = {
  [P in keyof T]: T[P] extends (...args: any[]) => any ? ReturnType<T[P]> : T[P]
}

export type CombinedComponentInstance<
  Data,
  Props,
  Methods,
  Computed
> = Methods &
  LooseObject &
  Weapp.Component &
  ComponentInstance & {
    data: Data & RecordToAny<Props> & RecordToReturn<Computed>;
  };

export type VantComponentOptions<Data, Props, Methods, Computed, Instance> = {
  data?: Data;
  props?: Props & ThisType<Instance>;
  field?: boolean;
  mixins?: Mixins;
  computed?: Computed & ThisType<Instance>;
  relations?: Relations<Instance>;
  classes?: ExternalClasses;
  methods?: Methods & ThisType<Instance>;

  // lifetimes
  beforeCreate?: (this: Instance) => void;
  created?: () => void;
  mounted?: () => void;
  destroyed?: () => void;
};
