document.getElementById('get-btn').addEventListener('click', () => {
  const output = document.getElementById('output');
  output.value = 'Loading';

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'getData' }, (response) => {
      if (response?.data) {
        output.value = response.data;
        output.select();
      } else {
        output.value = 'Error: could not retrieve data.';
      }
    });
  });
});
