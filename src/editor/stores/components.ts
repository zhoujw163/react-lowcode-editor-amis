import { create } from 'zustand';

export interface Component {
  id: number;
  name: string;
  props: Record<string, any>;
  children?: Component[];
  parentId?: number;
}

interface State {
  components: Component[];
}

interface Action {
  addComponent: (component: Component, parentId?: number) => void;
  deleteComponent: (componentId: number) => void;
  updateComponentProps: (componentId: number, props: Record<string, any>) => void;
}

export const useComponentsStore = create<State & Action>((set, get) => ({
  components: [
    {
      id: 1,
      name: 'Page',
      props: {},
      desc: '页面'
    }
  ],
  /**
   * 添加组件
   * @param component 组件
   * @param parentId 父组件ID
   */
  addComponent(component, parentId) {
    set(state => {
      if (parentId) {
        const parentComponent = getComponentById(parentId, state.components);

        if (parentComponent) {
          if (parentComponent.children) {
            parentComponent.children.push(component);
          } else {
            parentComponent.children = [component];
          }
        }

        component.parentId = parentId;
        return { components: [...state.components] };
      }
      return { components: [...state.components, component] };
    });
  },
  /**
   * 删除组件
   * @param componentId 组件ID
   */
  deleteComponent(componentId) {
    if (!componentId) return;

    const component = getComponentById(componentId, get().components);
    if (component?.parentId) {
      const parentComponent = getComponentById(component.parentId, get().components);

      if (parentComponent) {
        parentComponent.children = parentComponent?.children?.filter(
          item => item.id !== +componentId
        );

        set({ components: [...get().components] });
      }
    }
  },
  /**
   * 更新组件属性
   * @param componentId 组件ID
   * @param props 属性
   */
  updateComponentProps(componentId, props) {
    set(state => {
      const component = getComponentById(componentId, state.components);
      if (component) {
        component.props = { ...component.props, ...props };

        return { components: [...state.components] };
      }

      return { components: [...state.components] };
    });
  }
}));

/**
 * 根据组件ID获取组件
 * @param id 组件ID
 * @param components 组件列表
 * @returns 组件
 */
export function getComponentById(id: number | null, components: Component[]): Component | null {
  if (!id) return null;

  for (const component of components) {
    if (component.id == id) return component;
    if (component.children && component.children.length > 0) {
      const result = getComponentById(id, component.children);
      if (result !== null) return result;
    }
  }
  return null;
}
