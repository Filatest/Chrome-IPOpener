document.addEventListener('DOMContentLoaded', function() {
  var modal = document.getElementById('myModal');

  // 显示模态框
  function showModal() {
    modal.style.display = 'block';
  }

  // 关闭模态框
  function closeModal() {
    modal.style.display = 'none';
  }

  // 加载存储的设置
  chrome.storage.sync.get(['protocol', 'base_ip_prefix', 'port'])
    .then(function(items) {
      console.log('Loaded items:', items); // 添加此行用于调试
      document.getElementById('protocol').value = items.protocol || '';
      document.getElementById('base_ip_prefix').value = items['base_ip_prefix'] || '';
      document.getElementById('port').value = items.port || '';
    })
    .catch(function(error) {
      console.error('Error loading settings:', error);
    });

  // 保存设置
  document.getElementById('save').addEventListener('click', function() {
    const protocol = document.getElementById('protocol').value;
    const baseIpPrefix = document.getElementById('base_ip_prefix').value;
    const port = document.getElementById('port').value;

    chrome.storage.sync.set({ 'protocol': protocol, 'base_ip_prefix': baseIpPrefix, 'port': port }, function() {
      console.log('配置已保存');
      // 显示保存成功的提示信息
      const successMessageElement = document.getElementById('success-message');
      successMessageElement.textContent = '配置已保存';
      successMessageElement.style.display = 'inline';

      // 清空提示信息
      setTimeout(function() {
        successMessageElement.style.display = 'none';
      }, 2000); // 2秒后清除提示信息
    });
  });

  // 暴露方法供外部调用
  window.showModal = showModal;
});