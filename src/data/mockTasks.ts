import type { Task } from '../types';

const now = new Date();

export const mockTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Buy groceries for the week',
    description: 'Pick up milk, fruit, pasta, snacks, and a few household items on the way home.',
    status: 'pending',
    createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    updatedAt: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
  {
    id: 'task-2',
    title: 'Laundry',
    description: 'Wash the dark clothes, dry everything, and fold the towels before dinner.',
    status: 'completed',
    createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    updatedAt: new Date(now.getTime() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: 'task-3',
    title: 'Call the dentist about the appointment',
    description: 'Confirm the appointment time, ask about the form, and add it to the calendar after lunch so it does not get forgotten.',
    status: 'pending',
    createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 10).toISOString(),
    updatedAt: new Date(now.getTime() - 1000 * 60 * 60 * 10).toISOString(),
  },
  {
    id: 'task-4',
    title: 'Meal prep for the next three days',
    description: 'Cook rice, portion vegetables, pack lunch boxes, and clean the containers afterward before heading to bed.',
    status: 'completed',
    createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 8).toISOString(),
    updatedAt: new Date(now.getTime() - 1000 * 60 * 60 * 6).toISOString(),
  },
  {
    id: 'task-5',
    title: 'Water the plants and tidy the kitchen counter',
    description: 'Move the small pots into sunlight and wipe the kitchen counter afterward so the space stays clear and tidy.',
    status: 'pending',
    createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 6).toISOString(),
    updatedAt: new Date(now.getTime() - 1000 * 60 * 60 * 6).toISOString(),
  },
  {
    id: 'task-6',
    title: 'Fold clothes and put them away neatly',
    description: 'Sort shirts, jeans, and socks into the right drawers before the end of the day and clear the laundry basket.',
    status: 'completed',
    createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 5).toISOString(),
    updatedAt: new Date(now.getTime() - 1000 * 60 * 60 * 4).toISOString(),
  },
  {
    id: 'task-7',
    title: 'Send birthday card to Mom',
    description: 'Write a short note, seal the envelope, and pick a gift bag for the weekend before the post office closes.',
    status: 'pending',
    createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 4).toISOString(),
    updatedAt: new Date(now.getTime() - 1000 * 60 * 60 * 4).toISOString(),
  },
  {
    id: 'task-8',
    title: 'Book a haircut for next Friday evening',
    description: 'Look up a nearby salon, pick a time, and save the reminder in the phone calendar so the appointment stays on track.',
    status: 'pending',
    createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 2).toISOString(),
    updatedAt: new Date(now.getTime() - 1000 * 60 * 60 * 2).toISOString(),
  },
];
