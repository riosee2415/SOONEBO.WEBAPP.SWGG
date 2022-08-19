import { Carousel, Empty } from "antd";
import React, { useCallback } from "react";
import { Wrapper, Text, Image } from "../commonComponents";
import Theme from "../Theme";
import styled from "styled-components";
import useWidth from "../../hooks/useWidth";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

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

const ProductWrapper = styled(Wrapper)`
  .ant-carousel .slick-prev,
  .ant-carousel .slick-next {
    width: 90px;
    height: 90px;

    @media (max-width: 800px) {
      width: 40px;
      height: 40px;
    }
  }

  .ant-carousel .slick-prev {
    left: -45px;

    @media (max-width: 800px) {
      left: 0;
    }
  }

  .ant-carousel .slick-next {
    right: -45px;

    @media (max-width: 800px) {
      right: 0;
    }
  }

  .ant-carousel .slick-next::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url("https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sunaebo/assets/images/main/arrow_right.png");
  }

  .ant-carousel .slick-prev::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url("https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sunaebo/assets/images/main/arrow_left.png");
  }

  .ant-carousel .slick-dots li.slick-active button {
    background: ${Theme.subTheme_C};
  }

  .ant-carousel .slick-dots li button {
    opacity: 1;
    background: ${Theme.lightGrey3_C};
  }

  .ant-carousel .slick-dots-bottom {
    bottom: -30px;
  }

  .ant-carousel .slick-dots li {
    width: 40px;
    height: 10px;
  }
`;

const ProductSlider = () => {
  const width = useWidth();

  const { products } = useSelector((state) => state.product);

  const router = useRouter();

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  return (
    <ProductWrapper display={`block`} position={`relative`}>
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
        arrows={width < 700 ? false : true}
      >
        {products && products.length === 0 ? (
          <Wrapper margin={`100px 0 0`}>
            <Empty description={"등록된 상품이 없습니다."} />
          </Wrapper>
        ) : (
          products &&
          products.map((data) => {
            return (
              <Wrapper
                display={`flex !important`}
                dr={`row`}
                key={data.id}
                padding={`10px`}
                onClick={() => moveLinkHandler(`/product/${data.id}`)}
              >
                <ImageBox>
                  <Image src={data.thumbnail} />
                  <MoreWrapper>
                    <Text borderBottom={`1px solid ${Theme.white_C}`}>
                      MOER VIEW
                    </Text>
                  </MoreWrapper>
                </ImageBox>
                <Wrapper>
                  <Text
                    fontSize={
                      width < 1100 ? (width < 800 ? `14px` : `16px`) : `18px`
                    }
                    margin={`15px 0 0`}
                  >
                    {data.title}
                  </Text>
                  <Text
                    fontSize={
                      width < 1100 ? (width < 800 ? `14px` : `16px`) : `18px`
                    }
                    color={Theme.subTheme4_C}
                  >
                    {data.realPrice}
                  </Text>
                </Wrapper>
              </Wrapper>
            );
          })
        )}
      </Carousel>
    </ProductWrapper>
  );
};

export default React.memo(ProductSlider);
