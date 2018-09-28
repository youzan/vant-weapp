import { behavior } from './behavior';
import { observeProps } from './props';
export function observe(vantOptions, options) {
  var watch = vantOptions.watch,
      computed = vantOptions.computed;

  if (watch) {
    var props = options.properties || {};
    Object.keys(watch).forEach(function (key) {
      if (key in props) {
        var prop = props[key];

        if (prop === null || !('type' in prop)) {
          prop = {
            type: prop
          };
        }

        prop.observer = watch[key];
        props[key] = prop;
      }
    });
    options.properties = props;
  }

  if (computed) {
    options.behaviors.push(behavior);
    options.methods = options.methods || {};

    options.methods.$options = function () {
      return vantOptions;
    };

    if (options.properties) {
      observeProps(options.properties);
    }
  }
}