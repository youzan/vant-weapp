import { VantComponent } from '../common/component';
import { button } from '../mixins/button';
import { canIUseFormFieldButton } from '../common/version';
const mixins = [button];
if (canIUseFormFieldButton()) {
  mixins.push('wx://form-field-button');
}
VantComponent({
  mixins,
  classes: ['hover-class', 'loading-class'],
  data: {
    baseStyle: '',
  },
  props: {
    formType: String,
    icon: String,
    classPrefix: {
      type: String,
      value: 'van-icon',
    },
    plain: Boolean,
    block: Boolean,
    round: Boolean,
    square: Boolean,
    loading: Boolean,
    hairline: Boolean,
    disabled: Boolean,
    loadingText: String,
    customStyle: String,
    loadingType: {
      type: String,
      value: 'circular',
    },
    type: {
      type: String,
      value: 'default',
    },
    dataset: null,
    size: {
      type: String,
      value: 'normal',
    },
    loadingSize: {
      type: String,
      value: '20px',
    },
    color: String,
  },
  methods: {
    onClick(event) {
      this.$emit('click', event);
      const { canIUseGetUserProfile, openType, getUserProfileDesc } = this.data;
      if (openType === 'getUserInfo' && canIUseGetUserProfile) {
        wx.getUserProfile({
          desc: getUserProfileDesc || '  ',
          complete: (userProfile) => {
            this.$emit('getuserinfo', userProfile);
          },
        });
      }
    },
  },
});
