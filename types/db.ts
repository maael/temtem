export interface ListResponse<T> {
  data: T;
  before?: string;
  after?: string;
}

export interface ListRequestParams {
  _size?: number;
  _cursor?: string;
}

export type RawCreateInput<T> = Omit<T, "isActive" | "createdAt" | "updatedAt">;

export enum TemtemGender {
  MALE = "MALE",
  FEMALE = "FEMALE"
}

export enum ExchangeListingType {
  REQUEST = "REQUEST",
  LISTING = "LISTING"
}

export enum UserReviewType {
  GOOD = "GOOD",
  MIXED = "MIXED",
  BAD = "BAD"
}

export interface Entity {
  _id: string;
  _ts: string;
}

export interface User extends Entity {
  redditId?: string;
  redditName?: string;
  redditIcon?: string;
  redditDarkmode?: boolean;
  discordId?: string;
  discordName?: string;
  discordDiscriminator?: string;
  discordFullName?: string;
  discordIcon?: string;
  temtemName?: string;
  steamId?: string;
  goodReviews: number;
  mixedReviews: number;
  badReviews: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export type UserInput = Omit<User, "_id" | "_ts" | "deletedAt">;
export type UserPartialInput = Partial<Omit<User, "_id" | "_ts">>;

export interface UserReview extends Entity {
  targetUserId: string;
  sourceUserId: string;
  type: UserReviewType;
  createdAt: string;
  updatedAt: string;
  isValid: boolean;
}

export type UserReviewInput = Omit<UserReview, "_id" | "_ts">;
export type UserReviewPartialInput = Partial<Omit<UserReview, "_id" | "_ts">>;

export interface UserPreference extends Entity {
  userId?: string;
  user: User;
  key: string;
  value: string;
  createdAt: string;
  updatedAt: string;
}

export type UserPreferenceInput = Omit<UserPreference, "_id" | "_ts" | "user">;
export type UserPreferencePartialInput = Partial<
  Omit<UserPreference, "_id" | "_ts" | "user">
>;

export interface Activity extends Entity {
  userId?: string;
  user: User;
  type: string;
  createdAt: string;
}

export type ActivityInput = Omit<Activity, "_id" | "_ts" | "user">;

export interface ExchangeListing extends Entity {
  userId: string;
  user: User;
  type: ExchangeListingType;
  temtemName: string;
  temtemGender: TemtemGender;
  temtemFertility: number;
  temtemTrait: string;
  temtemBredTechniques: string[];
  temtemIsLuma: boolean;
  svHp?: number;
  svSta?: number;
  svSpd?: number;
  svAtk?: number;
  svDef?: number;
  svSpatk?: number;
  svSpdef?: number;
  requestCost?: number;
  requestDetails?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export type ExchangeListingInput = Omit<
  ExchangeListing,
  "_id" | "_ts" | "user" | "deletedAt"
>;
export type ExchangeListingPartialInput = Partial<
  Omit<ExchangeListing, "_id" | "_ts" | "user">
>;

export interface ExchangeSaved extends Entity {
  userId: string;
  user: User;
  exchangeListingId: string;
  exchangeListing: ExchangeListing;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export type ExchangeSavedInput = Omit<
  ExchangeSaved,
  "_id" | "_ts" | "user" | "deletedAt" | "exchangeListing"
>;
export type ExchangeSavedPartialInput = Partial<
  Omit<ExchangeSaved, "_id" | "_ts" | "user">
>;

export interface TempediaEntry extends Entity {
  userId: string;
  user: User;
  temtemName: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export type TempediaEntryInput = Omit<
  TempediaEntry,
  "_id" | "_ts" | "user" | "deletedAt"
>;
export type TempediaEntryPartialInput = Partial<
  Omit<TempediaEntry, "_id" | "_ts" | "user">
>;

export interface TrackedQuest extends Entity {
  userId: string;
  user: User;
  questName: string;
  questStarted: boolean;
  questStep: null | number;
  questFinished: boolean;
  questNote?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export type TrackedQuestInput = Omit<
  TrackedQuest,
  "_id" | "_ts" | "user" | "deletedAt"
>;
export type TrackedQuestPartialInput = Partial<
  Omit<TrackedQuest, "_id" | "_ts" | "user">
>;

export interface Encounter {
  userId: string;
  user?: User;
  temtemName: string;
  isLuma: boolean;
  wasCaught: boolean;
  location: string;
  trait: string;
  createdAt: string;
  updatedAt?: string;
}
