import React from 'react';
import {Text, SafeAreaView, View, Pressable, StyleSheet} from 'react-native';
import {parseDate} from '../helpers';

const PatientInfo = ({patient, setPatientModal, setPatient}) => {
  console.log({patient});
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Patient <Text style={styles.boldTitle}>Information</Text>
      </Text>

      <View>
        <Pressable
          style={styles.closeBtn}
          onLongPress={() => {
            setPatientModal(false);
            setPatient({});
          }}>
          <Text style={styles.closeBtnText}>X Close</Text>
        </Pressable>
      </View>

      <View style={styles.content}>
        <View style={styles.field}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{patient.patientName}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Owner</Text>
          <Text style={styles.value}>{patient.ownerName}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{patient.ownerEmail}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>{patient.ownerPhone}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Leave date</Text>
          <Text style={styles.value}>{parseDate(patient.date)}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Symptoms</Text>
          <Text style={styles.value}>{patient.patientSymptoms}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F59E0B',
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
  closeBtn: {
    marginVertical: 30,
    backgroundColor: '#E06900',
    marginHorizontal: 30,
    padding: 15,
    borderRadius: 10,
  },
  closeBtnText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  content: {
    backgroundColor: '#FFF',
    marginHorizontal: 30,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  field: {
    marginBottom: 10,
  },
  label: {
    textTransform: 'uppercase',
    color: '#374151',
    fontWeight: '700',
    fontSize: 12,
  },
  value: {
    fontWeight: '700',
    fontSize: 20,
    color: '#334155',
  },
});

export default PatientInfo;
