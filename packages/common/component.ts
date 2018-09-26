import { basic } from '../mixins/basic';
import { observe } from '../mixins/observer/index';
import {
  VantComponentOptions,
  CombinedComponentInstance
} from '../../types/index';

function mapKeys(source: object, target: object, map: object) {
  Object.keys(map).forEach(key => {
    target[map[key]] = source[key];
  });
}

function VantComponent<Data, Props, Watch, Methods, Computed>(
  vantOptions: VantComponentOptions<
    Data,
    Props,
    Watch,
    Methods,
    Computed,
    CombinedComponentInstance<Data, Props, Watch, Methods, Computed>
  >
): void {
  const options: any = {};

  mapKeys(vantOptions, options, {
    data: 'data',
    props: 'properties',
    mixins: 'behaviors',
    methods: 'methods',
    beforeCreate: 'created',
    created: 'attached',
    mounted: 'ready',
    destroyed: 'detached',
    relations: 'relations',
    classes: 'externalClasses'
  });

  // add default externalClasses
  options.externalClasses = options.externalClasses || [];
  options.externalClasses.push('custom-class');

  // add default behaviors
  options.behaviors = options.behaviors || [];
  options.behaviors.push(basic);

  // map field to form-field behavior
  if (vantOptions.field) {
    options.behaviors.push('wx://form-field');
  }

  // add default options
  options.options = {
    multipleSlots: true,
    addGlobalClass: true
  };

  observe(vantOptions, options);
  Component(options);
}

export { VantComponent };
