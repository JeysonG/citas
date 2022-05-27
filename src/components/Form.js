import React, {useState, useEffect} from 'react';
import {
  Text,
  Pressable,
  Modal,
  SafeAreaView,
  TextInput,
  View,
  ScrollView,
  Alert,
  StyleSheet,
} from 'react-native';
import DatePicker from 'react-native-date-picker';

const Form = ({
  modalVisible,
  patient,
  patients,
  setPatient,
  setPatients,
  closeModal,
}) => {
  /* State */

  const [id, setId] = useState('');
  const [patientName, setPatientName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [date, setDate] = useState(new Date());
  const [patientSymptoms, setPatientSymptoms] = useState('');

  /* UseEffect */

  useEffect(() => {
    if (Object.keys(patient).length > 0) {
      setId(patient.id);
      setPatientName(patient.patientName);
      setOwnerName(patient.ownerName);
      setOwnerEmail(patient.ownerEmail);
      setOwnerPhone(patient.ownerPhone);
      setDate(patient.date);
      setPatientSymptoms(patient.patientSymptoms);
    }
  }, [patient]);

  /* Methods */

  /* Clear state */
  const clearState = () => {
    setPatientName('');
    setOwnerName('');
    setOwnerEmail('');
    setOwnerPhone('');
    setDate(new Date());
    setPatientSymptoms('');

    /* Clear edit patient */
    setPatient({});
  };

  const handleAppointment = () => {
    /* Validate form */
    if (
      [
        patientName,
        ownerName,
        ownerEmail,
        ownerPhone,
        date,
        patientSymptoms,
      ].includes('')
    ) {
      Alert.alert('There are errors', 'All fields are required');

      return;
    }

    const tmpPatient = {
      patientName,
      ownerName,
      ownerEmail,
      ownerPhone,
      date,
      patientSymptoms,
    };

    /* Validate if is edit */
    if (id) {
      /* Edit patient */
      tmpPatient.id = id;

      const newPatients = patients.map(patient =>
        patient.id === tmpPatient.id ? tmpPatient : patient,
      );

      setPatients(newPatients);
    } else {
      /* Create patient */
      tmpPatient.id = Date.now();

      /* Add new patient to state */
      setPatients([...patients, tmpPatient]);
    }

    /* Close modal */
    closeModal();
    clearState();
  };

  const handleCancel = () => {
    closeModal();
    clearState();
  };

  return (
    <Modal animationType="slide" visible={modalVisible}>
      <SafeAreaView style={styles.content}>
        <ScrollView>
          <Text style={styles.title}>
            {patient.id ? 'Edit' : 'New'} &nbsp;
            <Text style={styles.boldTitle}>Appointment</Text>
          </Text>

          <Pressable style={styles.cancelBtn} onLongPress={handleCancel}>
            <Text style={styles.cancelBtnText}>X Cancel</Text>
          </Pressable>

          <View style={styles.field}>
            <Text style={styles.label}>Patient Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Patient name"
              placeholderTextColor={'#666'}
              value={patientName}
              onChangeText={setPatientName}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Owner Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Owner name"
              placeholderTextColor={'#666'}
              value={ownerName}
              onChangeText={setOwnerName}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Owner Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Owner email"
              placeholderTextColor={'#666'}
              keyboardType="email-address"
              value={ownerEmail}
              onChangeText={setOwnerEmail}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Owner Phone</Text>
            <TextInput
              style={styles.input}
              placeholder="Owner phone"
              placeholderTextColor={'#666'}
              keyboardType="number-pad"
              maxLength={10}
              value={ownerPhone}
              onChangeText={setOwnerPhone}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Date leave</Text>
            <View style={styles.contentDate}>
              <DatePicker
                date={date}
                locale="en"
                mode="date"
                onDateChange={date => setDate(date)}
              />
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Patient Symptoms</Text>
            <TextInput
              style={[styles.input, styles.symptomsInput]}
              placeholder="Patient symptoms"
              placeholderTextColor={'#666'}
              multiline={true}
              numberOfLines={4}
              value={patientSymptoms}
              onChangeText={setPatientSymptoms}
            />
          </View>

          <Pressable
            style={styles.newAppointmentBtn}
            onPress={handleAppointment}>
            <Text style={styles.newAppointmentBtnText}>
              {patient.id ? 'Edit' : 'Add'} Patient
            </Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#6D28D9',
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 30,
    color: '#FFF',
  },
  boldTitle: {
    fontWeight: '900',
  },
  cancelBtn: {
    marginVertical: 30,
    backgroundColor: '#5827A4',
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 10,
  },
  cancelBtnText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  field: {
    marginTop: 10,
    marginHorizontal: 30,
  },
  label: {
    color: '#FFF',
    marginBottom: 10,
    marginTop: 15,
    fontSize: 20,
  },
  input: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
  },
  symptomsInput: {
    height: 100,
  },
  contentDate: {
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  newAppointmentBtn: {
    marginVertical: 50,
    backgroundColor: '#F59E0B',
    marginHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
  },
  newAppointmentBtnText: {
    color: '#5827A4',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
  },
});

export default Form;
