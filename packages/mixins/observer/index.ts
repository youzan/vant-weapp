import { behavior } from './behavior';
import { observeProps } from './props';

export function observe(vantOptions, options) {
  const { watch, computed } = vantOptions;

  if (watch) {
    options.properties = options.properties || {};
    Object.keys(watch).forEach(key => {
      if (key in options.properties) {
        let prop = options.properties[key];
        if (prop === null || !prop.type) {
          prop = { type: prop };
        }
        prop.observer = watch[key];
      }
    });
  }

  if (computed) {
    options.behaviors.push(behavior);
    options.methods = options.methods || {};
    options.methods.$options = () => vantOptions;

    if (options.properties) {
      observeProps(options.properties);
    }
  }
}
