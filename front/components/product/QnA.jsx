import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Input, Pagination, Select, Modal, Empty, Form, message } from "antd";
import styled from "styled-components";
import useWidth from "../../hooks/useWidth";
import {
  CommonButton,
  Image,
  Text,
  TextArea,
  WholeWrapper,
  Wrapper,
} from "../commonComponents";
import Theme from "../Theme";
import {
  PRODUCT_QNA_LIST_REQUEST,
  QNA_CREATE_REQUEST,
  QNA_CREATE_RESET,
} from "../../reducers/qna";

const NoticeWrapper = styled(Wrapper)`
  font-size: 16px;
  flex-direction: row;
  word-break: break-all;
  padding: 25px 0;
  border-bottom: 1px solid ${Theme.lightGrey4_C};
  color: ${Theme.darkGrey_C};

  &:hover {
    background-color: ${Theme.subTheme2_C};
  }

  @media (max-width: 700px) {
    font-size: 12px;
    padding: 15px 0;
  }
`;

const CustomModal = styled(Modal)`
  .ant-modal-body {
    padding: 20px 40px;

    @media (max-width: 800px) {
      padding: 20px 10px;
    }
  }
`;

const CustomPage = styled(Pagination)`
  margin: 40px 0 100px;

  & .ant-pagination-next > button {
    border: none;
  }

  & .ant-pagination-prev > button {
    border: none;
  }

  & {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  & .ant-pagination-item,
  & .ant-pagination-next,
  & .ant-pagination-prev {
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 5px !important;
    background-color: ${Theme.white_C} !important;
  }

  & .ant-pagination-item-active a {
    color: ${Theme.basicTheme_C};
  }

  & .ant-pagination-item:focus-visible a,
  .ant-pagination-item:hover a {
    color: ${Theme.basicTheme_C};
  }

  & .ant-pagination-item-link svg {
    font-weight: bold;
    color: ${Theme.grey_C};
  }
`;

const CustomSelect = styled(Select)`
  width: ${(props) => props.width || `142px`};

  & .ant-select-selector {
    ${(props) =>
      props.delete &&
      `border: none !important; 
       border-bottom: 2px solid ${Theme.lightGrey4_C} !important;`}
  }
  color: ${Theme.grey4_C};
  border-radius: 4px;
`;

const CustomForm = styled(Form)`
  .ant-form-item-label > label {
    color: ${(props) => props.theme.basicTheme_C};
  }

  .ant-form-item {
    border-bottom: 1px dashed ${(props) => props.theme.lightGrey3_C};
  }
`;

