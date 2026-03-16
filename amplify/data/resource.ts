import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  UserProfile: a.model({
    email: a.string().required(),
    lunaCredits: a.integer().default(0),
    favoriteWisdom: a.string().array(),
    isMember: a.boolean().default(false),
  }).authorization((allow) => [allow.owner()]),

  JournalEntry: a.model({
    prompt: a.string(),
    content: a.string(),
    mood: a.string(),
  }).authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;
export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
