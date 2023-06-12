import React from "react";

type Props = {
  type: "success" | "upcoming" | "failed";
  className?: string;
  children?: React.ReactNode;
};

const LaunchStatusType = {
  success: "bg-success text-success",
  upcoming: "bg-pending text-pending",
  failed: "bg-warning text-warning",
};

const LaunchStatus: React.FC<Props> = ({ type, className, children, ...props }) => {
  const classNames = LaunchStatusType[type] + " " + className;
  return (
    <div className="flex justify-center" {...props}>
      <div
        className={`${classNames} px-3 py-1 text-center rounded-full font-medium text-xs inline-block`}
      >
        {children}
      </div>
    </div>
  );
};

export default LaunchStatus;
