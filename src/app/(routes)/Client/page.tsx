"use client";
import MainPageClient from '@/app/components/Cpages/Clients/MainPageClient';
import { useState } from 'react';

const Client = () => {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <>
      {isCreating ? <CreateUserPage /> : <MainPageClient onCreateClient={() => setIsCreating(true)} />}
    </>
  );
}

export default Client