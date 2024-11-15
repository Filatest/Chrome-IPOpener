# 自动添加协议和端口的小插件

## 描述

这是一个简单的浏览器扩展插件，用于自动添加协议和端口到输入的 IP 地址或设备名。该插件支持以下功能：

- 输入 IP 地址并回车，自动添加协议和端口。
- 输入 IP 地址的后两段，自动添加默认的前两段 IP 地址。
- 输入设备名，自动添加端口和协议。

## 功能特点

- **自动添加协议**：支持自动添加 HTTP 或 HTTPS 协议，默认为`HTTPS`。
- **自动添加端口**：支持自动添加常用的端口，如 80、443 等,默认为`4343`。
- **自动补全 IP 地址**：如果只输入了 IP 地址的后两段，插件会自动补全前两段，默认前两段 IP 地址为 `10.232`。
- **自动填入IP地址**：符合IP地址格式的剪贴板内容，插件会自动填入输入框。
- **模糊输入**：自动去除多余的空格，将'。'替换为'.'。

## 使用方法

### 输入 IP 地址

- 单击插件在地址栏输入 IP 地址，按回车键即可自动添加协议和端口。
- 例如：输入 10.232.1.1，插件会自动转换为 `https://10.232.1.1:4343`。

### 输入 IP 地址后两段

- 如果只输入 IP 地址的后两段，插件会自动补全前两段，默认前两段 IP 地址为 `10.232`。
- 例如：输入 1.1，插件会自动转换为 `http://10.232.1.1:4343`。

### 自动填入IP地址

- 符合IP地址格式的剪贴板内容，插件会自动填入输入框。
- 例如：复制`10.232.1.1`或`1.1`，插件会自动填入输入框。

### 输入设备名

- 输入设备名，插件会自动添加端口和协议，默认协议为 `https`，默认端口为 `4343`。
- 例如：输入 mydevice，插件会自动转换为 `https://mydevice:4343`。

### 右键菜单

- 右键点击插件图标可以修改默认协议、自动补全的前两段 IP 地址和端口。

## 安装

1. **从 Chrome Web Store 安装**：直接访问 [Chrome Web Store](https://chromewebstore.google.com/detail/fhgdpanbfjiklmpbgobmmpghfipfndkd) 下载并安装此扩展。
2. **手动安装**：
   - 下载最新的 ZIP 文件。
   - 在 Chrome 浏览器中打开 `扩展程序` 页面（输入 `chrome://extensions/`）。
   - 启用 `开发者模式`。
   - 点击 `加载已解压的扩展程序`，选择下载的 ZIP 文件解压后的目录。


## 贡献

如果您发现任何问题或有改进的想法，请随时提交 Issue 或 Pull Request。

## 许可证

本项目采用 MIT 许可证。更多信息请参阅 [LICENSE](LICENSE) 文件。

---

如果您有任何问题或建议，请随时联系我们！

---

