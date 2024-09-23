import { uniqueNamesGenerator, starWars } from "unique-names-generator";
/**
 * Generates a random number between 0 and 70 to select an avatar from pravatar.cc
 * @returns A URL string with the avatar image link.
 */
function generateRandomAvatarUrl(): string {
    const randomNumber = Math.floor(Math.random() * 71);
    const avatarUrl = `https://i.pravatar.cc/300?img=${randomNumber}`;
    return avatarUrl;
}

export const userGenerator = () => {
    const name = uniqueNamesGenerator({ dictionaries: [starWars] });
    const avatar = generateRandomAvatarUrl()
    return {
        name,
        avatar
    }
}