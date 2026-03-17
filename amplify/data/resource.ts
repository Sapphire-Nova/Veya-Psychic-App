import { a, defineData, type ClientSchema } from "@aws-amplify/backend";

const schema = a.schema({
  UserProfile: a
    .model({
      id: a.id().required(),
      displayName: a.string(),
      avatarPath: a.string(),
      bio: a.string(),
      createdAt: a.datetime(),
    })
    .authorization((allow) => [allow.owner()]),

  Reader: a
    .model({
      id: a.id().required(),
      name: a.string().required(),
      tagline: a.string(),
      bio: a.string(),
      specialties: a.string().array(),
      profileImagePath: a.string(),
      isActive: a.boolean().default(true),
    })
    .authorization((allow) => [
      allow.guest().to(["read"]),
      allow.authenticated().to(["read"]),
    ]),

  Booking: a
    .model({
      id: a.id().required(),
      readerId: a.id().required(),
      userId: a.id().required(),
      scheduledAt: a.datetime().required(),
      minutes: a.integer().required(),
      status: a.string().required(),
      notes: a.string(),
    })
    .authorization((allow) => [allow.owner()]),

  ReadingSession: a
    .model({
      id: a.id().required(),
      bookingId: a.id().required(),
      startedAt: a.datetime(),
      endedAt: a.datetime(),
      status: a.string().required(),
    })
    .authorization((allow) => [allow.owner()]),

  Message: a
    .model({
      id: a.id().required(),
      sessionId: a.id().required(),
      senderUserId: a.id().required(),
      text: a.string().required(),
      createdAt: a.datetime().required(),
    })
    .authorization((allow) => [allow.owner()]),

  Review: a
    .model({
      id: a.id().required(),
      readerId: a.id().required(),
      userId: a.id().required(),
      rating: a.integer().required(),
      comment: a.string(),
      createdAt: a.datetime().required(),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.guest().to(["read"]),
      allow.authenticated().to(["read"]),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
});
