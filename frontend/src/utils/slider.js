const trendingSlider = () => {
  const slider = document.querySelector(".trending__list");
  let isDown = false;
  let startX;
  let scrollLeft;

  const mouseDown = (e) => {
    isDown = true;
    slider.classList.add("active");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  };

  const mouseLeave = (e) => {
    isDown = false;
    slider.classList.remove("active");
  };

  const mouseUp = (e) => {
    isDown = false;
    slider.classList.remove("active");
  };

  const mouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 3; //scroll-fast
    slider.scrollLeft = scrollLeft - walk;
  };

  slider.addEventListener("mousedown", mouseDown);
  slider.addEventListener("mouseleave", mouseLeave);
  slider.addEventListener("mouseup", mouseUp);
  slider.addEventListener("mousemove", mouseMove);
};

export default trendingSlider;
