const slider = document.querySelector('.slider');
let currentIndex = 0

function next() {
    const imageWidth = slider.clientWidth;
    currentIndex++;
    console.log(slider.children)

    if (currentIndex >= slider.children.length) {
        currentIndex = 0;
    }

    slider.scrollTo({
        left: imageWidth * currentIndex,
        behavior: 'smooth'
    })
}

function pre() {
    const imageWidth = slider.clientWidth;
    currentIndex--
    console.log(slider.children)

    if (currentIndex >= slider.children.length) {
        currentIndex = 0;
    } else if (currentIndex <= 0) {
        currentIndex = 0
    }
    console.log(currentIndex)

    slider.scrollTo({
        left: imageWidth * currentIndex,
        behavior: 'smooth'
    })
}
setInterval(autoScroll, 3000)

function autoScroll() {
    const imageWidth = slider.clientWidth;
    currentIndex++;
    console.log(slider.children)

    if (currentIndex >= slider.children.length) {
        currentIndex = 0;
    }

    slider.scrollTo({
        left: imageWidth * currentIndex,
        behavior: 'smooth'
    })
}