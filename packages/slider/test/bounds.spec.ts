import { VantComponent } from '../../common/component';
import '../index';

jest.mock('../../common/component', () => ({ VantComponent: jest.fn() }));
jest.mock('../../mixins/touch', () => ({ touch: {} }));
jest.mock('../../common/version', () => ({ canIUseModel: () => false }));
jest.mock('../../common/utils', () => ({
  ...jest.requireActual('../../common/utils'),
  nextTick: (callback: () => void) => callback(),
}));

test('clamps a rounded release after max changes during dragging', () => {
  const config = (VantComponent as jest.Mock).mock.calls[0][0];
  const emit = jest.fn();
  const state: any = {
    data: { min: 0, max: 100, step: 40 },
    value: 80,
    newValue: 80,
    dragStatus: 'moving',
    $emit: emit,
    setData(next: object) { Object.assign(this.data, next); },
  };
  Object.keys(config.methods).forEach((key) => {
    state[key] = config.methods[key].bind(state);
  });
  state.data.max = 60;
  state.onTouchEnd();
  expect(emit).toHaveBeenCalledWith('change', 60);
  expect(state.value).toBe(60);
});
