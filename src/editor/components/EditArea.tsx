import { createElement, useEffect, type ReactNode } from 'react';
import { useComponentsStore, type Component } from '../stores/components';
import { useComponentConfigStore } from '../stores/component-config';

export default function EditArea() {
  const { components, addComponent } = useComponentsStore();
  const { componentConfig } = useComponentConfigStore();

  useEffect(() => {
    addComponent(
      {
        id: 222,
        name: 'Container',
        props: {},
        children: []
      },
      1
    );

    addComponent(
      {
        id: 333,
        name: 'Button',
        props: {
          text: '无敌'
        },
        children: []
      },
      222
    );
  }, []);

  function renderComponents(components: Component[]): ReactNode {
    return components.map(component => {
      const config = componentConfig?.[component.name];

      if (!config?.component) {
        return null;
      }

      return createElement(
        config.component,
        {
          key: component.id,
          ...config.defaultProps,
          ...component.props
        },
        renderComponents(component.children || [])
      );
    });
  }

  return (
    <div className="h-full">
      {renderComponents(components)}
      {/* <pre>{JSON.stringify(components, null, 2)}</pre> */}
    </div>
  );
}
