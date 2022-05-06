import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { theme } from '../../theme';

import { styles } from './styles';

export function Widget() {
  return (
    <>
      <TouchableOpacity style={styles.button}>
        <Icon name='chatbubble-ellipses-outline' size={24} color={theme.colors.text_on_brand_color} />
      </TouchableOpacity>
    </>
  );
}