import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {styles, colorStyles} from '../styles'; // Make sure colorStyles is imported
import {handleGetBalance} from '../services/plaidService';
import {PlaidAccount} from '../types';

const Balance = () => {
  const [data, setData] = useState<PlaidAccount[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      if (data == null) {
        const balance = await handleGetBalance();
        setData(balance);
      }
    };

    fetchData();
  }, [data]);

  const renderItem = ({item}: {item: PlaidAccount}) => {
    return (
      <View style={styles.balanceCardContainer}>
        <LinearGradient
          colors={[colorStyles.secondaryGreen, colorStyles.primaryGreen]} // Adjust colors to match new scheme
          end={{x: 0.9, y: 0.2}}
          style={styles.balanceGradientCard}>
          <View style={styles.balanceCard}>
            <View style={styles.balanceType}>
              <Text style={styles.balanceHeader}>{item.name}</Text>
              <Text style={styles.balanceHeader}>{item.subtype}</Text>
            </View>
            <View style={styles.balanceAvailable}>
              <Text style={styles.balanceHeaderLarge}>
                ${item.balances?.available}
              </Text>
              <Text style={styles.balanceText}>
                Current: ${item.balances?.current}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.account_id}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.balanceFlatList} // Use this if you need padding or margins
    />
  );
};

export default Balance;
