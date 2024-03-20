import { Button } from "@/components/ui/button";
import { UserBtn } from "@/components/user-button";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

export const Header = () => {
  const { userId } = auth();

  return (
    <div className="flex items-center justify-between">
      <div>
        <Link
          href="/"
          className="bg-gradient-to-br from-fuchsia-600 to-amber-300/50 text-white p-2 rounded-md"
        >
          PyDev
        </Link>
      </div>
      <div>
        {userId !== null ? (
          <div className="flex items-center space-x-4">
            <Button asChild variant="outline" size="sm">
              <Link href="/editor">Compiler</Link>
            </Button>
            <Button asChild variant="link" size="sm">
              <Link href="/forums">forums</Link>
            </Button>
            <UserBtn />
          </div>
        ) : (
          <div>
            <Button asChild variant="destructive" size="sm">
              <Link href="/sign-in">Login</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
