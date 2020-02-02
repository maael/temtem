export interface ListResponse<T> {
  data: T;
  before?: string;
  after?: string;
}

export interface ListRequestParams {
  _size?: number;
  _cursor?: string;
}

export enum TemtemGender {
  MALE = "MALE",
  FEMALE = "FEMALE"
}

export interface User {
  _id: string;
  redditId: string;
  redditName: string;
  redditIcon: string;
  redditDarkmode: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export type UserInput = Pick<
  User,
  | "redditId"
  | "redditName"
  | "redditIcon"
  | "redditDarkmode"
  | "isActive"
  | "createdAt"
  | "updatedAt"
>;

export type UserPartialInput = Partial<Pick<User, "isActive" | "updatedAt">>;

export interface UserPreference {
  _id: string;
  userId: string;
  key: string;
  value: string;
  createdAt: string;
  updatedAt: string;
}

export type UserPreferenceInput = Pick<
  UserPreference,
  "userId" | "key" | "value" | "createdAt" | "updatedAt"
>;

export type UserPreferencePartialInput = Partial<
  Pick<UserPreference, "userId" | "key" | "value" | "updatedAt">
>;

export interface ExchangeListing {
  _id: string;
  userId: string;
  temtem: ListingTemtem;
  request: ListingRequest;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface ListingTemtem {
  name: string;
  gender: TemtemGender;
  fertility: number;
  trait: string;
  bredTechniques: ReadonlyArray<string>;
  svs: ListingTemtemSvs;
}

export interface ListingTemtemSvs {
  hp: number;
  sta: number;
  spd: number;
  atk: number;
  def: number;
  spatk: number;
  spdef: number;
}

export interface ListingRequest {
  cost?: number;
  details?: string;
}

export type ExchangeListingInput = Pick<
  ExchangeListing,
  "userId" | "temtem" | "request" | "isActive" | "createdAt" | "updatedAt"
>;

export type ExchangeListingPartialInput = Partial<
  Pick<ExchangeListing, "userId" | "request" | "isActive" | "updatedAt">
> & { temtem: Partial<ListingTemtem> };

export interface ExchangeSaved {
  _id: string;
  userId: string;
  exchangeListId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export type ExchangeSavedInput = Pick<
  ExchangeSaved,
  "userId" | "exchangeListId" | "isActive" | "createdAt" | "updatedAt"
>;

export type ExchangeSavedPartialInput = Pick<ExchangeSaved, "isActive">;

export interface TempediaEntry {
  _id: string;
  userId: string;
  temtemName: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export type TempediaEntryInput = Pick<
  TempediaEntry,
  "userId" | "temtemName" | "isActive" | "createdAt" | "updatedAt"
>;

export type TempediaEntryPartialInput = Pick<TempediaEntry, "isActive">;

export interface TrackedQuest {
  _id: string;
  userId: string;
  questName: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export type TrackedQuestInput = Pick<TrackedQuest, "userId" | "questName">;

export type TrackedQuestPartial = Pick<TrackedQuest, "isActive">;
