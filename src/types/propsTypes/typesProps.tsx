import { ReactNode } from "react";

export interface PropType {
  modalRef?: React.MutableRefObject<HTMLDivElement | null>;
  miniModal?: boolean;
  setMiniModal: (miniModal: boolean) => void;
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
  onChange?: ({ target }: { target: HTMLInputElement }) => void;
  id?: string;
  name?: string;
  value: string;
  placeholder: string;
}

//vote types
export interface VoteStateType {
  voteOptions: string[];
  setVoteOptions: (voteOptions: string[]) => void;
  placeholder: string;
  erros: string[];
  setErros: (erros: string[]) => void;
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
  url: string;
}
export interface VoteSectionType {
  voteSection: VoteTypeStructure[];
  setVoteSection: (voteSection: VoteTypeStructure[]) => void;
  loadingPost?: boolean
}

export interface VoteDataType {
  title: string;
  description: string;
  voteOptions: string[];
  endDate: string;
  setIsDisabled: (isDisabled: boolean) => void;
}

export interface VoteTableType {
  created_at: string;
  id: number;
  option1: number;
  option2: number;
  post_id: string;
  users_already_voted: string[];
}

export interface UpdateVote {
  [key: string]: number;
  columnName: number;
}

//comments

export interface CommentsDataType {
  commentsColumn: string;
  created_at: string;
  id: number;
  post_id: string;
  url: string;
  user_id: string;
  user_name: string;
}

export interface CommentsArray {
  data: CommentsDataType[];
}
