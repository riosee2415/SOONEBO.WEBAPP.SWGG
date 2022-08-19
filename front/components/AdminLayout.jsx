import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import AdminMenu from "./admin/AdminMenu";
import styled from "styled-components";
import useWidth from "../hooks/useWidth";

const AdminCol = styled(Col)`
  height: 100vh;

  & .ant-menu-inline {
    height: 100%;
    overflow: auto;

    @media (max-width: 900px) {
      height: auto;
    }
  }

  @media (max-width: 900px) {
    width: 100%;
    height: auto;
  }
`;

const AdminCol2 = styled(Col)`
  height: 100vh;
  overflow: auto;

  @media (max-width: 900px) {
    height: auto;
  }
`;

const AdminLayout = ({ children }) => {
  const width = useWidth();
  return (
    <Row>
      <AdminCol span={width < 900 ? 24 : 3}>
        <AdminMenu />
      </AdminCol>
      <AdminCol2 span={width < 900 ? 24 : 21}>{children}</AdminCol2>
    </Row>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
