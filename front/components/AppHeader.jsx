import React, { useState, useEffect, useCallback } from "react";
import {
  RowWrapper,
  ColWrapper,
  WholeWrapper,
  Image,
  ATag,
  RsWrapper,
  Wrapper,
  Text,
  CommonButton,
  StyleBtn,
  TextInput,
} from "./commonComponents";
import { withResizeDetector } from "react-resize-detector";
import styled from "styled-components";
import Theme from "./Theme";
import {
  PlusOutlined,
  MenuOutlined,
  CloseOutlined,
  SearchOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { Drawer, message } from "antd";
import Link from "next/link";
import { fadeAni, headerAni } from "../components/animationCommon";
import Fade from "react-reveal/Fade";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT_REQUEST } from "../reducers/user";
import { useRouter } from "next/router";
import useInput from "../hooks/useInput";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_TYPE_LIST_REQUEST,
} from "../reducers/product";

const HRsWrapper = styled.article`
  width: 1600px;
  height: ${(props) => props.height || `100%`};
  ${(props) => props.minHeight}
  color: ${(props) => props.color};
  display: ${(props) => props.display || `flex`};
  background: ${(props) => props.bgColor};
  color: ${(props) => props.color};
  flex-direction: ${(props) => props.dr || `column`};
  align-items: ${(props) => props.al || `center`};
  justify-content: ${(props) => props.ju || `center`};
  flex-wrap: ${(props) => props.wrap || `wrap`};
  backdrop-filter: ${(props) => props.filter};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  overflow: ${(props) => props.overflow};
  border-bottom: ${(props) => props.borderBottom};
  border: ${(props) => props.border};
  font-size: ${(props) => props.fontSize};
  position: ${(props) => props.position};

  @media (max-width: 1600px) {
    width: 1300px;
  }

  @media (max-width: 1300px) {
    width: 1280px;
  }
  @media (max-width: 1280px) {
    width: 1100px;
  }
  @media (max-width: 1100px) {
    width: 900px;
  }
  @media (max-width: 900px) {
    width: 800px;
  }
  @media (max-width: 800px) {
    width: 700px;
  }
  @media (max-width: 700px) {
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
  }
`;

const WebRow = styled(Wrapper)`
  background: ${(props) => props.bgColor || `rgba(255, 255, 255, 0.6)`};
  backdrop-filter: blur(5px);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  transition: 0.5s;

  @media (max-width: 800px) {
    display: none;
  }
`;

const MobileRow = styled(RowWrapper)`
  display: none;
  backdrop-filter: blur(5px);
  background: rgba(255, 255, 255, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  transition: 0.5s;
  padding: 10px 0;

  .ant-drawer-content-wrapper {
    width: 80% !important;
  }

  .ant-drawer-content {
    background: ${(props) => props.theme.subTheme6_C};
  }

  @media (max-width: 800px) {
    display: flex;
  }
`;

const SearchWrapper = styled(Wrapper)`
  width: auto;
  position: relative;
  margin: 0 25px;
  height: 40px;
  cursor: pointer;

  &:hover ${Wrapper} {
    transform: translateY(0px);
    transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
    opacity: 1;
    visibility: visible;
  }

  & ${Wrapper} {
    width: 120px;
    padding: 23px 20px;
    position: absolute;
    top: 40px;
    left: 50%;
    margin: 0 0 0 -60px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
    font-size: 14px;
    color: ${Theme.grey_C};
    transform: translateY(40px);
    transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
    opacity: 0;
    visibility: hidden;
    z-index: 10;
  }
`;

const MenuWrapper = styled(Wrapper)`
  border-top: 1px solid ${Theme.lightGrey_C};
  border-bottom: 1px solid ${Theme.lightGrey_C};
  background: ${Theme.white_C};
  padding: 30px 0 0px;
  animation: ${headerAni} 0.5s forwards;
`;

const Menu = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: ${Theme.grey_C};
  margin: 0 0 25px;
  font-family: "Ubuntu", sans-serif;

  &:hover {
    color: ${Theme.black_C};
  }
