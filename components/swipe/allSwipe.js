import { allNewsData } from "../../data/allNewsData.js";
import { subscribeData } from "../../data/subscribeData.js";
import { allNews } from "../news/allNews/allNews.js";
import { subscribeNews } from "../news/subscribeNews/subscribeNews.js";

export const allSwipe = () => {
  // 기존의 이벤트 삭제 후 진행할 것
  const leftBtn = document.querySelector(".left-btn");
  const rightBtn = document.querySelector(".right-btn");

  const pressNews = document.querySelector(".press-news");

  leftBtn.addEventListener("click", () => handleClickLeftBtn(pressNews));
  rightBtn.addEventListener("click", () => handleClickRightBtn(pressNews));
};

const handleClickLeftBtn = ({
  dataset: { cateId: curCateId, brandId: curBrandId },
}) => {
  const fieldTabBtns = document.querySelectorAll(".field-tab-btn");

  [curCateId, curBrandId] = [curCateId, curBrandId].map(Number);

  // 스와이프 한 후의 페이지를 계산
  let [prevCateId, prevBrandId] = calcPrevId(curCateId, curBrandId);

  // 필드 버튼 active 처리
  fieldTabBtns[curCateId].classList.remove("active");
  fieldTabBtns[prevCateId].classList.add("active");

  // 뉴스 렌더링
  allNews(prevCateId, prevBrandId);
};

const handleClickRightBtn = ({
  dataset: { cateId: curCateId, brandId: curBrandId },
}) => {
  const fieldTabBtns = document.querySelectorAll(".field-tab-btn");

  [curCateId, curBrandId] = [curCateId, curBrandId].map(Number);

  // 스와이프 한 후의 페이지를 계산
  let [nextCateId, nextBrandId] = calcNextId(curCateId, curBrandId);

  // 필드 버튼 active 처리
  fieldTabBtns[curCateId].classList.remove("active");
  fieldTabBtns[nextCateId].classList.add("active");

  // 뉴스 렌더링
  allNews(nextCateId, nextBrandId);
};

// left swipe 시 다음 페이지의 cateId, brandId를 반환
const calcPrevId = (curCateId, curBrandId) => {
  // curBrandId === 0 이면 cateId 변경
  let prevCateId =
    curBrandId === 0
      ? // curCateId === 0 이면 마지막 카테고리로 넘어가야 함
        curCateId === 0
        ? allNewsData.length - 1
        : curCateId - 1
      : curCateId;

  // curBrandId === 0 이면 카테고리가 바뀌므로 prevBrandId는 그대로 0
  //  그렇지 않으면 prevBrandId - 1
  let prevBrandId = curBrandId !== 0 ? curBrandId - 1 : 0;
  return [prevCateId, prevBrandId];
};

// right swipe 시 다음 페이지의 cateId, brandId를 반환
const calcNextId = (curCateId, curBrandId) => {
  let nextCateId, nextBrandId;

  // curBrandId가 마지막 언론사인 경우 cateId + 1
  if (curBrandId === allNewsData[curCateId].data.length - 1) {
    // 이 때, 마지막 카테고리라면 첫 번째 카테고리로 이동해야 함
    nextCateId =
      curCateId === allNewsData.length - 1 ? (curCateId = 0) : curCateId + 1;
    nextBrandId = 0;
  }
  // 마지막 언론사가 아니라면 cateId는 그대로, brandId + 1
  else {
    nextCateId = curCateId;
    nextBrandId = curBrandId + 1;
  }

  return [nextCateId, nextBrandId];
};
