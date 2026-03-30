
import { Navbar } from '@/components/layout/Navbar';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F4F3F8] flex flex-col">
      <Navbar showSidebar={false} />
      <div className="flex-1 flex items-center justify-center p-4 py-20">
        <div className="w-full max-w-md mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
