import { getSiteSettings } from "@/actions/content-actions";
import { SettingsClient } from "@/components/admin/settings-client";
export const instant = false;
export default async function SettingsPage() {
  const settings = await getSiteSettings();
  return <SettingsClient settings={settings} />;
}
