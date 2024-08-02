import fs from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

export async function GET() {
  const dataPath = path.join(process.cwd(), 'data', 'loans.json');

  const fileContents = fs.readFileSync(dataPath, 'utf8');

  const users = JSON.parse(fileContents);

  return NextResponse.json(users);
}
