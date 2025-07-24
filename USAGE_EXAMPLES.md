# 使用示例

## 基本使用流程

### 1. 准备 ArcGIS 数据文件

确保你的 JSON 文件包含以下基本结构：

```json
{
  "displayFieldName": "",
  "fieldAliases": { ... },
  "geometryType": "esriGeometryPolygon",
  "spatialReference": {
    "wkid": 4326,
    "latestWkid": 4326
  },
  "fields": [ ... ],
  "features": [
    {
      "attributes": {
        "FID": 0,
        "name": "示例地块",
        "area": 1000.5
      },
      "geometry": {
        "rings": [
          [
            [116.3974, 39.9093],
            [116.3975, 39.9094],
            [116.3976, 39.9093],
            [116.3974, 39.9093]
          ]
        ]
      }
    }
  ]
}
```

### 2. 上传和转换

1. **打开应用** - 访问 http://localhost:5173
2. **上传文件** - 拖拽或点击上传 JSON 文件
3. **选择转换类型** - 选择 "ArcGIS to GeoJSON"
4. **执行转换** - 点击 "开始转换" 按钮
5. **下载结果** - 转换完成后下载 GeoJSON 文件

### 3. 转换结果

转换后的 GeoJSON 文件格式：

```json
{
  "type": "FeatureCollection",
  "crs": {
    "type": "name",
    "properties": {
      "name": "EPSG:4326"
    }
  },
  "features": [
    {
      "type": "Feature",
      "id": 0,
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [116.3974, 39.9093],
            [116.3975, 39.9094],
            [116.3976, 39.9093],
            [116.3974, 39.9093]
          ]
        ]
      },
      "properties": {
        "FID": 0,
        "name": "示例地块",
        "area": 1000.5
      }
    }
  ]
}
```

## 支持的几何类型

### 多边形 (Polygon)

```json
{
  "geometry": {
    "rings": [
      [
        [x1, y1],
        [x2, y2],
        [x3, y3],
        [x1, y1]
      ]
    ]
  }
}
```

### 线段 (LineString)

```json
{
  "geometry": {
    "paths": [
      [
        [x1, y1],
        [x2, y2],
        [x3, y3]
      ]
    ]
  }
}
```

### 点 (Point)

```json
{
  "geometry": {
    "x": 116.3974,
    "y": 39.9093
  }
}
```

### 多点 (MultiPoint)

```json
{
  "geometry": {
    "points": [
      [x1, y1],
      [x2, y2],
      [x3, y3]
    ]
  }
}
```

## 常见问题和解决方案

### Q: 上传失败，提示"无效的 ArcGIS 数据格式"

**A:** 检查 JSON 文件是否包含 `features` 数组，每个要素是否包含 `attributes` 和 `geometry` 字段。

### Q: 转换后的坐标系是什么？

**A:** 默认输出 EPSG:4326 (WGS84) 坐标系。

### Q: 支持的最大文件大小是多少？

**A:** 目前限制为 10MB，如需处理更大文件，建议先进行数据分割。

### Q: 如何验证转换结果？

**A:** 可以使用以下工具验证 GeoJSON 文件：

- [GeoJSON.io](http://geojson.io)
- [GeoJSONLint](https://geojsonlint.com)
- QGIS 等 GIS 软件

## 高级功能

### 批量转换

目前支持单文件转换，批量转换功能正在开发中。

### 自定义属性映射

所有原始属性都会保留在转换后的 `properties` 字段中。

### 坐标系转换

当前版本假设输入数据为 WGS84 (EPSG:4326)，其他坐标系的转换功能将在未来版本中添加。

## 集成示例

### JavaScript 代码示例

```javascript
// 使用转换服务
import {
  performConversion,
  CONVERSION_TYPES,
} from "./services/conversionService";

async function convertFile(file) {
  try {
    const result = await performConversion(
      file,
      CONVERSION_TYPES.ARCGIS_TO_GEOJSON
    );
    console.log("转换成功:", result.data);
    return result.data;
  } catch (error) {
    console.error("转换失败:", error);
  }
}
```

### API 使用示例

如果需要集成到其他项目中，可以提取核心转换逻辑：

```javascript
import { convertArcGISToGeoJSON } from './services/conversionService';

// 直接转换数据对象
const arcgisData = { features: [...] };
const geoJsonData = convertArcGISToGeoJSON(arcgisData);
```
