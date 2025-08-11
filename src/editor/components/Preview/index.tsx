import React, { useRef } from 'react';
import { useComponentConfigStore } from '../../stores/component-config';
import { type Component, useComponentsStore } from '../../stores/components';
import { message } from 'antd';
import type { ActionConfig } from '../Setting/ActionModal';

export default function Preview() {
  const { components } = useComponentsStore();
  const { componentConfig } = useComponentConfigStore();

  const componentRefs = useRef<Record<string, any>>({});

  const handleEvent = (component: Component) => {
    const props: Record<string, any> = {};
    componentConfig[component.name].events?.forEach(event => {
      const eventConfig = component.props[event.name];
      if (eventConfig) {
        props[event.name] = (...args: any[]) => {
          eventConfig?.actions?.forEach((action: ActionConfig) => {
            if (action.type === 'goToLink') {
              window.location.href = action.url;
            } else if (action.type === 'showMessage') {
              if (action.config.type === 'success') {
                message.success(action.config.text);
              } else if (action.config.type === 'error') {
                message.error(action.config.text);
              }
            } else if (action.type === 'customJS') {
              // new Function(函数参数名字，函数体)
              const func = new Function('context', 'args', action.code);
              // 传入的参数就会赋值到 context
              func(
                {
                  name: component.name,
                  props: component.props,
                  showMessage(content: string) {
                    message.success(content);
                  }
                },
                args
              );
            } else if (action.type === 'componentMethod') {
              const componentRef = componentRefs.current[action.config.componentId];
              if (componentRef) {
                componentRef[action.config.method]?.(...args);
                console.log('🚀 ~ handleEvent ~ args:', args);
              }
            }
          });
        };
      }
    });
    return props;
  };

  function renderComponents(components: Component[]): React.ReactNode {
    return components.map((component: Component) => {
      const config = componentConfig?.[component.name];

      if (!config?.prodComponent) {
        return null;
      }

      return React.createElement(
        config.prodComponent,
        {
          key: component.id,
          id: component.id,
          name: component.name,
          styles: component.styles,
          ref: (ref: Record<string, any>) => {
            componentRefs.current[component.id] = ref;
          },
          ...config.defaultProps,
          ...component.props,
          ...handleEvent(component)
        },
        renderComponents(component.children || [])
      );
    });
  }

  return <div>{renderComponents(components)}</div>;
}
