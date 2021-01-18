/* 
Specifying undefined means that the route doesn't have params. 
A union type with undefined (e.g. SomeType | undefined) means that params are optional.
*/
type RootStackParamList = {
  Home: undefined;
  Details: { itemId: number } | undefined;
  Profile: { userId: string };
  Feed: { sort: 'latest' | 'top' } | undefined;
};

type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};
