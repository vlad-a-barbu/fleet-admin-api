import { Show, SimpleShowLayout, TextField } from "react-admin";

export default function ShowRole() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="name" />
        <TextField source="type" />
      </SimpleShowLayout>
    </Show>
  );
}
