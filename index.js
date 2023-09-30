const navLinks = document.getElementsByClassName("nav-link");
const animatedText = document.getElementById("animated-text");
const cursor = document.getElementById("cursor");
const navSection = document.getElementById("nav-section");

// generate the nav-bar on window load
navBarReplacer();

// Replace the nav-bar on window resizing
window.addEventListener("resize", navBarReplacer);

// Make the nav elements active on click for larger screens
for (let elements of navLinks) {
  elements.addEventListener("click", (event) => {
    for (let element of navLinks)
      element.className = element.className.replace("active", "");
    const classes = event.target.className;
    event.target.className = `${classes} active`;
  });
}

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

// <--Functions Section-->

// Function for detecting which nav bar to display
function navBarReplacer() {
  const width = window.innerWidth;

  // For larger screens
  if (width > 1050) {
    navSection.innerHTML = `
    <div class="container">
        <div class="flex">
          <div class="logo-section">
            <img src="./assets/Logo.png" alt="logo" />
          </div>
          <div>
            <ul class="nav">
              <li class="nav-item my-tooltip">
                <span class="tooltiptext">OFFERS</span>
                <a
                  class="nav-link dropdown-toggle active"
                  data-bs-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-expanded="false"
                  >Services<img
                    src="./assets/chevron-down(1).svg"
                    alt="chevron-down"
                /></a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li>
                    <a class="dropdown-item" href="#">Something else here</a>
                  </li>
                  <li><hr class="dropdown-divider" /></li>
                  <li><a class="dropdown-item" href="#">Separated link</a></li>
                </ul>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Clients</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Company</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Career</a>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-expanded="false"
                  >Resources<img
                    src="./assets/chevron-down(1).svg"
                    alt="chevron-down"
                /></a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li>
                    <a class="dropdown-item" href="#">Something else here</a>
                  </li>
                  <li><hr class="dropdown-divider" /></li>
                  <li><a class="dropdown-item" href="#">Separated link</a></li>
                </ul>
              </li>
              <li class="nav-item" id="phone-number">
                <p>
                  <img src="./assets/call.png" alt="telephone pic" />123-456
                  7890
                </p>
              </li>
              <li class="nav-item" id="nav-btn-li">
                <button type="button" class="btn btn-primary btn-lg">
                  Hire a Pro
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    `;
  }
  // For smaller screens
  if (width < 1050) {
    navSection.innerHTML = `
    <div id="mobile-nav">
        <div>
          <img src="./assets/Logo.png" alt="logo" />
        </div>
        <div>
          <div>
            <button id="nav-btn" onclick="onClickSubmenu()">
              <i class="fa-solid fa-bars"></i>
            </button>
          </div>
        </div>
      </div>
      <div id="submenu" style="display: none;">
        <div><a class="nav-a" href="#">Services</a></div>
        <div><a class="nav-a" href="#">Clients</a></div>
        <div><a class="nav-a" href="#">Company</a></div>
        <div><a class="nav-a" href="#">Career</a></div>
        <div><a class="nav-a" href="#">Resources</a></div>
      </div>
    `;
  }
}

// For displaying submenu on click event
function onClickSubmenu() {
  const submenu = document.getElementById("submenu");
  console.log(submenu.style.display);
  if (submenu.style.display === "none") {
    console.log("yay");
    submenu.style.display = "block";
  } else if (submenu.style.display === "block") {
    submenu.style.display = "none";
  }
}
