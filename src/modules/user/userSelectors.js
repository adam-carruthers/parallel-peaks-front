// The user is logged in if the state object is NOT null
export const userIsLoggedIn = state => (state.user?.username !== undefined);

export const getUser = state => state.user;

export const userId = state => state.user?.id;
export const userToken = state => state.user?.token;
export const userUsername = state => state.user?.username;
export const userEntry = state => state.user?.matching_entry;

export const userIsMatcher = state => state.user?.is_matcher === true;
export const userIsModerator = state => state.user?.is_moderator === true;
export const userIsStaff = state => state.user?.is_staff === true;