import { NextResponse } from 'next/server';
import { generateWebsite } from '@/lib/ai/generator';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    
    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const website = await generateWebsite(prompt);
    
    return NextResponse.json(website);
  } catch (error: any) {
    console.error('Generation error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
                      