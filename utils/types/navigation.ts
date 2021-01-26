/* 
Specifying undefined means that the route doesn't have params. 
A union type with undefined (e.g. SomeType | undefined) means that params are optional.
*/
type RootStackParamList = {
  Home: undefined;
  Details: { itemId: number } | undefined;
  Profile: { userId: string };
  Watchlist: undefined;
  Search: undefined;
  Feed: { sort: 'latest' | 'top' } | undefined;
};

type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
};
