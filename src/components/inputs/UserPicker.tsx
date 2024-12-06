import { UserDto } from "@/app/tasks/types";
import React, { useState } from "react";

interface UserPickerProps {
  users: UserDto[];
  selectedUsers: UserDto[];
  onChange: (selected: UserDto[]) => void;
}

const UserPicker: React.FC<UserPickerProps> = ({
  users,
  selectedUsers,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleUserClick = (user: UserDto) => {
    const isAlreadySelected = selectedUsers.find((u) => u.id === user.id);
    const updatedUsers = isAlreadySelected
      ? selectedUsers.filter((u) => u.id !== user.id)
      : [...selectedUsers, user];
    onChange(updatedUsers);
  };

  return (
    <div className="relative w-full">
      <div
        className="flex items-center gap-2 px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg cursor-pointer"
        onClick={toggleDropdown}
      >
        <div className="flex -space-x-2">
          {selectedUsers.map((user) => (
            <img
              key={user.id}
              src={user.profilePicture}
              alt={user.name}
              className="w-8 h-8 rounded-full border-2 border-white"
              title={user.name}
            />
          ))}
        </div>

        {selectedUsers.length === 0 && (
          <span className="text-gray-500">Select users...</span>
        )}

        <svg
          className={`w-4 h-4 ml-auto transform transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-md max-h-60 overflow-y-auto">
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => handleUserClick(user)}
              className={`flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                selectedUsers.find((u) => u.id === user.id) ? "bg-blue-100" : ""
              }`}
            >
              <img
                src={user.profilePicture}
                alt={user.name}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm">{user.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserPicker;
