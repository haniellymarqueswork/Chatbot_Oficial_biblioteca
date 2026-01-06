import React from 'react';
import { PlayCircleOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Space } from 'antd';
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
      > span {
        position: relative;
      }

      &::before {
        content: '';
        background: linear-gradient(135deg, #5BC0BE, #5BC0BE);
        position: absolute;
        inset: -1px;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
      }
    }
  `,
}));


const App = ({ onClick, children }) => {
  const { styles } = useStyle();

  return (
    <ConfigProvider
      button={{
        className: styles.linearGradientButton,
      }}
    >
      <Space>
        <Button
          type="primary"
          size="large"
          icon={<PlayCircleOutlined />}
          onClick={onClick} 
          style={{
            width: "230px",
            alignItems: "center",
            color: "#000000ff",
            border: "16px"
          }}
        >
          {children || "INICIAR"}
        </Button>
      </Space>
    </ConfigProvider>
  );
};

export default App;
