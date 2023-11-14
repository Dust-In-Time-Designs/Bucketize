import {StyleSheet} from 'react-native';

export const colorStyles = {
  primaryGreen: '#62C370',
  secondaryGreen: '#2F7766',
  textOnPrimary: '#F6F4F3',
  textOnSecondary: '#ffffff',
  accentBlue: '#183059',
  offWhite: '#F6F4F3',
  darkText: '#1E1E2D',
};
export const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: colorStyles.primaryGreen,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  screenContainerLight: {
    backgroundColor: colorStyles.textOnPrimary,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  inputRow: {
    flexDirection: 'row',
  },
  input: {
    width: '90%',
    marginVertical: 10,
    padding: 15,
    backgroundColor: colorStyles.offWhite,
    borderRadius: 5,
    fontSize: 16,
    color: colorStyles.darkText,
    borderWidth: 1,
    borderColor: colorStyles.lighterGreen,
  },
  inputShort: {
    width: '42%',
    margin: 10,
    padding: 15,
    backgroundColor: colorStyles.offWhite,
    borderRadius: 5,
    fontSize: 16,
    color: colorStyles.darkText,
    borderWidth: 1,
    borderColor: colorStyles.lighterGreen,
  },
  buttonContainerWide: {
    backgroundColor: colorStyles.primaryGreen,
    width: '90%',
    borderRadius: 5,
    paddingVertical: 12,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: colorStyles.darkText,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonContainerWideAlt: {
    backgroundColor: colorStyles.secondaryGreen,
    width: '90%',
    borderRadius: 5,
    paddingVertical: 12,
    marginVertical: 10,
  },
  buttonText: {
    color: colorStyles.textOnPrimary,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonTextAlt: {
    color: colorStyles.textOnSecondary,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colorStyles.secondaryGreen,
    marginBottom: 20,
  },
  subtitleText: {
    fontSize: 18,
    fontWeight: 'normal',
    color: colorStyles.textOnPrimary,
    marginBottom: 4,
  },
  datePickerText: {
    fontSize: 16,
    color: colorStyles.secondaryGreen,
    backgroundColor: colorStyles.offWhite,
    borderRadius: 5,
  },

  errorText: {
    fontSize: 14,
    color: 'red',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255,0,0,0.2)',
    textAlign: 'center',
    width: '100%',
  },
  horizontalRuleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  horizontalRule: {
    flex: 1,
    height: 1,
    backgroundColor: colorStyles.secondaryGreen,
  },
  horizontalRuleText: {
    paddingHorizontal: 8,
    fontSize: 16,
    color: colorStyles.secondaryGreen,
  },
  wideContainer: {
    width: '100%',
    paddingHorizontal: 5,
  },
  plaidContainer: {
    backgroundColor: colorStyles.offWhite,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: '100%',
  },
  plaidTextView: {
    width: '100%',
    paddingVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colorStyles.offWhite,
  },
  plaidTextStyle: {
    fontSize: 24,
    fontWeight: '600',
    color: colorStyles.darkText,
  },
  plaidButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '80%',
  },
  plaidButtonText: {
    color: colorStyles.offWhite,
    fontWeight: '600',
    fontSize: 20,
  },
  plaidButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: 15,
    backgroundColor: colorStyles.accentBlue,
    borderRadius: 10,
  },
  balanceItemContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    backgroundColor: colorStyles.secondaryGreen,
    borderRadius: 10,
    height: 100,
  },
  balanceTextView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceText: {
    color: colorStyles.offWhite,
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
    borderColor: colorStyles.primaryGreen,
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
  itemContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    backgroundColor: colorStyles.primaryGreen,
    borderRadius: 10,
    height: 100,
  },
  textView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colorStyles.offWhite,
    fontSize: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginBottom: 5,
  },
  fontStyle: {
    color: colorStyles.offWhite,
    fontSize: 12,
  },
  walletContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  walletHeading: {
    color: colorStyles.secondaryAccent,
    fontSize: 20,
    fontWeight: '600',
    padding: 10,
    textAlign: 'center',
  },
  walletTransactions: {
    paddingBottom: 50,
    height: '75%',
  },
  walletBalance: {
    height: '25%',
    width: '100%',
  },
  balanceHeader: {fontSize: 12, fontWeight: '600', color: colorStyles.darkText},
  balanceHeaderLarge: {
    fontSize: 30,
    fontWeight: '600',
    color: colorStyles.darkText,
  },
  balanceFlatList: {
    paddingHorizontal: 10,
  },
  transactionItemContainer: {
    backgroundColor: '#62C370',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '40%',
  },
  transactionMerchantText: {
    color: '#F6F4F3',
    fontSize: 14,
  },
  transactionMerchantName: {
    color: '#F6F4F3',
    fontWeight: 'bold',
  },

  transactionIconImg: {height: 24, width: 24, margin: 10},
  transactionIconSmall: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '30%',
  },
  transactionList: {
    // If you want to add padding or other styling to the FlatList
  },
  transactionDetails: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 10,
  },

  transactionPaymentModeText: {
    fontSize: 14,
    color: '#183059',
    marginBottom: 4,
  },

  transactionPaymentMode: {
    fontSize: 12,
    color: '#F6F4F3',
  },

  transactionAmountContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
  },

  transactionAmountIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },

  transactionAmountText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F6F4F3',
  },
});
