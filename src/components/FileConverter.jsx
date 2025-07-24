import React, { useState } from "react";
import {
  Upload,
  Button,
  Select,
  Card,
  Row,
  Col,
  Typography,
  Space,
  Alert,
  Progress,
  Divider,
  Tag,
  message,
} from "antd";
import {
  InboxOutlined,
  CloudUploadOutlined,
  FileTextOutlined,
  DownloadOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import {
  CONVERSION_TYPES,
  CONVERSION_CONFIG,
  performConversion,
  downloadConvertedFile,
} from "../services/conversionService";

const { Title, Text, Paragraph } = Typography;
const { Dragger } = Upload;
const { Option } = Select;

const FileConverter = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [conversionType, setConversionType] = useState(
    CONVERSION_TYPES.ARCGIS_TO_GEOJSON
  );
  const [isConverting, setIsConverting] = useState(false);
  const [conversionResult, setConversionResult] = useState(null);
  const [error, setError] = useState(null);

  // 文件上传配置
  const uploadProps = {
    name: "file",
    multiple: false,
    accept: ".json",
    beforeUpload: (file) => {
      // 检查文件类型
      const isJSON =
        file.type === "application/json" || file.name.endsWith(".json");
      if (!isJSON) {
        message.error("只支持 JSON 格式文件！");
        return false;
      }

      // 检查文件大小 (限制为 10MB)
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        message.error("文件大小不能超过 10MB！");
        return false;
      }

      setSelectedFile(file);
      setConversionResult(null);
      setError(null);
      message.success(`文件 ${file.name} 上传成功`);

      return false; // 阻止自动上传
    },
    onRemove: () => {
      setSelectedFile(null);
      setConversionResult(null);
      setError(null);
    },
    fileList: selectedFile ? [selectedFile] : [],
  };

  // 执行转换
  const handleConvert = async () => {
    if (!selectedFile) {
      message.warning("请先选择要转换的文件");
      return;
    }

    setIsConverting(true);
    setError(null);
    setConversionResult(null);

    try {
      const result = await performConversion(selectedFile, conversionType);
      setConversionResult(result);
      message.success("文件转换成功！");
    } catch (error) {
      setError(error.error || "转换失败");
      message.error(error.error || "转换失败");
    } finally {
      setIsConverting(false);
    }
  };

  // 下载转换后的文件
  const handleDownload = () => {
    if (!conversionResult) return;

    downloadConvertedFile(
      conversionResult.data,
      conversionResult.originalFileName,
      conversionResult.config.outputExtension
    );
    message.success("文件下载开始");
  };

  return (
    <div
      style={{
        padding: "24px",
        maxWidth: "1200px",
        margin: "0 auto",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      {/* 页面标题 */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <Title level={1} style={{ marginBottom: "8px", color: "#1f2937" }}>
          <SwapOutlined style={{ marginRight: "12px", color: "#10b981" }} />
          文件格式转换工具
        </Title>
        <Paragraph
          style={{ fontSize: "16px", color: "#6b7280", marginBottom: "0" }}
        >
          支持 ArcGIS 到 GeoJSON 的格式转换，轻松处理地理空间数据
        </Paragraph>
      </div>

      <Row gutter={[24, 24]}>
        {/* 左侧：文件上传和转换设置 */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <CloudUploadOutlined />
                文件上传与设置
              </Space>
            }
            style={{ height: "100%" }}
          >
            {/* 文件上传区域 */}
            <div style={{ marginBottom: "24px" }}>
              <Dragger {...uploadProps}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined style={{ color: "#10b981" }} />
                </p>
                <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
                <p className="ant-upload-hint">
                  支持 JSON 格式文件，文件大小限制 10MB
                </p>
              </Dragger>
            </div>

            {/* 转换类型选择 */}
            <div style={{ marginBottom: "24px" }}>
              <Text strong style={{ display: "block", marginBottom: "8px" }}>
                选择转换类型：
              </Text>
              <Select
                value={conversionType}
                onChange={setConversionType}
                style={{ width: "100%" }}
                size="large"
              >
                {Object.entries(CONVERSION_CONFIG).map(([key, config]) => (
                  <Option key={key} value={key}>
                    <Space>
                      <FileTextOutlined />
                      {config.label}
                    </Space>
                  </Option>
                ))}
              </Select>
              {conversionType && (
                <Text
                  type="secondary"
                  style={{ display: "block", marginTop: "8px" }}
                >
                  {CONVERSION_CONFIG[conversionType].description}
                </Text>
              )}
            </div>

            {/* 转换按钮 */}
            <Button
              type="primary"
              size="large"
              block
              onClick={handleConvert}
              loading={isConverting}
              disabled={!selectedFile}
              style={{
                height: "48px",
                backgroundColor: "#10b981",
                borderColor: "#10b981",
              }}
            >
              {isConverting ? "转换中..." : "开始转换"}
            </Button>

            {/* 转换进度 */}
            {isConverting && (
              <div style={{ marginTop: "16px" }}>
                <Progress percent={100} status="active" showInfo={false} />
                <Text type="secondary">正在转换文件，请稍候...</Text>
              </div>
            )}
          </Card>
        </Col>

        {/* 右侧：转换结果 */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <Space>
                <FileTextOutlined />
                转换结果
              </Space>
            }
            style={{ height: "100%" }}
          >
            {!conversionResult && !error && (
              <div
                style={{
                  textAlign: "center",
                  padding: "60px 20px",
                  color: "#9ca3af",
                }}
              >
                <FileTextOutlined
                  style={{ fontSize: "48px", marginBottom: "16px" }}
                />
                <div>转换结果将在这里显示</div>
              </div>
            )}

            {/* 错误信息 */}
            {error && (
              <Alert
                message="转换失败"
                description={error}
                type="error"
                showIcon
                style={{ marginBottom: "16px" }}
              />
            )}

            {/* 转换成功结果 */}
            {conversionResult && (
              <div>
                <Alert
                  message="转换成功"
                  description="文件已成功转换，可以下载转换后的文件"
                  type="success"
                  showIcon
                  style={{ marginBottom: "24px" }}
                />

                {/* 文件信息 */}
                <div style={{ marginBottom: "24px" }}>
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <Card size="small">
                        <div style={{ textAlign: "center" }}>
                          <Text type="secondary">原始文件</Text>
                          <div style={{ marginTop: "4px" }}>
                            <Tag color="blue">
                              {conversionResult.originalFileName}
                            </Tag>
                          </div>
                        </div>
                      </Card>
                    </Col>
                    <Col span={12}>
                      <Card size="small">
                        <div style={{ textAlign: "center" }}>
                          <Text type="secondary">要素数量</Text>
                          <div
                            style={{
                              marginTop: "4px",
                              fontSize: "18px",
                              fontWeight: "bold",
                            }}
                          >
                            {conversionResult.data.features?.length || 0}
                          </div>
                        </div>
                      </Card>
                    </Col>
                  </Row>
                </div>

                <Divider />

                {/* 下载按钮 */}
                <Button
                  type="primary"
                  size="large"
                  block
                  icon={<DownloadOutlined />}
                  onClick={handleDownload}
                  style={{
                    height: "48px",
                    backgroundColor: "#059669",
                    borderColor: "#059669",
                  }}
                >
                  下载转换后的文件
                </Button>
              </div>
            )}
          </Card>
        </Col>
      </Row>

      {/* 支持的格式说明 */}
      <Card style={{ marginTop: "24px" }} size="small">
        <Title level={4} style={{ marginBottom: "16px" }}>
          支持的转换格式
        </Title>
        <Row gutter={[16, 16]}>
          {Object.entries(CONVERSION_CONFIG).map(([key, config]) => (
            <Col xs={24} sm={12} md={8} key={key}>
              <Card size="small" style={{ textAlign: "center" }}>
                <FileTextOutlined
                  style={{
                    fontSize: "24px",
                    color: "#10b981",
                    marginBottom: "8px",
                  }}
                />
                <div style={{ fontWeight: "bold" }}>{config.label}</div>
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  {config.description}
                </Text>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </div>
  );
};

export default FileConverter;
