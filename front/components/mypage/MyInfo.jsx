import { message, Modal } from "antd";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useWidth from "../../hooks/useWidth";
import { CommonButton, Text, TextInput, Wrapper } from "../commonComponents";
import Theme from "../Theme";
import useInput from "../../hooks/useInput";
import {
  LOAD_MY_INFO_REQUEST,
  LOGOUT_REQUEST,
  USER_EXIT_REQUEST,
  USER_INFO_UPDATE_REQUEST,
} from "../../reducers/user";
import { ADDRESS_SEARCH_MODAL_TOGGLE } from "../../reducers/address";
import DaumPostcode from "react-daum-postcode";

const MyInfo = () => {
  const width = useWidth();
  ////// GLOBAL STATE //////

  const {
    me,
    //
    st_loadMyInfoDone,
    //
    st_userInfoUpdateeDone,
    st_userInfoUpdateeError,
    //
    st_userExitDone,
    st_userExitError,
  } = useSelector((state) => state.user);
  const { searchModal } = useSelector((state) => state.address);

  ////// HOOKS //////
  const router = useRouter();
  const dispatch = useDispatch();

  const [dModal, setDModal] = useState(false);
  const [addressModify, setAddressModify] = useState(false);
  const [mobileModify, setMobileModify] = useState(false);
  const [emailModify, setEmailModify] = useState(false);

  const emailInput = useInput(me && me.email);
  const mobileInput = useInput(me && me.mobile);
  const zonecodeInput = useInput(me && me.zonecode);
  const addressInput = useInput(me && me.address);
  const detailAddressInput = useInput(me && me.detailAddress);

  ////// USEEFFECT //////

  // 수정 후 리스트 불러오기
  useEffect(() => {
    if (st_loadMyInfoDone) {
      emailInput.setValue(me && me.email);
      mobileInput.setValue(me && me.mobile);
      zonecodeInput.setValue(me && me.zonecode);
      addressInput.setValue(me && me.address);
      detailAddressInput.setValue(me && me.detailAddress);

      setEmailModify(false);
      setMobileModify(false);
      setAddressModify(false);
    }
  }, [st_loadMyInfoDone]);

  // 수정완료
  useEffect(() => {
    if (st_userInfoUpdateeDone) {
      dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });

      return message.success("회원정보가 수정되었습니다.");
    }
  }, [st_userInfoUpdateeDone]);

  useEffect(() => {
    if (st_userInfoUpdateeError) {
      return message.error(st_userInfoUpdateeError);
    }
  }, [st_userInfoUpdateeError]);

  // 탈퇴 후처리
  useEffect(() => {
    if (st_userExitDone) {
      dispatch({
        type: LOGOUT_REQUEST,
      });

      router.push(`/`);

      return message.success("정상적으로 탈퇴되었습니다.");
    }
  }, [st_userExitDone]);

  useEffect(() => {
    if (st_userExitError) {
      return message.error(st_userExitError);
    }
  }, [st_userExitError]);

  ////// TOGGLE //////

  // 탈퇴 토글
  const deleteToggle = useCallback(() => {
    setDModal(!dModal);
  }, [dModal]);

  // 주소검색 토글
  const postCodeModalToggle = useCallback(() => {
    dispatch({
      type: ADDRESS_SEARCH_MODAL_TOGGLE,
    });
  }, [searchModal]);

  // 이메일 변경 토글
  const emailModifyToggle = useCallback(() => {
    setEmailModify(!emailModify);
  }, [emailModify]);

  // 전화번호 변경 토글
  const mobileModifyToggle = useCallback(() => {
    setMobileModify(!mobileModify);
  }, [mobileModify]);

  // 주소 변경 토글
  const addressModifyToggle = useCallback(() => {
    setAddressModify(!addressModify);
  }, [addressModify]);

  ////// HANDLER //////
  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  // 회원탈퇴
  const userExitHandler = useCallback(() => {
    dispatch({
      type: USER_EXIT_REQUEST,
      data: {
        id: me.id,
      },
    });
  }, []);

  // 회원정보수정
  const userModifyHandler = useCallback(() => {
    if (!emailInput.value) {
      return message.error("이메일을 입력해주세요.");
    }

    if (!mobileInput.value) {
      return message.error("전화번호를 입력해주세요.");
    }

    if (!addressInput.value) {
      return message.error("주소를 입력해주세요.");
    }

    if (!detailAddressInput.value) {
      return message.error("상세주소를 입력해주세요.");
    }
    //
    if (
      emailInput.value === me.email &&
      mobileInput.value === me.mobile &&
      addressInput.value === me.address &&
      detailAddressInput.value === me.detailAddress
    ) {
      return message.error("변경할 정보가 없습니다.");
    }

    dispatch({
      type: USER_INFO_UPDATE_REQUEST,
      data: {
        email: emailInput.value,
        mobile: mobileInput.value,
        postCode: zonecodeInput.value,
        address: addressInput.value,
        detailAddress: detailAddressInput.value,
      },
    });
  }, [
    emailInput,
    mobileInput,
    zonecodeInput,
    addressInput,
    detailAddressInput,
  ]);

  return (
    <Wrapper>
      <Wrapper al={`flex-start`}>
        <Text fontSize={`20px`} fontWeight={`700`} margin={`0 0 30px`}>
          회원정보 수정
        </Text>

        {/* 테이블 */}
        <Wrapper borderTop={`1px solid ${Theme.grey2_C}`}>
          <Wrapper
            dr={`row`}
            height={`55px`}
            borderBottom={`1px solid ${Theme.lightGrey4_C}`}
          >
            <Wrapper
              width={width < 900 ? `80px` : `180px`}
              al={`flex-start`}
              padding={`0 0 0 20px`}
              bgColor={Theme.lightGrey2_C}
              color={Theme.darkGrey_C}
              height={`100%`}
            >
              이름
            </Wrapper>
            <Wrapper
              width={width < 900 ? `calc(100% - 80px)` : `calc(100% - 180px)`}
              color={Theme.grey2_C}
              padding={width < 900 ? `0 0 0 15px` : `0 0 0 20px`}
              al={`flex-start`}
            >
              {me && me.username}
            </Wrapper>
          </Wrapper>

          <Wrapper
            dr={`row`}
            height={`55px`}
            borderBottom={`1px solid ${Theme.lightGrey4_C}`}
          >
            <Wrapper
              width={width < 900 ? `80px` : `180px`}
              al={`flex-start`}
              padding={`0 0 0 20px`}
              bgColor={Theme.lightGrey2_C}
              color={Theme.darkGrey_C}
              height={`100%`}
            >
              본인등급
            </Wrapper>
            <Wrapper
              width={width < 900 ? `calc(100% - 80px)` : `calc(100% - 180px)`}
              color={Theme.grey2_C}
              padding={width < 900 ? `0 0 0 15px` : `0 0 0 20px`}
              al={`flex-start`}
            >
              {me && me.lvValue}
            </Wrapper>
          </Wrapper>
          <Wrapper
            dr={`row`}
            height={`55px`}
            borderBottom={`1px solid ${Theme.lightGrey4_C}`}
          >
            {width < 900 ? (
              <Wrapper
                width={width < 900 ? `80px` : `180px`}
                al={`flex-start`}
                padding={`0 0 0 20px`}
                bgColor={Theme.lightGrey2_C}
                color={Theme.darkGrey_C}
                height={`100%`}
              >
                <Text>추천인</Text>
                <Text>아이디</Text>
              </Wrapper>
            ) : (
              <Wrapper
                width={width < 900 ? `80px` : `180px`}
                al={`flex-start`}
                padding={`0 0 0 20px`}
                bgColor={Theme.lightGrey2_C}
                color={Theme.darkGrey_C}
                height={`100%`}
              >
                추천인 아이디
              </Wrapper>
            )}
            <Wrapper
              width={width < 900 ? `calc(100% - 80px)` : `calc(100% - 180px)`}
              color={Theme.grey2_C}
              padding={width < 900 ? `0 0 0 15px` : `0 0 0 20px`}
              al={`flex-start`}
            >
              {me && me.recommUserId}
            </Wrapper>
          </Wrapper>
          <Wrapper
            dr={`row`}
            height={`55px`}
            borderBottom={`1px solid ${Theme.lightGrey4_C}`}
          >
            {width < 900 ? (
              <Wrapper
                width={width < 900 ? `80px` : `180px`}
                al={`flex-start`}
                padding={`0 0 0 20px`}
                bgColor={Theme.lightGrey2_C}
                color={Theme.darkGrey_C}
                height={`100%`}
              >
                <Text>추천인</Text>
                <Text>이름</Text>
              </Wrapper>
            ) : (
              <Wrapper
                width={width < 900 ? `80px` : `180px`}
                al={`flex-start`}
                padding={`0 0 0 20px`}
                bgColor={Theme.lightGrey2_C}
                color={Theme.darkGrey_C}
                height={`100%`}
              >
                추천인 이름
              </Wrapper>
            )}
            <Wrapper
              width={width < 900 ? `calc(100% - 80px)` : `calc(100% - 180px)`}
              color={Theme.grey2_C}
              padding={width < 900 ? `0 0 0 15px` : `0 0 0 20px`}
              al={`flex-start`}
            >
              {me && me.recommUsername}
            </Wrapper>
          </Wrapper>
          <Wrapper
            dr={`row`}
            height={`55px`}
            borderBottom={`1px solid ${Theme.lightGrey4_C}`}
          >
            <Wrapper
              width={width < 900 ? `80px` : `180px`}
              al={`flex-start`}
              padding={`0 0 0 20px`}
              bgColor={Theme.lightGrey2_C}
              color={Theme.darkGrey_C}
              height={`100%`}
            >
              아이디
            </Wrapper>
            <Wrapper
              width={width < 900 ? `calc(100% - 80px)` : `calc(100% - 180px)`}
              color={Theme.grey2_C}
              padding={width < 900 ? `0 0 0 15px` : `0 0 0 20px`}
              al={`flex-start`}
            >
              {me && me.userId}
            </Wrapper>
          </Wrapper>
          <Wrapper
            dr={`row`}
            height={`55px`}
            borderBottom={`1px solid ${Theme.lightGrey4_C}`}
          >
            <Wrapper
              width={width < 900 ? `80px` : `180px`}
              al={`flex-start`}
              padding={`0 0 0 20px`}
              bgColor={Theme.lightGrey2_C}
              color={Theme.darkGrey_C}
              height={`100%`}
            >
              이메일
            </Wrapper>
            <Wrapper
              width={width < 900 ? `calc(100% - 80px)` : `calc(100% - 180px)`}
              color={Theme.grey2_C}
              padding={width < 900 ? `0 15px` : `0 30px 0 20px`}
              dr={`row`}
              ju={`flex-start`}
            >
              <TextInput
                width={
                  width < 900
                    ? `calc(100% - 50px - 10px)`
                    : `calc(100% - 80px - 20px)`
                }
                margin={width < 900 ? `0 10px 0 0` : `0 20px 0 0`}
                height={`30px`}
                {...emailInput}
                onKeyDown={(e) => e.keyCode === 13 && userModifyHandler()}
              />
            </Wrapper>
          </Wrapper>
          <Wrapper
            dr={`row`}
            height={`55px`}
            borderBottom={`1px solid ${Theme.lightGrey4_C}`}
          >
            <Wrapper
              width={width < 900 ? `80px` : `180px`}
              al={`flex-start`}
              padding={`0 0 0 20px`}
              bgColor={Theme.lightGrey2_C}
              color={Theme.darkGrey_C}
              height={`100%`}
            >
              연락처
            </Wrapper>
            <Wrapper
              width={width < 900 ? `calc(100% - 80px)` : `calc(100% - 180px)`}
              color={Theme.grey2_C}
              padding={width < 900 ? `0 15px` : `0 30px 0 20px`}
              dr={`row`}
              ju={`flex-start`}
            >
              <TextInput
                width={
                  width < 900
                    ? `calc(100% - 50px - 10px)`
                    : `calc(100% - 80px - 20px)`
                }
                margin={width < 900 ? `0 10px 0 0` : `0 20px 0 0`}
                height={`30px`}
                {...mobileInput}
                onKeyDown={(e) => e.keyCode === 13 && userModifyHandler()}
              />
            </Wrapper>
          </Wrapper>
          <Wrapper
            dr={`row`}
            height={width < 700 ? `auto` : addressModify ? `110px` : `90px`}
            borderBottom={`1px solid ${Theme.lightGrey4_C}`}
          >
            <Wrapper
              width={width < 900 ? `80px` : `180px`}
              al={`flex-start`}
              ju={`flex-start`}
              bgColor={Theme.lightGrey2_C}
              color={Theme.darkGrey_C}
              height={`100%`}
              padding={`20px`}
            >
              주소
            </Wrapper>
            <Wrapper
              height={`100%`}
              width={width < 900 ? `calc(100% - 80px)` : `calc(100% - 180px)`}
              color={Theme.grey2_C}
              ju={`flex-start`}
              dr={`row`}
              padding={width < 900 ? `15px` : `0 30px 0 20px`}
            >
              <Wrapper
                width={width < 900 ? `calc(100% - 50px)` : `calc(100% - 80px)`}
                al={`flex-start`}
                padding={
                  width < 900
                    ? addressModify
                      ? `0`
                      : `0 10px 0 0`
                    : `0 20px 0 0`
                }
              >
                <Wrapper dr={`row`} ju={`space-between`}>
                  <TextInput
                    width={width < 900 ? `100%` : `calc(100% - 100px)`}
                    margin={width < 900 ? `0` : `0 20px 0 0`}
                    height={`30px`}
                    {...addressInput}
                    readOnly={true}
                    // onKeyDown={(e) => e.keyCode === 13 && userModifyHandler()}
                  />

                  <CommonButton
                    type={`danger`}
                    width={width < 900 ? `100%` : `80px`}
                    margin={width < 900 ? `5px 0 0` : `0`}
                    kindOf={`outline`}
                    padding={`0`}
                    fontSize={width < 900 ? `12px !important` : `14px`}
                    height={`30px`}
                    radius={`0`}
                    onClick={postCodeModalToggle}
                  >
                    주소검색
                  </CommonButton>
                </Wrapper>

                <TextInput
                  width={`100%`}
                  margin={`5px 20px 0 0`}
                  height={`30px`}
                  {...detailAddressInput}
                  onKeyDown={(e) => e.keyCode === 13 && userModifyHandler()}
                />
              </Wrapper>
            </Wrapper>
          </Wrapper>
        </Wrapper>
        {/* 버튼 */}
        <Wrapper dr={`row`} margin={`60px 0 100px`}>
          <CommonButton
            type={`danger`}
            width={`146px`}
            height={`48px`}
            radius={`5px`}
            padding={`0`}
            kindOf={`white`}
            margin={`0 10px 0 0`}
            onClick={deleteToggle}
          >
            탈퇴하기
          </CommonButton>
          <CommonButton
            type={`danger`}
            width={`146px`}
            height={`48px`}
            radius={`5px`}
            padding={`0`}
            kindOf={`basicTheme`}
            onClick={userModifyHandler}
          >
            회원정보수정
          </CommonButton>
        </Wrapper>
      </Wrapper>

      <Modal footer={null} visible={dModal} closable={false}>
        <Wrapper height={`150px`}>
          <Text>탈퇴 후 계정 복구가 불가합니다.</Text>
          <Text>정말 탈퇴하시겠습니까 ?</Text>
        </Wrapper>

        <Wrapper dr={`row`}>
          <CommonButton
            type={`danger`}
            width={`146px`}
            height={`48px`}
            radius={`5px`}
            padding={`0`}
            kindOf={`white`}
            margin={`0 10px 0 0`}
            onClick={deleteToggle}
          >
            취소
          </CommonButton>
          <CommonButton
            type={`danger`}
            width={`146px`}
            height={`48px`}
            radius={`5px`}
            padding={`0`}
            kindOf={`basicTheme`}
            onClick={userExitHandler}
          >
            탈퇴하기
          </CommonButton>
        </Wrapper>
      </Modal>

      <Modal
        title="주소검색"
        footer={null}
        visible={searchModal}
        onCancel={postCodeModalToggle}
      >
        <DaumPostcode
          onComplete={(data) => {
            addressInput.setValue(data.address);
            zonecodeInput.setValue(data.zonecode);
            postCodeModalToggle();
          }}
          width={width < 600 ? `100%` : `600px`}
          height={`500px`}
          autoClose={false}
          animation
        />
      </Modal>
    </Wrapper>
  );
};

export default MyInfo;
