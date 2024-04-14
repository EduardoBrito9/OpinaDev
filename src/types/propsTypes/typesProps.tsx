import { ReactNode } from "react";
import { UserIN } from "../userTypes/User";

export interface PropType {
  modalRef: React.MutableRefObject<HTMLDivElement | null>;
  miniModal: boolean;
  setMiniModal: (miniModal: boolean) => void;
  user?: UserIN;
}
//interface para propriedades do elemento button
export interface ButtonType {
  children: ReactNode;
  className?: string;
  onclickButton?: () => void;
  path?: string;
}

//interface para propriedades do elemento input

export interface InputType {
  type: string;
  onChange: ({ target }: { target: HTMLInputElement }) => void;
  id: string;
  name: string;
  value: string;
}

//vote types
export interface VoteStateType {
  voteOptions: string[];
  setVoteOptions: (voteOptions: string[]) => void;
}
export interface VoteTypeStructure {
  created_at: string;
  created_by: string;
  description: string;
  endDate: string;
  id: string;
  title: string;
  user_name: string;
  voteOptions: string[];
}
export interface VoteSectionType {
  voteSection: VoteTypeStructure[];
  setVoteSection: (voteSection: VoteTypeStructure[]) => void;
}
