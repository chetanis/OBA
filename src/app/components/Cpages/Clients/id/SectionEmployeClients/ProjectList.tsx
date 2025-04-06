"use client";

import { useState } from 'react';
import CreateProject from '../../../Projects/CreateProject';
import ProjectPage from '../../../Projects/ProjectPage';

export const ProjectList = ({ client }: any) => {
  const [isCreating, setIsCreating] = useState(false);
  console.log("client", client);
  

  return (
    <div>
      {isCreating ? <CreateProject onCancel={() => setIsCreating(false)} clientId={client.id} /> : <ProjectPage projects={client.projects} onCreateProject={() => setIsCreating(true)} />}
    </div>
  );
}
