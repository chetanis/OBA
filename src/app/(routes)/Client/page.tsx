"use client";
import CreateClientPage from '@/app/components/Cpages/Clients/CreateClient';
import MainPageClient from '@/app/components/Cpages/Clients/MainPageClient';
import { useState } from 'react';

const Client = () => {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <>
      {isCreating ? <CreateClientPage /> : <MainPageClient onCreateClient={() => setIsCreating(true)} />}
    </>
  );
}

export default Client