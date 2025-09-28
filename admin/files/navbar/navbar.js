function applyActiveClass() {
    console.log('run')
    const currentPath = window.location.pathname;
    const navLinks = $('#navbarContainerNavDropdown .nav-link');


    console.log(currentPath);


    if (currentPath === '/' || currentPath === '/index.html' || currentPath === '') {
        // not working the bleow part
        history.replaceState(null, '', '/');
        $('.js-mega-menu .nav-link[href="/index.html"]').addClass('active');
        return;
    }



    navLinks.each(function () {
        const link = $(this);
    
        // Get href and currentPath, remove leading slash if present
        const linkHref = link.attr('href').replace(/^\//, '');
        const normalizedPath = currentPath.replace(/^\//, '');
    
        // console.log('link', linkHref, normalizedPath);
    
        if (linkHref === normalizedPath) {
            link.addClass('active');
        } else {
            link.removeClass('active');
        }
    });
    

}


// call function on page load
applyActiveClass()