import 'react-native-gesture-handler';

import React, { useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { theme } from '../../theme';

import Icon from 'react-native-vector-icons/Ionicons';
import BottomSheet from '@gorhom/bottom-sheet';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import { styles } from './styles';
import { Options } from '../Options';
import { Success } from '../Success';

import { feedbackTypes } from '../../utils/feedbackTypes'
import { Form } from '../Form';

export type FeedbackType = keyof typeof feedbackTypes;

function Widget() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSend, setFeedbackSend] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);

  function handleOpen() {
    bottomSheetRef.current?.expand();
  }

  function handleRestartFeedback() {
    setFeedbackType(null);
    setFeedbackSend(false)
  }

  function handleFeedbackSend() {
    setFeedbackSend(true)
  };

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={handleOpen}
      >
        <Icon
          name='chatbubble-ellipses-outline'
          size={24}
          color={theme.colors.text_on_brand_color}
        />
      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        {
          feedbackSend
            ? <Success onSendAnotherFeedback={handleRestartFeedback} />
            :
            <>
              {feedbackType
                ? <Form
                  onFeedbackCanceled={handleRestartFeedback}
                  onFeedbackSend={handleFeedbackSend}
                  feedbackType={feedbackType}
                />
                : <Options onFeedbackTypeChanged={setFeedbackType} />
              }
            </>
        }

      </BottomSheet>
    </>
  );
}

export default gestureHandlerRootHOC(Widget);