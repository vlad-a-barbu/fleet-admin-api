import { Edit, SimpleForm, TextInput, required } from "react-admin";

export const EditRole = () => (
  <Edit>
    <SimpleForm>
      <TextInput disabled label="Id" source="id" />
      <TextInput source="name" validate={required()} />
      <TextInput source="type" validate={required()} />
    </SimpleForm>
  </Edit>
);
