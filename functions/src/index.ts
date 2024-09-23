import * as functions from "firebase-functions";
import * as logs from "./utils/logs.js";
import {
  DocumentReference,
  FieldValue,
} from "firebase-admin/firestore";
import axios from 'axios';
import { v4 as uuidv4 } from "uuid";

const OPENAI_API_KEY = functions.params.defineSecret("OPENAPI_KEY");

export const turingEngineResponse = functions.firestore
  .onDocumentCreated("rooms/{roomId}/messages/{messageId}",
    async (event): Promise<void> => {

      if (!event.data) return

      const data = event.data?.data();

      if (!data.metadata.ia) return;

      const prompt = data.text;

      const ref: DocumentReference = event.data.ref;

      const authorId = data.metadata.other_id;

      try {
        const logStartTime = performance.now();



        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-3.5-turbo',
            messages: [
              { role: 'system', content: 'You are pretending to be a human' },
              { role: 'user', content: prompt },
            ],
            max_tokens: 150,
            temperature: 0.7,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${OPENAI_API_KEY.value}`,
            },
          }
        );

        const duration = performance.now() - logStartTime;
        logs.receivedAPIResponse(ref.path, duration);

        const chatResponse = response.data.choices[0].message?.content.trim()

        ref.create({
          author: { id: authorId },
          id: uuidv4,
          text: chatResponse,
          type: "text",
          authorId,
          createdAt: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp(),

        });
      } catch (err) {
        logs.errorCallingChatGPTAPI(err);
      }

      return;
    }
  );

