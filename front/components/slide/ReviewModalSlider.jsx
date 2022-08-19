import { Carousel } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Wrapper,
  Text,
  Image,
  RsWrapper,
  CommonButton,
} from "../commonComponents";
import Theme from "../Theme";
import styled from "styled-components";
import useWidth from "../../hooks/useWidth";
import { useRouter } from "next/router";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const MoreWrapper = styled(Wrapper)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  color: ${(props) => props.theme.white_C};
  font-size: 18px;
  font-weight: bold;
  font-family: "Ubuntu", sans-serif;
  text-decoration: underline;

  transform: translateY(40px);
  transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
  opacity: 0;
`;

const ImageBox = styled(Wrapper)`
  overflow: hidden;
  cursor: pointer;
  position: relative;

  & img {
    transition: 0.5s;
  }
`;

const ArrowWrapper = styled(Wrapper)`
  width: auto;
  height: auto;
  margin: ${(props) => props.margin || `-15px 0 0 -35px`};
  transition: 0.5s;
  border: 1px solid transparent;
  pointer-events: ${(props) => props.datum && `none`};

  & img {
    filter: grayscale(100%);
  }

  &:hover {
    & img {
      filter: grayscale(0%);
    }
  }
`;

const ProductSlider = ({
  datum,

  //

  dots = false,

  arrow = true,

  effect = `scrollx`, // scrollx or fade

  //

  autoplay = true,

  delay = 6000,

  //

  isMix = false, // Row 슬라이드 가로 (false) 세로 (true) 정렬

  //

  row = 1,

  line = 1, // Row 슬라이드 행 수

  //
}) => {
  const width = useWidth();

  const [slideDatum, setSlideDatum] = useState(null);

  const [isDots, setIsDots] = useState(0);

  const slideRef = useRef();

  const router = useRouter();

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const moveSlideHandler = (isNext) => {
    if (isNext) {
      for (let i = 0; i < slideDatum.length; i++) {
        if (slideRef.current) {
          slideRef.current.next();
        }
      }
    } else {
      for (let i = 0; i < slideDatum.length; i++) {
        if (slideRef.current) {
          slideRef.current.prev();
        }
      }
    }
  };

  const movePageHandler = (idx) => {
    for (let i = 0; i < slideDatum.length; i++) {
      slideRef.current.goTo(idx);
    }
  };

  useEffect(() => {
    if (datum) {
      let tempArr = [];

      let totalArr = [];

      for (let i = 0; i < datum.length; i++) {
        tempArr.push(datum[i]);

        if (tempArr.length === row * line) {
          totalArr.push(tempArr);

          tempArr = [];
        }
      }

      if (tempArr.length !== 0) {
        let index = tempArr.length;

        for (let i = 0; i < row * line - index; i++) {
          tempArr.push("");
        }

        totalArr.push(tempArr);
      }

      setSlideDatum(totalArr);
    }
  }, [datum]);

  useEffect(() => {
    if (slideDatum && arrow) {
      const beforeButton = document.querySelector(".before");

      const nextButton = document.querySelector(".next");

      beforeButton.addEventListener(`click`, () => moveSlideHandler(false));

      nextButton.addEventListener(`click`, () => moveSlideHandler(true));
    }
  }, [slideDatum, arrow, line, slideDatum]);

  if (!slideDatum) {
    return null;
  }

  return (
    <Wrapper display={`block`} position={`relative`}>
      {arrow && (
        <>
          <Wrapper
            width={`auto`}
            position={`absolute`}
            top={`50%`}
            left={`10%`}
            zIndex={`99`}
          >
            <ArrowWrapper
              datum={width < 700 ? datum.length < 2 : datum.length < 5}
              className={`before`}
              onClick={() => moveSlideHandler(false)}
            >
              <Image
                cursor={`pointer`}
                width={`100%`}
                height={`auto`}
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sunaebo/assets/images/icon/review_arrow_left.png`}
              />
            </ArrowWrapper>
          </Wrapper>

          <Wrapper
            width={`auto`}
            position={`absolute`}
            top={`50%`}
            right={`10%`}
            zIndex={`99`}
          >
            <ArrowWrapper
              width={`auto`}
              datum={width < 700 ? datum.length < 2 : datum.length < 5}
              margin={`-15px -35px 0 0`}
              className={`next`}
              onClick={() => moveSlideHandler(true)}
            >
              <Image
                cursor={`pointer`}
                width={`100%`}
                height={`auto`}
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sunaebo/assets/images/icon/review_arrow_right.png`}
              />
            </ArrowWrapper>
          </Wrapper>
        </>
      )}

      <Carousel
        pauseOnFocus={false}
        className="center"
        effect={effect}
        dots={false}
        slidesToShow={1} // 한 화면에 몇개의 슬라이드가 보여지는지 결정
        ref={slideRef}
        centerMode={false} // 양쪽에 겹쳐서 보이는 디자인
        fade={false} // fade or slide
        initialSlide={0} // 초기에 몇번째 슬라이드를 보여줄 것인지 결정
        variableWidth={false} // 각각 다른 크기를 지정할 수 있음
        vartical={false}
        verticalSwiping={false}
        afterChange={(idx) => {
          setIsDots(idx);
        }}
        draggable={true}
      >
        {slideDatum.map((slide, idx) => {
          return (
            <Wrapper display={`flex !important`} dr={`row`} key={idx}>
              <ImageBox key={idx}>
                <Image
                  width={`100%`}
                  src="https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sunaebo/assets/images/img/review_detail.png"
                />
                <MoreWrapper>MOER VIEW</MoreWrapper>
              </ImageBox>
            </Wrapper>
          );
        })}
      </Carousel>

      {dots && (
        <Wrapper
          dr={`row`}
          position={`absolute`}
          bottom={width < 700 ? `15px` : `35px`}
          className={`dots`}
          zIndex={`1000`}
        >
          {slideDatum.map((_, idx) => {
            return (
              <Wrapper
                key={idx}
                width={idx === isDots ? `28px` : `16px`}
                radius={`30px`}
                height={`16px`}
                bgColor={idx === isDots ? Theme.basicTheme_C : Theme.white_C}
                margin={`0 5px`}
                cursor={`pointer`}
                onClick={() => {
                  movePageHandler(idx);
                }}
              ></Wrapper>
            );
          })}
        </Wrapper>
      )}
    </Wrapper>
  );
};

export default React.memo(ProductSlider);
