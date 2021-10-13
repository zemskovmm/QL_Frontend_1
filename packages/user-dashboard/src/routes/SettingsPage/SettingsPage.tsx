import { FunctionalComponent } from 'preact';
import { useLocalesStore} from 'stores/LocalesStore';
import { LeftNavigationLayout } from 'layouts/LeftNavigationLayout';
import { Text } from '@project/components/src/ui-kit/Text';


const SettingsPage: FunctionalComponent = () => {
    const {translate:{
        settings,
    }} = useLocalesStore();

    return (
        <LeftNavigationLayout title={settings}>
            <Text text={settings} color="help"/>
        </LeftNavigationLayout>
    );
};

export default SettingsPage;