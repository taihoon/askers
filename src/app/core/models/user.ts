export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL: string;
}

export type NewUser = Omit<User, 'id'>;
