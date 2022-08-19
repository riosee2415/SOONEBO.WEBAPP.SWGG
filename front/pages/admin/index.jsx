import { Button, Input, message, Carousel } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../../components/AdminLayout";
import {
  Wrapper,
  Image,
  CommonButton,
  RowWrapper,
  ColWrapper,
  Text,
} from "../../components/commonComponents";
import useInput from "../../hooks/useInput";
import { LOAD_MY_INFO_REQUEST, LOGIN_ADMIN_REQUEST } from "../../reducers/user";
import { ACCEPT_LOG_REQUEST } from "../../reducers/accept";
import Theme from "../../components/Theme";
import wrapper from "../../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";
import Link from "next/link";
import useWidth from "../../hooks/useWidth";
import styled from "styled-components";

const Box = styled(Wrapper)`
  border-radius: 10px;
  padding: 10px;
  border: 1px solid ${Theme.subTheme_C};
  box-shadow: 0 3px 6px ${Theme.subTheme3_C};
  margin: 0 0 10px;
`;

// let Line;

// if (typeof window !== "undefined") {
//   const { Line: prevLine } = require("@ant-design/charts");

//   Line = prevLine;
// }

const AdminHome = () => {
  const dispatch = useDispatch();
  const width = useWidth();

  const {
    me,
    //
    st_loginAdminError,
    st_loginAdminDone,
  } = useSelector((state) => state.user);

  const { acceptList } = useSelector((state) => state.accept);

  const inputId = useInput("");
  const inputPw = useInput("");

  const onLoginHandler = () => {
    dispatch({
      type: LOGIN_ADMIN_REQUEST,
      data: { userId: inputId.value, password: inputPw.value },
    });
  };

  useEffect(() => {
    if (st_loginAdminError) {
      return message.error(
        st_loginAdminError.reason
          ? st_loginAdminError.reason
          : "로그인을 실패하였습니다."
      );
    }
  }, [st_loginAdminError]);

  // const config = {
  //   data: acceptList,
  //   height: 400,
  //   xField: "date",
  //   yField: "count",
  //   point: {
  //     size: 5,
  //     shape: "diamond",
  //   },
  //   label: {
  //     style: {
  //       fill: "#aaa",
  //     },
  //   },
  // };

  return (
    <>
      {me && me.level > 3 ? (
        <AdminLayout>
          {width < 900 ? (
            <Wrapper padding={`10px`}>
              <Box>
                <Text margin={`0 0 15px`} fontWeight={`bold`}>
                  접속자 관리
                </Text>
                <Link href={`/admin/logs/acceptLogs`}>
                  <Text>접속자 통계 바로가기</Text>
                </Link>
              </Box>

              <Box>
                <Text margin={`0 0 15px`} fontWeight={`bold`}>
                  회원 관리
                </Text>
                <Wrapper dr={`row`}>
                  <Link href={`/admin/user/userList`}>
                    <Text width={`calc(100% / 3)`} textAlign={`center`}>
                      회원 리스트
                    </Text>
                  </Link>
                  <Link href={`/admin/user/userChart`}>
                    <Text width={`calc(100% / 3)`} textAlign={`center`}>
                      회원 통계
                    </Text>
                  </Link>
                  <Link href={`/admin/user/userSuggestion`}>
                    <Text width={`calc(100% / 3)`} textAlign={`center`}>
                      회원별 추천 현황
                    </Text>
                  </Link>
                  <Link href={`/admin/user/userSearch`}>
                    <Text width={`50%`} margin={`5px 0`} textAlign={`center`}>
                      개인 매출 조회
                    </Text>
                  </Link>
                  <Link href={`/admin/user/userAllSearch`}>
                    <Text width={`50%`} margin={`5px 0`} textAlign={`center`}>
                      개인 종합 매출 조회
                    </Text>
                  </Link>
                  <Link href={`/admin/user/userSearchChart`}>
                    <Text width={`50%`} textAlign={`center`}>
                      개인 매출 통계
                    </Text>
                  </Link>
                  <Link href={`/admin/user/userSales`}>
                    <Text width={`50%`} textAlign={`center`}>
                      세일즈 등업
                    </Text>
                  </Link>
                </Wrapper>
              </Box>

              <Box>
                <Text margin={`0 0 15px`} fontWeight={`bold`}>
                  주문 관리
                </Text>
                <Wrapper dr={`row`}>
                  <Link href={`/admin/boughtHistory/list`}>
                    <Text width={`50%`} margin={`0 0 5px`} textAlign={`center`}>
                      주문내역 관리
                    </Text>
                  </Link>
                  <Link href={`/admin/boughtHistory/cancel`}>
                    <Text width={`50%`} margin={`0 0 5px`} textAlign={`center`}>
                      주문취소 관리
                    </Text>
                  </Link>
                  <Link href={`/admin/boughtHistory/change`}>
                    <Text width={`50%`} textAlign={`center`}>
                      교환 관리
                    </Text>
                  </Link>
                  <Link href={`/admin/boughtHistory/refund`}>
                    <Text width={`50%`} textAlign={`center`}>
                      환불 관리
                    </Text>
                  </Link>
                </Wrapper>
              </Box>

              <Box>
                <Text margin={`0 0 15px`} fontWeight={`bold`}>
                  매출 관리
                </Text>
                <Wrapper dr={`row`}>
                  <Link href={`/admin/sales/getList`}>
                    <Text>전체 매출관리</Text>
                  </Link>
                </Wrapper>
              </Box>

              <Box>
                <Text margin={`0 0 15px`} fontWeight={`bold`}>
                  정산 관리
                </Text>
                <Wrapper dr={`row`}>
                  <Link href={`/admin/sales/personal`}>
                    <Text>개인 별 정산관리</Text>
                  </Link>
                </Wrapper>
              </Box>
            </Wrapper>
          ) : (
            <Wrapper height={`100%`} padding={`30px`}>
              <Image
                alt="logo"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sunaebo/assets/images/logo/header_logo.png`}
                width={`120px`}
              />
              <Wrapper width={`80%`}>
                <Wrapper margin={`20px 0`}>
                  <Image
                    alt="logo"
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/SOUL/assets/images/logo/Mar-Business_1.jpg`}
                    width={`500px`}
                  />
                </Wrapper>
                <RowWrapper gutter={[10, 10]}>
                  <ColWrapper span={6}>
                    <Link href={`/admin/logs/acceptLogs`}>
                      <CommonButton width={`200px`}>
                        접속자 통계 바로가기
                      </CommonButton>
                    </Link>
                  </ColWrapper>
                  <ColWrapper span={6}>
                    <Link href={`/admin/sales/personal`}>
                      <CommonButton width={`200px`}>
                        개인 별 정산관리 바로가기
                      </CommonButton>
                    </Link>
                  </ColWrapper>
                  <ColWrapper span={6}>
                    <Link href={`/admin/boughtHistory/list`}>
                      <CommonButton width={`200px`}>
                        주문내역 관리 바로가기
                      </CommonButton>
                    </Link>
                  </ColWrapper>
                  <ColWrapper span={6}>
                    <Link href={`/admin/user/userList`}>
                      <CommonButton width={`200px`}>
                        회원 관리 바로가기
                      </CommonButton>
                    </Link>
                  </ColWrapper>
                </RowWrapper>
              </Wrapper>
            </Wrapper>
          )}
        </AdminLayout>
      ) : (
        <>
          <Wrapper dr={`row`} height={`100vh`}>
            <Wrapper
              width={width < 900 ? `100%` : `50%`}
              height={width < 900 ? `30%` : `100%`}
              bgImg={`url("https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/4leaf%2F5137894.jpg?alt=media&token=99858357-4602-44aa-b32a-e6c9867788ff")`}
            >
              <Image
                width={width < 900 ? `100px` : `150px`}
                alt="logo"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sunaebo/assets/images/logo/header_logo.png`}
              />
              <Wrapper
                color={Theme.white_C}
                margin={`15px 0 0`}
                fontSize={`1.1rem`}
              >
                관리자페이지에 오신걸 환영합니다.
              </Wrapper>
            </Wrapper>
            <Wrapper
              width={width < 900 ? `100%` : `50%`}
              height={width < 900 ? `70%` : `100%`}
            >
              <Wrapper width={width < 900 ? `80%` : `50%`}>
                <Wrapper
                  fontSize={`2rem`}
                  fontWeight={`bold`}
                  margin={`0 0 30px`}
                  al={`flex-start`}
                >
                  Log in
                </Wrapper>
                <Wrapper al={`flex-start`}>아이디</Wrapper>
                <Wrapper>
                  <Input
                    {...inputId}
                    onKeyDown={(e) => e.keyCode === 13 && onLoginHandler()}
                  />
                </Wrapper>
                <Wrapper al={`flex-start`} margin={`15px 0 0`}>
                  비밀번호
                </Wrapper>
                <Wrapper margin={`0 0 15px`}>
                  <Input
                    {...inputPw}
                    type={`password`}
                    onKeyDown={(e) => e.keyCode === 13 && onLoginHandler()}
                  />
                </Wrapper>
                <CommonButton width={`100%`} onClick={onLoginHandler}>
                  로그인
                </CommonButton>
              </Wrapper>
            </Wrapper>
          </Wrapper>
        </>
      )}
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    // SSR Cookie Settings For Data Load/////////////////////////////////////
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    ////////////////////////////////////////////////////////////////////////
    // 구현부

    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });

    // context.store.dispatch({
    //   type: ACCEPT_LOG_REQUEST,
    //   data: { typeId: "1" },
    // });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default AdminHome;
