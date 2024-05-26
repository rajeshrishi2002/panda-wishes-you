const eyes = document.querySelectorAll(".eyes");
const eyeBalls = document.querySelectorAll(".eyeBalls");
const head = document.querySelectorAll(".head");
const ears = document.querySelectorAll(".ears");
const nose = document.querySelectorAll(".nose");
const snout = document.querySelectorAll(".snout");


let pandaClick = 0;
let giftClick = 0;
let cursorPos = { x: 500, y: 500 };

function mousemove(e) {
  cursorPos = { x: e.clientX, y: e.clientY };
  initFolow();
}

function touchmove(e) {
  cursorPos = { x: e.targetTouches[0].offsetX, y: e.targetTouches[0].offsetY };
  initFolow();
}

const followCursor = (el, xRatio, yRatio) => {
  if (el.length) {
    var n = el.length;
    var i;
    for (i = 0; i < n; i++) {
      const elOffset = el[i].getBoundingClientRect();
      const centerX = elOffset.x + elOffset.width / 2;
      const centerY = elOffset.y + elOffset.height / 2;
      const distanceLeft = Math.round(
        ((cursorPos.x - centerX) * 100) / window.innerWidth
      );
      const distanceTop = Math.round(
        ((cursorPos.y - centerY) * 100) / window.innerHeight
      );
      el[i].style.transform = `translate(${distanceLeft / xRatio}px, ${
        distanceTop / yRatio
      }px)`;
    }
  }
};

const initFolow = () => {
  if (ears) followCursor(ears, -6.0, -6.0);
  if (head) followCursor(head, 6, 6);
  if (eyes) followCursor(eyes, 1.8, 1.8);
  if (eyeBalls) followCursor(eyeBalls, 1.35, 1.35);
  if (snout) followCursor(snout, 1.5, 1.7);
  if (nose) followCursor(nose, 1, 1);
};

const addBalloons = (num) => {
  const colorVals = ["yellow", "green", "red", "pink", "coral", "blue"];
  const container = document.querySelector(".balloonsContainer");
  for (let i = 1; i <= num; i++) {
    let colorVal = parseInt(Math.random() * 6);
    let timeVal = parseInt(20 * Math.random()) + 10;
    let balloon = document.createElement("div");
    balloon.classList.add("balloon");
    balloon.classList.add(colorVals[colorVal] + "Balloon");
    balloon.style.animationDuration = timeVal + "s";
    balloon.style.left = parseInt(100 * Math.random()) + "%";
    container.appendChild(balloon);
  }
};

initFolow();

document.querySelector(".pandaContainer").addEventListener("click", () => {
  pandaClick++;
  if (pandaClick == 1) {
    document.querySelector(".hintBox").textContent = "Click 4 more times!";
  }
  if (pandaClick == 2) {
    document.querySelector(".hintBox").textContent = "Click 3 more times!";
  }
  if (pandaClick == 3) {
    document.querySelector(".hintBox").textContent =
      "Almost there! Just 2 more times.";
  }
  if (pandaClick == 4) {
    document.querySelector(".hintBox").textContent = "Click one last time!";
  }
  if (pandaClick == 5) {
    let cursorPos = { x: 250, y: 250 };
    document.querySelector(".hintBox").textContent = "He's awake!";
    document.querySelector(".giftContainer").classList.add("giftHalfSlide");
    initFolow();
    document.querySelectorAll(".lowerEyeLid").forEach((e) => {
      e.style.animationPlayState = "running";
    });
    document.querySelectorAll(".upperEyeLid").forEach((e) => {
      e.style.animationPlayState = "running";
    });
    window.addEventListener("mousemove", mousemove);
    window.addEventListener("touchmove", touchmove);
  }
});

document.querySelector(".giftContainer").addEventListener("click", () => {
  
  giftClick++;
  if (giftClick == 1) {
    document.querySelector(".giftContainer").classList.remove("giftHalfSlide");
    document.querySelector(".giftContainer").classList.add("giftSlide");
    document.querySelector(".hintBox").textContent =
      "It's a gift! Click on it to open.";
  }
  if (giftClick == 2) {
    
    document.querySelector("#GiftLid").style.opacity = 0;
    addBalloons(40);
    document.querySelector(".reloadBTN").style.display = "block";
    document.querySelector(".Note").style.display = "block";
    document.querySelector(".Note").style.opacity = "1";
    document.querySelector(".hintBox").style.display = "none";
  }
});

const removeBalloons = () => {
  let balloons = document.querySelectorAll(".balloon");
  let container = document.querySelector(".balloonsContainer");
  balloons.forEach((b, i) => {
    container.removeChild(balloons[i]);
  });
};

