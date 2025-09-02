declare module 'react-timezone-select' {
  import { ComponentType } from 'react';

  export interface ITimezone {
    value: string;
    label: string;
    offset: number;
    abbrev: string;
    altName: string;
  }

  export interface ITimezoneSelectProps {
    value?: string | ITimezone;
    onChange?: (timezone: ITimezone) => void;
    onBlur?: () => void;
    placeholder?: string;
    className?: string;
    menuPlacement?: 'auto' | 'top' | 'bottom';
    isSearchable?: boolean;
    isClearable?: boolean;
    'aria-label'?: string;
    instanceId?: string;
    styles?: {
      control?: (base: any, state: any) => any;
      menu?: (base: any) => any;
      option?: (base: any, state: any) => any;
      singleValue?: (base: any) => any;
      placeholder?: (base: any) => any;
      input?: (base: any) => any;
    };
  }

  const TimezoneSelect: ComponentType<ITimezoneSelectProps>;
  export default TimezoneSelect;
}
