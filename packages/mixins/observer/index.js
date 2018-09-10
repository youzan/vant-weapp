import { isObj } from '../../common/utils';

const behavior = Behavior({
  created() {
    if (!this.computed) {
      return;
    }

    const computed = this.computed();
    if (!isObj(computed)) {
      return;
    }

    const { data } = this;
    Object.keys(computed).forEach(key => {

    });
  }
});

export function observe(sfc) {
  sfc.behaviors.push(behavior);
  if (sfc.computed) {
    sfc.methods = sfc.methods || {};
    sfc.methods.computed = () => sfc.computed;
  }
}
