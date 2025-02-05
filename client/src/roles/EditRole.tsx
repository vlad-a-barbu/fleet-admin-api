import { Edit, SimpleForm, TextInput, required } from "react-admin";

export default function EditRole() {
  return (
    <Edit>
      <SimpleForm>
        <TextInput disabled label="Id" source="id" />
        <TextInput source="name" validate={required()} />
        <TextInput source="type" validate={required()} />
      </SimpleForm>
    </Edit>
  );
}
