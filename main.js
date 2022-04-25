"use strict";

// BUTTON ELEMENTS
const resetButton = document.querySelector(".resetBtn");
const customButton = document.querySelector(".customBtn");
const randomButton = document.querySelector(".randomBtn"); //

// ELEMENTS
const card = document.querySelector(".flip-card-inner");
const mapShade = document.querySelector(".flip-card-front");
const mapImg = document.querySelector(".map-img");
const dropContainer = document.querySelector(".drop");
const dropText = document.querySelector(".drop-text");
const checkboxContainer = document.querySelector(".checkboxes");
// navShades
const navImgShade = document.querySelector("#map-img-shade");
const navImgOpa = document.querySelector("#flip-card-shade");
//
// BurgerNav
const burger = document.querySelector(".hamburger");
const shade = document.querySelector("#shade");
const side_el = document.getElementById("mySidenav");
const burgerCheck = document.getElementById("checkbox1");
const barsAll = document.querySelectorAll(".hamburger1 span");
// Side Links
const sideLinks = side_el.querySelectorAll("a");
const sideClose = document.querySelector(".close-side");
//******************************//

// MAP ARRAY
const ogMapArr = [
  "arsenal",
  "docks",
  "runway",
  "ruins",
  "mines",
  "peak",
  "beachhead",
  "village",
  "lagoon",
  "airfield",
  "fields",
  "sub pen",
  "power plant",
  "capital",
  "resort"
];
////////////////////////

// Shading Function
const shading = function () {
  side_el.classList.toggle("side-width");
  shade.classList.toggle("side-shade");
  navImgOpa.classList.toggle("nav-img-opa");
  navImgShade.classList.toggle("nav-img-shade");
};

// Burger & Slide menu & shading
burger.addEventListener("click", function () {
  shading();
});
shade.addEventListener("click", function (e) {
  shading();
  if (burgerCheck.checked) {
    burgerCheck.checked = false;
  }
});
sideLinks.forEach((v) =>
  v.addEventListener("click", function () {
    shading();
    if (burgerCheck.checked) {
      burgerCheck.checked = false;
    }
  })
);
sideClose.addEventListener("click", function () {
  shading();
  if (burgerCheck.checked) {
    burgerCheck.checked = false;
  }
});
///////////////////
const submit = document.querySelector("#submitBtn");
const customNames = document.querySelectorAll('input[name = "custom-input"]');
const form = document.querySelector(".input-form");
const continueBtn = document.querySelector("#continue-btn");
const comfirmedIcon = document.querySelector(".comfirmed-icon");
const noInputMsg = document.querySelector(".no_input-text");

let cl = [];

// Pushing input Values to array
const fullMapArray = function () {
  customNames.forEach((v) => {
    if (v.value !== "") {
      cl.push(v.value); // custom input
    }
  });
};

// Form Elements
const forms = document.querySelectorAll(".input-form");
forms.forEach((e) =>
  e.addEventListener("submit", function (e) {
    e.preventDefault();
  })
);

// Submit Btn
submit.addEventListener("click", function (e) {
  e.preventDefault();
  fullMapArray();
  tickIcon();
});
//***************************//

const tickIcon = function () {
  customNames.forEach((v) => {
    if (v.value || cl.length >= 1) {
      comfirmedIcon.style.opacity = "1";
      noInputMsg.style.opacity = "0";
      console.log("works");
    } else {
      noInputMsg.style.opacity = "1";
      comfirmedIcon.style.opacity = "0";
    }
  });
  console.log("wowjdo");
  console.log(customNames);
};
let ray = [];
let plat = 0;

function customDrops() {
  const customCopy = ogMapArr.slice().reverse();
  addnRemove(customCopy);
  const noDupCl = [...new Set(cl)];
  const combined = customCopy.concat(noDupCl);
  const custRando = combined[Math.trunc(Math.random() * combined.length)];
  //
  if (noDupToggle.checked === true) {
    preGenerated(combined);
    const noDup = [...new Set(ray)];
    console.log(noDup);
    const nonDup = noDup[plat];
    console.log(noDup[plat]);
    dropText.innerHTML = `${nonDup}`;
    dropText.setAttribute("data-text", `${nonDup}`);
    plat++;
    if (plat > noDup.length) {
      dropText.innerHTML = `no more drops, please reset!`;
      dropText.setAttribute("data-text", `no more drops, please reset!`);
    }
  } else {
    console.log(custRando);
    console.log(combined);
    dropText.innerHTML = `${custRando}`;
    dropText.setAttribute("data-text", `${custRando}`);
  }
  console.log(noDupToggle.checked === true);
  ////////////////////////////////
  // sets 4 custom Max
  if (combined.length > 26) {
    maxCustomInput();
  }
  // return customCopy;
}
////////////////////

