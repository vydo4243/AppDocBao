declare module 'react-native-checkbox' {
    import { Component } from 'react';
    import { ViewStyle } from 'react-native';
  
    interface CheckBoxProps {
      label?: string;
      value: boolean;
      onValueChange: (value: boolean) => void;
      tintColors?: { true: string; false: string };
      style?: ViewStyle;
    }
  
    export default class CheckBox extends Component<CheckBoxProps> {}
  }