`;

const SubMenu = styled.h4`
  color: ${Theme.grey2_C};
  margin: 0 0 5px;

  &:hover {
    font-weight: bold;
    color: ${Theme.darkGrey_C};
  }
`;

const FindWrapper = styled(Wrapper)`
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  z-index: 1000;
  padding: 0 15px;

  animation: ${fadeAni} 0.5s forwards;
`;

const HoText = styled(Text)`
  &:hover {
    color: ${Theme.basicTheme_C};
  }
`;

const AppHeader = ({ children, width }) => {
  const dispatch = useDispatch();

  const router = useRouter();

  const {
    me,
    //
    st_logoutDone,
  } = useSelector((state) => state.user);

  const { types, products } = useSelector((state) => state.product);

  ////////////// - USE STATE- ///////////////
  const [headerScroll, setHeaderScroll] = useState(false);
  const [pageY, setPageY] = useState(0);
  // const documentRef = useRef(document);

  const [drawar, setDrawar] = useState(false);
  const [searchPop, setSearchPop] = useState(false);
  const [subMenu, setSubMenu] = useState(``);

  const searchInput = useInput(``);

  ///////////// - EVENT HANDLER- ////////////

  const moveSearchHandler = useCallback(() => {
    router.push(`/search?search=${searchInput.value}`);
  }, [searchInput.value]);

  const drawarToggle = useCallback(() => {
    setDrawar((prev) => !prev);
  }, [drawar]);

  const searchToggle = useCallback(() => {
    setSearchPop((prev) => !prev);
  }, [searchPop]);

  const menuToggle = useCallback(() => {
    setSubMenu((prev) => !prev);
  }, [subMenu]);

  const handleScroll = useCallback(() => {
    const { pageYOffset } = window;
    const deltaY = pageYOffset - pageY;
    const headerScroll = pageY && pageYOffset !== 0 && pageYOffset !== pageY;
    setHeaderScroll(headerScroll);
    setPageY(pageYOffset);
  });

  const logoutHandler = useCallback(() => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
  });

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  const typeHandler = useCallback(() => {
    setTimeout(() => {
      dispatch({
        type: PRODUCT_TYPE_LIST_REQUEST,
      });
    }, [500]);
  }, []);

  ////////////// - USE EFFECT- //////////////
  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, [pageY]);

  useEffect(() => {
    dispatch({
      type: PRODUCT_TYPE_LIST_REQUEST,
    });

    dispatch({
      type: PRODUCT_LIST_REQUEST,
    });
  }, []);

  useEffect(() => {
    if (st_logoutDone) {
      message.success("로그아웃이 되었습니다.");

      moveLinkHandler("/");
    }
  }, [st_logoutDone]);

  return (
    <WholeWrapper>
      <WebRow bgColor={subMenu && Theme.white_C}>
        <HRsWrapper dr={`row`} ju={`space-between`} padding={`20px 0`}>
          <Wrapper
            width={`122px`}
            al={`flex-start`}
            fontSize={`24px`}
            onClick={menuToggle}
            cursor={`pointer`}
          >
            {subMenu ? <CloseOutlined /> : <MenuOutlined />}
          </Wrapper>
          <Wrapper width={`auto`}>
            <Link href={`/`}>
              <a>
                <Image
                  alt="logo"
                  width={`112px`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sunaebo/assets/images/logo/header_logo.png`}
                />
              </a>
            </Link>
          </Wrapper>
          <Wrapper width={`122px`} dr={`row`}>
            {router.pathname.includes(`/search`) ? null : (
              <Image
                alt="icon"
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sunaebo/assets/images/icon/header_search.png`}
                width={`24px`}
                cursor={`pointer`}
                onClick={searchToggle}
              />
            )}
            <SearchWrapper>
              <Link href={`/mypage`}>
                <a>
                  <Image
                    alt="icon"
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sunaebo/assets/images/icon/header_profile.png`}
                    width={`24px`}
                  />
                </a>
              </Link>
              <Wrapper bgColor={Theme.white_C}>
                {me ? (
                  <>
                    <HoText onClick={logoutHandler}>로그아웃</HoText>
                    <Link href={`/mypage?type=order`}>
                      <a>
                        <HoText>주문조회</HoText>
                      </a>
                    </Link>
                    <Link href={`/mypage?type=myInfo`}>
                      <a>
                        <HoText>회원정보수정</HoText>
                      </a>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href={`/login`}>
                      <a>
                        <HoText>로그인</HoText>
                      </a>
                    </Link>
                    <Link href={`/join`}>
                      <a>
                        <HoText>회원가입</HoText>
                      </a>
                    </Link>
                  </>
                )}
              </Wrapper>
            </SearchWrapper>
            <Link href={`/cart`}>
              <a>
                <Image
                  alt="icon"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sunaebo/assets/images/icon/header_bucket.png`}
                  width={`24px`}
                />
              </a>
            </Link>
          </Wrapper>
        </HRsWrapper>
        {subMenu && (
          <MenuWrapper dr={`row`} al={`flex-start`}>
            <Wrapper width={`200px`}>
              <Fade bottom>
                <Menu>SOONAEBO</Menu>
                <Link href={`/company/intro`}>
                  <a>
                    <SubMenu>BRANDSTORY</SubMenu>
                  </a>
                </Link>
              </Fade>
            </Wrapper>
            <Wrapper width={`200px`}>
              <Fade bottom delay={100}>
                <Menu>PRODUCT</Menu>
                <>
                  {types &&
                    types.map((data) => {
                      return (
                        <Link href={`/product?type=${data.id}`} key={data.id}>
                          <a>
                            <SubMenu onClick={typeHandler}>
                              {data.value}
                            </SubMenu>
                          </a>
                        </Link>
                      );
                    })}
                </>
              </Fade>
            </Wrapper>
            <Wrapper width={`200px`}>
              <Fade bottom delay={200}>
                <Menu>REVIEW</Menu>
                <Link href={`/review`}>
                  <a>
                    <SubMenu>REVIEW</SubMenu>
                  </a>
                </Link>
              </Fade>
            </Wrapper>
            <Wrapper width={`200px`}>
              <Fade bottom delay={300}>
                <Menu>EVENT</Menu>
                <Link href={`/event`}>
                  <a>
                    <SubMenu>EVENT</SubMenu>
                  </a>
                </Link>
              </Fade>
            </Wrapper>
            <Wrapper width={`200px`}>
              <Fade bottom delay={400}>
                <Link href={`/csCenter`}>
                  <a>
                    <Menu>C/S Center</Menu>
                  </a>
                </Link>
                <Link href={`/csCenter/notice`}>
                  <a>
                    <SubMenu>NOTICE</SubMenu>
                  </a>
                </Link>
                <Link href={`/csCenter/qna`}>
                  <a>
                    <SubMenu>Q&#38;A</SubMenu>
                  </a>
                </Link>
                <Link href={`/csCenter/faq`}>
                  <a>
                    <SubMenu>FAQ</SubMenu>
                  </a>
                </Link>
                <Link href={`/csCenter/opinion`}>
                  <a>
                    <SubMenu>OPINION</SubMenu>
                  </a>
                </Link>
              </Fade>
            </Wrapper>
          </MenuWrapper>
        )}

        {searchPop && (
          <FindWrapper>
            <RsWrapper>
              <Wrapper
                position={`absolute`}
                top={`20%`}
                right={`20%`}
                width={`auto`}
                fontSize={`25px`}
                color={Theme.white_C}
                cursor={`pointer`}
                onClick={searchToggle}
              >
                <CloseOutlined />
              </Wrapper>
              <Wrapper width={`auto`} al={`flex-start`}>
                <Wrapper dr={`row`} ju={`flex-start`}>
                  {products &&
                    products.map((data) => {
                      return (
                        <StyleBtn
                          key={data.id}
                          width={`auto`}
                          padding={`0 15px`}
                          height={`45px`}
                          radius={`14px`}
                          border={`1px solid ${Theme.white_C}`}
                          color={Theme.white_C}
                          margin={`0 5px 5px 0`}
                          onClick={() => {
                            moveLinkHandler(`/search?search=${data.title}`);
                          }}
                        >
                          <Text zIndex={`1`}>{data.title}</Text>
                        </StyleBtn>
                      );
                    })}
                </Wrapper>
                <Wrapper
                  dr={`row`}
                  width={`auto`}
                  color={Theme.white_C}
                  fontSize={`25px`}
                >
                  <TextInput
                    width={`600px`}
                    height={`60px`}
                    type={`text`}
                    placeholder={`검색어를 입력해주세요.`}
                    bgColor={`transparent`}
                    border={`none`}
                    borderBottom={`1px solid ${Theme.white_C}`}
                    margin={`0 5px 0 0`}
                    {...searchInput}
                    onKeyDown={(e) => e.keyCode === 13 && moveSearchHandler()}
                  />

                  <SearchOutlined onClick={moveSearchHandler} />
                </Wrapper>
              </Wrapper>
            </RsWrapper>
          </FindWrapper>
        )}
      </WebRow>
      {/* mobile */}
      <MobileRow justify={`center`}>
        <RsWrapper dr={`row`} ju={`space-between`}>
          <Wrapper dr={`row`} width={`55px`}>
            {me ? (
              <LoginOutlined
                style={{
                  margin: `0 10px 0 0`,
                  fontSize: 20,
                  color: Theme.grey5_C,
                }}
                onClick={logoutHandler}
              />
            ) : (
              <Link href={`/login`}>
                <a>
                  <Image
                    alt="icon"
                    src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sunaebo/assets/images/icon/header_profile.png`}
                    width={`22px`}
                    margin={`0 10px 0 0`}
                  />
                </a>
              </Link>
            )}

            <Link href={`/cart`}>
              <a>
                <Image
                  alt="icon"
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sunaebo/assets/images/icon/header_bucket.png`}
                  width={`22px`}
                />
              </a>
            </Link>
          </Wrapper>
          <Wrapper width={`auto`} al={`flex-start`}>
            <ATag width={`auto`} href="/">
              <Image
                width={`70px`}
                src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sunaebo/assets/images/logo/header_logo.png`}
              />
            </ATag>
          </Wrapper>
          <Wrapper width={`55px`} al={`flex-end`} fontSize={`1.5rem`}>
            <MenuOutlined onClick={drawarToggle} />
          </Wrapper>
        </RsWrapper>
        {drawar && (
          <Drawer
            placement="right"
            closable={false}
            onClose={drawarToggle}
            visible={drawarToggle}
          >
            <Wrapper dr={`row`} ju={`space-between`} fontSize={`1.5rem`}>
              <ATag width={`auto`} href="/">
                <Image
                  width={`70px`}
                  src={`https://4leaf-s3.s3.ap-northeast-2.amazonaws.com/sunaebo/assets/images/logo/header_logo.png`}
                />
              </ATag>
              <CloseOutlined onClick={drawarToggle} />
            </Wrapper>
            <Wrapper dr={`row`} ju={`space-between`} margin={`30px 0 20px`}>
              {me ? (
                <>
                  <CommonButton
                    onClick={() => moveLinkHandler(`/mypage?type=order`)}
                    width={`49%`}
                    type={`danter`}
                    kindOf={`white`}
                  >
                    ORDER
                  </CommonButton>
                  <CommonButton
                    onClick={() => moveLinkHandler(`/mypage?type=myInfo`)}
                    width={`49%`}
                    type={`danter`}
                  >
                    INFO
                  </CommonButton>
                </>
              ) : (
                <>
                  <CommonButton
                    onClick={() => moveLinkHandler(`/login`)}
                    width={`49%`}
                    type={`danter`}
                    kindOf={`white`}
                  >
                    LOGIN
                  </CommonButton>
                  <CommonButton
                    onClick={() => moveLinkHandler(`/join`)}
                    width={`49%`}
                    type={`danter`}
                  >
                    JOIN US
                  </CommonButton>
                </>
              )}
            </Wrapper>

            <Wrapper
              dr={`row`}
              width={`auto`}
              color={Theme.basicTheme_C}
              margin={`0 0 30px`}
            >
              <TextInput
                width={`190px`}
                type={`text`}
                placeholder={`검색어를 입력해주세요.`}
                bgColor={`transparent`}
                border={`none`}
                borderBottom={`1px solid ${Theme.basicTheme_C}`}
                margin={`0 5px 0 0`}
                padding={`0`}
                {...searchInput}
                onKeyDown={(e) => e.keyCode === 13 && moveSearchHandler()}
              />
              <SearchOutlined
                onKeyDown={(e) => e.keyCode === 13 && moveSearchHandler()}
              />
            </Wrapper>
            <ColWrapper
              al={`flex-start`}
              bgColor={Theme.white_C}
              padding={`10px`}
            >
              <Wrapper margin={`0 0 15px`} al={`flex-start`}>
                <Wrapper
                  dr={`row`}
                  ju={`space-between`}
                  onClick={() => {
                    setSubMenu(0);
                  }}
                >
                  SOONAEBO
                  <PlusOutlined />
                </Wrapper>
                {subMenu === 0 && (
                  <>
                    <ATag
                      href="/company/intro"
                      width={`auto`}
                      color={Theme.grey_C}
                    >
                      <ColWrapper fontSize={`13px`} margin={`5px 10px 0`}>
                        BRANDSTORY
                      </ColWrapper>
                    </ATag>
                  </>
                )}
              </Wrapper>
              <Wrapper margin={`0 0 15px`} al={`flex-start`}>
                <Wrapper
                  dr={`row`}
                  ju={`space-between`}
                  onClick={() => {
                    setSubMenu(1);
                  }}
                >
                  PRODUCT
                  <PlusOutlined />
                </Wrapper>
                {subMenu === 1 && (
                  <>
                    {types &&
                      types.map((data) => {
                        return (
                          <ATag
                            href={`/product?type=${data.id}`}
                            key={data.id}
                            width={`auto`}
                            color={Theme.grey_C}
                          >
                            <ColWrapper fontSize={`13px`} margin={`5px 10px 0`}>
                              {data.value}
                            </ColWrapper>
                          </ATag>
                        );
                      })}
                  </>
                )}
              </Wrapper>
              <Link href={`/review`}>
                <a>
                  <Wrapper margin={`0 0 15px`} al={`flex-start`}>
                    REVIEW
                  </Wrapper>
                </a>
              </Link>
              <Link href={`/event`}>
                <a>
                  <Wrapper margin={`0 0 15px`} al={`flex-start`}>
                    EVENT
                  </Wrapper>
                </a>
              </Link>
              <Wrapper al={`flex-start`}>
                <Wrapper
                  dr={`row`}
                  ju={`space-between`}
                  onClick={() => {
                    setSubMenu(3);
                  }}
                >
                  C/S Center
                  <PlusOutlined />
                </Wrapper>
                {subMenu === 3 && (
                  <>
                    <ATag
                      href="/csCenter/notice"
                      width={`auto`}
                      color={Theme.grey_C}
                    >
                      <ColWrapper fontSize={`13px`} margin={`5px 10px 0`}>
                        NOTICE
                      </ColWrapper>
                    </ATag>
                    <ATag
                      href="/csCenter/qna"
                      width={`auto`}
                      color={Theme.grey_C}
                    >
                      <ColWrapper fontSize={`13px`} margin={`5px 10px 0`}>
                        Q&#38;A
                      </ColWrapper>
                    </ATag>
                    <ATag
                      href="/csCenter/faq"
                      width={`auto`}
                      color={Theme.grey_C}
                    >
                      <ColWrapper fontSize={`13px`} margin={`5px 10px 0`}>
                        FAQ
                      </ColWrapper>
                    </ATag>
                    <ATag
                      href="/csCenter/opinion"
                      width={`auto`}
                      color={Theme.grey_C}
                    >
                      <ColWrapper fontSize={`13px`} margin={`5px 10px 0`}>
                        OPINION
                      </ColWrapper>
                    </ATag>
                  </>
                )}

                {me ? (
                  <Link href={`/mypage`}>
                    <a>
                      <Wrapper margin={`20px 0 0`} al={`flex-start`}>
                        MY PAGE
                      </Wrapper>
                    </a>
                  </Link>
                ) : null}
              </Wrapper>
            </ColWrapper>
          </Drawer>
        )}
      </MobileRow>
    </WholeWrapper>
  );
};

export default withResizeDetector(AppHeader);
