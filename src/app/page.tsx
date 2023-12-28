"use client";

import { Col, Row, Select } from "antd";
import { useCities } from "@/queryHooks/cities";

export default function Home() {
  const { cities, isLoadingCities } = useCities();

  console.log("cities", cities);

  return (
    <Row justify="center">
      <Col span={8}>
        <Select
          allowClear
          showSearch
          style={{ width: "100%" }}
          placeholder="Ciudad"
          size="large"
          options={cities}
        ></Select>
      </Col>
    </Row>
  );
}
