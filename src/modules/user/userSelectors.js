// The user is logged in if the state object is NOT null
export const userIsLoggedIn = state => (state.user?.username !== undefined);

export const userIsMatcher = state => state.user?.isMatcher === true;