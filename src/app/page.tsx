import { redirect } from 'next/navigation';

export default function RootPage() {
  // Direct landing to the primary marketplace/engine
  redirect('/jobs');
}
