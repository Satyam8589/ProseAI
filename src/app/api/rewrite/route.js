import { NextResponse } from 'next/server';
import { rewriteText, isEnglishText } from '@/lib/ai';
import { 
  isValidTone, 
  isValidTextLength, 
  ERROR_MESSAGES,
  VALIDATION 
} from '@/lib/types';

export async function POST(request) {
  try {
    const body = await request.json();
    const { text, tone, provider } = body;

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        {
          success: false,
          error: ERROR_MESSAGES.NO_TEXT,
          timestamp: Date.now()
        },
        { status: 400 }
      );
    }

    if (!isValidTextLength(text)) {
      const trimmedLength = text.trim().length;
      const error = trimmedLength < VALIDATION.MIN_TEXT_LENGTH 
        ? ERROR_MESSAGES.TEXT_TOO_SHORT 
        : ERROR_MESSAGES.TEXT_TOO_LONG;
      
      return NextResponse.json(
        {
          success: false,
          error,
          timestamp: Date.now()
        },
        { status: 400 }
      );
    }

    if (!isEnglishText(text)) {
      return NextResponse.json(
        {
          success: false,
          error: ERROR_MESSAGES.NOT_ENGLISH,
          timestamp: Date.now()
        },
        { status: 400 }
      );
    }

    if (!tone || !isValidTone(tone)) {
      return NextResponse.json(
        {
          success: false,
          error: ERROR_MESSAGES.INVALID_TONE,
          timestamp: Date.now()
        },
        { status: 400 }
      );
    }

    const result = await rewriteText({
      text: text.trim(),
      tone,
      provider
    });

    if (result.success) {
      return NextResponse.json(
        {
          success: true,
          rewrittenText: result.rewrittenText,
          provider: result.provider,
          timestamp: Date.now()
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error || ERROR_MESSAGES.API_ERROR,
          provider: result.provider,
          timestamp: Date.now()
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('API Route Error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: ERROR_MESSAGES.UNKNOWN_ERROR,
        timestamp: Date.now()
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      name: 'ProseAI Rewrite API',
      version: '1.0.0',
      availableTones: [
        'professional',
        'friendly',
        'casual',
        'comedy',
        'polite',
        'confident'
      ],
      supportedProviders: ['gemini', 'openai', 'claude'],
      maxTextLength: VALIDATION.MAX_TEXT_LENGTH,
      timestamp: Date.now()
    },
    { status: 200 }
  );
}

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  );
}
