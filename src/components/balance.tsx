import React, {useCallback, useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {State} from '../store/reducers';
import {API_URL} from '@env';

const Balance = () => {
  const [data, setData] = useState(null);
  const {accessToken, itemId} = useSelector((state: State) => state.plaid);
  const getBalance = useCallback(async () => {
    await fetch(`http://${API_URL}:8080/api/balance`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        access_token: accessToken,
      },
    })
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const renderItem = ({item}) => {
    return (
      <View style={styles.cardContainer}>
        <LinearGradient
          colors={['#F5BCE9', '#C7F0FC']}
          end={{x: 0.9, y: 0.2}}
          style={styles.gradientCard}>
          <View style={styles.card}>
            <View style={styles.type}>
              <View>
                <Text
                  style={{fontSize: 12, fontWeight: '600', color: '#1E1E2D'}}>
                  Account Name
                </Text>
                <Text style={styles.text}>{item.name}</Text>
              </View>

              <View>
                <Text
                  style={{fontSize: 12, fontWeight: '600', color: '#1E1E2D'}}>
                  Type
                </Text>
                <Text style={styles.text}>{item.subtype}</Text>
              </View>
            </View>

            <View style={styles.available}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: '600',
                  color: '#1E1E2D',
                }}>
                $ {item.balances?.available}
              </Text>

              <Text style={styles.text}>
                Current: ${item.balances?.current}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  };

  useEffect(() => {
    if (data == null) {
      getBalance();
    }
  }, [data]);
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

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    backgroundColor: '#1E1E2D',
    borderRadius: 10,
    height: 100,
  },
  textView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#1E1E2D',
    fontSize: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginBottom: 5,
  },
  cardContainer: {
    width: 200,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 20,
    height: 100,
  },
  card: {
    flexDirection: 'column',
    height: '100%',
  },
  gradientCard: {
    height: 150,
    width: '100%',
  },
  available: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: '70%',
  },
  type: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '30%',
    paddingHorizontal: 10,
  },
});

export default Balance;
