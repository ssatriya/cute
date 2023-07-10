import React from "react";
import { Avatar } from "../ui/Avatar";
import { Icons } from "../Icons";

export default function UserAvatar() {
  return (
    <Avatar className="flex justify-center items-center">
      <span className="sr-only">Account</span>
      <Icons.user className="h-4 w-4" />
    </Avatar>
  );
}
