export function useParent(name, onEffect) {
  const path = `../${name}/index`;
  return {
    relations: {
      [path]: {
        type: 'ancestor',
        linked() {
          onEffect && onEffect.call(this);
        },
        linkChanged() {
          onEffect && onEffect.call(this);
        },
        unlinked() {
          onEffect && onEffect.call(this);
        },
      },
    },
    mixin: Behavior({
      created() {
        Object.defineProperty(this, 'parent', {
          get: () => this.getRelationNodes(path)[0],
        });
        Object.defineProperty(this, 'index', {
          // @ts-ignore
          get: () => {
            var _a, _b;
            return (_b =
              (_a = this.parent) === null || _a === void 0
                ? void 0
                : _a.children) === null || _b === void 0
              ? void 0
              : _b.indexOf(this);
          },
        });
      },
    }),
  };
}
export function useChildren(name, onEffect) {
  const path = `../${name}/index`;
  return {
    relations: {
      [path]: {
        type: 'descendant',
        linked(target) {
          onEffect && onEffect.call(this, target);
        },
        linkChanged(target) {
          onEffect && onEffect.call(this, target);
        },
        unlinked(target) {
          onEffect && onEffect.call(this, target);
        },
      },
    },
    mixin: Behavior({
      created() {
        Object.defineProperty(this, 'children', {
          get: () => this.getRelationNodes(path) || [],
        });
      },
    }),
  };
}
