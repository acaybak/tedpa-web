import { getContactMessages } from "@/actions/content-actions";
import { MessagesClient } from "@/components/admin/messages-client";
export const instant = false;
export default async function MessagesPage() {
  const result = await getContactMessages({ limit: 100 });
  return <MessagesClient messages={result.data} />;
}
