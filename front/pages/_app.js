import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
import { ThemeProvider } from "styled-components";
import Theme from "../components/Theme";
import GlobalStyles from "../components/GlobalStyles";
import wrapper from "../store/configureStore";
import WidthProvider from "../components/WidthProvider";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { ACCEPT_LOG_CREATE_REQUEST } from "../reducers/accept";

const Fourleaf = ({ Component }) => {
  const router = useRouter();

  const dispatch = useDispatch();

  const getIpClient = useCallback(async () => {
    const isCheck = sessionStorage.getItem("QSIDSPDSDQDAQSTEFA");

    if (!isCheck && router.pathname.indexOf("admin") === -1) {
      try {
        const ipData = await fetch("https://geolocation-db.com/json/");
        const locationIp = await ipData.json();

        sessionStorage.setItem(
          "QSIDSPDSDQDAQSTEFA",
          "ISDGSAWDCASDHERGEKIJCSDMK"
        );

        dispatch({
          type: ACCEPT_LOG_CREATE_REQUEST,
          data: {
            ip: locationIp.IPv4,
            dName: "az",
          },
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  useEffect(() => {
    getIpClient();
  }, []);

  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <Head>
        <title>순애보 | administrator</title>

        <meta name="author" content="4LEAF SOFTWARE <4leaf.ysh@gmail.com>" />
        {/* <!-- OG tag  --> */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="순애보 수원광교점" />
        <meta property="og:site_name" content="순애보 수원광교점" />
        <meta property="og:url" content="https://www.sunaebo-az.com/" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="400" />
        <meta property="og:image" content="./og_img.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="canonical" href="https://www.sunaebo-az.com/" />

        <meta
          name="description"
          content={
            "피부에 면역을 입히다. 피부는 물론 건강까지 생각하는 화장품 순애보 다프네"
          }
        />
        <meta
          property="og:description"
          content={
            "피부에 면역을 입히다. 피부는 물론 건강까지 생각하는 화장품 순애보 다프네"
          }
        />

        <meta
          name="keywords"
          content="한방화장품, 건강화장품, 마사지크림, 림프마사지, 천연화장품, 코스메슈티컬, 순애보, 피부면역, 순애보, 순애보다프네, 다프네"
        />
        <meta
          property="og:keywords"
          content="한방화장품, 건강화장품, 마사지크림, 림프마사지, 천연화장품, 코스메슈티컬, 순애보, 피부면역, 순애보, 순애보다프네, 다프네"
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href={`https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap`}
          rel="stylesheet"
        ></link>

        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />

        <script
          type="text/javascript"
          src="https://code.jquery.com/jquery-1.12.4.min.js"
        ></script>

        <script
          type="text/javascript"
          src="https://cdn.iamport.kr/js/iamport.payment-1.1.5.js"
        ></script>

        <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>

        <script
          dangerouslySetInnerHTML={{
            __html: `
                    Kakao.init("${process.env.NEXT_PUBLIC_SNS_KAKAO_KEY}");
                    `,
          }}
        />

        <script type="text/javascript" src="../customScript.js"></script>
      </Head>
      <Component />
    </ThemeProvider>
  );
};
Fourleaf.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(Fourleaf);
