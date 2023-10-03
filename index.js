const navLinks = document.getElementsByClassName("nav-link");

// Make the nav elements active on click for larger screens
// for (let elements of navLinks) {
//   elements.addEventListener("click", (event) => {
//     for (let element of navLinks)
//       element.className = element.className.replace("active", "");
//     const classes = event.target.className;
//     event.target.className = `${classes} active`;
//   });
// }

// For starting the animation on window load
window.onload = function () {
  let elements = document.getElementsByClassName("typewrite");
  for (let i = 0; i < elements.length; i++) {
    let toRotate = elements[i].getAttribute("data-type");
    let period = elements[i].getAttribute("data-period");
    if (toRotate) new TxtType(elements[i], JSON.parse(toRotate), period);
  }
};

// Class for the animation
class TxtType {
  constructor(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = "";
    this.tick();
    this.isDeleting = false;
  }
  tick() {
    let i = this.loopNum % this.toRotate.length;
    let fullTxt = this.toRotate[i];

    if (this.isDeleting) this.txt = fullTxt.substring(0, this.txt.length - 1);
    else this.txt = fullTxt.substring(0, this.txt.length + 1);

    this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

    let that = this;
    let delta = 200 - Math.random() * 100;

    if (this.isDeleting) delta /= 2;

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(function () {
      that.tick();
    }, delta);
  }
}
