import React from "react";
import { ConfigProvider } from "antd";
import FileConverter from "./components/FileConverter";
import "./App.css";

// ChatGPT 风格的主题配置
const theme = {
  token: {
    // 主色调 - 类似 ChatGPT 的绿色
    colorPrimary: "#10b981",
    colorSuccess: "#059669",
    colorWarning: "#f59e0b",
    colorError: "#ef4444",
    colorInfo: "#3b82f6",

    // 边框和分割线
    colorBorder: "#e5e7eb",
    colorSplit: "#f3f4f6",

    // 背景色
    colorBgContainer: "#ffffff",
    colorBgElevated: "#ffffff",
    colorBgLayout: "#f9fafb",

    // 文字颜色
    colorText: "#1f2937",
    colorTextSecondary: "#6b7280",
    colorTextTertiary: "#9ca3af",
    colorTextQuaternary: "#d1d5db",

    // 圆角
    borderRadius: 8,
    borderRadiusLG: 12,
    borderRadiusSM: 6,

    // 字体
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: 14,
    fontSizeLG: 16,
    fontSizeXL: 20,

    // 阴影
    boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    boxShadowSecondary:
      "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  },
  components: {
    Button: {
      controlHeight: 40,
      controlHeightLG: 48,
      fontWeight: 500,
      primaryShadow: "0 2px 4px rgb(16 185 129 / 0.15)",
    },
    Card: {
      headerBg: "#ffffff",
      headerHeight: 56,
      boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
    },
    Upload: {
      colorPrimary: "#10b981",
      colorPrimaryHover: "#059669",
    },
    Select: {
      controlHeight: 40,
      controlHeightLG: 48,
    },
    Input: {
      controlHeight: 40,
      controlHeightLG: 48,
    },
    Typography: {
      titleMarginBottom: "0.5em",
      titleMarginTop: "1.2em",
    },
  },
};

function App() {
  return (
    <ConfigProvider theme={theme}>
      <div className="App">
        <FileConverter />
      </div>
    </ConfigProvider>
  );
}

export default App;