function preGenerated(comb) {
  let clone = comb.slice();
  while (clone.length) {
    let rnd = Math.floor(Math.random() * clone.length);
    ray.push(clone[rnd]);
    clone[rnd] = "";
    clone = clone.filter((a) => {
      return a;
    });
  }
}

function addnRemove(custCopy) {
  cbs.forEach((v, i, a) => {
    const inputName = v.getAttribute("name");
    const inputCheck = v.checked;
    const inputIndex = custCopy.indexOf(inputName);
    if (inputCheck === false) {
      custCopy.splice(inputIndex, 1);
    } else if (inputIndex === -1) {
      custCopy.push(inputName);
    }
  });
}

// Custom limit function (Removed for now)
// function maxCustomInput() {
//   customNames.forEach((v) => (v.disabled = true));
// }

// Random Drop Function
const randomFun = function () {
  const ranDrop = ogMapArr[Math.trunc(Math.random() * ogMapArr.length)];
  dropText.innerHTML = `${ranDrop}`;
  dropText.setAttribute("data-text", `${ranDrop}`);
};

// Random Drop
randomButton.addEventListener("click", function (e) {
  mapShade.classList.add("map-shade");
  mapImg.classList.add("map-img-opa");
  dropContainer.classList.remove("dropHide");
  //
  let checkDF = [];
  cbs.forEach((v, i, a) => checkDF.push(v));
  const defaultCheck = checkDF.every((v, i, a) => v.checked === true);
  if (cl.length >= 1 || !defaultCheck || noDupToggle.checked === true) {
    customDrops();
    console.log("CUSTOM ARRAY");
  } else {
    randomFun();
    console.log("DEFAULT ARRAY");
  }
});
const checkToggle = document.querySelector("#switch-one");
const noDupToggle = document.querySelector("#switch-two");

// ReSet Button
resetButton.addEventListener("click", function () {
  customNames.forEach((v) => (v.value = ""));
  cl.length = 0;
  checkToggle.checked = false;
  noDupToggle.checked = false;
  cbs.forEach((v) => {
    if (!v.checked) v.checked = true;
  });
  comfirmedIcon.style.opacity = "0";
  noInputMsg.style.opacity = "0";
});

///////////////////

// CARD FLIP
function flipFunction() {
  card.classList.toggle("flip");
  console.log("hello");
}
// continueButton
continueBtn.addEventListener("click", function () {
  flipFunction();
});
// custom button
customButton.addEventListener("click", function () {
  flipFunction();
});

//////////////////

// Checkbox loop
const dropsCopy = ogMapArr.slice();
dropsCopy.forEach(function (v, i) {
  const drops = v[0].toUpperCase() + v.slice(1);
  const html = `<label name='${v}' class="check-container"
  > ${drops}
  <input id = "check-input" type="checkbox" checked="checked" name = '${v}'/>
  <span class="checkmark"></span>
  </label>`;

  checkboxContainer.insertAdjacentHTML("afterbegin", html);
});

const cbs = document.querySelectorAll("#check-input"); 

function checkAll(myCheckBox) {
  cbs.forEach((c) =>
    myCheckBox.checked == true ? (c.checked = true) : (c.checked = false)
  );
}
//// MIGHT NEED THIS STILL
  // This Method is called 'Debouncing
//   let holder = false;
//   const delayAfter = 250;
//   window.addEventListener('resize', function(){
//     const screenSize = window.innerWidth;
//     clearTimeout(holder);
//     holder = setTimeout(function(){
//       if (screenSize <= 490){
//         mapImg.src = "/images & svgs/Verdansk84_Map--smaller.jpg"; 
//       } else{
//         mapImg.src = "/images & svgs/Verdansk84_Map.jpg";
//       }
//   }, delayAfter);
// })
/////////////
/////////////////////////////////////////////
