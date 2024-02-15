var typeEffect = new Typed("#type", {
  strings: ["Frontend developer.", "Designer.", "Coder."],
  loop: true,
  typeSpeed: 101,
  backSpeed: 80,
  backDelay: 1500,
});
var typeEffect = new Typed("#type1", {
  strings: ["Frontend developer.", "Designer.", "Coder."],
  loop: true,
  typeSpeed: 101,
  backSpeed: 80,
  backDelay: 1500,
});

// ------------------ scroll js is here --------------------------//

/*--------------------
Vars
--------------------*/
let progress = 50;
let startX = 0;
let active = 0;
let isDown = false;

/*--------------------
Contants
--------------------*/
const speedWheel = 0.02;
const speedDrag = -0.1;

/*--------------------
Get Z
--------------------*/
const getZindex = (array, index) =>
  array.map((_, i) =>
    index === i ? array.length : array.length - Math.abs(index - i)
  );

/*--------------------
Items
--------------------*/
const $items = document.querySelectorAll(".carousel-item");
const $cursors = document.querySelectorAll(".cursor");

const displayItems = (item, index, active) => {
  const zIndex = getZindex([...$items], active)[index];
  item.style.setProperty("--zIndex", zIndex);
  item.style.setProperty("--active", (index - active) / $items.length);
};

/*--------------------
Animate
--------------------*/
const animate = () => {
  progress = Math.max(0, Math.min(progress, 100));
  active = Math.floor((progress / 100) * ($items.length - 1));

  $items.forEach((item, index) => displayItems(item, index, active));
};
animate();

/*--------------------
Click on Items
--------------------*/
$items.forEach((item, i) => {
  item.addEventListener("click", () => {
    progress = (i / $items.length) * 100 + 10;
    animate();
  });
});

/*--------------------
Handlers
--------------------*/
const handleWheel = (e) => {
  const wheelProgress = e.deltaY * speedWheel;
  progress = progress + wheelProgress;
  animate();
};

const handleMouseMove = (e) => {
  if (e.type === "mousemove") {
    $cursors.forEach(($cursor) => {
      $cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
  }
  if (!isDown) return;
  const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
  const mouseProgress = (x - startX) * speedDrag;
  progress = progress + mouseProgress;
  startX = x;
  animate();
};

const handleMouseDown = (e) => {
  isDown = true;
  startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
};

const handleMouseUp = () => {
  isDown = false;
};

/*--------------------
Listeners
--------------------*/
document.addEventListener("mousewheel", handleWheel);
document.addEventListener("mousedown", handleMouseDown);
document.addEventListener("mousemove", handleMouseMove);
document.addEventListener("mouseup", handleMouseUp);
document.addEventListener("touchstart", handleMouseDown);
document.addEventListener("touchmove", handleMouseMove);
document.addEventListener("touchend", handleMouseUp);

var page3 = document.querySelector("#page2");

// gsap.from("#page3",{
//   scrollTrigger:{
//     trigger:"#page3",
//     start:"top top",
//     scroller:"#main",
//     pin:true
//   }
// })

const about = document.querySelector(".list1");
const aboutpara = document.querySelector(".about");
const skill = document.querySelector(".list2");
const skillimage = document.querySelector(".skill");


const list1 = () => {
  aboutpara.style.opacity = 1;
  about.style.borderBottom = `3px solid red`;
  skill.style.borderBottom = "0";
  skillimage.style.opacity = 0;
};
const list2 = () => {
  about.style.borderBottom = `0px`;
  skill.style.borderBottom = "3px solid red";
  aboutpara.style.opacity = 0;
  skillimage.style.opacity = 1;
};

about.addEventListener("click", list1);
skill.addEventListener("click", list2);
// page4clickfunction();
//   const scriptURL = 'https://script.google.com/macros/s/AKfycbxM6hO_L67uYpPz9MKjL22-qgiLjYjNZCPEc0-cjcOPL8WRL1HXg0H7RL2_WfMLwLz3/exec'
//   const form = document.forms['submit-to-google-sheet']

//   form.addEventListener('submit', (e) => {
//     e.preventDefault()
//     fetch(scriptURL, { method: 'POST', body: new FormData(form)})
//       .then(response => console.log('Success!', response))
//       .catch(error => console.error('Error!', error.message))
//   })
//   window.addEventListener("load",()=>{
//     essayinput.value = localStorage.getItem('key-message')
// })

const essayinput = document.querySelector("#Message");
essayinput.addEventListener("change", () => {
  localStorage.setItem("key-message", essayinput.value);
});

let num = 0;
function MenupageClose() {
  const menupage = document.querySelector("#menu-page");
  if (num % 2 == 0) {
    menupage.style.transform = `translateY(0vh)`;
  } else {
    menupage.style.transform = `translateY(-100vh)`;
  }
  num++;
}
const hamburgerMenu = document.querySelector("#Hamburger-menu");
hamburgerMenu.addEventListener("click", MenupageClose);
