import { FC } from "react";
import { LeftNavigationLayout } from "src/layouts/LeftNavigationLayout";
import { Text } from "@project/components/src/ui-kit/Text";
import { useLocalized } from "src/locales";

const SettingsPage: FC = () => {
  const { localizedText } = useLocalized();

  return (
    <LeftNavigationLayout title={localizedText('SETTINGS_LANG')}>
      <Text text={localizedText('SETTINGS_LANG')} color="help" />
    </LeftNavigationLayout>
  );
};

export default SettingsPage;
