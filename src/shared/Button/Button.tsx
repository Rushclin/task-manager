import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode; 
  variant?: "primary" | "secondary" | "danger"; 
  className?: string; 
  type?: "submit" | "reset" | "button" | undefined
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  loading = false,
  disabled = false,
  icon,
  variant = "primary",
  className = "",
  type
}) => {
  const baseStyles =
    "flex items-center space-x-1 px-4 py-2 font-medium rounded-xl transition focus:outline-none";
  const variantStyles = {
    primary: "bg-blue-100 text-blue-600 hover:bg-blue-200",
    secondary: "bg-gray-100 text-gray-600 hover:bg-gray-200",
    danger: "bg-red-100 text-red-600 hover:bg-red-200",
  };

  const isDisabled = loading || disabled;

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${isDisabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
      disabled={isDisabled}
      type={type}
    >
      {loading ? (
        <span className="flex items-center space-x-2">
          <Loader size={16} color="#3d60eb" />
          <span>Loading...</span>
        </span>
      ) : (
        <span className="flex items-center space-x-2">
          {icon}
          <span className="px-2 font-normal">{label}</span>
        </span>
      )}
    </button>
  );
};

const Loader: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = "#000" }) => {
  return (
    <svg
      className="animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      style={{ width: size, height: size, stroke: color }}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C6.477 0 2 4.477 2 10s4.477 10 10 10v-4a8 8 0 01-8-8z"
      ></path>
    </svg>
  );
};
