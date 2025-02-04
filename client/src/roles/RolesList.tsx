import { List, Datagrid, TextField } from "react-admin";

export const RolesList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="type" />
    </Datagrid>
  </List>
);
