import { createElement, useState, type MouseEventHandler, type ReactNode } from 'react';
import { useComponentsStore, type Component } from '../../stores/components';
import { useComponentConfigStore } from '../../stores/component-config';
import HoverMask from '../HoverMask';

export default function EditArea() {
  const { components } = useComponentsStore();
  const { componentConfig } = useComponentConfigStore();

  const [hoverComponentId, setHoverComponentId] = useState<number>();

  const handlerMouseOver: MouseEventHandler<HTMLElement> = e => {
    // path: 从事件源一直捕获到window。[event.target, ..., body, html, window]
    // 为啥不直接 e.composedPath 而是取 e.nativeEvent.composedPath 呢？
    // 因为 react 里的 event 是合成事件，有的原生事件的属性它没有。需要通过 nativeEvent 去拿原生事件
    const path = e.nativeEvent.composedPath();

    for (let i = 0; i < path.length; i++) {
      const element = path[i];
      if (element instanceof HTMLElement && element.dataset.componentId) {
        setHoverComponentId(Number(element.dataset.componentId));
        return;
      }
    }
  };

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
          id: component.id,
          name: component.name,
          ...config.defaultProps,
          ...component.props
        },
        renderComponents(component.children || [])
      );
    });
  }

  return (
    <div
      className="h-full edit-area"
      onMouseOver={handlerMouseOver}
      onMouseLeave={() => setHoverComponentId(undefined)}
    >
      {renderComponents(components)}
      {hoverComponentId && (
        <HoverMask
          containerClassName="edit-area"
          componentId={hoverComponentId}
          portalWrapperClassName="portal-wrapper"
        />
      )}
      <div className="portal-wrapper"></div>
    </div>
  );
}
