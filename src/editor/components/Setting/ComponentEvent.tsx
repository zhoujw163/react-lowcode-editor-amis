import { Collapse, Select, type CollapseProps } from 'antd';
import { useComponentsStore } from '../../stores/components';
import { useComponentConfigStore } from '../../stores/component-config';
import GoToLink from './actions/GoToLink';
import ShowMessage from './actions/ShowMessage';

export default function ComponentEvent() {
  const { curComponentId, curComponent, updateComponentProps } = useComponentsStore();
  const { componentConfig } = useComponentConfigStore();

  if (!curComponent) return null;

  const selectAction = (eventName: string, type: string) => {
    if (!curComponentId) return;
    updateComponentProps(curComponentId!, { [eventName]: { type } });
  };

  const items: CollapseProps['items'] = (componentConfig[curComponent.name].events || []).map(
    event => {
      return {
        key: event.name,
        label: event.label,
        children: (
          <div>
            <div className="flex items-center gap-[5px]">
              <div>动作：</div>
              <Select
                className="w-[160px]"
                options={[
                  { label: '显示提示', value: 'showMessage' },
                  { label: '跳转链接', value: 'goToLink' }
                ]}
                value={curComponent?.props?.[event.name]?.type}
                onChange={value => selectAction(event.name, value)}
              />
            </div>
            {curComponent?.props?.[event.name]?.type === 'goToLink' && <GoToLink event={event} />}
            {curComponent?.props?.[event.name]?.type === 'showMessage' && (
              <ShowMessage event={event} />
            )}
          </div>
        )
      };
    }
  );

  return (
    <div className="px-[10px]">
      <Collapse className="mb-[10px]" items={items} />
    </div>
  );
}
