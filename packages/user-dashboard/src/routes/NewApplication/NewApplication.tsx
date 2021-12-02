import { Text } from "@project/components/src/ui-kit/Text";
import { FC } from "react";
import { ApplicationCard } from "./_components";
import { NEXT_PUBLIC_BASE_URL } from "@project/components/src/baseUrl";
import { ApplicationType } from "@project/components/src/interfaces/ApplicationDto";
import { useLocalized } from "src/locales";
import { CREATE_APPLICATIONS_ROUTE } from "src/constants";

export const NewApplication: FC = () => {
  const { lang, localizedText } = useLocalized();

  return (
    <div className="flex flex-col items-center p-4">
      <Text className="m-4" text={localizedText('WHAT_SERVICES_LANG')} size="title-large" isBold />
      <Text className="m-4" text={localizedText('GET_EDUCATION_COURSES_VISA_LANG')} size="title-small" isBold />

      <div className="self-stretch flex flex-wrap justify-center">
        <ApplicationCard href={`${NEXT_PUBLIC_BASE_URL}/${lang}/catalog/university`} title={localizedText('GET_EDUCATION_LANG')} />
        <ApplicationCard href={`${NEXT_PUBLIC_BASE_URL}/${lang}/catalog/course`} title={localizedText('TAKE_LANGUAGE_COURSES_LANG')} />
        <ApplicationCard href={`${NEXT_PUBLIC_BASE_URL}/${lang}/catalog/housing`} title={('FIND_RENTAL_HOME')} />
        <ApplicationCard
          href = {CREATE_APPLICATIONS_ROUTE
            .replace(':applicationType',ApplicationType.Visa)
            .replace(':entityId',"0")}
          title={localizedText('GET_VISA_FRANCE')}
        />
      </div>
    </div>
  );
};