/**
 * 文件转换服务
 * 支持多种格式转换，目前实现 ArcGIS to GeoJSON
 */

// 转换类型枚举
export const CONVERSION_TYPES = {
  ARCGIS_TO_GEOJSON: "arcgis_to_geojson",
  // 预留扩展其他转换类型
  // SHAPEFILE_TO_GEOJSON: 'shapefile_to_geojson',
  // KML_TO_GEOJSON: 'kml_to_geojson',
};

// 转换类型配置
export const CONVERSION_CONFIG = {
  [CONVERSION_TYPES.ARCGIS_TO_GEOJSON]: {
    label: "ArcGIS to GeoJSON",
    description: "将 ArcGIS 格式转换为 GeoJSON 格式",
    inputExtension: ".json",
    outputExtension: ".geojson",
  },
};

/**
 * ArcGIS 到 GeoJSON 转换函数
 * @param {Object} arcgisData - ArcGIS 格式的数据
 * @returns {Object} GeoJSON 格式的数据
 */
export const convertArcGISToGeoJSON = (arcgisData) => {
  // 创建 GeoJSON 输出结构
  const geoJsonData = {
    type: "FeatureCollection",
    crs: {
      type: "name",
      properties: {
        name: "EPSG:4326",
      },
    },
    features: [],
  };

  // 检查输入数据格式
  if (
    !arcgisData ||
    !arcgisData.features ||
    !Array.isArray(arcgisData.features)
  ) {
    throw new Error("无效的 ArcGIS 数据格式");
  }

  // 转换每个要素
  arcgisData.features.forEach((feature) => {
    if (!feature.attributes || !feature.geometry) {
      console.warn("跳过无效的要素数据");
      return;
    }

    const newFeature = {
      type: "Feature",
      id:
        feature.attributes.FID || feature.attributes.OBJECTID || Math.random(),
      geometry: convertGeometry(feature.geometry),
      properties: { ...feature.attributes },
    };

    geoJsonData.features.push(newFeature);
  });

  return geoJsonData;
};

/**
 * 转换几何图形
 * @param {Object} arcgisGeometry - ArcGIS 几何对象
 * @returns {Object} GeoJSON 几何对象
 */
const convertGeometry = (arcgisGeometry) => {
  if (!arcgisGeometry) {
    return null;
  }

  // 处理多边形
  if (arcgisGeometry.rings) {
    return {
      type: "Polygon",
      coordinates: arcgisGeometry.rings,
    };
  }

  // 处理线段
  if (arcgisGeometry.paths) {
    return {
      type: "LineString",
      coordinates: arcgisGeometry.paths[0] || [],
    };
  }

  // 处理点
  if (arcgisGeometry.x !== undefined && arcgisGeometry.y !== undefined) {
    return {
      type: "Point",
      coordinates: [arcgisGeometry.x, arcgisGeometry.y],
    };
  }

  // 处理多点
  if (arcgisGeometry.points) {
    return {
      type: "MultiPoint",
      coordinates: arcgisGeometry.points,
    };
  }

  throw new Error("不支持的几何类型");
};

/**
 * 执行文件转换
 * @param {File} file - 输入文件
 * @param {string} conversionType - 转换类型
 * @returns {Promise<Object>} 转换结果
 */
export const performConversion = async (file, conversionType) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const jsonData = JSON.parse(event.target.result);

        let convertedData;
        switch (conversionType) {
          case CONVERSION_TYPES.ARCGIS_TO_GEOJSON:
            convertedData = convertArcGISToGeoJSON(jsonData);
            break;
          default:
            throw new Error("不支持的转换类型");
        }

        resolve({
          success: true,
          data: convertedData,
          originalFileName: file.name,
          config: CONVERSION_CONFIG[conversionType],
        });
      } catch (error) {
        reject({
          success: false,
          error: error.message,
          originalFileName: file.name,
        });
      }
    };

    reader.onerror = () => {
      reject({
        success: false,
        error: "文件读取失败",
        originalFileName: file.name,
      });
    };

    reader.readAsText(file);
  });
};

/**
 * 下载转换后的文件
 * @param {Object} data - 要下载的数据
 * @param {string} filename - 文件名
 * @param {string} extension - 文件扩展名
 */
export const downloadConvertedFile = (
  data,
  filename,
  extension = ".geojson"
) => {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename.replace(/\.[^/.]+$/, "") + "_converted" + extension;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // 清理对象 URL
  URL.revokeObjectURL(url);
};
