function $emit() {
  this.triggerEvent.apply(this, arguments);
}

export function create(sfc) {
  // map props to properties
  if (sfc.props) {
    sfc.properties = sfc.props;
    delete sfc.props;
  }

  // map mixins to behaviors
  if (sfc.mixins) {
    sfc.behaviors = sfc.mixins;
    delete sfc.mixins;
  }

  // map field to form-field behavior
  if (sfc.field) {
    sfc.behaviors = sfc.behaviors || [];
    sfc.behaviors.push('wx://form-field');
  }

  // add default options
  sfc.options = sfc.options || {};
  sfc.options.multipleSlots = true;
  sfc.options.addGlobalClass = true;

  // add default externalClasses
  sfc.externalClasses = sfc.classes || [];
  sfc.externalClasses.push('custom-class');

  // add default methods
  sfc.methods = sfc.methods || {};
  sfc.methods.$emit = $emit;

  Component(sfc);
};

