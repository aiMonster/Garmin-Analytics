import { IUserProfile } from "./user-profile.interface";

export interface IReview {
  email: string;
  message: string;
  userProfile: IUserProfile;
}