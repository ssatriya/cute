import { getAuthSession } from "./auth";

export const getCurrentUser = async () => {
  const session = await getAuthSession();

  return session?.user;
};
