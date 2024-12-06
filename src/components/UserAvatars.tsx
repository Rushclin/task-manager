import { UserDto } from "@/app/tasks/types";
import React from "react";

interface UserAvatarsProps {
  users: UserDto[];
  max: number;
}

export const UserAvatars: React.FC<UserAvatarsProps> = ({ users, max }) => {
  const visibleUsers = users.slice(0, max);
  const remainingCount = users.length - max;

  return (
    <div className="flex -space-x-2">
      {visibleUsers.map((user, index) => (
        <img
          key={index}
          className="w-8 h-8 rounded-full border-2 border-white"
          src={user.profilePicture}
          alt={user.name}
        />
      ))}
      {remainingCount > 0 && (
        <div className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-white bg-blue-400 text-sm text-white font-thin">
          +{remainingCount}
        </div>
      )}
    </div>
  );
};
