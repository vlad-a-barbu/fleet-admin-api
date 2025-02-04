import { Create, SimpleForm, TextInput, required } from "react-admin";

export const CreateRole = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" validate={[required()]} />
      <TextInput source="type" validate={[required()]} />
    </SimpleForm>
  </Create>
);
