import {StyleSheet} from 'react-native';

export const colorStyles = {
  background: '#62C370',
  mainText: '#F6F4F3',
  secondaryText: '#F6F4F3',
  mainAccent: '#62C370',
  secondaryAccent: '#183059',
  minorAccent: '#edb06f',
};
export const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: colorStyles.background,
    flex: 1,
    padding: 10,
    alignItems: 'center',
    width: '100%',
  },
  screenContainerLight: {
    backgroundColor: colorStyles.mainText,
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateContainer: {
    width: '100%',
  },
  buttonSection: {
    paddingVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    // flexDirection: 'row',
  },
  buttonContainer: {
    backgroundColor: colorStyles.secondaryAccent,
    width: '30%',
    borderRadius: 5,
    paddingVertical: 5,
    margin: 10,
  },
  buttonContainerWide: {
    backgroundColor: colorStyles.secondaryAccent,
    width: '100%',
    borderRadius: 5,
    paddingVertical: 5,
    margin: 10,
  },
  buttonContainerWideAlt: {
    backgroundColor: colorStyles.mainText,
    borderColor: colorStyles.secondaryAccent,
    borderWidth: 2,
    width: '100%',
    borderRadius: 5,
    paddingVertical: 5,
    margin: 10,
  },
  appTitleView: {
    marginTop: 20,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  appTitleText: {
    fontSize: 32,
    fontWeight: '800',
    color: colorStyles.secondaryAccent,
    textAlign: 'center',
  },
  appText: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    color: colorStyles.minorAccent,
  },
  input: {
    width: '100%',
    margin: 4,
    padding: 8,
    // backgroundColor: colorStyles.mainText,
    borderBottomWidth: 1,
    borderBottomColor: colorStyles.mainAccent,
  },
  horizontalRuleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  horizontalRule: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
  },
  horizontalRuleText: {
    // width: 50,
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  wideContainer: {
    width: '100%',
    paddingHorizontal: 5,
  },
  plaidContainer: {
    backgroundColor: 'red',
  },
  plaidTextView: {
    width: '100%',
    paddingVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  plaidTextStyle: {
    fontSize: 24,
    fontWeight: '600',
  },
  plaidButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '80%',
  },
  plaidButtonText: {
    color: colorStyles.mainText,
    fontWeight: '600',
    fontSize: 20,
  },
  plaidButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: 15,
    backgroundColor: colorStyles.mainAccent,
    borderRadius: 10,
  },
  balanceItemContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    backgroundColor: colorStyles.secondaryAccent,
    borderRadius: 10,
    height: 100,
  },
  balanceTextView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceText: {
    color: '#1E1E2D',
    fontSize: 10,
  },
  balanceIcon: {
    width: 20,
    height: 20,
    marginBottom: 5,
  },
  balanceCardContainer: {
    width: 200,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 20,
    height: 100,
  },
  balanceCard: {
    flexDirection: 'column',
    height: '100%',
  },
  balanceGradientCard: {
    height: 150,
    width: '100%',
    borderColor: colorStyles.mainAccent,
    borderWidth: 5,
  },
  balanceAvailable: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: '70%',
  },
  balanceType: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '30%',
    paddingHorizontal: 10,
  },
  // ----- Transaction styles ------------
  itemContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    backgroundColor: colorStyles.mainAccent,
    borderRadius: 10,
    height: 100,
  },
  textView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginBottom: 5,
  },

  fontStyle: {
    color: '#fff',
    fontSize: 12,
  },

  transactionIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '40%',
  },
  transactionIconImg: {height: 24, width: 24, margin: 10},
  transactionIconSmall: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '30%',
  },
  walletContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  walletHeading: {
    color: colorStyles.secondaryAccent,
    fontSize: 20,
    fontWeight: '600',
  },
  walletTransactions: {
    paddingBottom: 50,
    height: '75%',
  },
  walletBalance: {
    height: '25%',
    width: '100%',
  },
  balanceHeader: {fontSize: 12, fontWeight: '600', color: '#1E1E2D'},
  balanceHeaderLarge: {
    fontSize: 30,
    fontWeight: '600',
    color: '#1E1E2D',
  },
});
