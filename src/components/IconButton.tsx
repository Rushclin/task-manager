import React from "react";

interface IconButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onClick,
  loading = false,
  disabled = false,
  className = "",
}) => {
  const isDisabled = loading || disabled;

  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className={`${className} rounded-full p-2 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow-lg disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
      type="button"
    >
      {icon}
    </button>
  );
};
