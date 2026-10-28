import { getUsers } from "@/actions/content-actions";
import { UsersClient } from "@/components/admin/users-client";
export const instant = false;
export default async function UsersPage() {
  const users = await getUsers();
  return <UsersClient users={users} />;
}
