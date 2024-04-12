import { ReactNode } from "react";
import { UserIN } from "../userTypes/User";
import { VoteTypeStructure } from "../voteTypes/voteType";

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
  path?: string;
}

export interface VoteStateType {
  voteOptions: string[];
  setVoteOptions: (voteOptions: string[]) => void;
}

export interface VoteSectionType {
  voteSection: VoteTypeStructure[];
  setVoteSection: (voteSection: VoteTypeStructure[]) => void;
}
