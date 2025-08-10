import { create } from 'zustand';
import Button from '../materials/Button';
import Container from '../materials/Container';
import Page from '../materials/Page';

export interface ComponentConfig {
  name: string;
  defaultProps: Record<string, any>; // 组件自身的 props
  desc: string;
  component: React.ComponentType<any>;
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
      component: Button
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
