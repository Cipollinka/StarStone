import { ImageSourcePropType } from "react-native";

export interface UserProfileData {
  stones: Stone[];
  boughtStones: string[];
  score: number;
  transactions: Transaction[];
  collections: Collection[];
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
