type Mixins = any[];
type Relations = object;
type ExternalClasses = string[];

export interface Vue {
  $emit(name: string, detail?: any): void;
}

export type VantComponentOptions<Props, Data, Methods> = {
  data?: Data;
  props?: Props;
  field?: boolean;
  mixins?: Mixins;
  relations?: Relations;
  classes?: ExternalClasses;
  methods?: Methods & ThisType<Vue & Weapp.Component & { data: Data & Props } & Methods>;

  // lifetimes
  beforeCreate?: () => void;
  created?: () => void;
  mounted?: () => void;
  destroyed?: () => void;
}
