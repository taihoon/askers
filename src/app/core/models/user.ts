export interface User {
  id: string;
  email: string;
  displayName: string;
}

export type NewUser = Omit<User, 'id'>;
