import { Empty } from "antd";
import { useRouter } from "next/router";
import React from "react";

import useWidth from "../../hooks/useWidth";
import { Text, Wrapper } from "../commonComponents";
import Theme from "../Theme";

const Sale = ({ sales, saleTab }) => {
  const width = useWidth();
  ////// GLOBAL STATE //////

  ////// HOOKS //////

  const router = useRouter();

  ////// USEEFFECT //////

  ////// TOGGLE //////

  ////// HANDLER //////

  return (
    <Wrapper>
      <Wrapper al={`flex-start`}>
        <Text fontSize={`20px`} fontWeight={`700`} margin={`0 0 30px`}>
          {saleTab === 1
            ? "총 매출 내역"
            : saleTab === 2
            ? "나의 매출 내역"
            : saleTab === 3
            ? "피추천인의 매출 내역"
            : saleTab === 4
            ? "피추천인 목록"
            : "총 매출 내역"}
        </Text>

        <Wrapper
          bgColor={Theme.lightGrey2_C}
          color={Theme.grey_C}
          dr={`row`}
          height={`60px`}
          borderTop={`1px solid ${Theme.grey2_C}`}
          borderBottom={`1px solid ${Theme.lightGrey4_C}`}
        >
          <Wrapper fontSize={`14px`} width={width < 700 ? `15%` : `13%`}>
            번호
          </Wrapper>
          <Wrapper fontSize={`14px`} width={width < 700 ? `22%` : `20%`}>
            소속
          </Wrapper>
          <Wrapper fontSize={`14px`} width={width < 700 ? `15%` : `15%`}>
            직급
          </Wrapper>
          <Wrapper fontSize={`14px`} width={width < 700 ? `20%` : `15%`}>
            이름
          </Wrapper>
          <Wrapper
            fontSize={`13px`}
            width={
              width < 700
                ? `calc(100% - 15% - 22% - 15% - 20% )`
                : `calc(100% - 13% - 20% - 15% - 15% - 15% )`
            }
          >
            {saleTab === 4 ? "연락처" : "금액"}
          </Wrapper>

          {width < 700 ? (
            <></>
          ) : (
            <Wrapper fontSize={`14px`} width={`15%`}>
              {saleTab === 4 ? "가입일" : "날짜"}
            </Wrapper>
          )}
        </Wrapper>
        <Wrapper>
          {sales && sales.length !== 0 ? (
            sales.map((data) => (
              <Wrapper
                borderBottom={`1px solid ${Theme.lightGrey4_C}`}
                dr={`row`}
                height={`60px`}
                key={data.id}
              >
                <Wrapper
                  width={width < 700 ? `15%` : `13%`}
                  color={Theme.darkGrey_C}
                  fontSize={width < 900 ? `10px` : `16px`}
                >
                  {data.num}
                </Wrapper>
                <Wrapper
                  width={width < 700 ? `22%` : `20%`}
                  color={Theme.darkGrey_C}
                  fontSize={width < 900 ? `10px` : `16px`}
                >
                  {data.name}
                </Wrapper>
                <Wrapper
                  width={width < 700 ? `15%` : `15%`}
                  color={Theme.darkGrey_C}
                  fontSize={width < 900 ? `10px` : `16px`}
                >
                  {saleTab === 4
                    ? data.lvValue === "any"
                      ? `일반`
                      : data.lvValue
                    : data.gradeString === "any"
                    ? `일반`
                    : data.gradeString}
                </Wrapper>
                <Wrapper
                  width={width < 700 ? `20%` : `15%`}
                  color={Theme.darkGrey_C}
                  fontSize={width < 900 ? `10px` : `16px`}
                >
                  {data.username}
                </Wrapper>
                <Wrapper
                  width={
                    width < 700
                      ? `calc(100% - 15% - 22% - 15% - 20% )`
                      : `calc(100% - 13% - 20% - 15% - 15% - 15% )`
                  }
                  padding={width < 900 ? `0 10px` : `0 20px`}
                  dr={`row`}
                >
                  <Text
                    color={Theme.darkGrey_C}
                    fontSize={width < 900 ? `10px` : `16px`}
                  >
                    {saleTab === 4
                      ? data.mobile
                      : parseInt(data.price).toLocaleString("ko-KR")}
                  </Text>
                </Wrapper>

                {width < 700 ? (
                  <></>
                ) : (
                  <Wrapper
                    width={`15%`}
                    color={Theme.darkGrey_C}
                    fontSize={width < 900 ? `10px` : `16px`}
                  >
                    {data.viewCreatedAt}
                  </Wrapper>
                )}
              </Wrapper>
            ))
          ) : (
            <Wrapper height={`300px`}>
              <Empty description={false}>
                {saleTab === 1
                  ? "총 매출 내역이 없습니다."
                  : saleTab === 2
                  ? "나의 매출 내역이 없습니다."
                  : saleTab === 3
                  ? "피추천인의 매출 내역이 없습니다."
                  : saleTab === 4
                  ? "피추천인이 없습니다."
                  : "총 매출 내역이 없습니다."}
              </Empty>
            </Wrapper>
          )}
        </Wrapper>
      </Wrapper>
    </Wrapper>
  );
};

export default Sale;
