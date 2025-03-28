"use client";

import { useState } from 'react';
import CreateProject from '../../../Projects/CreateProject';
import ProjectPage from '../../../Projects/ProjectPage';

export const ProjectList = ({ projects }: any) => {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <div>
      {isCreating ? <CreateProject /> : <ProjectPage projects={projects} onCreateProject={() => setIsCreating(true)} />}
    </div>
  );
}
