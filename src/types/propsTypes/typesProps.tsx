import { ReactNode } from "react";
import { UserIN } from "../userTypes/User";

export interface PropType {
  modalRef: React.MutableRefObject<HTMLDivElement | null>;
  miniModal: boolean;
  setMiniModal: (miniModal: boolean) => void;
  user?: UserIN;
}

export interface ButtonPropType {
  children: ReactNode;
  className?: string;
  onclickButton?: () => void;
  path?:string;
}

export interface VoteStateType {
  votes: string[];
  setVotes: (votes: string[]) => void;
}
