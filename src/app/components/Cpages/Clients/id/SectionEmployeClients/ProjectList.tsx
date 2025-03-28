"use client";

import { useState } from 'react';
import ProjectPage from '../../../Projects/ProjectPage';
import CreateUserPage from '../../../User/CreateUser';

export const ProjectList = ({ projects }: any) => {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <div>
      {isCreating ? <CreateUserPage /> : <ProjectPage projects={projects} onCreateProject={() => setIsCreating(true)} />}
    </div>
  );
}
