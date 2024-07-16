let projects = [
  {
    id: "fitzone",
    name: "FitZone app",
    date: "February 2024",
    skills: " HTML, CSS, JavaScript",
    img: "img/correct-signal-svgrepo-com.svg",
    p_1: "My biggest project with mockAPI database",
    p_2: "Register and take advantage of the all possibilities",
    p_3: "Change the workout plan whatever you want",
    p_4: "Full responsive design with high loading performance",
    wallpaper: "img/project1-img.jpg",
    link: "https://tommygold12.github.io/FitZone/",
  },
  {
    id: "",
    name: "Coming soon...",
    date: "",
    skills: "",
    img: "",
    p_1: "",
    p_2: "",
    p_3: "",
    p_4: "",
    wallpaper: "img/blank.jpg",
    link: "",
  },
  {
    id: "",
    name: "Coming soon...",
    date: "",
    skills: "",
    img: "",
    p_1: "",
    p_2: "",
    p_3: "",
    p_4: "",
    wallpaper: "img/blank.jpg",
    link: "",
  },
];
console.log(projects);

const itemBox = document.querySelector(".itemBox");

//* CREATE PROJECT LETTER
const allProjects = projects.forEach((e) => {
  console.log(e);
  itemBox.innerHTML += `<div class="item">
                            <div class="letterItem">
                                <div class="letterWrapper"></div>
                                <div class="letterBack"></div>
                                <div class="letterSide_1"></div>
                                <div class="letterSide_2"></div>
                                <div class="letterCover"></div>
                                <div class="letterImg">
                                    <img alt="#" src=${e.wallpaper} />
                                </div>
                                
                            </div>
                            <div class='bioItem'>
                                <h3>${e.name}</h3>
                                <div class="openBio"><button onClick="openBio(this)">More info</button></div>
                            </div>
                        </div>`;
});

//* OPEN - CLOSE ITEM OVERLAY BIO
const openBio = function (e) {
  const item = document.querySelector(".item");
  const itemTitle = e.parentElement.parentElement.querySelector("h3").innerHTML;

  itemBox.innerHTML += `<div class="overlayWindow">
                            <div class="overlayBio"> 
                                <div class="overlayClose">
                                    <button onClick = "closeBio(this)">X</button>
                                </div>
                                <div class="info"></div>
                            </div>
                       </div>`;
  projects.forEach((e) => {
    e.name === itemTitle &&
      (document.querySelector(".info").innerHTML = `<h2>${e.name}</h2>
                                                        <ul>
                                                            <li><img alt="#" src = ${e.img}>${e.p_1}</li>           
                                                            <li><img alt="#" src = ${e.img}>${e.p_2}</li>           
                                                            <li><img alt="#" src = ${e.img}>${e.p_3}</li>           
                                                            <li><img alt="#" src = ${e.img}>${e.p_4}</li>           
                                                        </ul>
                                                        <div>
                                                            <img alt="#" src=${e.wallpaper}>
                                                            <a href=${e.link} target ="_blank">Go to website</a>
                                                        </div>`);
  });
};

const createBio = function (e) {};

const closeBio = function (e) {
  document.querySelector(".overlayWindow").remove();
};

//* RESIZE DISPLAY NONE/ BLOCK
const width = function (e) {
  if (window.innerWidth <= 425) {
    category.classList.add("displayNone");
    category.classList.remove("displayBlock");
  } else {
    //category.classList.remove("displayNone");
  }
};
window.addEventListener("load", width);
window.addEventListener("resize", width);

const overlay = document.querySelector(".overlay");
//*OPEN MESSAGE OVERLAY
document.querySelectorAll(".sendMessage").forEach(function (e) {
  e.addEventListener("click", function (each) {
    overlay.classList.remove("displayNone");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

/*
window.onscroll = function (e) {
    window.scrollTo({
        top: 0
    })
}
*/

//* CLOSE MESSAGE OVERLAY
//outside click
document.querySelector(".overlay").addEventListener("click", function (e) {
  console.log(e);

  if (e.target === overlay) {
    overlay.classList.add("displayNone");
  }
});

document.onkeydown = function (e) {
  if (e.key === "Escape") {
    overlay.classList.add("displayNone");
  }
};

//button
document.querySelector(".close img").addEventListener("click", (e) => {
  overlay.classList.add("displayNone");
});

//**VAŽNO!! */
function openProject(e) {
  for (const key of projects) {
    if (e.getAttribute("data-category") === key.id) {
      window.open(key.link);
    }
  }
}

//* * * * SCROLL INTO VIEW * * * *
document.querySelectorAll(".nav_links a").forEach(function (e) {
  e.addEventListener("click", function (each) {
    each.preventDefault();
    const id = each.target.getAttribute("href");
    console.log(document.querySelector(id));
    document.querySelector(id).scrollIntoView({
      behavior: "smooth",
    });
  });
});

document
  .querySelector(".browseProjects")
  .addEventListener("click", function (e) {
    e.preventDefault();
    let section = document.querySelector("#page2");
    section.scrollIntoView({
      behavior: "smooth",
    });
  });

//*INTERSECTED NAVLINE
const header = document.querySelector(".header");
const navline = document.querySelector(".nav_bar");

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    navline.classList.add("positionFixed");
  } else {
    navline.classList.remove("positionFixed");
  }
};

const obsOption = {
  root: null,
  treshold: 0,
};

const observer = new IntersectionObserver(stickyNav, obsOption);
observer.observe(header);

//*INTERSECTED BLUR LOADING
const blurDiv = document.querySelectorAll(".pages");
const columnHeight = document
  .querySelector(".blur")
  .getBoundingClientRect().height;
const reveal = function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      console.log(entry);
      entry.target.classList.add("reveal");
    }
  });
};

const obsOption2 = {
  root: null,
  treshold: 0.8,
  rootMargin: `-${columnHeight / 2}px`,
};

const observer2 = new IntersectionObserver(reveal, obsOption2);
blurDiv.forEach((el) => observer2.observe(el));

//* VALIDATION USER DATA
let config = {
  name: {
    required: true,
    minLength: 3,
    maxLength: 20,
  },
  surename: {
    required: true,
    minLength: 3,
    maxLength: 20,
  },
  email: {
    required: true,
    email: true,
    minLength: 5,
    maxLength: 30,
  },
  message: {
    required: true,
    minLength: 5,
  },
};

let validator = new Validator(config);

//*MESSAGE NOTIFICATION
const checkEmptyObject = function (e) {
  e.preventDefault();
  validator.checkInput();

  //validateForm();
};
document
  .querySelector(".messageForm")
  .addEventListener("submit", checkEmptyObject);

const validateForm = (e) => {
  if (validator.validationPassed()) {
    alert("Message was send!");
    overlay.classList.add("displayNone");
    document.querySelectorAll(".messageForm input ").forEach(function (e) {
      e.value = "";
    });
    document.querySelector(".messageForm textarea").value = "";
  } else {
    alert("Please, fields are empty or incorect.");
  }
};
