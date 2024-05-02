import {
  CommentsArray,
  UpdateVote,
  VoteSectionType,
  VoteTableType,
  VoteTypeStructure,
} from "../types/propsTypes/typesProps";
import { UserIN } from "../types/userTypes/User";
import { UserMetadataIN } from "../types/userTypes/userMetaData";

//funcao para validar o userMetaData e conseguir acessar as propriedades
export const validatingPhoto = (value: unknown): value is UserMetadataIN => {
  if (value && typeof value === "object" && "avatar_url" in value) {
    return true;
  } else {
    return false;
  }
};

//funcao para validar o user e conseguir acessar as propriedades
export const validateSession = (value: unknown): value is UserIN => {
  if (value && typeof value === "object" && "user" in value) {
    return true;
  } else {
    return false;
  }
};

//funcao para validar o tipo de data que estou puxando para os posts

export const validateDataPostType = (
  value: unknown,
): value is VoteSectionType => {
  if (Array.isArray(value) && value.every((item) => "id" in item)) {
    return true;
  } else {
    return false;
  }
};

// funcao para validar o tipo de data para voteTable (se a tabela de votos dentro do post eh valida)

export const validateDataVoteTableType = (
  value: unknown,
): value is VoteTableType => {
  if (value && typeof value === "object" && "users_already_voted" in value) {
    return true;
  } else {
    return false;
  }
};

//function para verificar se a opcao em que o usuario votou existe.

export const validateVoteOptionUser = (
  value: unknown,
  optionName: string,
): value is UpdateVote => {
  if (value && typeof value === "object" && optionName in value) {
    return true;
  } else {
    return false;
  }
};

//funcao para tipagem de cada coluna puxada da table DevOpina para profile Page

export const validateDataProfile = (
  value: unknown,
): value is VoteTypeStructure => {
  if (
    value &&
    typeof value === "object" &&
    "id" in value &&
    "created_at" in value &&
    "endDate" in value &&
    "title" in value
  ) {
    return true;
  } else {
    return false;
  }
};

//funcao para verificacao dos dados da table "comments"

export const validateDataComments = (
  value: unknown,
): value is CommentsArray => {
  if (Array.isArray(value) && value.every((item) => "commentsColumn" in item)) {
    return true;
  } else {
    return false;
  }
};
