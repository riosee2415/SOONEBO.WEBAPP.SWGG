import { Carousel, Empty } from "antd";
import React, { useCallback } from "react";
import { Wrapper, Text, Image } from "../commonComponents";
import Theme from "../Theme";
import styled from "styled-components";
import useWidth from "../../hooks/useWidth";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const ProductMobileWrapper = styled(Wrapper)`
  padding: 0 0 30px;
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

const ImageBox = styled(Wrapper)`
  overflow: hidden;
  cursor: pointer;
  position: relative;

  & img {
    transition: 0.5s;
    width: 60%;

    @media (max-width: 500px) {
      width: 100%;
    }
  }

  &:hover {
    & img {
      transform: scale(1.1);
    }
  }
`;

const ProductMobileSlider = () => {
  ////// GLOBAL STATE //////

  ////// HOOKS //////
  const width = useWidth();

  const router = useRouter();

  const { products } = useSelector((state) => state.product);

  ////// USEEFFECT //////
  ////// TOGGLE //////
  ////// HANDLER //////
  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  return (
    <ProductMobileWrapper display={`block`} position={`relative`}>
      <Carousel
        pauseOnFocus={false}
        className="center"
        dots={true}
        slidesToShow={1} // 한 화면에 몇개의 슬라이드가 보여지는지 결정
        autoplay={true}
        centerMode={false} // 양쪽에 겹쳐서 보이는 디자인
        fade={false} // fade or slide
        initialSlide={0} // 초기에 몇번째 슬라이드를 보여줄 것인지 결정
        variableWidth={false} // 각각 다른 크기를 지정할 수 있음
        vartical={false}
        verticalSwiping={false}
        draggable={true}
      >
        {products && products.length === 0 ? (
          <Wrapper margin={`100px 0 0`}>
            <Empty description={"등록된 상품이 없습니다."} />
          </Wrapper>
        ) : (
          products &&
          products.slice(0, 3).map((data) => {
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
                </ImageBox>
                <Wrapper>
                  <Text fontSize={`15px`} margin={`15px 0 0`}>
                    {data.title}
                  </Text>
                  <Text fontSize={`14px`} color={Theme.subTheme4_C}>
                    {data.realPrice}
                  </Text>
                </Wrapper>
              </Wrapper>
            );
          })
        )}
      </Carousel>
    </ProductMobileWrapper>
  );
};

export default React.memo(ProductMobileSlider);
