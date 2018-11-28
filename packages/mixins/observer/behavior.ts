function defineWatch(ctx, options) {
  Object.keys(options).forEach(key => {
    let handler = options[key];
    if (typeof handler === 'string') {
      handler = ctx[handler];
    }

    if (!(key in ctx.properties)) {
      defineReactive(ctx.data, key, ctx.data[key], value => {
        handler.call(ctx, value);
      });
    }
  });
}

function defineComputed(ctx, options) {
  const firstComputedObj = Object.keys(options).reduce((prev, key) => {
    ctx.data.$target = () => {
      ctx.setData({ [key]: options[key].call(ctx) });
    };
    prev[key] = options[key].call(ctx);
    ctx.data.$target = null;

    return prev;
  }, {});

  ctx.setData(firstComputedObj);
}

function defineReactive(
  obj: Weapp.Data,
  key: string,
  val: any,
  watcher?: Function
) {
  const subs = obj[`$${key}`] || [];

  const property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return;
  }

  const getter = property && property.get;
  const setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: true,
    get: function reactiveGetter() {
      const value = getter ? getter.call(obj) : val;

      if (obj.$target) {
        subs.push(obj.$target);
        obj[`$${key}`] = subs;
      }

      return value;
    },
    set: function reactiveSetter(newVal) {
      const value = getter ? getter.call(obj) : val;

      if (newVal === value || (newVal !== newVal && value !== value)) {
        return;
      }

      if (getter && !setter) return;
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }

      watcher && watcher(newVal, value);

      if (subs.length) {
        subs.forEach(sub => sub());
      }
    }
  });
}

export const behavior = Behavior({
  ready() {
    if (!this.$options) {
      return;
    }

    const { data } = this;
    const { computed, watch } = this.$options();

    if (computed || watch) {
      Object.keys(data).forEach(dataKey => {
        defineReactive(data, dataKey, data[dataKey]);
      });
    }

    if (computed) {
      defineComputed(this, computed);
    }

    if (watch) {
      defineWatch(this, watch);
    }
  }
});
