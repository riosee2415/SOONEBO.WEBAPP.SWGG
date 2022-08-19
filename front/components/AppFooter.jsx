import React, { useEffect } from "react";
import {
  RowWrapper,
  ColWrapper,
  Image,
  RsWrapper,
  WholeWrapper,
  Wrapper,
  Text,
} from "./commonComponents";
import Theme from "./Theme";
import styled from "styled-components";
import useWidth from "../hooks/useWidth";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { COMPANY_GET_REQUEST } from "../reducers/company";
import { message } from "antd";

const AppFooter = () => {
  const width = useWidth();

  const dispatch = useDispatch();

  const {
    companys,
    //
    st_companyDone,
    st_companyError,
  } = useSelector((state) => state.company);

  useEffect(() => {
    if (st_companyError) {
      return message.error(st_companyError);
    }
  }, [st_companyError]);
  return (
    <WholeWrapper
      bgColor={Theme.subTheme2_C}
      color={Theme.grey2_C}
      padding={`50px 0`}
    >
      <RsWrapper>
        <Image
          alt="logo"
          src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sunaebo/assets/images/logo/footer_logo.png`}
          width={`48px`}
        />
        <Wrapper dr={`row`} margin={`10px 0`}>
          <Link href={`/privacy`}>
            <a>
              <Text>개인정보처리방침</Text>
            </a>
          </Link>
          <Text margin={`0 15px`}>|</Text>
          <Link href={`/service`}>
            <a>
              <Text>이용약관</Text>
            </a>
          </Link>
        </Wrapper>
        <>
          <Wrapper width={`auto`} dr={`row`}>
            <Text>에이젯 솔루션</Text>
            <Text margin={`0 10px`} fontSize={width < 800 && `12px`}>
              주소 : 경상남도 창원시 성산구 중앙대로 95, 706-1호
            </Text>
            <Text fontSize={width < 800 && `12px`}>대표 : 황원배</Text>
          </Wrapper>
          <Wrapper
            width={`auto`}
            dr={`row`}
            ju={`flex-start`}
            margin={`10px 0`}
          >
            <Text fontSize={width < 800 && `12px`}>
              사업자등록번호 : 7783101241
            </Text>

            <Text margin={`0 15px`}>|</Text>

            <Text fontSize={width < 800 && `12px`}>
              고객센터 : 055-715-5999
            </Text>
          </Wrapper>

          <Wrapper width={`auto`} dr={`row`} margin={`0 0 10px`}>
            <Text fontSize={width < 800 && `12px`}>FAX : 055-275-5386</Text>

            <Text margin={`0 15px`}>|</Text>

            <Text fontSize={width < 800 && `12px`}>
              <a href={`mailto:kisk1010@hanmail.net`}>
                E-mail : kisk1010@hanmail.net
              </a>
            </Text>
          </Wrapper>
        </>
        <Text fontSize={`14px`} color={Theme.lightGrey_C}>
          Copyright. (주)순애보 all rights reserved.
        </Text>
      </RsWrapper>
    </WholeWrapper>
  );
};

export default AppFooter;
