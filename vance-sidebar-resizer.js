Hooks.once("renderSidebar", function() {
  // Setup vars
  let important = '';
  let minSize = 300;
  const sidebar = document.querySelector('#sidebar');
  const initSize = window.localStorage.getItem('vance-sidebar-size');
  let mouseStart, startSize, newSize;

  // List of known incompatibilities that need !important flag
  let compatibility = [
    {
        type: 'module',
        name: 'pathfinder-ui',
        min: 350,
        important: true,
    },
  ]
  
  // Check if any incompatibilities are active
  compatibility.forEach((i) => {
    if (i.type === 'module') {
      if (game.modules.get(i.name)?.active) {
        if (i.important) important = ' !important';
        minSize = i.min;
      }
    }
  });

  // Reset saved width if it exists
  if (Number.isInteger(+initSize)) {
    sidebar.setAttribute('style', `width: ${initSize}px${important}`);
  }

  // Create a resizer handle
  const resizer = document.createElement('div');
  resizer.style.width = '6px';
  resizer.style.height = '100%';
  resizer.style.position = 'absolute';
  resizer.style.left = 0;
  resizer.style.top = 0;
  resizer.style.cursor = 'col-resize';
  sidebar.appendChild(resizer);

  // Listen for mousedown on resizer
  resizer.addEventListener('mousedown', startResize, false);

  // React to user resizing
  function startResize(e) {
    mouseStart = e.clientX;
    startSize = sidebar.offsetWidth;
    window.addEventListener('mousemove', resize, false);
    window.addEventListener('mouseup', stopResize, false);
  }

  // Perform the resize operation
  function resize(e) {
    newSize = Math.round(startSize + mouseStart - e.clientX);
    if (newSize >= minSize) {
      sidebar.setAttribute('style', `width: ${newSize}px${important}`);
    } else {
      sidebar.setAttribute('style', `width: ${minSize}px${important}`);
    }
  }

  // On mouseup remove listeners & save final size
  function stopResize(e) {
  window.localStorage.setItem('vance-sidebar-size', sidebar.offsetWidth);
  window.removeEventListener('mousemove', resize, false);
  window.removeEventListener('mouseup', stopResize, false);
  }
});
