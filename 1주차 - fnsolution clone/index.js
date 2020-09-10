"use strict";

function init() {
  const mobileMenu = document.querySelector("div.m-menu");
  const toggleBtn = document.querySelector("#toggle-btn");
  // 햄버거 토글 버튼 가져옴 클릭 다시 클릭시 /resize 될때마다 메뉴바 사라짐 구현
  toggleBtn.addEventListener("click", toggleElements);
  window.addEventListener("resize", removeMobileMenu);

  const bg_list = [1, 2, 3];
  let bgNumber;
  const bgContainer = document.querySelector(".bg-container");
  let bgChangeInterval = setInterval(handleChangeBg, 3000);
  const renderBgNumber = document.querySelector("#bg_num");
  const bgButtonContainerRight = document.querySelector(".bg_button.right");
  const bgButtonContainerLeft = document.querySelector(".bg_button.left");
  bgButtonContainerRight.addEventListener("mouseover", setButtonBgChange);
  bgButtonContainerRight.addEventListener("mouseleave", removeButtonBgChange);
  bgButtonContainerLeft.addEventListener("mouseover", setButtonBgChange);
  bgButtonContainerLeft.addEventListener("mouseleave", removeButtonBgChange);
  const buttonBgRight = document.querySelector(
    ".bg_btn_container.right .background"
  );
  const buttonBgLeft = document.querySelector(
    ".bg_btn_container.left .background"
  );
  let setBg = setInterval(buttonBgChange, 2000);
  clearInterval(setBg);
  function setButtonBgChange() {
    setBg = setInterval(buttonBgChange, 2000);
  }

  function removeButtonBgChange() {
    clearInterval(setBg);
  }

  function buttonBgChange() {
    const buttonBgNumber = Math.floor(Math.random() * 3 + 1);
    buttonBgRight.style.backgroundImage = `url("/images/background/${buttonBgNumber}.jpg")`;
    buttonBgLeft.style.backgroundImage = `url("/images/background/${buttonBgNumber}.jpg")`;
  }

  window.addEventListener("load", handleChangeBg);
  bgContainer.addEventListener("click", stopChangeBg);
  bgButtonContainerRight.addEventListener("click", handleChangeBgButtonR);
  bgButtonContainerLeft.addEventListener("click", handleChangeBgButtonL);

  // 3초마다 background 변경되도록 설정 만약 background 위에 클릭 이벤트 발생시 clearInterval로 변경 제거

  function stopChangeBg() {
    clearInterval(bgChangeInterval);
    bgChangeInterval = setInterval(handleChangeBg, 8000);
  }
  // background 3가지 순서대로 보여줌 화면 아래 bgNumber도 같이 변경
  function handleChangeBg() {
    bgNumber = bg_list.shift();
    bgContainer.style.backgroundImage = `url("/images/background/${bgNumber}.jpg")`;
    renderBgNumber.textContent = `0${bgNumber}`;
    bg_list.push(bgNumber);
  }

  function handleChangeBgButtonR() {
    bgNumber -= 1;
    if (bgNumber === 0) {
      bgNumber = 3;
    }
    renderBgNumber.textContent = `0${bgNumber}`;
    bgContainer.style.backgroundImage = `url("/images/background/${bgNumber}.jpg")`;
  }

  function handleChangeBgButtonL() {
    bgNumber += 1;
    if (bgNumber === 4) {
      bgNumber = 1;
    }

    renderBgNumber.textContent = `0${bgNumber}`;
    bgContainer.style.backgroundImage = `url("/images/background/${bgNumber}.jpg")`;
  }

  // function handleChangeBgButton() {
  //     if (bgButtonContainer === null) {
  //         return;
  //     }
  //     const psuedoElement = bgButtonContainer.querySelector("div").firstChild
  //     const bgNumber = bg_list.shift()
  //     console.log(psuedoElement)
  //     psuedoElement.style.backgroundImage = `url("/images/background/${bgNumber}.jpg")`;
  //     bg_list.push(bgNumber);
  // }

  //resize 될때 메뉴 바 사라지도록 구현
  function removeMobileMenu() {
    mobileMenu.classList.remove("on");
  }
  // 토클 메서드 사용하여 클릭 / 재클릭시 "on" class 생성 제거
  function toggleElements() {
    mobileMenu.classList.toggle("on");
  }
}

init();
