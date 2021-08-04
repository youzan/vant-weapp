import { basic } from '../mixins/basic';
import { VantComponentOptions } from 'definitions/index';

function mapKeys(
  source: Record<string, any>,
  target: Record<string, any>,
  map: Record<string, any>
) {
  Object.keys(map).forEach((key) => {
    if (source[key]) {
      target[map[key]] = source[key];
    }
  });
}

function VantComponent<
  Data extends WechatMiniprogram.Component.DataOption,
  Props extends WechatMiniprogram.Component.PropertyOption,
  Methods extends WechatMiniprogram.Component.MethodOption
>(vantOptions: VantComponentOptions<Data, Props, Methods>): void {
  const options: WechatMiniprogram.Component.Options<Data, Props, Methods> = {};

  mapKeys(vantOptions, options, {
    data: 'data',
    props: 'properties',
    mixins: 'behaviors',
    methods: 'methods',
    beforeCreate: 'created',
    created: 'attached',
    mounted: 'ready',
    destroyed: 'detached',
    classes: 'externalClasses',
  });

  // add default externalClasses
  options.externalClasses = options.externalClasses || [];
  options.externalClasses.push('custom-class');

  // add default behaviors
  options.behaviors = options.behaviors || [];
  options.behaviors.push(basic);

  // add relations
  const { relation } = vantOptions;
  if (relation) {
    options.relations = relation.relations;
    options.behaviors.push(relation.mixin);
  }

  // map field to form-field behavior
  if (vantOptions.field) {
    options.behaviors.push('wx://form-field');
  }

  // add default options
  options.options = {
    multipleSlots: true,
    addGlobalClass: true,
  };

  Component(options);
}

export { VantComponent };
