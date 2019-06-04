import axios from "axios";

import urls from '../../config/urls';
import { Chat } from "./chatRelatedTypes";

export async function getChatInfo(token: string): Promise<Chat> {
  const url = `${urls.config}/${token}`;
  const { data: chat } = await axios.get(url);
  return chat;
}
