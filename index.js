// 316.1: Part One
const mainEl = document.querySelector("main");
const mainBG = "var(--main-bg)";

mainEl.style.backgroundColor = mainBG;
mainEl.innerHTML = "<h1>DOM Manipulation</h1>";
mainEl.classList.add("flex-ctr");

//316.1: Part Two
const topMenuEl = document.getElementById("top-menu");
topMenuEl.style.height = "100%";
topMenuEl.style.backgroundColor = "var(--top-menu-bg)";

//316.1: Part Three
// var menuLinks = [
//   { text: 'about', href: '/about' },
//   { text: 'catalog', href: '/catalog' },
//   { text: 'orders', href: '/orders' },
//   { text: 'account', href: '/account' },
// ];
// 316.3: Set up
var menuLinks = [
  { text: "about", href: "/about" },
  {
    text: "catalog",
    href: "#",
    subLinks: [
      { text: "all", href: "/catalog/all" },
      { text: "top selling", href: "/catalog/top" },
      { text: "search", href: "/catalog/search" },
    ],
  },
  {
    text: "orders",
    href: "#",
    subLinks: [
      { text: "new", href: "/orders/new" },
      { text: "pending", href: "/orders/pending" },
      { text: "history", href: "/orders/history" },
    ],
  },
  {
    text: "account",
    href: "#",
    subLinks: [
      { text: "profile", href: "/account/profile" },
      { text: "sign out", href: "/account/signout" },
    ],
  },
];

menuLinks.forEach((menuLink) => {
  let anchor = document.createElement("a");
  anchor.setAttribute("href", menuLink.href);
  anchor.textContent = menuLink.text;
  topMenuEl.appendChild(anchor);
});

// 316.3: Part 3

const subMenuEl = document.getElementById("sub-menu");
const subMenuColor = "var(--sub-menu-bg)";
subMenuEl.style.height = "100%";
subMenuEl.style.backgroundColor = subMenuColor;
subMenuEl.classList.add("flex-around");
subMenuEl.style.position = "absolute";
subMenuEl.style.top = "0";

// 316.3: Part 4
const topMenuLinks = topMenuEl.getElementsByTagName("a");

function topMenuListener(event) {
  event.preventDefault();
  if (event.target.tagName !== "A") {
    return;
  }
  for (let i = 0; i < topMenuLinks.length; i++) {
    if (topMenuLinks[i] !== event.target) {
      topMenuLinks[i].classList.remove("active");
    }
  }
  //event.target.classList.add("active");
  event.target.classList.toggle("active");
  let wasActivated = event.target.classList.contains("active");
  let subMenu = getSubMenuLinks(event.target.textContent);
  if (subMenu !== null && wasActivated) {
    //ensures only the selected main link generates the submenu
    subMenuEl.style.top = "100%";
    buildSubMenu(subMenu);
  } else {
    subMenuEl.style.top = "0";
    if(subMenu == null){ //only change the heading if submenu link or about clicked
    const mainElHeadline = mainEl.getElementsByTagName("h1")[0];
    mainElHeadline.textContent = event.target.textContent;
    }
  }
}

topMenuEl.addEventListener("click", topMenuListener);

//316.3: Part 5.1

function getSubMenuLinks(navLink) {
  for (let i = 0; i < menuLinks.length; i++) {
    if (menuLinks[i].text == navLink && menuLinks[i].subLinks !== undefined) {
      let subLinks = menuLinks[i].subLinks;
      return subLinks;
    }
  }
  return null;
}

//316.3: Part 5.2
function buildSubMenu(subLinks) {
  subMenuEl.replaceChildren();
  for (let i = 0; i < subLinks.length; i++) {
    let link = subLinks[i];
    const a = document.createElement("a");
    a.setAttribute("href", link.href);
    a.textContent = link.text;
    subMenuEl.appendChild(a);
  }
}

//316.3: Part 5.3
subMenuEl.addEventListener("click", function (event) {
  event.preventDefault();
  if (event.target.tagName !== "A") {
    return;
  }
  subMenuEl.style.top = 0;
  for (let i = 0; i < topMenuLinks.length; i++) {
    topMenuLinks[i].classList.remove("active");
  }
  const mainElHeadline = mainEl.getElementsByTagName("h1")[0];
  mainElHeadline.textContent = event.target.textContent;
});
