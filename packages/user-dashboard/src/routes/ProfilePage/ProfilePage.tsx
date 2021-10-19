import { FunctionalComponent } from 'preact';
import { Button } from "@project/components/src/ui-kit/Button";
import { InputControlled } from '@project/components/src/form/InputControlled';
import { useForm } from 'react-hook-form';
import { useEffect} from 'preact/hooks';
import { useProfileStore } from './_store';
import { useUserStatuseStore, UserStatuseUserProps } from 'stores/UserStatuseStore';
import { useLocalesStore} from 'stores/LocalesStore';
import { useRouterStore } from 'stores/RouterStore';
import { LeftNavigationLayout } from 'layouts/LeftNavigationLayout';



const ProfilePage: FunctionalComponent = () => {
    const { PROFILE_LANG } = useLocalesStore();
    const { putUserAction, isLoading } = useProfileStore();
    const store = useUserStatuseStore();
    const {user:{firstName,lastName,phone}} = store;
    const { handleSubmit, control, setValue} = useForm<UserStatuseUserProps>();
    const {PROFILE_PATH} = useRouterStore();

    useEffect(()=>{
        setValue( "firstName", firstName);
        setValue( "lastName", lastName);
        setValue( "phone", phone);
    },[store])

    return (
    <LeftNavigationLayout title={PROFILE_LANG}>
        <div className="flex flex-col max-w-card-small" >
            
            <form className="flex flex-col max-w-card-small" onSubmit={handleSubmit(putUserAction) as any}>
                <InputControlled 
                    className="my-1"
                    name="firstName" 
                    label="Имя" 
                    placeholder="Ваше имя" 
                    control={control} />
                <InputControlled 
                    className="my-1"
                    name="lastName" 
                    label="Фамилия" 
                    placeholder="Ваше фамилия" 
                    control={control} />
                <InputControlled 
                    className="my-1"
                    name="phone" 
                    label="Номер телефона" 
                    placeholder="Ваш номер" 
                    control={control} 
                    type="tel"/>
               
                <Button className="my-2" text="Обновить" type="submit" disabled={isLoading} />
            </form>
        </div>
    </LeftNavigationLayout>
    );
};

export default ProfilePage;