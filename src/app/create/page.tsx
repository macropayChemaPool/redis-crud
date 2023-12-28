"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { Button, Col, Flex, Input, Row } from "antd";

export default function Home() {
  return (
    <Flex gap="middle" align="center" vertical>
      <Col>
        <Input placeholder="Basic usage" />
      </Col>
      <Col>
        <Input placeholder="Basic usage" />
      </Col>
      <Col>
        <Button type="primary">Primary Button</Button>
      </Col>
    </Flex>
  );
}
