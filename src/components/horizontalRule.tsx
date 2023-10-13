import React from 'react';
import {Text, View} from 'react-native';
import {styles} from '../styles';

const HorizontalRuleWithText = ({text}: string) => {
  return (
    <View style={styles.horizontalRuleContainer}>
      <View style={styles.horizontalRule} />
      <Text style={styles.horizontalRuleText}>{text}</Text>
      <View style={styles.horizontalRule} />
    </View>
  );
};

export default HorizontalRuleWithText;
