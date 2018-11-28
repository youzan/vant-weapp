import { behavior } from './behavior';

export function observe(vantOptions, options) {
  options.methods = options.methods || {};
  options.methods.$options = () => vantOptions;
  options.behaviors.push(behavior);

  const { watch } = vantOptions;
  if (watch) {
    const props = options.properties || {};

    Object.keys(watch).forEach(key => {
      if (key in props) {
        props[key].observer = watch[key];
      }
    });
  }
}
