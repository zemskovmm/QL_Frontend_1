import { FunctionalComponent } from 'preact';
import { Button } from 'components/Button';
import { CenterCardLayout } from 'layouts/CenterCardLayout';
import { InputControlled } from 'components/InputControlled';
import { useForm } from 'react-hook-form';
import { useEffect} from 'preact/hooks';
import { useProfileStore } from './_store';
import { useUserStatuseStore, UserStatuseUserProps } from 'stores/UserStatuseStore';


const ProfilePage: FunctionalComponent = () => {
    const { putUserAction, isLoading } = useProfileStore();
    const { user } = useUserStatuseStore();
    const { handleSubmit, control, setValue} = useForm<UserStatuseUserProps>();

    useEffect(()=>{
        setValue( "firstName", user.firstName);
        setValue( "lastName", user.lastName);
        setValue( "phone", user.phone);
    },[user])

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
               
                <Button className="my-2" text="Обновить" type="submit" disabled={isLoading} />
            </form>
        </div>
    </CenterCardLayout>
    );
};

export default ProfilePage;