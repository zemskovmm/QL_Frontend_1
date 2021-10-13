import { FunctionalComponent } from 'preact';
import { useLocalesStore} from 'stores/LocalesStore';
import { LeftNavigationLayout } from 'layouts/LeftNavigationLayout';
import { Text } from '@project/components/src/ui-kit/Text';

type PropsType = {
    applicationId?:string;
}

const MyApplicationsPage: FunctionalComponent<PropsType> = ({applicationId}) => {
    const {translate:{
        myApplications,
        application,
    }} = useLocalesStore();

    return (
        <LeftNavigationLayout title={myApplications}>
            <Text text={`${application} ${applicationId}`} color="help"/>
        </LeftNavigationLayout>
    );
};

export default MyApplicationsPage;