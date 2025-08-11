import { Form, Input, InputNumber, Select } from 'antd';
import { useEffect, useState, type CSSProperties } from 'react';
import { type ComponentSetter, useComponentConfigStore } from '../../stores/component-config';
import { useComponentsStore } from '../../stores/components';
import CssEditor from './CssEditor';
import { debounce } from 'lodash-es';
import styleToObject from 'style-to-object';

export default function ComponentStyle() {
  const [form] = Form.useForm();

  const { curComponentId, curComponent, updateComponentStyles } = useComponentsStore();
  const { componentConfig } = useComponentConfigStore();

  const [css, setCss] = useState(`.comp{\n\n}`);

  useEffect(() => {
    form.resetFields();

    const data = form.getFieldsValue();
    form.setFieldsValue({ ...data, ...curComponent?.styles });

    setCss(toCSSStr(curComponent?.styles || {}));
  }, [curComponent]);

  function toCSSStr(styles: CSSProperties) {
    let str = `.comp {\n`;
    for (const key in styles) {
      let value = styles[key as keyof CSSProperties];
      if (!value) {
        continue;
      }
      if (['width', 'height'].includes(key) && !value.toString().endsWith('px')) {
        value += 'px';
      }
      // css回填到 editor 时，需要将key 转换为短横线命名
      str += `\t${key.replace(/[A-Z]/, item => `-${item.toLowerCase()}`)}: ${value};\n`;
    }
    str += `}`;
    return str;
  }

  if (!curComponentId || !curComponent) return null;

  function renderFormElement(setting: ComponentSetter) {
    const { type, options } = setting;

    if (type === 'select') {
      return <Select options={options} />;
    } else if (type === 'input') {
      return <Input />;
    } else if (type === 'inputNumber') {
      return <InputNumber />;
    }
  }

  function valueChange(changeValues: CSSProperties) {
    if (curComponentId) {
      updateComponentStyles(curComponentId, changeValues);
    }
  }

  const handleEditorChange = debounce(value => {
    setCss(value);

    const css: Record<string, any> = {};

    try {
      const cssStr = value
        .replace(/\/\*.*\*\//, '') // 去掉注释 /** */
        .replace(/(\.?[^{]+{)/, '') // 去掉 .comp {
        .replace('}', ''); // 去掉 }

      styleToObject(cssStr, (name, value) => {
        // 转换驼峰命名 eg: background-color -> backgroundColor
        css[name.replace(/-\w/, item => item.toUpperCase().replace('-', ''))] = value;
      });

      updateComponentStyles(curComponentId, { ...form.getFieldsValue(), ...css }, true);
    } catch (e) {
      console.log('handleEditorChange:error', e);
    }
  }, 500);

  return (
    <Form form={form} onValuesChange={valueChange} labelCol={{ span: 8 }} wrapperCol={{ span: 14 }}>
      {componentConfig[curComponent.name]?.stylesSetter?.map(setter => (
        <Form.Item key={setter.name} name={setter.name} label={setter.label}>
          {renderFormElement(setter)}
        </Form.Item>
      ))}
      <div className="h-[200px] border-[1px] border-[#ccc]">
        <CssEditor value={css} onChange={handleEditorChange} />
      </div>
    </Form>
  );
}
