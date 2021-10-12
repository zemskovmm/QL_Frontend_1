import { FunctionalComponent } from 'preact';
import { Button } from "@project/components/src/ui-kit/Button";
import { CenterCardLayout } from 'layouts/CenterCardLayout';
import { InputControlled } from '@project/components/src/form/InputControlled';
import { useForm } from 'react-hook-form';
import { useEffect} from 'preact/hooks';
import { useProfileStore } from './_store';
import { useUserStatuseStore, UserStatuseUserProps } from 'stores/UserStatuseStore';
import { Link } from 'preact-router';
import { useLocalesStore} from 'stores/LocalesStore';
import { useRouterStore } from 'stores/RouterStore';

type PropsType = {
    lang?:string;
}

const ProfilePage: FunctionalComponent<PropsType> = ({lang}) => {
    const {translate:{My_profile}} = useLocalesStore();
    const { putUserAction, isLoading } = useProfileStore();
    const store = useUserStatuseStore();
    const {user:{firstName,lastName,phone}} = store;
    const { handleSubmit, control, setValue} = useForm<UserStatuseUserProps>();
    const {PERSONAL_PATH} = useRouterStore();

    useEffect(()=>{
        setValue( "firstName", firstName);
        setValue( "lastName", lastName);
        setValue( "phone", phone);
    },[store])

    return (
    <CenterCardLayout title={My_profile}>
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
                <Link href={PERSONAL_PATH}>
                    <Button text="Мои заявки" color="secondary" isFullWidth />
                </Link>
            </form>
        </div>
    </CenterCardLayout>
    );
};

export default ProfilePage;