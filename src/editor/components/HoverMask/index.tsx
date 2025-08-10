import { getComponentById, useComponentsStore } from '@/editor/stores/components';
import { useEffect, useMemo, useState, type FC } from 'react';
import { createPortal } from 'react-dom';

interface HoverMaskProps {
  containerClassName: string; // 画布区的根元素的 className
  componentId: number; //  hover 的组件 id
  portalWrapperClassName: string;
}

const HoverMask: FC<HoverMaskProps> = ({
  componentId,
  containerClassName,
  portalWrapperClassName
}) => {
  const [position, setPosition] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    labelTop: 0,
    labelLeft: 0
  });

  const { components } = useComponentsStore();

  useEffect(() => {
    updatePosition();
  }, [componentId]);

  // fix: 处理选中组件，再添加子组件时，组件高度没有变化
  useEffect(() => {
    updatePosition();
  }, [components]);

  function updatePosition() {
    if (!componentId) return;

    const container = document.querySelector(`.${containerClassName}`);
    if (!container) return;

    const node = document.querySelector(`[data-component-id="${componentId}"]`);
    if (!node) return;

    const { top, left, width, height } = node.getBoundingClientRect();
    const { top: containerTop, left: containerLeft } = container.getBoundingClientRect();

    // 组件名称表情位置
    let labelTop = top - containerTop + container.scrollTop;
    const labelLeft = left - containerLeft + width;

    // 处理下边界情况
    if (labelTop <= 0) {
      labelTop -= -20;
    }

    setPosition({
      top: top - containerTop + container.scrollTop,
      left: left - containerLeft + container.scrollTop,
      width,
      height,
      labelTop,
      labelLeft
    });
  }

  // 这里不能直接创建挂载容器
  // 多次hover，会创建多个容器，影响性能
  // 直接在父组件 EditArea 中创建容器，然后由父组件指定要挂载的容器
  const el = useMemo(() => {
    return document.querySelector(`.${portalWrapperClassName}`)!;
  }, []);

  const curComponent = useMemo(() => {
    return getComponentById(componentId, components);
  }, [componentId]);

  return createPortal(
    <>
      <div
        style={{
          position: 'absolute',
          left: position.left,
          top: position.top,
          backgroundColor: 'rgba(0, 0, 255, 0.1)',
          border: '1px dashed blue',
          pointerEvents: 'none', // 不响应鼠标事
          width: position.width,
          height: position.height,
          zIndex: 12,
          borderRadius: 4,
          boxSizing: 'border-box'
        }}
      ></div>
      <div
        style={{
          position: 'absolute',
          left: position.labelLeft,
          top: position.labelTop,
          fontSize: '14px',
          zIndex: 13,
          display: !position.width || position.width < 10 ? 'none' : 'inline',
          transform: 'translate(-100%, -100%)'
        }}
      >
        <div
          style={{
            padding: '0 8px',
            backgroundColor: 'blue',
            borderRadius: 4,
            color: '#fff',
            cursor: 'pointer',
            whiteSpace: 'nowrap'
          }}
        >
          {curComponent?.desc}
        </div>
      </div>
    </>,
    el
  );
};

export default HoverMask;
