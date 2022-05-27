import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  Pressable,
  FlatList,
  Alert,
  Modal,
  StyleSheet,
} from 'react-native';
import Form from './src/components/Form';
import Patient from './src/components/Patient';
import PatientInfo from './src/components/PatientInfo';

const App = () => {
  /* State */
  const [modalVisible, setModalVisible] = useState(false);
  const [patients, setPatients] = useState([]);
  const [patient, setPatient] = useState({});
  const [patientModal, setPatientModal] = useState(false);

  /* Methods */

  const editPatient = id => {
    const tmpPatient = patients.filter(patient => patient.id === id);

    setPatient(tmpPatient[0]);
  };

  const deletePatient = id => {
    Alert.alert(
      'Are you sure you want delete this patient?',
      'A deleted patient cannot be recovered',
      [
        {text: 'Cancel'},
        {
          text: 'Yes, delete it',
          onPress: () => {
            const newPatients = patients.filter(
              tmpPatient => tmpPatient.id !== id,
            );

            setPatients(newPatients);
          },
        },
      ],
    );
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Appointments Admin &nbsp;
        <Text style={styles.boldTitle}>Veterinarian</Text>
      </Text>

      <Pressable
        style={styles.newDateBtn}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.newDateBtnTxt}>New Appointment</Text>
      </Pressable>

      {patients.length === 0 ? (
        <Text style={styles.noPatients}>There aren't patients yet</Text>
      ) : (
        <FlatList
          style={styles.list}
          data={patients}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <Patient
                item={item}
                setModalVisible={setModalVisible}
                setPatient={setPatient}
                editPatient={editPatient}
                deletePatient={deletePatient}
                setPatientModal={setPatientModal}
              />
            );
          }}
        />
      )}

      {modalVisible && (
        <Form
          patient={patient}
          patients={patients}
          setPatient={setPatient}
          setPatients={setPatients}
          closeModal={closeModal}
        />
      )}

      <Modal visible={patientModal} animationType="fade">
        <PatientInfo
          patient={patient}
          setPatientModal={setPatientModal}
          setPatient={setPatient}
        />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F4F6',
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    color: '#374151',
    fontWeight: '600',
  },
  boldTitle: {
    fontWeight: '900',
    color: '#6D28D9',
  },
  newDateBtn: {
    backgroundColor: '#6D28D9',
    padding: 15,
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  newDateBtnTxt: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 20,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  noPatients: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
  },
  list: {
    marginTop: 50,
    marginHorizontal: 30,
  },
});

export default App;
