import { Modal as AntdModal } from 'antd';
import { useImperativeHandle, useState } from 'react';
import type { CommonComponentProps } from '../../types';

export interface ModalRef {
  open: () => void;
  close: () => void;
}

export interface ModalProps extends CommonComponentProps {
  ref: React.Ref<ModalRef>;
  children?: React.ReactNode;
}

// react 19 props 可以接收 ref
const Modal = ({ ref, title, onOk, onCancel, styles, children }: ModalProps) => {
  const [open, setOpen] = useState(false);

  useImperativeHandle(
    ref,
    () => {
      return {
        open: () => {
          setOpen(true);
        },
        close: () => {
          setOpen(false);
        }
      };
    },
    []
  );

  return (
    <AntdModal
      title={title}
      style={styles}
      open={open}
      onCancel={() => {
        if (onCancel) {
          onCancel();
        }
        setOpen(false);
      }}
      onOk={() => {
        if (onOk) {
          onOk();
        }
      }}
      destroyOnHidden
    >
      {children}
    </AntdModal>
  );
};

export default Modal;

// react 19之前由于 props 不能接收 ref，需要使用 forwardRef 来接收 ref
// const Modal: React.ForwardRefRenderFunction<ModalRef, Omit<CommonComponentProps, 'ref'>> = (
//   { children, title, onOk, onCancel, styles },
//   ref
// ) => {
//   const [open, setOpen] = useState(false);

//   useImperativeHandle(
//     ref,
//     () => {
//       return {
//         open: () => {
//           setOpen(true);
//         },
//         close: () => {
//           setOpen(false);
//         }
//       };
//     },
//     []
//   );

//   return (
//     <AntdModal
//       title={title}
//       style={styles}
//       open={open}
//       onCancel={() => {
//         if (onCancel) {
//           onCancel();
//         }
//         setOpen(false);
//       }}
//       onOk={() => {
//         if (onOk) {
//           onOk();
//         }
//       }}
//       destroyOnHidden
//     >
//       {children}
//     </AntdModal>
//   );
// };

// export default forwardRef(Modal);
