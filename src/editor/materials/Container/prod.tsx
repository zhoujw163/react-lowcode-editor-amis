import type { CommonComponentProps } from '../../types';

const Container = ({ children, styles }: CommonComponentProps) => {
  return (
    <div className="p-[20px]" style={styles}>
      {children}
    </div>
  );
};

export default Container;
