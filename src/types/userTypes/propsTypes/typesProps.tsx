import { ReactNode } from "react";
import { UserIN } from "../User";

export interface PropType {
  modalRef: React.MutableRefObject<HTMLDivElement | null>;
  miniModal: boolean;
  setMiniModal: (miniModal: boolean) => void;
  user?: UserIN;
}

export interface buttonChildren {
  children: ReactNode;
  className?: string;
  onclickButton?: () => void;
}
