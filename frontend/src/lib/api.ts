export const BASE_URL = 'http://localhost:8080/api';

export const fetchSessions = async () => {
  const response = await fetch(`${BASE_URL}/sessions`);
  if (!response.ok) throw new Error('Network response failed');
  return response.json();
};

export const fetchCharacters = async () => {
  const response = await fetch(`${BASE_URL}/characters`);
  if (!response.ok) throw new Error('Network response failed');
  return response.json();
};

export const fetchNPCs = async () => {
  const response = await fetch(`${BASE_URL}/npcs`);
  if (!response.ok) throw new Error('Network response failed');
  return response.json();
};

export const fetchQuests = async () => {
  const response = await fetch(`${BASE_URL}/quests`);
  if (!response.ok) throw new Error('Network response failed');
  return response.json();
};

export const createSession = async (data: any) => {
  const response = await fetch(`${BASE_URL}/sessions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('Network response failed');
  return response.json();
};

export const createCharacter = async (data: any) => {
  const response = await fetch(`${BASE_URL}/characters`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('Network response failed');
  return response.json();
};

export const createNPC = async (data: any) => {
  const response = await fetch(`${BASE_URL}/npcs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('Network response failed');
  return response.json();
};

export const createQuest = async (data: any) => {
  const response = await fetch(`${BASE_URL}/quests`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('Network response failed');
  return response.json();
};
