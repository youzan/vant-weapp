function iframeReady(iframe, callback) {
  const doc = iframe.contentDocument || iframe.contentWindow.document;
  const interval = () => {
    if (iframe.contentWindow.switchImage) {
      callback();
    } else {
      setTimeout(() => {
        interval();
      }, 50);
    }
  };

  if (doc.readyState === 'complete') {
    interval();
  } else {
    iframe.onload = interval;
  }
}

function syncPath(path) {
  const iframe = document.querySelector('iframe');
  iframeReady(iframe, () => {
    iframe.contentWindow.switchImage(path);
  });
}

export {
  syncPath,
  iframeReady
};
