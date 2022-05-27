import React from 'react';
import {Text, View, Pressable, StyleSheet} from 'react-native';
import {parseDate} from '../helpers';

const Patient = ({
  item,
  setModalVisible,
  setPatient,
  editPatient,
  deletePatient,
  setPatientModal,
}) => {
  const {patientName, date, id} = item;

  /* Methods */

  const handleEdit = () => {
    setModalVisible(true);
    editPatient(id);
  };

  return (
    <Pressable
      onLongPress={() => {
        setPatientModal(true);
        setPatient(item);
      }}>
      <View style={styles.container}>
        <Text style={styles.label}>Patient:</Text>
        <Text style={styles.text}>{patientName}</Text>
        <Text style={styles.date}>{parseDate(date)}</Text>

        <View style={styles.buttonsContainer}>
          <Pressable
            style={[styles.btn, styles.editBtn]}
            onLongPress={handleEdit}>
            <Text style={styles.btnText}>Edit</Text>
          </Pressable>

          <Pressable
            style={[styles.btn, styles.deleteBtn]}
            onLongPress={() => deletePatient(id)}>
            <Text style={styles.btnText}>Delete</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    padding: 20,
    borderBottomColor: '#94A3B8',
    borderBottomWidth: 1,
  },
  label: {
    color: '#374151',
    textTransform: 'uppercase',
    fontWeight: '700',
    marginBottom: 10,
  },
  text: {
    color: '#6D28D9',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },
  date: {
    color: '#6D28D9',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  btn: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  editBtn: {
    backgroundColor: '#F59E0B',
  },
  deleteBtn: {
    backgroundColor: '#EF4444',
  },
  btnText: {
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 12,
    color: '#FFF',
  },
});

export default Patient;
