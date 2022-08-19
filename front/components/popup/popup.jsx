import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { POPUP_GET_REQUEST } from "../../reducers/popup";
import { Image, Wrapper } from "../commonComponents";
import useWidth from "../../hooks/useWidth";
import { withCookies } from "react-cookie";
import Theme from "../Theme";

const Popup = ({ cookies }) => {
  const dispatch = useDispatch();
  const { popups } = useSelector((state) => state.popup);

  const width = useWidth();

  useEffect(() => {
    dispatch({
      type: POPUP_GET_REQUEST,
    });
  }, []);

  ///////////// - EVENT HANDLER- ////////////
  const _closeTodayPopupHandler = (data) => {
    const popup = document.getElementById(`popup-${data.id}-js`);

    popup.style.display = "none";

    cookies.set(`popup-${data.id}`, "y", {
      path: "/",
      maxAge: 60 * 60 * 24,
    });
  };

  const _closePopupHandler = (data) => {
    const popup = document.getElementById(`popup-${data.id}-js`);
    popup.style.display = "none";
  };

  return (
    <Wrapper zIndex={`20`}>
      {popups &&
        popups.map((data, idx) => {
          if (!data.useYn) return null;

          if (cookies.get(`popup-${data.id}`) === "y") return null;

          return (
            <Wrapper
              key={data.id}
              id={`popup-${data.id}-js`}
              position={`absolute`}
              top={width > 900 ? `150px` : `100px`}
              left={width < 900 ? `50%` : `5%`}
              zIndex={`${9999 - idx}`}
              shadow={`0px 5px 10px ${Theme.lightGrey_C}`}
              margin={
                width < 1300
                  ? width < 900
                    ? `0 0 0 -175px`
                    : `0 0 0 ${idx * 200}px`
                  : `0 0 0 ${idx * 410}px`
              }
              width={width < 900 ? `350px` : `400px`}
            >
              <Wrapper>
                <Image src={data.imagePath} alt={`popup`} height={`500px`} />
              </Wrapper>
              <Wrapper dr={`row`}>
                <Wrapper
                  width={`50%`}
                  height={`50px`}
                  lineHeight={`50px`}
                  color={Theme.black_C}
                  bgColor={Theme.white_C}
                  cursor={`pointer`}
                  borderRight={`1px solid ${Theme.lightGrey_C}`}
                  onClick={() => _closeTodayPopupHandler(data)}
                >
                  1일 동안 보지 않음
                </Wrapper>
                <Wrapper
                  width={`50%`}
                  height={`50px`}
                  lineHeight={`50px`}
                  color={Theme.black_C}
                  bgColor={Theme.white_C}
                  cursor={`pointer`}
                  borderLeft={`1px solid ${Theme.lightGrey_C}`}
                  onClick={() => _closePopupHandler(data)}
                >
                  닫기
                </Wrapper>
              </Wrapper>
            </Wrapper>
          );
        })}
    </Wrapper>
  );
};

export default withCookies(Popup);
