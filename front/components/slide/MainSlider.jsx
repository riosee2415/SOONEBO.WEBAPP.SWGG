import React, { useEffect, useCallback } from "react";
import {
  ColWrapper,
  RowWrapper,
  Wrapper,
  StyleBtn,
  RsWrapper2,
  Text,
  Image,
  ATag,
} from "../commonComponents";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { MAIN_BANNER_REQUEST } from "../../reducers/banner";
import Theme from "../Theme";
import { Carousel } from "antd";
import useWidth from "../../hooks/useWidth";
import { useRouter } from "next/router";
import { scaleAni, translateX } from "../animationCommon";

const MainSliderWrapper = styled(RowWrapper)`
  & .ant-carousel {
    width: 100%;
  }

  .ant-carousel .slick-dots li.slick-active button {
    background: ${Theme.basicTheme_C};
  }

  .ant-carousel .slick-dots li button {
    opacity: 1;
  }

  .ant-carousel .slick-dots li {
    width: 40px;
    height: 10px;
  }

  .ant-carousel .slick-slide.slick-active img {
    animation: ${scaleAni} 6s cubic-bezier(0.19, 1, 0.22, 1);
  }

  .ant-carousel .slick-slide.slick-active ${RsWrapper2} {
    animation: ${translateX} 6s cubic-bezier(0.19, 1, 0.22, 1);
  }
`;

const MainSlider = () => {
  const width = useWidth();

  const dispatch = useDispatch();
  const { banners } = useSelector((state) => state.banner);
  const { me } = useSelector((state) => state.user);

  const router = useRouter();

  useEffect(() => {
    dispatch({
      type: MAIN_BANNER_REQUEST,
    });
  }, [me]);

  const moveLinkHandler = useCallback((link) => {
    window.open(link);
  }, []);
  return (
    <MainSliderWrapper>
      <Carousel autoplay={true} speed={3000} autoplaySpeed={3500} effect="fade">
        {banners &&
          banners.map((data, idx) => {
            return (
              <Wrapper
                key={idx}
                height={width < 800 ? `480px` : `700px`}
                margin={width < 800 ? `69px 0 0` : `119px 0 0`}
                position={`relative`}
                display={`flex !important`}
                overflow={`hidden`}
              >
                <Image
                  alt="banner"
                  src={width < 800 ? data.mobileImagePath : data.imagePath}
                  height={`100%`}
                  position={`absolute`}
                  top={`0`}
                  left={`0`}
                />
                <RsWrapper2
                  height={`100%`}
                  al={width < 800 ? `center` : `flex-start`}
                >
                  <Wrapper
                    al={width < 800 ? `center` : `flex-start`}
                    fontSize={width < 700 ? `16px` : `20px`}
                    lineHeight={`1.3`}
                    fontWeight={`bold`}
                    color={Theme.basicTheme_C}
                  >
                    <Text>{data.subTitle}</Text>
                  </Wrapper>
                  <Wrapper
                    al={width < 800 ? `center` : `flex-start`}
                    fontSize={width < 700 ? `22px` : `54px`}
                    lineHeight={`1.3`}
                    fontWeight={`bold`}
                  >
                    <Text textAlign={width < 800 && `center`}>
                      {data.title}
                    </Text>
                  </Wrapper>
                  <ColWrapper
                    fontSize={width < 800 ? `14px` : `24px`}
                    lineHeight={`1.5`}
                    color={Theme.darkGrey_C}
                    margin={`30px 0 45px`}
                  >
                    <Text textAlign={width < 800 && `center`}>
                      {data.content}
                    </Text>
                  </ColWrapper>
                  <ATag href={data.link} width={`auto`}>
                    <StyleBtn
                      width={width < 1000 ? `130px` : `160px`}
                      height={width < 1000 ? `40px` : `50px`}
                      fontSize={`18px`}
                      fontWeight={`bold`}
                      type={`danger`}
                    >
                      <Text zIndex={`1`}>MORE VIEW</Text>
                    </StyleBtn>
                  </ATag>
                </RsWrapper2>
              </Wrapper>
            );
          })}
      </Carousel>
    </MainSliderWrapper>
  );
};

export default MainSlider;
