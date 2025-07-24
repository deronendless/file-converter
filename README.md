# ArcGIS to GeoJSON Converter

一个现代化的 Web 应用程序，用于将 ArcGIS 格式文件转换为 GeoJSON 格式。采用 React + Vite + Ant Design 构建，提供美观的用户界面和流畅的用户体验。

## ✨ 特性

- 🎯 **简单易用** - 拖拽上传，一键转换
- 🔄 **实时转换** - 支持 ArcGIS 到 GeoJSON 格式转换
- 📱 **响应式设计** - 完美适配桌面和移动设备
- 🎨 **现代化 UI** - 参考 ChatGPT 的设计风格
- ⚡ **高性能** - 基于 Vite 构建，快速加载
- 🔧 **可扩展** - 支持后续添加更多转换格式

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 7.0.0

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173 查看应用。

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 🎯 使用说明

1. **上传文件** - 点击或拖拽 JSON 格式的 ArcGIS 文件到上传区域
2. **选择转换类型** - 目前支持 "ArcGIS to GeoJSON" 转换
3. **开始转换** - 点击 "开始转换" 按钮
4. **下载结果** - 转换完成后，点击下载按钮获取 GeoJSON 文件

## 📁 项目结构

```
file-converter/
├── src/
│   ├── components/
│   │   └── FileConverter.jsx     # 主要的文件转换组件
│   ├── services/
│   │   └── conversionService.js  # 文件转换服务
│   ├── App.jsx                   # 根组件
│   ├── App.css                   # 全局样式
│   └── main.jsx                  # 入口文件
├── public/                       # 静态资源
├── package.json                  # 项目配置
└── README.md                     # 项目文档
```

## 🔧 技术栈

- **前端框架**: React 19
- **构建工具**: Vite 7
- **UI 组件库**: Ant Design 5
- **图标库**: Ant Design Icons
- **样式**: CSS3 + Flexbox + Grid

## 🌟 支持的转换格式

| 源格式      | 目标格式 | 状态      |
| ----------- | -------- | --------- |
| ArcGIS JSON | GeoJSON  | ✅ 已支持 |
| Shapefile   | GeoJSON  | 🔄 计划中 |
| KML         | GeoJSON  | 🔄 计划中 |

## 📝 ArcGIS 数据格式说明

支持的 ArcGIS 数据格式包括：

- 多边形 (Polygon)
- 线段 (LineString)
- 点 (Point)
- 多点 (MultiPoint)

输入的 JSON 文件应包含以下结构：

```json
{
  "features": [
    {
      "attributes": { ... },
      "geometry": {
        "rings": [...] // 或 paths, x/y, points
      }
    }
  ]
}
```

## 🔄 开发计划

- [ ] 支持更多地理数据格式
- [ ] 添加批量转换功能
- [ ] 支持数据预览和验证
- [ ] 添加转换历史记录
- [ ] 支持自定义转换配置

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request 来改进项目。

## �� 许可证

MIT License
