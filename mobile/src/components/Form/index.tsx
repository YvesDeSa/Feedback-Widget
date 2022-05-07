import React, { useState } from 'react';
import {
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';

import { FeedbackType } from '../Widget';
import { ScreenshotButton } from '../ScreenshotButton';
import { feedbackTypes } from '../../utils/feedbackTypes';

import Icon from 'react-native-vector-icons/Ionicons';
import { captureScreen } from 'react-native-view-shot';
import { theme } from '../../theme';

import { styles } from './styles';
import { Button } from '../Button';
import { api } from '../../lib/api';

import * as FileSystem from 'expo-file-system';

interface Props {
  feedbackType: FeedbackType;
  onFeedbackCanceled: () => void;
  onFeedbackSend: () => void
}

export function Form({ feedbackType, onFeedbackCanceled, onFeedbackSend }: Props) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [isSendFeedback, setIsSendFeedback] = useState(false);
  const [comment, setComment] = useState('');

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  function handleScreenshot() {
    captureScreen({
      format: 'jpg',
      quality: 0.8
    })
      .then(uri => setScreenshot(uri))
      .catch(error => console.log(error));
  };

  function handleScreenshotRemove() {
    setScreenshot(null);
  };

  async function handleSendFeedback() {
    if (isSendFeedback) {
      return;
    }
    setIsSendFeedback(true)

    const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, { encoding: 'base64' })

    try {
      await api.post('/feedback', {
        type: feedbackType,
        comment,
        screenshot: `data:image/png;base64, ${screenshotBase64}`
      });

      onFeedbackSend();

    } catch (error) {
      console.log(error)
      setIsSendFeedback(false);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackCanceled} >
          <Icon name='arrow-back' size={24} color={theme.colors.text_secondary} />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image
            source={feedbackTypeInfo.image}
            style={styles.image}
          />
          <Text style={styles.titleText}>
            {feedbackTypeInfo.title}
          </Text>
        </View>
      </View>

      <TextInput
        multiline
        style={styles.input}
        placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
        placeholderTextColor={theme.colors.text_secondary}
        autoCorrect={false}
        onChangeText={setComment}
      />

      <View style={styles.footer}>
        <ScreenshotButton
          onTakeShot={handleScreenshot}
          onRemoveShot={handleScreenshotRemove}
          screenshot={screenshot}
        />

        <Button onPress={handleSendFeedback} isLoading={isSendFeedback} />
      </View>
    </View>
  );
}