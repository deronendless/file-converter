# 部署指南

## 本地部署

### 开发环境

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 生产环境

```bash
# 构建项目
npm run build

# 预览构建结果
npm run preview
```

## 静态部署

构建完成后，`dist` 目录包含所有静态文件，可以部署到任何静态文件服务器。

### Vercel 部署

1. 将项目推送到 GitHub
2. 在 Vercel 中导入项目
3. 设置构建命令为 `npm run build`
4. 设置输出目录为 `dist`

### Netlify 部署

1. 将项目推送到 GitHub
2. 在 Netlify 中导入项目
3. 设置构建命令为 `npm run build`
4. 设置发布目录为 `dist`

### GitHub Pages 部署

1. 修改 `vite.config.js` 添加 base 路径：
   ```js
   export default defineConfig({
     base: "/your-repo-name/",
     // ...其他配置
   });
   ```
2. 构建项目并将 `dist` 目录内容推送到 `gh-pages` 分支

### Nginx 部署

1. 构建项目
2. 将 `dist` 目录复制到 Nginx 静态文件目录
3. 配置 Nginx：

   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       root /path/to/dist;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

## 环境变量

项目支持以下环境变量（可选）：

```bash
# .env.local
VITE_APP_TITLE=ArcGIS to GeoJSON Converter
VITE_APP_VERSION=1.0.0
```

## 性能优化

- 项目已配置代码分割，将 vendor 库和 UI 组件库分离
- 支持 gzip 压缩
- 静态资源缓存优化
- 懒加载组件（如需要可进一步优化）

## 监控和分析

建议添加以下工具：

- Google Analytics 或类似的网站分析工具
- 错误监控服务（如 Sentry）
- 性能监控工具
