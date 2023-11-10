import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {View, Text, TextInput, Button, ScrollView} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {useNavigation} from '@react-navigation/native';
import {styles, colorStyles} from '../styles';
import {handleCreateBudget} from '../services/budgetService';
import {State} from '../store/reducers';

const CreateBudgetScreen = () => {
  const navigation = useNavigation();
  const {user} = useSelector((state: State) => state.auth);
  const [name, setName] = useState('');
  const [total, setTotal] = useState('');
  const [categories, setCategories] = useState([{name: '', limit: ''}]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  console.log(user);
  const addCategory = () => {
    setCategories([...categories, {name: '', limit: ''}]);
  };

  const updateCategory = (index, field, value) => {
    const newCategories = [...categories];
    newCategories[index][field] = value;
    setCategories(newCategories);
  };

  const submitBudget = async () => {
    try {
      const budgetData = {
        userId: user.id,
        name: name,
        total: Number(total),
        categories: categories,
        startDate: startDate,
        endDate: endDate,
      };

      const createdBudget = await handleCreateBudget(budgetData);
      if (createdBudget) {
        // Navigate back to Budget screen or handle success as needed
        navigation.goBack();
      }
    } catch (error) {
      // Handle errors such as showing an alert or setting error messages in state
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContentContainer}>
      <Text style={styles.titleText}>Create a New Budget</Text>
      <TextInput
        placeholder="Budget Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Total Budget"
        style={styles.input}
        value={total}
        onChangeText={setTotal}
        keyboardType="numeric"
      />
      {categories.map((category, index) => (
        <View key={index} style={styles.inputRow}>
          <TextInput
            placeholder="Category Name"
            style={styles.inputShort}
            value={category.name}
            onChangeText={text => updateCategory(index, 'name', text)}
          />
          <TextInput
            placeholder="Limit"
            style={styles.inputShort}
            value={category.limit}
            onChangeText={text => updateCategory(index, 'limit', text)}
            keyboardType="numeric"
          />
        </View>
      ))}
      <Button title="Add Category" onPress={addCategory} />
      <Button
        title="Pick Start Date"
        onPress={() => setShowStartDatePicker(true)}
      />
      {showStartDatePicker && (
        <DatePicker
          modal
          open={showStartDatePicker}
          date={startDate}
          mode={'date'}
          onConfirm={selectedDate => {
            setShowStartDatePicker(false);
            setStartDate(selectedDate || startDate);
          }}
          onCancel={() => {
            setShowStartDatePicker(false);
          }}
        />
      )}
      <Button
        title="Pick End Date"
        onPress={() => setShowEndDatePicker(true)}
      />
      {showEndDatePicker && (
        <DatePicker
          modal
          open={showEndDatePicker}
          date={startDate}
          mode={'date'}
          onConfirm={selectedDate => {
            setShowEndDatePicker(false);
            setEndDate(selectedDate || endDate);
          }}
          onCancel={() => {
            setShowEndDatePicker(false);
          }}
        />
      )}
      <View style={styles.buttonContainerWide}>
        <Button
          title="Create Budget"
          onPress={submitBudget}
          color={colorStyles.textOnPrimary}
        />
      </View>
    </ScrollView>
  );
};

export default CreateBudgetScreen;
