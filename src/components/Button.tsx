import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  className?: string;
  type?: "submit" | "reset" | "button" | undefined;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  loading = false,
  disabled = false,
  icon,
  variant = "primary",
  className = "",
  type,
}) => {
  const baseStyles =
    "flex items-center space-x-1 px-4 py-2 font-medium rounded-xl transition-all duration-200 ease-in-out focus:outline-none";
  const variantStyles = {
    primary: "bg-blue-100 text-blue-600 hover:bg-blue-200 hover:scale-105",
    secondary: "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105",
    danger: "bg-red-100 text-red-600 hover:bg-red-200 hover:scale-105",
  };

  const isDisabled = loading || disabled;

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${
        isDisabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
      disabled={isDisabled}
      type={type}
    >
      {loading ? (
        <span className="flex items-center space-x-2">
          <Loader />
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

const Loader: React.FC = () => {
  return (
    <svg
      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
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
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};
