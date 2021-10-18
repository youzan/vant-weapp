import { getRect } from '../common/utils';

function useAnimation(
  context: WechatMiniprogram.Component.TrivialInstance,
  expanded: boolean,
  mounted: boolean,
  height: number
) {
  const animation = wx.createAnimation({
    duration: 0,
    timingFunction: 'ease-in-out',
  });

  if (expanded) {
    if (height === 0) {
      animation.height('auto').top(1).step();
    } else {
      animation
        .height(height)
        .top(1)
        .step({
          duration: mounted ? 300 : 1,
        })
        .height('auto')
        .step();
    }

    context.setData({
      animation: animation.export(),
    });
    return;
  }

  animation.height(height).top(0).step({ duration: 1 }).height(0).step({
    duration: 300,
  });

  context.setData({
    animation: animation.export(),
  });
}

export function setContentAnimate(
  context: WechatMiniprogram.Component.TrivialInstance,
  expanded: boolean,
  mounted: boolean
) {
  getRect(context, '.van-collapse-item__content')
    .then((rect) => rect.height)
    .then((height: number) => {
      useAnimation(context, expanded, mounted, height);
    });
}
