// custom function
const getId = (selector) => {
    const get = document.getElementById(selector)
    return get
}

// selector
const navbar = getId('navbar')
const navMenu = getId('navMenu')
const miniNavbar = getId('miniNavbar')

// ===== SHOW NAVBAR IN SCROLL UP =====
const navbarScroll = () => {
    let lastScrollY = window.scrollY
    window.addEventListener('scroll', () => {
        if (lastScrollY < window.scrollY) {
            // up
            navbar.style.marginTop = '-200px'
        } else if (window.scrollY <= 300) {
            // top
            navbar.style.marginTop = '-200px'
        } else {
            // down
            navbar.style.marginTop = '0px'
        }
        lastScrollY = window.scrollY;
    })
}


const toggleNavbar = () => {
    const marginTop = miniNavbar.style.marginTop;
    miniNavbar.style.marginTop = marginTop === '-1000px' ? '0px' : '-1000px';
}


// run after page finish the load
window.addEventListener('load', () => {
    navbarScroll()
})