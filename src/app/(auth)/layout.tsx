
import { Navbar } from '@/components/layout/Navbar';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F4F3F8]">
      <Navbar showSidebar={false} />
      <div className="flex items-center justify-center p-4 pt-32">
        {children}
      </div>
    </div>
  );
}
