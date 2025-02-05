import type { ReactNode } from "react";
import { Layout as RALayout, CheckForApplicationUpdate } from "react-admin";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <RALayout>
      {children}
      <CheckForApplicationUpdate />
    </RALayout>
  );
}
