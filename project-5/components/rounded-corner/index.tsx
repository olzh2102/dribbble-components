import React from "react";

export default function RoundedCorner({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full p-3 bg-black">
      <div className="w-full h-full p-3 rounded-xl bg-white">{children}</div>
    </div>
  );
}
