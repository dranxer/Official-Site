import { PrismaClient } from '@prisma/client';
import { getSession } from 'next-auth/react';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const session = await getSession({ req });

  switch (req.method) {
    case 'GET':
      try {
        const posts = await prisma.blogPost.findMany({
          where: {
            published: true
          },
          include: {
            author: {
              select: {
                name: true,
                email: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        });
        res.status(200).json(posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Failed to fetch posts' });
      }
      break;

    case 'POST':
      if (!session) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      try {
        const { title, content, excerpt, imageUrl } = req.body;
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

        const post = await prisma.blogPost.create({
          data: {
            title,
            content,
            excerpt,
            slug,
            imageUrl,
            authorId: session.user.id
          },
          include: {
            author: {
              select: {
                name: true,
                email: true
              }
            }
          }
        });

        res.status(201).json(post);
      } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Failed to create post' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 