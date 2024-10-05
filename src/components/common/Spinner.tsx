import React from 'react';
import { View } from 'react-native';
import * as Progress from 'react-native-progress';

interface SpinnerProps {
  size?: number;
  color?: string;
  thickness?: number;
}

const Spinner: React.FC<SpinnerProps> = ({ 
  size = 50, 
  color = "#DDDDDD", 
  thickness = 4 
}) => (
  <View>
    <Progress.Circle 
      size={size} 
      indeterminate={true} 
      color={color} 
      borderWidth={thickness}
    />
  </View>
);

export default Spinner;