const QnA = () => {
  ////// GLOBAL STATE //////
  const {
    productQna,
    maxPage,

    st_productQnaListError,

    st_qnaCreateDone,
    st_qnaCreateError,
  } = useSelector((state) => state.qna);

  ////// HOOKS //////
  const width = useWidth();

  const router = useRouter();

  const dispatch = useDispatch();

  const [createForm] = Form.useForm();

  const [modalToggle, setModalToggle] = useState(false); // 질문작성모달

  const [orderSort, setOrderSort] = useState(1); // 순서

  const [currentPage, setCurrentPage] = useState(1); // 페이지네이션

  // 상세문의내용 관련
  const [openModal, setOpenModal] = useState(false);
  const [currentData, setCurrentData] = useState(null);

  ////// REDUX //////
  ////// USEEFFECT //////

  useEffect(() => {
    if (router.query) {
      dispatch({
        type: PRODUCT_QNA_LIST_REQUEST,
        data: {
          ProductId: router.query.id,
          page: currentPage,
          orderType: orderSort,
        },
      });
    }
  }, [router.query, currentPage, orderSort]);

  useEffect(() => {
    if (st_productQnaListError) {
      return message.error("문의내역을 확인하시려면 로그인이 필요합니다.");
    }
  }, [st_productQnaListError]);

  ////////////////// 질문 생성 후처리 /////////////////////
  useEffect(() => {
    if (st_qnaCreateDone) {
      qnaModalToggle(null);
      createForm.resetFields();

      message.success(`질문이 등록되었습니다.`);

      dispatch({
        type: PRODUCT_QNA_LIST_REQUEST,
        data: {
          ProductId: router.query.id,
          page: currentPage,
          orderType: orderSort,
        },
      });

      dispatch({
        type: QNA_CREATE_RESET,
      });
    }
  }, [st_qnaCreateDone]);

  useEffect(() => {
    if (st_qnaCreateError) {
      return message.error(st_qnaCreateError);
    }
  }, [st_qnaCreateError]);

  ////// TOGGLE //////
  const qnaModalToggle = useCallback(() => {
    setModalToggle((prev) => !prev);
  }, [modalToggle]);

  // 상세문의내용
  const openModalToggle = useCallback(
    (data) => {
      if (data) {
        setCurrentData(data);
      } else {
        setCurrentData(null);
      }

      setOpenModal(!openModal);
    },
    [openModal, currentData]
  );

  ////// HANDLER //////
  const moveLinkHandler = useCallback((link) => {
    router.push(link);
  }, []);

  // 정렬순서
  const searchOrderSortHandler = useCallback(
    (data) => {
      setOrderSort(data);
    },
    [orderSort]
  );

  // CREATE FUNCATION
  const createHandler = useCallback(
    (data) => {
      dispatch({
        type: QNA_CREATE_REQUEST,
        data: {
          title: data.title,
          content: data.contnet,
          ProductId: router.query.id,
        },
      });
    },
    [router.query]
  );

  // 페이지네이션
  const otherPageCall = useCallback(
    (changePage) => {
      setCurrentPage(changePage);
    },
    [currentPage]
  );

  ////// DATAVIEW //////

  return (
    <WholeWrapper>
      <Text fontSize={`20px`} fontWeight={`600`}>
        QnA
      </Text>
      <Text>제품에 대한 질문이 가능한 곳입니다.</Text>
      <Text>제품문의는 로그인 후 등록가능합니다.</Text>
      <CommonButton
        width={`140px`}
        height={`40px`}
        margin={`15px 0 40px`}
        type={`danger`}
        onClick={qnaModalToggle}
      >
        질문 작성하기
      </CommonButton>

      <Wrapper al={`flex-end`} margin={`0 0 15px`}>
        <CustomSelect
          placeholder={`상품 정렬`}
          value={orderSort}
          onChange={searchOrderSortHandler}
          border={`none`}
          delete
        >
          <Select.Option value={1}>최신 등록순</Select.Option>
          <Select.Option value={2}>제목 이름순</Select.Option>
        </CustomSelect>
      </Wrapper>
      <Wrapper
        borderTop={`1px solid ${Theme.darkGrey_C}`}
        borderBottom={`1px solid ${Theme.lightGrey4_C}`}
        dr={`row`}
        padding={`22px 0`}
        color={`${Theme.grey_C}`}
        bgColor={Theme.lightGrey2_C}
        fontSize={width < 700 ? `12px` : `14px`}
      >
        <Wrapper width={`7%`} display={width < 700 && `none`}>
          No.
        </Wrapper>
        <Wrapper width={width < 700 ? `63%` : `75%`}>제목</Wrapper>
        <Wrapper width={width < 700 ? `12%` : `8%`}>작성자</Wrapper>
        <Wrapper width={width < 700 ? `25%` : `10%`}>작성일</Wrapper>
      </Wrapper>

      {productQna && productQna.length === 0 ? (
        <Wrapper margin={`50px 0`}>
          <Empty description="조회된 제품문의내역이 없습니다." />
        </Wrapper>
      ) : (
        productQna &&
        productQna.map((data) => {
          return (
            <NoticeWrapper
              key={data.id}
              cursor={`pointer`}
              onClick={() => openModalToggle(data)}
            >
              <Wrapper
                width={`7%`}
                display={width < 700 && `none`}
                color={Theme.darkGrey_C}
              >
                {data.id}
              </Wrapper>

              <Wrapper
                width={width < 700 ? `63%` : `75%`}
                al={`flex-start`}
                color={Theme.darkGrey_C}
              >
                <Text width={`100%`} isEllipsis>
                  {data.title}
                </Text>
              </Wrapper>
              <Wrapper width={width < 700 ? `12%` : `8%`} color={Theme.grey2_C}>
                {data.username.slice(0, data.username.length - 1) + `*`}
              </Wrapper>
              <Wrapper
                width={width < 700 ? `25%` : `10%`}
                color={Theme.grey2_C}
                fontSize={width < 700 ? `11px` : ``}
              >
                {data.viewCreatedAt}
              </Wrapper>
            </NoticeWrapper>
          );
        })
      )}

      <CustomPage
        defaultCurrent={1}
        current={parseInt(currentPage)}
        total={maxPage * 10}
        pageSize={10}
        onChange={(page) => otherPageCall(page)}
      />

      {/* 질문작성 */}
      <CustomModal
        visible={modalToggle}
        onCancel={qnaModalToggle}
        footer={null}
        title="질문 작성하기"
        width={width < 800 ? `100%` : `510px`}
      >
        <Form form={createForm} onFinish={createHandler}>
          <Form.Item
            label={"제목"}
            name={"title"}
            rules={[
              { required: true, message: "제목은 필수 입력사항 입니다." },
            ]}
          >
            <Input placeholder="제목을 입력해주세요." suffix />
          </Form.Item>

          <Form.Item
            label={"내용"}
            name={"contnet"}
            rules={[
              { required: true, message: "내용은 필수 입력사항 입니다." },
            ]}
          >
            <TextArea placeholder="내용을 입력해주세요." width={`100%`} />
          </Form.Item>

          <Wrapper ju={`flex-end`} padding={`0 0 10px`} dr={`row`}>
            <CommonButton type={`danger`} onClick={() => qnaModalToggle()}>
              취소
            </CommonButton>
            <CommonButton
              margin={`0 0 0 10px`}
              kindOf={`basicTheme`}
              type={`danger`}
              htmlType="submit"
            >
              작성
            </CommonButton>
          </Wrapper>
        </Form>
      </CustomModal>

      {/* 상세내용 */}
      <Modal
        visible={openModal}
        width={`700px`}
        title={`문의 상세내용`}
        onCancel={() => openModalToggle(null)}
        footer={null}
      >
        {currentData && (
          <Wrapper padding={width < 700 ? `0` : `0 20px`}>
            <CustomForm
              style={{ width: `100%` }}
              labelCol={{ span: 3 }}
              wrapperCol={{ span: 21 }}
            >
              <Form.Item label="이름">
                <Text>
                  {currentData.username.slice(
                    0,
                    currentData.username.length - 1
                  ) + "*"}
                </Text>
              </Form.Item>

              <Form.Item label="연락처">
                <Text>
                  {currentData.mobile.slice(0, currentData.mobile.length - 4) +
                    "****"}
                </Text>
              </Form.Item>

              <Form.Item label="상품명">
                <Text>{currentData.productTitle}</Text>
              </Form.Item>

              <Form.Item label="상품이미지">
                <Image width={`100px`} src={currentData.thumbnail} />
              </Form.Item>

              <Form.Item label="문의제목">
                <Text>{currentData.title}</Text>
              </Form.Item>

              <Form.Item label="문의내용">
                <Input.TextArea
                  style={{ border: "none", padding: `5px 0 0` }}
                  readOnly={true}
                  rows={5}
                  value={currentData.content}
                />
              </Form.Item>

              {currentData.isCompleted ? (
                <Form.Item label="문의답변">
                  <Input.TextArea
                    style={{ border: "none", padding: `5px 0 0` }}
                    readOnly={true}
                    rows={5}
                    value={currentData.answer}
                  />
                </Form.Item>
              ) : (
                <Form.Item label="문의답변">
                  <Text>답변이 등록되지 않았습니다.</Text>
                </Form.Item>
              )}
            </CustomForm>
          </Wrapper>
        )}
      </Modal>
    </WholeWrapper>
  );
};

export default QnA;
