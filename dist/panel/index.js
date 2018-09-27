import { VantComponent } from '../common/component';
VantComponent({
  classes: ['footer-class'],
  props: {
    desc: String,
    title: String,
    status: String,
    headerClass: String,
    useFooterSlot: Boolean
  }
});