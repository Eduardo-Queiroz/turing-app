import { logger } from "firebase-functions";
import configData from "./config.js";

/**
 * Logs the duration it took to receive an API response for a specified document path.
 *
 * @param {string} path - The path of the document for which the API response was received.
 * @param {number} duration - The time it took to receive the API response, in milliseconds.
 * @return {void}
 */
export const receivedAPIResponse = (path: string, duration: number): void => {
  const formattedDuration = duration.toFixed(6);
  logger.info(
    `✅ [${configData.namespace}] Received API response for document '${path}' in ${formattedDuration} ms.`,
    { duration: formattedDuration }
  );
};

/**
 * Logs an error encountered when calling the OpenAI API.
 *
 * @param {unknown} error - The error that was encountered.
 * @return {void}
 */
export const errorCallingChatGPTAPI = (error: unknown): void => {
  const message = error instanceof Error ? error.message : "UNKNOWN ERROR";
  logger.error(
    `❗️[${configData.namespace}] Error encountered calling OpenAI API: ${message}`
  );
};
