import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Wrapper } from "./commonComponents";
import Fade from "react-reveal/Fade";

const CustomWrapper = styled(Wrapper)`
  .react-reveal {
    width: ${(props) => props.fadeWidth || `auto`};
    height: ${(props) => props.fadeHeight || `auto`};
    backdrop-filter: ${(props) => (props.isFilter ? `blur(5px)` : ``)};
  }
`;

const CustomFade = ({ option, type, children, delay, duration }) => {
  return (
    <CustomWrapper {...option}>
      <Fade duration={delay} {...type} delay={duration}>
        {children}
      </Fade>
    </CustomWrapper>
  );
};

export default CustomFade;
