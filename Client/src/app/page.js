'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';

export default function RootPage() {
  const router = useRouter();
  const { onboarded, isAuthenticated } = useApp();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
    } else if (onboarded) {
      router.replace('/home');
    } else {
      router.replace('/onboarding');
    }
  }, [isAuthenticated, onboarded, router]);

  return null;
}
