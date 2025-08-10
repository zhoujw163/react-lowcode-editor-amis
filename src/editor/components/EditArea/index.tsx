import { createElement, useState, type MouseEventHandler, type ReactNode } from 'react';
import { useComponentsStore, type Component } from '../../stores/components';
import { useComponentConfigStore } from '../../stores/component-config';
import HoverMask from '../HoverMask';
import SelectedMask from '../SelectedMask';

export default function EditArea() {
  const { components, curComponentId, setCurComponentId } = useComponentsStore();
  const { componentConfig } = useComponentConfigStore();

  // 组件 hover 时，显示组件信息
  const [hoverComponentId, setHoverComponentId] = useState<number>();

  const handleMouseOver: MouseEventHandler<HTMLElement> = e => {
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

  /**
   * 组件点击事件
   * @param componentId 组件ID
   */
  const handleClick: MouseEventHandler = e => {
    const path = e.nativeEvent.composedPath();

    for (let i = 0; i < path.length; i += 1) {
      const ele = path[i] as HTMLElement;

      const componentId = ele.dataset?.componentId;

      if (componentId) {
        setCurComponentId(+componentId);
        return;
      }
    }
  };

  /**
   * 渲染组件
   * @param components 组件列表
   * @returns 组件节点
   */
  function renderComponents(components: Component[]): ReactNode {
    return components.map(component => {
      const config = componentConfig?.[component.name];

      if (!config?.devComponent) {
        return null;
      }

      return createElement(
        config.devComponent,
        {
          key: component.id,
          id: component.id,
          name: component.name,
          styles: component.styles,
          ...config.defaultProps,
          ...component.props
        },
        renderComponents(component.children || [])
      );
    });
  }

  return (
    <div
      className="h-[100%] edit-area"
      onMouseOver={handleMouseOver}
      onMouseLeave={() => setHoverComponentId(undefined)}
      onClick={handleClick}
    >
      {renderComponents(components)}
      {hoverComponentId && curComponentId !== hoverComponentId && (
        <HoverMask
          portalWrapperClassName="portal-wrapper"
          containerClassName="edit-area"
          componentId={hoverComponentId}
        />
      )}
      {curComponentId && (
        <SelectedMask
          portalWrapperClassName="portal-wrapper"
          containerClassName="edit-area"
          componentId={curComponentId}
        />
      )}
      <div className="portal-wrapper"></div>
    </div>
  );
}
