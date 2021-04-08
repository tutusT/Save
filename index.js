const topMenu = document.querySelector('.top-menu');

const menuLink = topMenu.querySelectorAll('.menu-link');

const content = document.querySelectorAll('.content-wrapper');

function setAttribute(elemArr) {
  elemArr.forEach((item, i) => (item.dataset['index'] = i));
}

const getCords = elemArr => {
  const cords = [...elemArr].map(item => item.getBoundingClientRect().top);
  return cords;
};

setAttribute(menuLink);
setAttribute(content);

topMenu.addEventListener('click', function (e) {
  const cords = getCords(content);
  if (e.target.classList.contains('menu-link')) {
    e.preventDefault();
    const initialScroll = pageYOffset;
    const scrollTo = 50;
    const linkIndex = e.target.dataset.index;
    function scroll() {
      let timeId = 0;
      if (pageYOffset + scrollTo > cords[linkIndex]) {
        window.scrollBy(0, cords[linkIndex] - pageYOffset + initialScroll);
        clearTimeout(timeId);
        return;
      }
      window.scrollBy(0, scrollTo);
      timeId = setTimeout(scroll, 10);
    }
    if (cords[linkIndex] > pageYOffset) {
      setTimeout(scroll, 10);
    }
  }
});
