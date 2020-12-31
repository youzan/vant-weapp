type TrivialInstance = WechatMiniprogram.Component.TrivialInstance;
type RelationOption = WechatMiniprogram.Component.RelationOption;

export function useParent(
  name: string,
  onEffect?: (this: TrivialInstance) => void
) {
  const path = `../${name}/index`;

  return {
    relations: {
      [path]: {
        type: 'ancestor',
        linked(this: TrivialInstance) {
          onEffect && onEffect.call(this);
        },
        linkChanged(this: TrivialInstance) {
          onEffect && onEffect.call(this);
        },
        unlinked(this: TrivialInstance) {
          onEffect && onEffect.call(this);
        },
      } as RelationOption,
    },

    mixin: Behavior({
      created() {
        Object.defineProperty(this, 'parent', {
          get: () => this.getRelationNodes(path)[0],
        });

        Object.defineProperty(this, 'index', {
          // @ts-ignore
          get: () => this.parent?.children?.indexOf(this),
        });
      },
    }),
  };
}

export function useChildren(
  name: string,
  onEffect?: (this: TrivialInstance, target: TrivialInstance) => void
) {
  const path = `../${name}/index`;

  return {
    relations: {
      [path]: {
        type: 'descendant',
        linked(this: TrivialInstance, target) {
          onEffect && onEffect.call(this, target);
        },
        linkChanged(this: TrivialInstance, target) {
          onEffect && onEffect.call(this, target);
        },
        unlinked(this: TrivialInstance, target) {
          onEffect && onEffect.call(this, target);
        },
      } as RelationOption,
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
