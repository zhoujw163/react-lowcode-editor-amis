import { create } from 'zustand';
import ButtonDev from '../materials/Button/dev';
import ButtonProd from '../materials/Button/prod';
import ContainerDev from '../materials/Container/dev';
import ContainerProd from '../materials/Container/prod';
import PageDev from '../materials/Page/dev';
import PageProd from '../materials/Page/prod';
import ModalDev from '../materials/Modal/dev';
import ModalProd from '../materials/Modal/prod';

// 组件属性配置
export interface ComponentSetter {
  name: string;
  label: string;
  type: string;
  [key: string]: any;
}

// 事件配置
export interface ComponentEvent {
  name: string;
  label: string;
}

// 组件事件，实现组件间联动
export interface ComponentMethod {
  name: string;
  label: string;
}

export interface ComponentConfig {
  name: string;
  defaultProps: Record<string, any>; // 组件自身的 props
  desc: string;
  // component: React.ComponentType<any>;
  setter?: ComponentSetter[];
  stylesSetter?: ComponentSetter[];
  events?: ComponentEvent[];
  methods?: ComponentMethod[];
  devComponent: React.ComponentType<any>; // 编辑模式（画布中）
  prodComponent: React.ComponentType<any>; // 预览模式
}

interface State {
  componentConfig: Record<string, ComponentConfig>;
}

interface Action {
  registerComponent: (name: string, componentConfig: ComponentConfig) => void;
}

export const useComponentConfigStore = create<State & Action>(set => ({
  componentConfig: {
    Container: {
      name: 'Container',
      defaultProps: {},
      desc: '容器',
      devComponent: ContainerDev,
      prodComponent: ContainerProd
    },
    Button: {
      name: 'Button',
      defaultProps: {
        type: 'primary',
        text: '按钮'
      },
      desc: '按钮',
      devComponent: ButtonDev,
      prodComponent: ButtonProd,
      setter: [
        {
          name: 'type',
          label: '按钮类型',
          type: 'select',
          options: [
            { label: '主按钮', value: 'primary' },
            { label: '次按钮', value: 'default' }
          ]
        },
        {
          name: 'text',
          label: '文本',
          type: 'input'
        }
      ],
      stylesSetter: [
        {
          name: 'width',
          label: '宽度',
          type: 'inputNumber'
        },
        {
          name: 'height',
          label: '高度',
          type: 'inputNumber'
        }
      ],
      events: [
        {
          name: 'onClick',
          label: '点击事件'
        },
        {
          name: 'onDoubleClick',
          label: '双击事件'
        }
      ]
    },
    Modal: {
      name: 'Modal',
      defaultProps: {
        title: '弹窗'
      },
      setter: [
        {
          name: 'title',
          label: '标题',
          type: 'input'
        }
      ],
      stylesSetter: [],
      events: [
        {
          name: 'onOk',
          label: '确认事件'
        },
        {
          name: 'onCancel',
          label: '取消事件'
        }
      ],
      methods: [
        {
          name: 'open',
          label: '打开弹窗'
        },
        {
          name: 'close',
          label: '关闭弹窗'
        }
      ],

      desc: '弹窗',
      devComponent: ModalDev,
      prodComponent: ModalProd
    },
    Page: {
      name: 'Page',
      defaultProps: {},
      desc: '页面',
      devComponent: PageDev,
      prodComponent: PageProd
    }
  },
  registerComponent(name, componentConfig) {
    set(state => ({
      ...state,
      componentConfig: {
        ...state.componentConfig,
        [name]: componentConfig
      }
    }));
  }
}));
