import { basic } from '../mixins/basic';
import { isBaidu, isWechat } from './platform';
const relationFunctions = {
    ancestor: {
        linked(parent) {
            this.parent = parent;
        },
        unlinked() {
            this.parent = null;
        },
    },
    descendant: {
        linked(child) {
            this.children = this.children || [];
            this.children.push(child);
        },
        unlinked(child) {
            this.children = (this.children || []).filter(it => it !== child);
        },
    },
};
function mapKeys(source, target, map) {
    Object.keys(map).forEach(key => {
        if (source[key]) {
            target[map[key]] = source[key];
        }
    });
}
function makeRelation(options, vantOptions, relation) {
    const { type, name, linked, unlinked, linkChanged } = relation;
    const { beforeCreate, destroyed } = vantOptions;
    if (type === 'descendant') {
        options.created = function () {
            beforeCreate && beforeCreate.bind(this)();
            this.children = this.children || [];
        };
        options.detached = function () {
            this.children = [];
            destroyed && destroyed.bind(this)();
        };
    }
    options.relations = Object.assign(options.relations || {}, {
        [`../${name}/index`]: {
            type,
            linked(node) {
                relationFunctions[type].linked.bind(this)(node);
                linked && linked.bind(this)(node);
            },
            linkChanged(node) {
                linkChanged && linkChanged.bind(this)(node);
            },
            unlinked(node) {
                relationFunctions[type].unlinked.bind(this)(node);
                unlinked && unlinked.bind(this)(node);
            },
        }
    });
}
function makeBaiduRelation(options, vantOptions, relation) {
    const { created, beforeCreate, destroyed } = vantOptions;
    const { type, name, current, linked, unlinked } = relation;
    if (type === 'ancestor') {
        options.attached = function () {
            created && created.bind(this)();
            this.dispatch(`${name}Linked`, {
                node: this,
            });
        };
        options.detached = function () {
            this.dispatch(`${name}Unlinked`, {
                node: this,
            });
            destroyed && destroyed.bind(this)();
        };
        options.setParent = function (parent) {
            if (parent) {
                relationFunctions.ancestor.linked.bind(this)(parent);
                linked && linked.bind(this)(parent);
            }
            else {
                relationFunctions.ancestor.unlinked.bind(this)(parent);
                unlinked && unlinked.bind(this)(parent);
            }
        };
    }
    else {
        options.messages = {
            [`${current}Linked`](e) {
                const child = e.value.node;
                relationFunctions.descendant.linked.bind(this)(child);
                child.setParent(this);
                linked && linked.bind(this)(child);
            },
            [`${current}Unlinked`](e) {
                const child = e.value.node;
                relationFunctions.descendant.unlinked.bind(this)(child);
                child.setParent(null);
                unlinked && unlinked.bind(this)(child);
            },
        };
        options.getRelationNodes = function () {
            return this.children || [];
        };
        options.created = function () {
            beforeCreate && beforeCreate.bind(this)();
            this.children = this.children || [];
        };
    }
}
function VantComponent(vantOptions = {}) {
    const options = {};
    mapKeys(vantOptions, options, {
        data: 'data',
        props: 'properties',
        mixins: 'behaviors',
        methods: 'methods',
        beforeCreate: 'created',
        created: 'attached',
        mounted: 'ready',
        relations: 'relations',
        destroyed: 'detached',
        classes: 'externalClasses'
    });
    const { relation } = vantOptions;
    if (relation) {
        isWechat && makeRelation(options, vantOptions, relation);
        isBaidu && makeBaiduRelation(options, vantOptions, relation);
    }
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
    Component(options);
}
export { VantComponent };
