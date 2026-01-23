import React from 'react';
import { PlayCircleOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Space } from 'antd';
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ prefixCls, css }) => ({
  customButton: css`
    &.${prefixCls}-btn-primary {
      background-color: #f3f3f3 !important;
      color: #033646 !important;
      border: none !important;
      transition: all 0.3s ease;
    }

    &.${prefixCls}-btn-primary:hover {
      background-color: #124ceb !important;
      color: #ffffff !important;
    }

    &.${prefixCls}-btn-primary:hover .anticon {
      color: #ffffff !important;
    }
  `,
}));



const App = ({ onClick, children }) => {
  const { styles } = useStyle();

  return (
    <ConfigProvider
  button={{
    className: styles.customButton,
  }}
>
  <Button
    type="primary"
    size="large"
    icon={<PlayCircleOutlined />}
    onClick={onClick}
    style={{ width: "170px" }}
  >
    INICIAR
  </Button>
</ConfigProvider>

  );
};

export default App;
