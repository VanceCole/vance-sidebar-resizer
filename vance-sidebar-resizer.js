Hooks.on("ready", function() {
    // Setup vars
    const minSize = 300;
    const sidebar = document.querySelector('#sidebar');
    const initSize = getCookie('vance-sidebar-size');
    let mouseStart, startSize, newSize;
    
    // Reset saved width if it exists
    // Also renew the cookie so it doesn't eventually expire
    if(Number.isInteger(+initSize)) {
        sidebar.style.width = `${initSize}px`;
        setCookie('vance-sidebar-size', initSize, 365);
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
            sidebar.style.width = `${newSize}px!important`;
        } else {
            sidebar.style.width = `${minSize}px!important`;
        }
    }

    // On mouseup remove listeners & save final size
    function stopResize(e) {
        setCookie('vance-sidebar-size', sidebar.offsetWidth, 365);
        window.removeEventListener('mousemove', resize, false);
        window.removeEventListener('mouseup', stopResize, false);
    }

});

// Gets cookie value by name
function getCookie(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}
// Sets a cookie
function setCookie(name, value, days) {
    var d = new Date;
    d.setTime(d.getTime() + 24*60*60*1000*days);
    document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
}
