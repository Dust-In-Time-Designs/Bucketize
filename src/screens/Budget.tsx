import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, Button} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import {useNavigation} from '@react-navigation/native';
import {styles, colorStyles} from '../styles';
import {handleGetBudget} from '../services/budgetService';

type Category = {
  name: string;
  limit: number;
  spent: number;
};

type Budget = {
  name: string;
  total: number;
  categories: Category[];
};

const screenWidth = Dimensions.get('window').width;

// Define the initial state structure
const initialBudget: Budget = {
  name: '',
  total: 0,
  categories: [],
};

const BudgetScreen = () => {
  const navigation = useNavigation();
  const [budget, setBudget] = useState<Budget>(initialBudget);

  useEffect(() => {
    const fetchBudget = async () => {
      const data = await handleGetBudget();
      if (data.budget[0].total) {
        const userCategories = data.categories.map(category => {
          return {
            name: category.name,
            limit: category.limit,
            spent: category.spent,
          };
        });
        const userBudget = {
          name: data.budget[0].name,
          total: data.budget[0].total,
          categories: userCategories,
        };
        setBudget(userBudget);
      }

      //need to add functionality for multiple budgets
    };
    fetchBudget();
  }, []);

  // Prepare data for PieChart
  console.log('budget data: ', budget.categories)
  const chartData = budget.categories.map(category => ({
    name: category.name,
    amount: category.spent,
    color: '#' + (((1 << 24) * Math.random()) | 0).toString(16),
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  }));

  return (
    <View style={styles.screenContainerLight}>
      {/* Use the light container for the entire screen */}
      {!budget.total ? (
        <View style={styles.centeredContainer}>
          <Text style={styles.subtitleText}>
            No budget data available. Please create a budget.
          </Text>
          <View style={styles.buttonContainerWide}>
            <Button
              title="Create Budget"
              onPress={() => navigation.navigate('CreateBudget')}
              color={colorStyles.secondaryGreen}
            />
          </View>
        </View>
      ) : (
        <View style={styles.contentContainer}>
          <Text style={styles.titleText}>Budget Overview</Text>
          <PieChart
            data={chartData}
            width={screenWidth}
            height={220}
            chartConfig={{
              backgroundColor: colorStyles.primaryGreen,
              backgroundGradientFrom: colorStyles.offWhite,
              backgroundGradientTo: colorStyles.secondaryGreen,
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            accessor={'amount'}
            backgroundColor={'transparent'}
            paddingLeft={'15'}
            center={[screenWidth / 4, 0]}
            absolute
          />
          {/* Display budget and categories information */}
          <View style={styles.balanceCard}>
            <Text style={styles.balanceHeaderLarge}>
              Total Budget: ${budget.total}
            </Text>
            {budget.categories.map(category => (
              <View key={category.name} style={styles.categoryContainer}>
                <Text style={styles.balanceText}>{category.name}</Text>
                <Text style={styles.balanceText}>
                  Spent: ${category.spent} / Limit: ${category.limit}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default BudgetScreen;
