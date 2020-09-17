const body = document.querySelector("body");

const handleBackgroundImage = () => {
  const randomNum = Math.floor(Math.random() * 3 + 1);
  body.style.background = `url("../background/${randomNum}.jpg") center/cover`;
};

window.addEventListener("load", handleBackgroundImage);
