import styled from "styled-components";
import { InputText } from "primereact/inputtext";

export const Input = styled(InputText)`
  width: 100%;
  border: 2px solid #e74c2b;
  background: transparent;
  background: ${(p) => p.theme.inputBgColor && p.theme.inputBgColor};
  color: ${(p) => p.theme.inputColor && p.theme.inputColor};
`;
