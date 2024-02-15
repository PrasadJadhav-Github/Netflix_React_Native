/* eslint - disable no - trailing - spaces * /
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList } from 'react-native';


const WelcomeScreen = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDataFromServer();
  }, []);

  const fetchDataFromServer = async () => {
    try {
      const response = await fetch('http://192.168.73.81/api/user.php');
      const data = await response.json();

      if (data.status === 'success') {
        setUserData(data.users);
      } else {
        console.error(data.message);
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const renderTableRow = (item, index) => (
    <View
      key={index}
      style={[
        styles.tableRow,
        index % 2 === 0 ? styles.evenRow : styles.oddRow,
      ]}
    >

      <View style={styles.tableCell}>
        <Text style={styles.rowText}>{item.firstname}</Text>
      </View>
      <View style={styles.tableCell}>
        <Text style={styles.rowText}>{item.lastname}</Text>
      </View>
      <View style={styles.tableCell}>
        <Text style={styles.rowText}>{item.contact}</Text>
      </View>
      <View style={styles.tableCell}>
        <Text style={styles.rowText}>{item.gender}</Text>
      </View>
    </View>
  );

  return (
    <ImageBackground
      source={require('./images/login.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.tableTitle}>User Data</Text>
        {loading ? (
          <Text>Loading.....</Text>
        ) : (
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <View style={styles.tableCell}>
                <Text style={styles.headerText}>First Name</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.headerText}>Last Name</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.headerText}>Contact</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.headerText}>Gender</Text>
              </View>
            </View>
            {userData.map((item, index) => renderTableRow(item, index))}
          </View>
        )}
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  table: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    backgroundColor: 'white',
    marginTop: 20,
    flex: 4,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    backgroundColor: 'red',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  tableCell: {
    flex: 1,
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: 'gray',
  },
  evenRow: {
    backgroundColor: 'white',
  },
  oddRow: {
    backgroundColor: 'white',
  },
  rowText: {
    color: 'black',
  },
  headerText: {
    fontWeight: 'bold',
    color: 'black',
  },
  tableTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
});

export default WelcomeScreen;
