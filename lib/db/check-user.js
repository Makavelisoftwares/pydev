import { auth, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "./db";

export const CheckUser = async () => {
  const { userId } = auth();
  const { emailAddresses, firstName, lastName,imageUrl } = await currentUser();

  let user;

  if (userId == null) {
    return redirect("/sign-in");
  }

  const get_user = await db.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  if (!get_user) {
    const create_user = await db.user.create({
      data: {
        clerkId: userId,
        email: emailAddresses[0].emailAddress,
        name: `${firstName} ${lastName}`,
        image:imageUrl
      },
    });

    user = create_user;
  }

  return { user };
};
