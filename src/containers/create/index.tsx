import { ICity, IUserForm } from "@/interfaces";
import { Form, Flex, Col, Input, Button, Select, Row, Space } from "antd";
import { Controller, useForm } from "react-hook-form";

const CreateContainer = ({
  cities,
  onSubmit,
}: {
  cities: ICity[];
  onSubmit: (data: IUserForm) => void;
}) => {
  const { control, handleSubmit } = useForm<IUserForm>({
    defaultValues: {
      nickName: "",
      userName: "",
      city: undefined,
    },
  });

  return (
    <Form onFinish={handleSubmit(onSubmit)}>
      <Row align="middle" justify="center">
        <Space direction="vertical">
          <Col span={24}>
            <Controller
              control={control}
              name="userName"
              render={({ field }) => <Input {...field} placeholder="Name" />}
            />
          </Col>
          <Col span={24}>
            <Controller
              control={control}
              name="nickName"
              render={({ field }) => (
                <Input {...field} placeholder="Nickname" />
              )}
            />
          </Col>
          <Col span={24}>
            <Controller
              control={control}
              name="city"
              render={({ field }) => (
                <Select
                  {...field}
                  allowClear
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="City"
                  size="large"
                  options={cities}
                />
              )}
            />
          </Col>
          <Col span={24}>
            <Button htmlType="submit" type="primary">
              Save
            </Button>
          </Col>
        </Space>
      </Row>
    </Form>
  );
};

export default CreateContainer;
