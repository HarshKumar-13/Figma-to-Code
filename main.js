figma.showUI(__html__);

figma.ui.onmessage = msg => {
  if (msg.type === 'exportFrame') {
    exportFrameToHTML(msg.frameId);
  }
};

function exportFrameToHTML(frameId) {
  const frame = figma.currentPage.findOne(node => node.id === frameId && node.type === 'FRAME');
  if (!frame) {
    figma.ui.postMessage({type: 'error', message: 'Selected node is not a frame'});
    return;
  }

  const html = `<html><head><style>${frame.getComputedStyle()}\n</style></head><body>${frame.children.map(node => node.getHtml())}</body></html>`;
  const zip = new JSZip();
  zip.file('index.html', html);
  zip.file('styles.css', frame.getComputedStyle());
  zip.generateAsync({type: 'blob'}).then(content => {
    figma.ui.postMessage({type: 'zipContent', content: content});
  });
}
