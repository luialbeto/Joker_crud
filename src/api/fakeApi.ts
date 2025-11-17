import { Letter } from '../types';

const STORAGE_KEY = 'letters';
const getStoredLetters = (): Letter[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveLetters = (letters: Letter[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(letters));
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getLetters = async (): Promise<Letter[]> => {
  await delay(500);
  return getStoredLetters().sort((a, b) => new Date(b.sentDate).getTime() - new Date(a.sentDate).getTime());
};

export const getLetterById = async (id: string): Promise<Letter | undefined> => {
  await delay(300);
  return getStoredLetters().find(letter => letter.id === id);
};

export const createLetter = async (newLetter: Omit<Letter, 'id'>): Promise<Letter> => {
  await delay(800);
  const letters = getStoredLetters();
  if (letters.some(l => l.trackingNumber === newLetter.trackingNumber)) {
    throw new Error('Tracking number must be unique');
  }
  const id = crypto.randomUUID();
  const letter = { ...newLetter, id };
  letters.push(letter);
  saveLetters(letters);
  return letter;
};

export const updateLetter = async (id: string, updates: Partial<Letter>): Promise<Letter> => {
  await delay(800);
  const letters = getStoredLetters();
  const index = letters.findIndex(l => l.id === id);
  if (index === -1) throw new Error('Letter not found');
  if (updates.trackingNumber && letters.some(l => l.trackingNumber === updates.trackingNumber && l.id !== id)) {
    throw new Error('Tracking number must be unique');
  }
  letters[index] = { ...letters[index], ...updates };
  saveLetters(letters);
  return letters[index];
};