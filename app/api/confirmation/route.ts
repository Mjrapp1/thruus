import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';

const client = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const { donor, recipient, org, giftAmount } = await req.json();

    const prompt = `You are generating a confirmation message for a donor who just funded the complete liberation of a family from debt slavery through ${org.name}.

Donor: ${donor.name} from ${donor.location}
Gift amount: $${giftAmount}
Recipient family: ${recipient.name} (${recipient.familySize} people) in ${recipient.location}
Family story: ${recipient.story}
Message from the family (translated): "${recipient.messageTranslated}"

Write a confirmation message that:
- Opens with the most important fact: the family is free
- Is specific to this family and this donor — not generic
- Feels like a message from a trusted friend who was there, not a charity receipt
- References the family's translated message naturally
- Ends with a single sentence about what begins now — not what happened
- Is 4-6 sentences maximum
- Uses no charity clichés ("your generous donation", "making a difference", "change the world")
- Has no subject line, no greeting, no signature — just the message itself

Write only the message. Nothing else.`;

    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 300,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = message.content[0].type === 'text' ? message.content[0].text : '';

    return NextResponse.json({ confirmation: text });
  } catch (error) {
    console.error('Confirmation generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate confirmation' },
      { status: 500 }
    );
  }
}
