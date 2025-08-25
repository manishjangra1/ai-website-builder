'use server';

import { prisma } from '@/lib/prisma';
import { WebsiteData } from '@/lib/validations/sections';
import { revalidatePath } from 'next/cache';

export async function saveProject(projectId: string | null, data: WebsiteData) {
  try {
    if (projectId) {
      const updated = await prisma.project.update({
        where: { id: projectId },
        data: {
          title: data.title,
          description: data.description,
          content: data.sections as any,
        }
      });
      return { success: true, project: updated };
    } else {
      const created = await prisma.project.create({
        data: {
          title: data.title,
          description: data.description,
          content: data.sections as any,
          userId: 'default-user', // In a real app, get from session
        }
      });
      return { success: true, project: created };
    }
  } catch (error) {
    console.error('Save error:', error);
    return { success: false, error: 'Failed to save project' };
  }
}

export async function getProject(id: string) {
  try {
    const project = await prisma.project.findUnique({
      where: { id },
    });
    return project;
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
}

export async function getAllProjects() {
  try {
    return await prisma.project.findMany({
      orderBy: { updatedAt: 'desc' },
    });
  } catch (error) {
    return [];
  }
}
 