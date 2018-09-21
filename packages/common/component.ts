import { basic } from '../mixins/basic';
import { observe } from '../mixins/observer/index';
import {
  VantComponentOptions,
  CombinedComponentInstance
} from '../../types/index';

function VantComponent<Props, Data, Methods>(
  sfc: VantComponentOptions<
    Props,
    Data,
    Methods,
    CombinedComponentInstance<Props, Data, Methods>
  >
): void {
  const options: any = {};

  // map props to properties
  if (sfc.props) {
    options.properties = sfc.props;
  }

  // map mixins to behaviors
  if (sfc.mixins) {
    options.behaviors = sfc.mixins;
  }

  // copy methods
  if (sfc.methods) {
    options.methods = sfc.methods;
  }

  if (sfc.beforeCreate) {
    options.created = sfc.beforeCreate;
  }

  if (sfc.created) {
    options.attached = sfc.created;
  }

  if (sfc.mounted) {
    options.ready = sfc.mounted;
  }

  if (sfc.destroyed) {
    options.detached = sfc.destroyed;
  }

  // map classes to externalClasses
  options.externalClasses = sfc.classes || [];

  // add default externalClasses
  options.externalClasses.push('custom-class');

  // add default behaviors
  options.behaviors = sfc.mixins || [];
  options.behaviors.push(basic);

  // add default options
  options.options = {
    multipleSlots: true,
    addGlobalClass: true
  };

  // map field to form-field behavior
  if (sfc.field) {
    options.behaviors.push('wx://form-field');
  }

  observe(sfc, options);
  Component(options);
}

export { VantComponent };
