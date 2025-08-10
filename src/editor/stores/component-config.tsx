import { create } from 'zustand';
import Button from '../materials/Button';
import Container from '../materials/Container';
import Page from '../materials/Page';

// 组件属性配置
export interface ComponentSetter {
  name: string;
  label: string;
  type: string;
  [key: string]: any;
}

export interface ComponentConfig {
  name: string;
  defaultProps: Record<string, any>; // 组件自身的 props
  desc: string;
  component: React.ComponentType<any>;
  setter?: ComponentSetter[];
  stylesSetter?: ComponentSetter[];
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
      component: Container
    },
    Button: {
      name: 'Button',
      defaultProps: {
        type: 'primary',
        text: '按钮'
      },
      desc: '按钮',
      component: Button,
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
      ]
    },
    Page: {
      name: 'Page',
      defaultProps: {},
      desc: '页面',
      component: Page
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
