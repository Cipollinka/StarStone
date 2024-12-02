import {createContext, useContext} from 'react';
import {UserProfileData} from './types.ts';

export const UserProfileContext = createContext<UserContextProps | undefined>(
  undefined,
);

export const useUserDataProfile = () => {
  const context = useContext(UserProfileContext);

  if (!context) {
    throw new Error('useUser must be used within a UserContext');
  }

  return context;
};

interface UserContextProps {
  userProfile: UserProfileData | null;
  setUserProfile: (newState: UserProfileData) => Promise<void>;
  resetUserProfile: () => void;
  isDataLoading: boolean;
}
