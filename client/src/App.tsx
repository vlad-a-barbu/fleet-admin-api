import { Admin, Resource, Datagrid, List, TextField } from "react-admin";
import { Layout } from "./Layout";
import dataProvider from "./dataProvider";

export const RoleList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="type" />
    </Datagrid>
  </List>
);

export const App = () => (
  <Admin layout={Layout} dataProvider={dataProvider}>
    <Resource name="roles" list={RoleList} />
  </Admin>
);
