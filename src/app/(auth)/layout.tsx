import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function layout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (session) {
    redirect('/admin'); // Redirect to login if not authenticated
  }
  return <>{children}</>;
}
