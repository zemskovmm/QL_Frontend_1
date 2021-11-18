import { BUTTON_COLORS} from "./_constats";

export type ButtonCollorType = keyof typeof BUTTON_COLORS;

export type ButtonPropsType = {
  className?: string;
  style?: any;
  /** id кнопки */
  id?: string;
  /** Отображаемый текст */
  text?: string;
  /** Тип кнопки */
  type?: "submit";
  /** Цвет кнопки */
  color?: ButtonCollorType;
  /** Если кнопка не активна */
  disabled?: boolean;
  /** Событие нажатия */
  onClick?: (id?: string) => void;
};
