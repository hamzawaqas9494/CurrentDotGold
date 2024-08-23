import { FC, PropsWithChildren, ReactNode } from "react";

interface CardProps {
  children?: ReactNode;
  className?: string;
}

export const Card: FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`flex w-full flex-col overflow-hidden bg-white shadow sm:rounded-lg ${className}`}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({
  children,
  className = "",
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <div className={`border-b px-4 py-5 sm:px-6  ${className}`}>{children}</div>
  );
};

export const CardFooter = ({
  children,
  className = "",
}: PropsWithChildren<{ className?: string }>) => {
  return <div className={`px-4 py-4 sm:px-6 ${className}`}>{children}</div>;
};

type CardBodyProps = PropsWithChildren<{ className?: string; table?: boolean }>;

export const CardBody: FC<CardBodyProps> = ({
  children,
  className = "",
  table = false,
}) => {
  return (
    <div className={`flex-1 ${!table && "px-4"} py-5 sm:p-6 ${className}`}>
      {children}
    </div>
  );
};
