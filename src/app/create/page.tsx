"use client";

import { Tabs } from "antd";
import { IUserForm } from "@/interfaces";
import { useMutation } from "@tanstack/react-query";
import servicePostUser from "@/services/front/servicePostUser";
import CreateContainer from "@/containers/create";
import EditContainer from "@/containers/edit";
import { useCities } from "@/queryHooks/cities";

const Create = () => {
  const { cities } = useCities();
  const { mutate } = useMutation({
    mutationKey: ["mutateUser"],
    mutationFn: (data: IUserForm) => servicePostUser(data),
  });

  const onSubmit = (data: IUserForm) => {
    console.log(data);
    mutate(data);
  };

  return (
    <Tabs
      defaultActiveKey="1"
      type="card"
      size="middle"
      items={[
        {
          label: "Create",
          key: "create",
          children: <CreateContainer cities={cities} onSubmit={onSubmit} />,
        },
        {
          label: "Data",
          key: "read",
          children: <EditContainer />,
        },
      ]}
    />
  );
};

export default Create;
