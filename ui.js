document.getElementById('exportButton').addEventListener('click', () => {
    const selection = figma.currentPage.selection;
    if (selection.length === 1 && selection[0].type === 'FRAME') {
      figma.ui.postMessage({type: 'exportFrame', frameId: selection[0].id});
    } else {
      figma.ui.postMessage({type: 'error', message: 'Please select a single frame'});
    }
  });
  