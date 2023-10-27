import React, {useState, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colorStyles, styles} from '../styles';
import {handleGetBalance} from '../services/plaidService';
import {User} from '../models/user';

type Params = {
  accessToken: string;
  itemId: string;
  user: User;
};

const Balance = ({accessToken, itemId, user}: Params) => {
  const [data, setData] = useState(null);

  const renderItem = ({item}) => {
    return (
      <View style={styles.balanceCardContainer}>
        <LinearGradient
          colors={[colorStyles.mainAccent, colorStyles.mainText]}
          end={{x: 0.9, y: 0.2}}
          style={styles.balanceGradientCard}>
          <View style={styles.balanceCard}>
            <View style={styles.balanceType}>
              <View>
                <Text
                  style={{fontSize: 12, fontWeight: '600', color: '#1E1E2D'}}>
                  Account Name
                </Text>
                <Text style={styles.balanceText}>{item.name}</Text>
              </View>

              <View>
                <Text
                  style={{fontSize: 12, fontWeight: '600', color: '#1E1E2D'}}>
                  Type
                </Text>
                <Text style={styles.balanceText}>{item.subtype}</Text>
              </View>
            </View>

            <View style={styles.balanceAvailable}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: '600',
                  color: '#1E1E2D',
                }}>
                $ {item.balances?.available}
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

  useEffect(() => {
    return async () => {
      if (data == null) {
        const balance = await handleGetBalance(user.accessToken, accessToken);
        setData(balance);
      }
    };
  }, [data, accessToken, user]);
  return (
    <View>
      <FlatList
        data={data?.accounts}
        renderItem={renderItem}
        keyExtractor={item => item.account_id}
        maxToRenderPerBatch={4}
        initialNumToRender={3}
        style={{paddingTop: 10}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Balance;
