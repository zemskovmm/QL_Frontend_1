import { FC } from "react";
import { useLocalesStore } from "src/stores/LocalesStore";
import { LeftNavigationLayout } from "src/layouts/LeftNavigationLayout";
import { Text } from "@project/components/src/ui-kit/Text";

const SettingsPage: FC = () => {
  const { SETTINGS_LANG } = useLocalesStore();

  return (
    <LeftNavigationLayout title={SETTINGS_LANG}>
      <Text text={SETTINGS_LANG} color="help" />
    </LeftNavigationLayout>
  );
};

export default SettingsPage;
