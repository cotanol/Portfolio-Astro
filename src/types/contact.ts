import type { Timestamp } from "firebase/firestore";

export interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  date: Timestamp | null;
}
