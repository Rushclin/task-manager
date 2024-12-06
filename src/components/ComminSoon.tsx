import React from "react";
interface ComminSoonProps {
  title: string;
  description?: string;
}
const ComminSoon: React.FC<ComminSoonProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col items-center justify-center py-5">
      <h3 className="text-5xl font-bold mb-8 animate-pulse">{title}</h3>

      <p>{description}</p>
    </div>
  );
};

export default ComminSoon;
