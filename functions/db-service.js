// This service handles the connection between your Lyra backend and your User data
import { generateClient } from 'aws-amplify/api';
const client = generateClient();

export const updateUserSettings = async (userId, settings) => {
    try {
        // This updates the luna_credits or live_status in your database
        const result = await client.models.User.update({
            id: userId,
            ...settings
        });
        console.log("Lyra DB Update Success:", result);
        return result;
    } catch (error) {
        console.error("Lyra DB Update Error:", error);
        throw error;
    }
};

export const publishNewOffering = async (content) => {
    try {
        // This pushes your new Meditations or Full Moon Circles to the app instantly
        const result = await client.models.Content.create({
            ...content,
            createdAt: new Date().toISOString()
        });
        return result;
    } catch (error) {
        console.error("Error publishing to Veya:", error);
    }
};