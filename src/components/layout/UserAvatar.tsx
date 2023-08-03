import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { Icons } from "../Icons";
import { AvatarProps } from "@radix-ui/react-avatar";
import { User } from "next-auth";
import Image from "next/image";

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "image" | "name">;
}

export default function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {user.image && user.name ? (
        // <AvatarImage alt={user.name || "Picture"} src={user.image} />
        <Image
          className="w-full h-full aspect-square"
          alt={user.name}
          src={user.image}
          height={96}
          width={96}
          priority={true}
        />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user.name}</span>
          <Icons.user className="w-4 h-4 " />
        </AvatarFallback>
      )}
    </Avatar>
  );
}
