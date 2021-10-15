import { FunctionalComponent } from 'preact';
import { useLocalesStore} from 'stores/LocalesStore';
import { LeftNavigationLayout } from 'layouts/LeftNavigationLayout';
import { Text } from '@project/components/src/ui-kit/Text';


const SettingsPage: FunctionalComponent = () => {
    const {translate:{
        SETTINGS,
    }} = useLocalesStore();

    return (
        <LeftNavigationLayout title={SETTINGS}>
            <Text text={SETTINGS} color="help"/>
        </LeftNavigationLayout>
    );
};

export default SettingsPage;