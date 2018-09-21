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
  }
};
type RecordProps<T> = {
  [K in keyof T]: any
}

export type CombinedComponentInstance<Props, Data, Methods> = Vue &
  LooseObject &
  Weapp.Component & { data: Data & RecordProps<Props> } & Methods;

export type VantComponentOptions<Props, Data, Methods, Instance> = {
  data?: Data;
  props?: Props;
  field?: boolean;
  mixins?: Mixins;
  relations?: Relations<Instance>;
  classes?: ExternalClasses;
  methods?: Methods & ThisType<Instance>;

  // lifetimes
  beforeCreate?: (this: Instance) => void;
  created?: () => void;
  mounted?: () => void;
  destroyed?: () => void;
};
