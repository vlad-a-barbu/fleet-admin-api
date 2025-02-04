import { Admin, Resource } from "react-admin";
import { Layout } from "./Layout";
import roles from "./roles";
import dataProvider from "./dataProvider";

export const App = () => (
  <Admin layout={Layout} dataProvider={dataProvider}>
    <Resource name="roles" {...roles} />
  </Admin>
);
