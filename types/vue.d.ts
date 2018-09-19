export interface Vue {
  $emit(name: string, detail?: any): void;
}
