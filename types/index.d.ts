/// <reference path="./weapp.d.ts" />
import { Vue } from './vue';

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

export type CombinedComponentInstance<Data, Props, Methods, Computed> = Vue &
  Methods &
  LooseObject &
  Weapp.Component & {
    data: Data & RecordToAny<Props> & RecordToAny<Computed>;
  };

export type VantComponentOptions<Data, Props, Methods, Computed, Instance> = {
  data?: Data;
  props?: Props;
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
