
document.addEventListener('DOMContentLoaded', function () {
    const inputField = document.getElementById('inputField');
    const connectButton = document.getElementById('connectButton');

    let protocol = 'https';
    let port = 4343;
    let base_ip_prefix = '10.232';
    let fullIp = '';  // 全局变量 fullIp

    chrome.storage.sync.get(['protocol', 'port', 'base_ip_prefix'], function (items) {
        protocol = items.protocol || protocol;
        port = items.port || port;
        base_ip_prefix = items.base_ip_prefix || base_ip_prefix;

        // 在页面加载时检查剪贴板内容
        checkClipboardContent();

        // 点击按钮时验证并打开浏览器
        connectButton.addEventListener('click', function () {
            validateAndOpenBrowser(inputField.value);
        });

        // 添加回车键事件监听
        inputField.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                validateAndOpenBrowser(inputField.value);
            }
        });

        // 添加输入框失去焦点时的验证
        inputField.addEventListener('blur', function () {
            validateInput();
        });

        // 添加输入框获得焦点时的验证
        inputField.addEventListener('focus', function () {
            inputField.classList.remove('invalid');
            inputField.placeholder = "Enter IP address or hostname";
        });

        // 自动聚焦到输入框
        inputField.focus();

        
        function validateAndOpenBrowser(ip) {
            fullIp = ip;  // 初始化 fullIp

            if (isValidIPAddress(fullIp) || isValidHostname(fullIp)) {
                openBrowser(fullIp);  // 使用更新后的 fullIp
            } else {
                // 改变输入框的边框颜色
                inputField.style.borderColor = 'red';
                inputField.classList.add('invalid');  // 添加类以改变占位符颜色
                inputField.placeholder = "输入错误重新输入";
            }
        }

        function validateInput() {
            if (!isValidIPAddress(fullIp) && !isValidHostname(fullIp)) {
                inputField.style.borderColor = 'red';
                inputField.classList.add('invalid');  // 添加类以改变占位符颜色
                inputField.placeholder = "输入错误重新输入";
            } else {
                inputField.style.borderColor = '#ccc';
                inputField.classList.remove('invalid');  // 移除类以恢复占位符颜色
                inputField.placeholder = "Enter IP address or hostname";
            }
        }

        function isValidIPAddress(ip) {
            // 定义正则表达式来匹配完整的 IPv4 地址
            const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        
            // 检查是否为完整的 IPv4 地址
            if (ipv4Regex.test(ip)) {
                return true;
            }
        
            // 定义正则表达式来匹配部分 IPv4 地址
            const partialIpv4Regex = /^(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){1}$/;
        
            // 检查是否为部分 IPv4 地址
            if (partialIpv4Regex.test(ip)) {
                // 如果是部分地址，则尝试补全
                fullIp = `${base_ip_prefix}.${ip}`; 
                return true;
            }
        
            return false;
        }

        function isValidHostname(hostname) {
            // 定义正则表达式来匹配主机名
            const regex = /^[a-zA-Z][a-zA-Z0-9-]{1,15}[a-zA-Z0-9]$/;
        
            // 使用 if 语句检查 hostname 是否匹配正则表达式
            if (regex.exec(hostname)) {
                return true;
            } else {
                return false;
            }
        }

        function openBrowser(ip) {
            chrome.tabs.create({
                url: `${protocol}://${ip}:${port}`
            });
        }
        
        // 检查剪贴板内容并自动填充到输入框
        function checkClipboardContent() {
            // 检查是否已经拥有权限
            chrome.permissions.contains({ permissions: ['clipboardRead'] }, function (result) {
                if (result) {
                    // 已经有权限，直接读取剪贴板
                    // alert('有权限');
                    navigator.clipboard.readText()
                        .then(clipboardContent => {
                            if (isValidIPAddress(clipboardContent) || isValidHostname(clipboardContent)) {
                                inputField.value = clipboardContent;
                                validateInput();  // 验证并可能更改样式
                            } else {
                                inputField.value = '';
                            }
                        })
                        .catch(err => {
                            console.error('Failed to read clipboard contents: ', err);
                            inputField.value = '';
                            alert('无法读取剪贴板内容，请确保您已授予访问权限。');
                        });
                } else {
                    // 请求权限
                    chrome.permissions.request({ permissions: ['clipboardRead'] }, function (granted) {
                        if (granted) {
                            // 用户同意，读取剪贴板
                            navigator.clipboard.readText()
                                .then(clipboardContent => {
                                    if (isValidIPAddress(clipboardContent) || isValidHostname(clipboardContent)) {
                                        inputField.value = clipboardContent;
                                        validateInput();  // 验证并可能更改样式
                                    } else {
                                        inputField.value = '';
                                    }
                                })
                                .catch(err => {
                                    console.error('Failed to read clipboard contents: ', err);
                                    inputField.value = '';
                                    alert('无法读取剪贴板内容，请确保您已授予访问权限。');
                                });
                        } else {
                            // 用户拒绝
                            inputField.value = '';
                            alert('您拒绝了剪贴板访问权限。\n\n请在扩展程序设置中手动开启权限。');
                        }
                    });
                }
            });
        }
    });
  });