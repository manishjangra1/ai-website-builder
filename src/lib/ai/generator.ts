import OpenAI from 'openai';
import { PageSchema, WebsiteData } from '../validations/sections';

export async function generateWebsite(prompt: string): Promise<WebsiteData> {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'dummy-key',
  });
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-2024-08-06',
    messages: [
      {
        role: 'system',
        content: `You are a world-class web designer and developer. 
        Your task is to generate a high-end, premium website structure based on the user's prompt.
        Return only structured JSON that follows the provided schema.
        Use modern, persuasive copy and a logical flow of sections.
        Sections should include: navbar, hero, features, footer. Optionally add: pricing, cta, testimonials, etc.
        Ensure every section has a unique ID.`
      },
      {
        role: 'user',
        content: prompt
      }
    ],
    response_format: {
      type: 'json_schema',
      json_schema: {
        name: 'website_schema',
        strict: true,
        schema: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            description: { type: 'string' },
            sections: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  type: { 
                    type: 'string', 
                    enum: ['navbar', 'hero', 'features', 'pricing', 'cta', 'footer', 'faq', 'testimonials', 'gallery', 'stats'] 
                  },
                  props: { type: 'object', additionalProperties: true }
                },
                required: ['id', 'type', 'props'],
                additionalProperties: false
              }
            }
          },
          required: ['title', 'description', 'sections'],
          additionalProperties: false
        }
      }
    }
  });

  const content = response.choices[0].message.content;
  if (!content) throw new Error('Failed to generate website content');

  const data = JSON.parse(content);
  return PageSchema.parse(data);
}
                 