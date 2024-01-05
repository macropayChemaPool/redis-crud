export interface IUserForm {
  userName: string;
  nickName: string;
  city: string;
}

export interface ICity {
  createdOn: string;
  entity_id: string;
  entity_key: string;
  id: string;
  key: string;
  name: string;
  updatedOn: string;
}

export interface ISelectOptions {
  value: string;
  label: string;
}
