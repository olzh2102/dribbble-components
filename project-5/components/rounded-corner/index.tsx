export default function RoundedCorner({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full p-3 bg-[#1b1b1e] dark:bg-white">
      <div className="relative w-full h-full p-3 rounded-xl bg-transparent">
        {children}
      </div>
    </div>
  );
}
