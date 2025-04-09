import { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-6 lg:gap-8">
      {children}
    </div>
  );
}