import React, { useCallback, useEffect, useRef, useState } from "react";
import AdminLayout from "../../../components/AdminLayout";
import PageHeader from "../../../components/admin/PageHeader";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Modal, Select, Form, Image, Popconfirm } from "antd";

import { useRouter, withRouter } from "next/router";
import wrapper from "../../../store/configureStore";
import { END } from "redux-saga";
import axios from "axios";
import {
  Wrapper,
  AdminContent,
  GuideDiv,
  Text,
  TextArea,
} from "../../../components/commonComponents";
import { LOAD_MY_INFO_REQUEST } from "../../../reducers/user";
import Theme from "../../../components/Theme";
import {
  ADMIN_CANCEL_LIST_REQUEST,
  CANCEL_UPDATE_REQUEST,
  DETAIL_CANCEL_REQUEST,
} from "../../../reducers/cancel";
import useWidth from "../../../hooks/useWidth";

const Cancel = ({}) => {
  const { st_loadMyInfoDone, me } = useSelector((state) => state.user);
  const {
    adminList,
    detailItem,
    //
    st_adminCancelListLoading,
    //
    st_cancelUpdateDone,
  } = useSelector((state) => state.cancel);

  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  useEffect(() => {
    if (st_loadMyInfoDone) {
      if (!me || parseInt(me.level) < 3) {
        moveLinkHandler(`/admin`);
      }
    }
  }, [st_loadMyInfoDone]);
  /////////////////////////////////////////////////////////////////////////

  ////// HOOKS //////
  const dispatch = useDispatch();
  const router = useRouter();
  const width = useWidth();

  //   탭
  const [currentTab, setCurrentTab] = useState(1);

  const [rModal, setRModal] = useState(false);
  const [pModal, setPModal] = useState(false);
  const [reasonData, setReasonData] = useState(null);

  ////// USEEFFECT //////

  // 취소승인 완료
  useEffect(() => {
    if (st_cancelUpdateDone) {
      dispatch({
        type: ADMIN_CANCEL_LIST_REQUEST,
        data: {
          cancelType: 1,
          listType: currentTab,
          agencyId: 2,
        },
      });
    }
  }, [st_cancelUpdateDone]);

  ////// TOGGLE //////

  // 취소신청상품 모달토글
  const cancelProductModalToggle = useCallback(
    (data) => () => {
      if (data) {
        dispatch({
          type: DETAIL_CANCEL_REQUEST,
          data: {
            boughtId: data.BoughtHistoryId,
          },
        });
      }

      setPModal(!pModal);
    },
    [pModal]
  );

  // 취소신청 이유 모달토글
  const reasonModalToggle = useCallback(
    (data) => () => {
      if (data) {
        setReasonData(data);
      }

      setRModal(!rModal);
    },
    [rModal]
  );

  ////// HANDLER //////

  //   승인 기능
  const updateHandler = useCallback(
    (data) => () => {
      dispatch({
        type: CANCEL_UPDATE_REQUEST,
        data: {
          id: data.id,
        },
      });
    },
    []
  );

  //   탭 기능
  const tabHandler = useCallback(
    (data) => () => {
      setCurrentTab(data);

      dispatch({
        type: ADMIN_CANCEL_LIST_REQUEST,
        data: {
          listType: data,
          cancelType: 1,
          agencyId: 2,
        },
      });
    },
    []
  );

  ////// DATAVIEW //////

  ////// DATA COLUMNS //////

  const columns = [
    {
      align: "center",
      title: "번호",
      dataIndex: "id",
    },
    {
      align: "center",
      title: "결제유형",
      render: (data) => (
        <div>{data.payWay === `nobank` ? "무통장입금" : "신용카드"}</div>
      ),
    },
    {
      title: "주문자",
      dataIndex: "name",
    },
    {
      title: "전화번호",
      dataIndex: "mobile",
    },
    {
      align: "right",
      title: "가격",
      dataIndex: "viewPrice",
    },
    {
      align: "right",
      title: "사용포인트",
      dataIndex: "pointPrice",
    },
    {
      title: "주문취소 신청일",
      dataIndex: "viewUpdatedAt",
    },
    {
      title: "주문취소 이유",
      render: (data) => (
        <Button size="small" type="primary" onClick={reasonModalToggle(data)}>
          상세보기
        </Button>
      ),
    },
    {
      title: "취소신청상품",
      render: (data) => (
        <Button
          size="small"
          type="primary"
          onClick={cancelProductModalToggle(data)}
        >
          상세보기
        </Button>
      ),
    },
    {
      align: "center",
      title: "승인여부",
      render: (data) =>
        data.isComplete ? (
          "승인완료"
        ) : (
          <Popconfirm
            title="승인하시겠습니까?"
            okText="승인"
            cancelText="취소"
            onConfirm={updateHandler(data)}
          >
            <Button size="small" type="primary">
              승인
            </Button>
          </Popconfirm>
        ),
    },
  ];

  return (
    <AdminLayout>
      <PageHeader
        breadcrumbs={["주문 관리", "주문취소 관리"]}
        title={`주문취소 관리`}
        subTitle={`회원이 주문취소한 내역을 관리할 수 있습니다.`}
      />

      <AdminContent>
        {/* ADMIN GUIDE AREA */}
        <Wrapper
          margin={`0px 0px 10px 0px`}
          radius="5px"
          padding="5px"
          fontSize="13px"
          al="flex-start"
        >
          <GuideDiv isImpo={true}>
            회원이 주문취소한 상품을 확인 할 수 있습니다.
          </GuideDiv>
          <GuideDiv isImpo={true}>
            회원이 주문취소한건에 대해서 승인 후 수정이 불가합니다.
          </GuideDiv>
          <GuideDiv isImpo={true}>
            모바일에서는 가로스크롤로 확인해주세요.
          </GuideDiv>
        </Wrapper>
        {/* ADMIN GUIDE AREA END */}

        <Wrapper dr={`row`} ju={`flex-start`} margin={`0 0 10px`}>
          <Button
            onClick={tabHandler(1)}
            type={currentTab === 1 ? `primary` : `default`}
            size="small"
          >
            미처리
          </Button>
          <Button
            onClick={tabHandler(2)}
            type={currentTab === 2 ? `primary` : `default`}
            size="small"
          >
            처리
          </Button>
          <Button
            onClick={tabHandler(3)}
            type={currentTab === 3 ? `primary` : `default`}
            size="small"
          >
            전체
          </Button>
        </Wrapper>
        <Wrapper overflow={`auto`}>
          <Wrapper width={`100%`} minWidth={`900px`}>
            <Table
              style={{ width: `100%` }}
              rowKey="id"
              columns={columns}
              dataSource={adminList}
              loading={st_adminCancelListLoading}
              size="small"
            />
          </Wrapper>
        </Wrapper>
      </AdminContent>

      {/* DETAIL MODAL */}
      <Modal
        width={`700px`}
        title="상세보기"
        visible={pModal}
        footer={null}
        onCancel={cancelProductModalToggle()}
      >
        {detailItem &&
          detailItem.map((data, idx) => {
            return (
              <Wrapper
                dr={`row`}
                key={idx}
                padding={`0 0 10px`}
                borderBottom={`1px dashed ${Theme.darkGrey_C}`}
              >
                <Wrapper padding={`10px`} width={width < 900 ? `100%` : `40%`}>
                  <Image src={data.productThumbnail} alt="thumbnail" />
                </Wrapper>
                <Wrapper width={width < 900 ? `100%` : `60%`}>
                  <Wrapper
                    dr={`row`}
                    borderBottom={`1px solid ${Theme.lightGrey4_C}`}
                  >
                    <Wrapper
                      width={`40%`}
                      padding={`22px`}
                      bgColor={Theme.lightGrey4_C}
                    >
                      상품이름
                    </Wrapper>
                    <Wrapper width={`60%`} padding={`0 5px`}>
                      {data.productTitle}
                    </Wrapper>
                  </Wrapper>

                  <Wrapper
                    dr={`row`}
                    borderBottom={`1px solid ${Theme.lightGrey4_C}`}
                  >
                    <Wrapper
                      width={`40%`}
                      padding={`5px`}
                      bgColor={Theme.lightGrey4_C}
                    >
                      상품가격
                    </Wrapper>
                    <Wrapper width={`60%`}>{data.viewProductPrice}</Wrapper>
                  </Wrapper>

                  {data.optionString !== "null" ||
                    (data.optionString !== null && (
                      <>
                        <Wrapper
                          dr={`row`}
                          borderBottom={`1px solid ${Theme.lightGrey4_C}`}
                        >
                          <Wrapper
                            width={`40%`}
                            padding={`5px`}
                            bgColor={Theme.lightGrey4_C}
                          >
                            옵션이름
                          </Wrapper>
                          <Wrapper width={`60%`}>{data.optionString}</Wrapper>
                        </Wrapper>

                        <Wrapper
                          dr={`row`}
                          borderBottom={`1px solid ${Theme.lightGrey4_C}`}
                        >
                          <Wrapper
                            width={`40%`}
                            padding={`5px`}
                            bgColor={Theme.lightGrey4_C}
                          >
                            옵션가격
                          </Wrapper>
                          <Wrapper width={`60%`}>{data.optionPrice}</Wrapper>
                        </Wrapper>
                      </>
                    ))}

                  <Wrapper
                    dr={`row`}
                    borderBottom={`1px solid ${Theme.lightGrey4_C}`}
                  >
                    <Wrapper
                      width={`40%`}
                      padding={`5px`}
                      bgColor={Theme.lightGrey4_C}
                    >
                      수량
                    </Wrapper>
                    <Wrapper width={`60%`}>{data.qun}개</Wrapper>
                  </Wrapper>

                  <Wrapper
                    dr={`row`}
                    borderBottom={`1px solid ${Theme.lightGrey4_C}`}
                  >
                    <Wrapper
                      width={`40%`}
                      padding={`5px`}
                      bgColor={Theme.lightGrey4_C}
                    >
                      할인금액
                    </Wrapper>
                    <Wrapper width={`60%`}>{data.viewDiscount}</Wrapper>
                  </Wrapper>

                  <Wrapper
                    dr={`row`}
                    borderBottom={`1px solid ${Theme.lightGrey4_C}`}
                  >
                    <Wrapper
                      width={`40%`}
                      padding={`5px`}
                      bgColor={Theme.lightGrey4_C}
                    >
                      총 결제금액
                    </Wrapper>
                    <Wrapper width={`60%`}>{data.realPrice}</Wrapper>
                  </Wrapper>
                </Wrapper>
              </Wrapper>
            );
          })}
      </Modal>

      {/* DETAIL MODAL */}
      <Modal
        width={`700px`}
        title="상세보기"
        visible={rModal}
        footer={null}
        onCancel={reasonModalToggle()}
      >
        {reasonData && reasonData.bankName && (
          <>
            <Wrapper dr={`row`}>
              <Wrapper al={`flex-start`} width={`30%`} padding={`0 10px 0 0`}>
                <Text margin={`0 0 5px`}>은행명</Text>
                <Wrapper
                  border={`1px solid ${Theme.lightGrey4_C}`}
                  padding={`5px`}
                  al={`flex-start`}
                  ju={`flex-start`}
                >
                  {reasonData && reasonData.bankName}
                </Wrapper>
              </Wrapper>
              <Wrapper al={`flex-start`} width={`70%`}>
                <Text margin={`0 0 5px`}>계좌번호</Text>
                <Wrapper
                  border={`1px solid ${Theme.lightGrey4_C}`}
                  padding={`5px`}
                  al={`flex-start`}
                  ju={`flex-start`}
                >
                  {reasonData && reasonData.bankNo}
                </Wrapper>
              </Wrapper>
            </Wrapper>
          </>
        )}
        <Wrapper al={`flex-start`}>
          <Text margin={`5px 0`}>주문취소이유</Text>
          <Wrapper
            border={`1px solid ${Theme.lightGrey4_C}`}
            padding={`5px`}
            al={`flex-start`}
            ju={`flex-start`}
            minHeight={`200px`}
          >
            {reasonData && reasonData.reason}
          </Wrapper>
        </Wrapper>
      </Modal>
    </AdminLayout>
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

    context.store.dispatch({
      type: ADMIN_CANCEL_LIST_REQUEST,
      data: {
        cancelType: 1,
        listType: 1,
        agencyId: 2,
      },
    });

    // 구현부 종료
    context.store.dispatch(END);
    console.log("🍀 SERVER SIDE PROPS END");
    await context.store.sagaTask.toPromise();
  }
);

export default withRouter(Cancel);
