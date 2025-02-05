import { List, Datagrid, TextField } from "react-admin";

export default function RolesList() {
  return (
    <List>
      <Datagrid>
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="type" />




      </Datagrid>
    </List>
  );
}
