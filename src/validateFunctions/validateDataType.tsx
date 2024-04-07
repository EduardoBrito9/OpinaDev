import { UserIN } from "../types/User";
import { UserMetadataIN } from "../types/userMetaData";

export const validatingPhoto = (value: unknown): value is UserMetadataIN => {
  if (value && typeof value === "object" && "avatar_url" in value) {
    return true;
  } else {
    return false;
  }
};

export const validateSession = (value: unknown): value is UserIN => {
  if (value && typeof value === "object" && "user" in value) {
    return true;
  } else {
    return false;
  }
};
