import {LocaleKeys} from "src/locales/locales";
import {FormattedMessage, IntlShape} from "react-intl";
import {FC} from "react";

export type LocalizedTextProps = {
  id: LocaleKeys;
  values?: Record<string, any>;
};

export const LocalizedText: FC<LocalizedTextProps> = ({ id, values }) => <FormattedMessage id={id} values={values} />;
export const useLocalizedText = ({ id, values }: LocalizedTextProps, intl: IntlShape) =>
  intl.formatMessage({ id }, values);
