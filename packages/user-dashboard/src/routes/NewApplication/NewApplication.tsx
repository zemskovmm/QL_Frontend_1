import { Text } from "@project/components/src/ui-kit/Text";
import { FC } from "react";
import { useLocalesStore } from "src/stores/LocalesStore";
import { ApplicationCard } from "./_components";
import { NEXT_PUBLIC_BASE_URL } from "@project/components/src/baseUrl";
import { ApplicationType } from "@project/components/src/interfaces/ApplicationDto";
import { CREATE_APPLICATIONS_TEMPLATE } from "src/stores/RouterStore";

export const NewApplication: FC = () => {
  const {
    lang,
    FIND_RENTAL_HOME,
    GET_EDUCATION_LANG,
    GET_EDUCATION_COURSES_VISA_LANG,
    GET_VISA_FRANCE,
    TAKE_LANGUAGE_COURSES_LANG,
    WHAT_SERVICES_LANG,
  } = useLocalesStore();

  return (
    <div className="flex flex-col items-center p-4">
      <Text className="m-4" text={WHAT_SERVICES_LANG} size="title-large" isBold />
      <Text className="m-4" text={GET_EDUCATION_COURSES_VISA_LANG} size="title-small" isBold />

      <div className="self-stretch flex flex-wrap justify-center">
        <ApplicationCard href={`${NEXT_PUBLIC_BASE_URL}/${lang}/catalog/university`} title={GET_EDUCATION_LANG} />
        <ApplicationCard href={`${NEXT_PUBLIC_BASE_URL}/${lang}/catalog/course`} title={TAKE_LANGUAGE_COURSES_LANG} />
        <ApplicationCard href={`${NEXT_PUBLIC_BASE_URL}/${lang}/catalog/housing`} title={FIND_RENTAL_HOME} />
        <ApplicationCard
          href={CREATE_APPLICATIONS_TEMPLATE.getRoute({ lang, params: [ApplicationType.Visa, "0"] })}
          title={GET_VISA_FRANCE}
        />
      </div>
    </div>
  );
};
