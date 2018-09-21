import { behavior } from './behavior';
import { observeProps } from './props';
export function observe(sfc, options) {
    if (sfc.computed) {
        options.behaviors.push(behavior);
        options.methods = options.methods || {};
        options.methods.$options = () => sfc;
        if (options.properties) {
            observeProps(options.properties);
        }
    }
}
