Hooks.on("ready", function() {
    // Setup vars
    const minSize = 300;
    const sidebar = document.querySelector('#sidebar');
    const initSize = getCookie('vance-sidebar-size');
    let mouseStart, startSize, newSize;
    
    // Reset saved width if it exists
    if(Number.isInteger(+initSize)) {
        sidebar.style.width = `${initSize}px`;
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
        newSize = startSize + mouseStart - e.clientX;
        if (newSize >= minSize) {
            sidebar.style.width = `${newSize}px`;
        } else {
            sidebar.style.width = `${minSize}px`;
        }
    }

    // On mouseup remove listeners & save final size
    function stopResize(e) {
        document.cookie = `vance-sidebar-size=${sidebar.offsetWidth}`;
        window.removeEventListener('mousemove', resize, false);
        window.removeEventListener('mouseup', stopResize, false);
    }

});

// Gets cookie value by name
function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}