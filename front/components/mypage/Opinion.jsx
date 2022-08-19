import { Empty, Form, Input, Modal, Pagination } from "antd";
import { useRouter } from "next/router";
import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import useWidth from "../../hooks/useWidth";
import { MY_OPINION_LIST_REQUEST } from "../../reducers/opinion";
import { Text, Wrapper } from "../commonComponents";
import Theme from "../Theme";

const CustomPagination = styled(Pagination)`
  margin: 50px 0 100px 0;
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

const CustomForm = styled(Form)`
  .ant-form-item-label > label {
    color: ${(props) => props.theme.basicTheme_C};
  }
  .ant-form-item {
    border-bottom: 1px dashed ${(props) => props.theme.lightGrey3_C};
  }
`;

const Opinion = () => {
  ////// GLOBAL STATE //////

  const { myOpinion, myOpinionMaxPage } = useSelector((state) => state.opinion);

  ////// HOOKS //////
  const width = useWidth();

  const router = useRouter();

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const [openModal, setOpenModal] = useState(null);
  const [currentData, setCurrentData] = useState(null);

  ////// USEEFFECT //////
  useEffect(() => {
    dispatch({
      type: MY_OPINION_LIST_REQUEST,
      data: {
        page: currentPage,
      },
    });
  }, [currentPage]);

  ////// TOGGLE //////
  const modalToggle = useCallback(
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

  const otherPageCall = useCallback(
    (changePage) => {
      setCurrentPage(changePage);
    },
    [currentPage]
  );

  return (
    <Wrapper>
      <Wrapper al={`flex-start`}>
        <Text fontSize={`20px`} fontWeight={`700`} margin={`0 0 30px`}>
          OPINION
        </Text>

        {/* 테이블 */}
        <Wrapper
          bgColor={Theme.lightGrey2_C}
          color={Theme.grey_C}
          dr={`row`}
          height={`60px`}
          borderTop={`1px solid ${Theme.grey2_C}`}
          borderBottom={`1px solid ${Theme.lightGrey4_C}`}
        >
          <Wrapper width={width < 700 ? `15%` : `20%`}>문의 유형</Wrapper>
          <Wrapper width={`calc(100% - 20% - 20% - 20%)`}>제목</Wrapper>
          <Wrapper width={width < 700 ? `25%` : `20%`}>작성일</Wrapper>
          <Wrapper width={`20%`}>처리여부</Wrapper>
        </Wrapper>
        <Wrapper>
          {myOpinion && myOpinion.length === 0 ? (
            <Wrapper margin={`50px 0`}>
              <Empty description="의견 내역이 없습니다." />
            </Wrapper>
          ) : (
            myOpinion &&
            myOpinion.map((data) => {
              return (
                <Wrapper
                  borderBottom={`1px solid ${Theme.lightGrey4_C}`}
                  dr={`row`}
                  height={`70px`}
                  cursor={`pointer`}
                  onClick={() => modalToggle(data)}
                >
                  <Wrapper
                    width={width < 700 ? `15%` : `20%`}
                    color={Theme.darkGrey_C}
                    fontSize={width < 900 ? `12px` : `16px`}
                  >
                    {data.typeValue}
                  </Wrapper>
                  <Wrapper
                    width={`calc(100% - 20% - 20% - 20%)`}
                    padding={width < 900 ? `0 10px` : `0 20px`}
                    dr={`row`}
                    ju={`flex-start`}
                  >
                    <Text
                      color={Theme.darkGrey_C}
                      fontSize={width < 900 ? `12px` : `16px`}
                      isEllipsis
                    >
                      {data.title}
                    </Text>
                  </Wrapper>
                  <Wrapper
                    width={width < 700 ? `25%` : `20%`}
                    color={Theme.darkGrey_C}
                    fontSize={width < 900 ? `11px` : `16px`}
                  >
                    {data.viewCreatedAt}
                  </Wrapper>
                  <Wrapper
                    width={`20%`}
                    color={Theme.darkGrey_C}
                    fontSize={width < 900 ? `12px` : `16px`}
                  >
                    {data.isComplete ? (
                      <Text color={Theme.grey3_C}>처리완료</Text>
                    ) : (
                      `미완료`
                    )}
                  </Wrapper>
                </Wrapper>
              );
            })
          )}
          <CustomPagination
            defaultCurrent={1}
            current={parseInt(currentPage)}
            total={myOpinionMaxPage * 10}
            pageSize={10}
            onChange={(page) => otherPageCall(page)}
          />
        </Wrapper>
      </Wrapper>

      <Modal
        visible={openModal}
        width={`700px`}
        title={`문의 상세내용`}
        onCancel={() => modalToggle(null)}
        footer={null}
      >
        {currentData && (
          <Wrapper padding={`0 20px`}>
            <CustomForm
              style={{ width: `100%` }}
              labelCol={{ span: 3 }}
              wrapperCol={{ span: 21 }}
            >
              <Form.Item label="문의유형">
                <Text>{currentData.typeValue}</Text>
              </Form.Item>

              <Form.Item label="이름">
                <Text>{currentData.username}</Text>
              </Form.Item>

              <Form.Item label="이메일">
                <Text>{currentData.email}</Text>
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
            </CustomForm>
          </Wrapper>
        )}
      </Modal>
    </Wrapper>
  );
};

export default Opinion;
