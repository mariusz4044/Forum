import SettingsNavigation from "@/components/Settings/SettingsNavigation";
import SettingsProfile from "@/components/Settings/SettingsProfile";

export default function page() {
  return (
    <div className="w-full">
      <div className="container-70 ml-[15%] mt-10 settings-grid">
        <SettingsNavigation />
        <SettingsProfile />
      </div>
    </div>
  );
}
