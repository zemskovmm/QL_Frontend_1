import { FunctionalComponent, h } from 'preact';
import { Link } from 'preact-router/match';
import { HOME_ROUTE } from 'constants/Routes';
import { Button } from 'components/Button';
import { CenterCardLayout } from 'layouts/CenterCardLayout';
import { InputControlled } from 'components/InputControlled';
import { QlClientUserProps } from 'api/QlClient';
import { useForm } from 'react-hook-form';
import { useRootContext } from 'components/RootContextProvider';
import { useEffect, useMemo } from 'preact/hooks';
import { ProfileStore } from './_store';
import { observer } from 'mobx-react-lite';

const ProfilePage: FunctionalComponent = observer(() => {
    
    const rootState = useRootContext();
    const {isLogined} = rootState
    const { putUserAction, isLoading, getUserAction, defaultUser } = useMemo(() => new ProfileStore(rootState), [rootState]);

    const { handleSubmit, control, setValue} = useForm<QlClientUserProps>();

    useEffect(()=>{
        getUserAction()
    },[])

    useEffect(()=>{
        setValue( "firstName", defaultUser.firstName);
        setValue( "lastName", defaultUser.lastName);
        setValue( "phone", defaultUser.phone);
    },[defaultUser])

    return (
    <CenterCardLayout title="Мой профиль">
        <div className="flex flex-col max-w-card-small" >
            
            <form className="flex flex-col max-w-card-small" onSubmit={handleSubmit(putUserAction) as any}>
                <InputControlled 
                    name="firstName" 
                    label="Имя" 
                    placeholder="Ваше имя" 
                    control={control} />
                <InputControlled 
                    name="lastName" 
                    label="Фамилия" 
                    placeholder="Ваше фамилия" 
                    control={control} />
                <InputControlled 
                    name="phone" 
                    label="Номер телефона" 
                    placeholder="Ваш номер" 
                    control={control} 
                    type="tel"/>
               
                <Button className="my-2" text="Обновить" type="submit" />
            </form>
        </div>
    </CenterCardLayout>
    );
});

export default ProfilePage;