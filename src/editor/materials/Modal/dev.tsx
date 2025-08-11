import useMaterialDrop, { acceptDropTypes } from '../../hooks/useMaterialDrop';
import type { CommonComponentProps } from '../../types';

function Modal({ id, children, title, styles }: CommonComponentProps) {
  const { canDrop, dropRef } = useMaterialDrop(acceptDropTypes, id);

  return (
    <div
      ref={dropRef}
      style={styles}
      data-component-id={id}
      className={`min-h-[100px] p-[20px] ${
        canDrop ? 'border-[2px] border-[blue]' : 'border-[1px] border-stone-200'
      }`}
    >
      <h4>{title}</h4>
      <div>{children}</div>
    </div>
  );
}

export default Modal;
