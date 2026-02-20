import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message payload required' }, { status: 400 });
    }

    // Mock AI response to avoid real API dependency in this sandbox environment
    const responses = [
      "Neural optimization complete. What else do you need?",
      "Accessing encrypted data... Done. How can I help?",
      "Link established. System resources are at your disposal.",
      "I've analyzed your input. The result is positive.",
      "Indeed. Let's proceed with the neural integration.",
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return NextResponse.json({ 
      content: `[Deku Core]: ${randomResponse} (Ref: ${Math.random().toString(36).substring(7)})`,
      timestamp: Date.now()
    });
  } catch (error) {
    return NextResponse.json({ error: 'Neural Core Error' }, { status: 500 });
  }
}
