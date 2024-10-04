import { ReactNode } from "react";
import { ThemedText } from "./ThemedText";

const Bold = ({ children }: { children: ReactNode }) => (
  <ThemedText style={{ fontWeight: "bold" }}>{children}</ThemedText>
);

export { Bold };
