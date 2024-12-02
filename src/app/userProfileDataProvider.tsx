import React, {ReactNode} from 'react';
import {UserProfileContext, useUserProfileDataStorage} from '../player';

export const UserProfileDataProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const {isDataLoading, setUserProfile, userProfile, resetUserProfile} =
    useUserProfileDataStorage();

  return (
    <UserProfileContext.Provider
      value={{
        isDataLoading,
        userProfile,
        setUserProfile,
        resetUserProfile,
      }}>
      {children}
    </UserProfileContext.Provider>
  );
};
