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
type Accessors<T> = {
  [K in keyof T]: (() => T[K])
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
    data: Data & RecordToAny<Props> & Computed;
  };

export type VantComponentOptions<Data, Props, Methods, Computed, Instance> = {
  data?: Data;
  props?: Props;
  field?: boolean;
  mixins?: Mixins;
  computed?: Accessors<Computed> & ThisType<Instance>;
  relations?: Relations<Instance>;
  classes?: ExternalClasses;
  methods?: Methods & ThisType<Instance>;

  // lifetimes
  beforeCreate?: (this: Instance) => void;
  created?: () => void;
  mounted?: () => void;
  destroyed?: () => void;
};
