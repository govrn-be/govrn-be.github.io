import fs from 'fs';
import path from 'path';

const CALLS_PATH = path.resolve(process.cwd(), 'src/assets/calls.json');

export function getCallSummaryById(uuid: string): string | null {
  try {
    const file = fs.readFileSync(CALLS_PATH, 'utf-8');
    const json = JSON.parse(file);
    // console.log(json);
    if (!json.data || !Array.isArray(json.data)) return null;
    const call = json.data.find((item: any) => item.uuid === uuid);
    return call?.summary || null;
  } catch (e) {
    console.error('Error reading calls.json:', e);
    return null;
  }
} 