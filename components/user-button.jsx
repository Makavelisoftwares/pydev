import { UserButton } from "@clerk/nextjs";

export const UserBtn = () => {
  return <UserButton afterSignOutUrl="/" />;
};
