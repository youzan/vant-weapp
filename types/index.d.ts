import { Vue } from './vue';
import { Weapp } from './weapp';

type LooseObject = {
  [key: string]: any;
};
type Mixins = any[];
type Relations<Instance> = {
  [key: string]: {
    type: string;
    linked?: (this: Instance, target?: any) => void;
    unlinked?: (this: Instance, target?: any) => void;
  }
};
type ExternalClasses = string[];



export type CombinedComponentInstance<Props, Data, Methods> = Vue &
  LooseObject &
  Weapp.Component & { data: Data & Props } & Methods;

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
