import { cookies } from 'next/headers';
import { createSupabaseClient } from './client';

export const createServerSupabaseClient = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('sb-access-token')?.value;
  return createSupabaseClient(token);
};
