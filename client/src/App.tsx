import { Admin, Resource } from "react-admin";
import roles from "./roles";
import dataProvider from "./dataProvider";
import Layout from "./Layout";

export default function App() {
  return (
    <Admin layout={Layout} dataProvider={dataProvider}>
      <Resource name="roles" {...roles} />
    </Admin>
  );
}
