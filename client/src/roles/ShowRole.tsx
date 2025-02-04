import { Show, SimpleShowLayout, TextField } from "react-admin";

export const ShowRole = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="name" />
      <TextField source="type" />
    </SimpleShowLayout>
  </Show>
);
