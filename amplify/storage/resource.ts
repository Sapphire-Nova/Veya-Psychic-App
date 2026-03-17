import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "lyra-media",
  access: (allow) => ({
    "images/*": [allow.authenticated.to(["read", "write", "delete"])],
  }),
});
