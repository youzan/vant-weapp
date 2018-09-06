export function create(sfc) {
  // map props to properties
  if (sfc.props) {
    sfc.properties = sfc.props;
    delete sfc.props;
  }

  // add default options
  sfc.options = sfc.options || {};
  sfc.options.multipleSlots = true;
  sfc.options.addGlobalClass = true;

  // map mixins to behaviors
  if (sfc.mixins) {
    sfc.behaviors = sfc.mixins;
    delete sfc.behaviors;
  }
  if (sfc.form) {
    sfc.behaviors = sfc.behaviors || [];
    sfc.behaviors.push('wx://form-field');
  }

  Component(sfc);
};
