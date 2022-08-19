import { Carousel, Empty } from "antd";
import React, { useCallback } from "react";
import { Wrapper, Image } from "../commonComponents";
import Theme from "../Theme";
import styled from "styled-components";
import useWidth from "../../hooks/useWidth";
import { useRouter } from "next/router";

const ReviewSliderWrapper = styled(Wrapper)`
  padding: 0 0 60px;
  .ant-carousel .slick-dots li.slick-active button {
    background: ${Theme.subTheme_C};
  }

  .ant-carousel .slick-dots li button {
    opacity: 1;
    background: ${Theme.lightGrey3_C};
  }

  .ant-carousel .slick-dots-bottom {
    bottom: -60px;
  }

  .ant-carousel .slick-dots li {
    width: 40px;
    height: 10px;
  }
`;

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
  max-height: 280px;

  & img {
    transition: 0.5s;
  }

  &:hover {
    & img {
      transform: scale(1.1);
    }

    & ${MoreWrapper} {
      transform: translateY(0px);
      transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
      opacity: 1;
    }
  }
`;

const ReiviewSlider = ({ datum, rModalToggle }) => {
  const width = useWidth();

  const router = useRouter();

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  return (
    <ReviewSliderWrapper display={`block`} position={`relative`}>
      {datum && datum.length === 0 ? (
        <Wrapper>
          <Empty description="후기가 없습니다." />
        </Wrapper>
      ) : (
        <Carousel
          pauseOnFocus={false}
          className="center"
          dots={width < 700 ? true : false}
          slidesToShow={width < 700 ? 2 : 4} // 한 화면에 몇개의 슬라이드가 보여지는지 결정
          autoplay={true}
          centerMode={false} // 양쪽에 겹쳐서 보이는 디자인
          fade={false} // fade or slide
          initialSlide={0} // 초기에 몇번째 슬라이드를 보여줄 것인지 결정
          variableWidth={false} // 각각 다른 크기를 지정할 수 있음
          vartical={false}
          verticalSwiping={false}
          draggable={true}
        >
          {datum.map((data) => {
            return (
              <Wrapper
                key={data.id}
                display={`flex !important`}
                dr={`row`}
                padding={`10px`}
                onClick={() => rModalToggle(data)}
              >
                <ImageBox>
                  <Image src={data.imagePath1} />
                </ImageBox>
              </Wrapper>
            );
          })}
        </Carousel>
      )}
    </ReviewSliderWrapper>
  );
};

export default React.memo(ReiviewSlider);
