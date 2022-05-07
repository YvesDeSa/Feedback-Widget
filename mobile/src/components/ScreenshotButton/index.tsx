import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { theme } from '../../theme';

import { styles } from './styles';

interface Props {
  screenshot: string | null;
  onTakeShot: () => void;
  onRemoveShot: () => void;
}

export function ScreenshotButton({ screenshot, onTakeShot, onRemoveShot }: Props) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={screenshot ? onRemoveShot : onTakeShot}
    >
      {
        screenshot
          ? <View>
            <Image style={styles.image} source={{ uri: screenshot }} />
            <Icon name='trash-sharp' size={22} color={theme.colors.text_secondary} style={styles.removeIcon} />
          </View>
          : <Icon name='camera-outline' size={24} color={theme.colors.text_secondary} />
      }

    </TouchableOpacity>
  );
}