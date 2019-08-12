import { Weapp } from './weapp';

type RecordToAny<T> = { [K in keyof T]: any };
type RecordToReturn<T> = {
  [P in keyof T]: T[P] extends (...args: any[]) => any ? ReturnType<T[P]> : T[P]
};

export type CombinedComponentInstance<
  Data,
  Props,
  Methods,
  Computed
> = Methods &
  WechatMiniprogram.Component.TrivialInstance &
  Weapp.FormField &
  {
    data: Data & RecordToReturn<Computed> & RecordToAny<Props>;
  };

export interface VantComponentOptions<Data, Props, Methods, Computed, Instance> {
  data?: Data;
  field?: boolean;
  classes?: string[];
  mixins?: string[];
  props?: Props & Weapp.PropertyOption;
  watch?: Weapp.WatchOption<Instance>;
  computed?: Computed & Weapp.ComputedOption<Instance>;
  relation?: Weapp.RelationOption<Instance> & { name: string };
  relations?: {
    [componentName: string]: Weapp.RelationOption<Instance>;
  };
  methods?: Methods & Weapp.MethodOption<Instance>;

  // lifetimes
  beforeCreate?: (this: Instance) => void;
  created?: (this: Instance) => void;
  mounted?: (this: Instance) => void;
  destroyed?: (this: Instance) => void;
}
