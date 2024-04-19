import { User } from '../../types/types';
import supabase from '../supabase';

export async function createUser({
  firstName,
  lastName,
  email,
  password,
}: User) {
  if (email && password) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          firstName,
          lastName,
        },
      },
    });

    if (error) throw new Error(error.message);

    return data;
  }
}

export async function getUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function loginUser({ email, password }: User) {
  if (email && password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw new Error(error.message);

    return data;
  }
}

export async function logoutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateUser({ firstName, lastName }: User) {
  const { data, error } = await supabase.auth.updateUser({
    data: { firstName, lastName },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function updatePassword({ password }: User) {
  const { data, error } = await supabase.auth.updateUser({
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}
