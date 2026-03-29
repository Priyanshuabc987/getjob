import { Navbar } from '@/components/layout/Navbar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="md:pl-64 pt-16">
        {children}
      </div>
    </div>
  );
}
