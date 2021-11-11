import { BUTTON_COLORS, BUTTON_SIZES } from "./_constats";

export type ButtonSizeType = keyof typeof BUTTON_SIZES;

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
  color?: string;
  /** Размер кнопки */
  size?: ButtonSizeType;
  /** Индикатор который вытсавляет кнопке ширину 100% */
  isFullWidth?: boolean;
  /** Если кнопка не активна */
  disabled?: boolean;
  /** Событие нажатия */
  onClick?: (id?: string) => void;
};
