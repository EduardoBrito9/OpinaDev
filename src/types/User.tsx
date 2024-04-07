import { AppMetadataIN } from "./appMetaData";
import { UserMetadataIN } from "./userMetaData";

export interface UserIN {
  app_metadata: AppMetadataIN;
  aud: string;
  confirmed_at: string;
  created_at: string;
  email: string;
  email_confirmed_at: string;
  id: string;
  identities: []; 
  is_anonymous: boolean;
  last_sign_in_at: string;
  phone: string;
  role: string;
  updated_at: string;
  user_metadata: UserMetadataIN;
}
