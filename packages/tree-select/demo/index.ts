import { VantComponent } from '../../common/component';

const config = {
  pro1Name: '浙江',
  pro1: [
    {
      text: '杭州',
      id: 1,
    },
    {
      text: '温州',
      id: 2,
    },
    {
      text: '宁波',
      id: 3,
      disabled: true,
    },
    {
      text: '义乌',
      id: 4,
    },
  ],
  pro2Name: '江苏',
  pro2: [
    {
      text: '南京',
      id: 5,
    },
    {
      text: '无锡',
      id: 6,
    },
    {
      text: '徐州',
      id: 7,
    },
    {
      text: '苏州',
      id: 8,
    },
  ],
  pro3Name: '福建',
  pro3: [
    {
      text: '泉州',
      id: 9,
    },
    {
      text: '厦门',
      id: 10,
    },
  ],
};
const items = [
  {
    text: config.pro1Name,
    children: config.pro1,
  },
  {
    text: config.pro2Name,
    children: config.pro2,
  },
  {
    text: config.pro3Name,
    disabled: true,
    children: config.pro3,
  },
];

VantComponent({
  data: {
    items,
    badgeItems: items.slice(0, 2).map((item, index) => {
      if (index === 0) {
        return { ...item, dot: true };
      }
      if (index === 1) {
        return { ...item, badge: 5 };
      }

      return item;
    }),
    mainActiveIndex: 0,
    activeId: 0,
    mainActiveIndexMulti: 0,
    activeIdMulti: [],
  },

  methods: {
    onClickNav({ detail }) {
      this.setData({
        mainActiveIndex: detail.index || 0,
      });
    },

    onClickItem({ detail }) {
      const activeId = this.data.activeId === detail.id ? null : detail.id;

      this.setData({ activeId });
    },

    onClickNavMulti({ detail }) {
      this.setData({
        mainActiveIndexMulti: detail.index || 0,
      });
    },

    onClickItemMulti({ detail }) {
      const { activeIdMulti }: { activeIdMulti: any } = this.data;
      const idx = activeIdMulti.indexOf(detail.id);
      if (idx > -1) {
        activeIdMulti.splice(idx, 1);
      } else {
        activeIdMulti.push(detail.id);
      }

      this.setData({ activeIdMulti });
    },
  },
});
