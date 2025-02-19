import { ImageSourcePropType } from "react-native";

export interface UserProfileData {
  userName: string;
  avatar?: string;
  about: string;
  stones: Stone[];
  boughtStones: string[];
  score: number;
  transactions: Transaction[];
  collections: Collection[];
  isOnboardingCompleted: boolean;
  lastDailyHoldResult: number;
  lastDailyHoldDate: number;
  completedLevels: number;
}

export interface Collection {
  id: string;
  title: string;
  stones: string[];
}

export interface Stone {
  image: ImageSourcePropType;
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  price: number;
}

export enum TransactionType {
  Game = 'Game',
  StonePurchase = 'Stone purchase',
}

interface Transaction {
  id: string;
  title: string;
  amount: number;
  isPositive: boolean;
  type: TransactionType;
}
