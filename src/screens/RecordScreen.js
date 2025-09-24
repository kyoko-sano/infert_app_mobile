import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RecordScreen = () => {
  const [activeTab, setActiveTab] = useState('numbers');
  const [modalVisible, setModalVisible] = useState(false);
  const [newRecord, setNewRecord] = useState({ type: '', value: '', date: '' });

  const [records, setRecords] = useState([
    { id: 1, type: 'FSH', value: '8.2', date: '2024-01-15', unit: 'mIU/mL' },
    { id: 2, type: 'LH', value: '12.5', date: '2024-01-15', unit: 'mIU/mL' },
    { id: 3, type: 'AMH', value: '2.8', date: '2024-01-10', unit: 'ng/mL' },
  ]);

  const [expenses, setExpenses] = useState([
    { id: 1, category: '診察費', amount: 15000, date: '2024-01-15' },
    { id: 2, category: '薬代', amount: 8500, date: '2024-01-12' },
    { id: 3, category: '検査費', amount: 25000, date: '2024-01-10' },
  ]);

  const [treatments, setTreatments] = useState([
    { id: 1, type: 'タイミング法', cycle: 3, result: '陰性', date: '2024-01-01' },
    { id: 2, type: '人工授精', cycle: 1, result: '陰性', date: '2023-12-15' },
  ]);

  const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const renderNumbersTab = () => (
    <View style={styles.tabContent}>
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={20} color="#ffffff" />
        <Text style={styles.addButtonText}>新しい数値を追加</Text>
      </TouchableOpacity>

      <View style={styles.chartCard}>
        <Text style={styles.chartTitle}>最新の検査結果</Text>
        <View style={styles.chartPlaceholder}>
          <Ionicons name="analytics" size={40} color="#6b7280" />
          <Text style={styles.chartText}>グラフ表示エリア</Text>
        </View>
      </View>

      <View style={styles.recordsList}>
        <Text style={styles.listTitle}>過去の記録</Text>
        {records.map((record) => (
          <View key={record.id} style={styles.recordCard}>
            <View style={styles.recordHeader}>
              <Text style={styles.recordType}>{record.type}</Text>
              <Text style={styles.recordDate}>{record.date}</Text>
            </View>
            <Text style={styles.recordValue}>
              {record.value} {record.unit}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderExpensesTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>今月の支出</Text>
        <Text style={styles.summaryAmount}>¥{totalExpense.toLocaleString()}</Text>
        <Text style={styles.summarySubtext}>
          パートナーとの割り勘: ¥{Math.floor(totalExpense / 2).toLocaleString()}
        </Text>
      </View>

      <View style={styles.expensesList}>
        <Text style={styles.listTitle}>支出履歴</Text>
        {expenses.map((expense) => (
          <View key={expense.id} style={styles.expenseCard}>
            <View style={styles.expenseLeft}>
              <Text style={styles.expenseCategory}>{expense.category}</Text>
              <Text style={styles.expenseDate}>{expense.date}</Text>
            </View>
            <Text style={styles.expenseAmount}>¥{expense.amount.toLocaleString()}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderTreatmentsTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.treatmentsList}>
        <Text style={styles.listTitle}>治療履歴</Text>
        {treatments.map((treatment) => (
          <View key={treatment.id} style={styles.treatmentCard}>
            <View style={styles.treatmentHeader}>
              <Text style={styles.treatmentType}>{treatment.type}</Text>
              <Text style={styles.treatmentResult}>{treatment.result}</Text>
            </View>
            <Text style={styles.treatmentDetails}>
              {treatment.cycle}回目 • {treatment.date}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'numbers' && styles.activeTab]}
          onPress={() => setActiveTab('numbers')}
        >
          <Text style={[styles.tabText, activeTab === 'numbers' && styles.activeTabText]}>
            数値
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'expenses' && styles.activeTab]}
          onPress={() => setActiveTab('expenses')}
        >
          <Text style={[styles.tabText, activeTab === 'expenses' && styles.activeTabText]}>
            金額
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'treatments' && styles.activeTab]}
          onPress={() => setActiveTab('treatments')}
        >
          <Text style={[styles.tabText, activeTab === 'treatments' && styles.activeTabText]}>
            治療履歴
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'numbers' && renderNumbersTab()}
        {activeTab === 'expenses' && renderExpensesTab()}
        {activeTab === 'treatments' && renderTreatmentsTab()}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>新しい記録を追加</Text>
            <TextInput
              style={styles.input}
              placeholder="項目名（例: FSH）"
              value={newRecord.type}
              onChangeText={(text) => setNewRecord({...newRecord, type: text})}
            />
            <TextInput
              style={styles.input}
              placeholder="数値"
              value={newRecord.value}
              onChangeText={(text) => setNewRecord({...newRecord, value: text})}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="日付（YYYY-MM-DD）"
              value={newRecord.date}
              onChangeText={(text) => setNewRecord({...newRecord, date: text})}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>キャンセル</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => {
                  // 保存処理
                  setModalVisible(false);
                  setNewRecord({ type: '', value: '', date: '' });
                }}
              >
                <Text style={styles.saveButtonText}>保存</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#6366f1',
  },
  tabText: {
    fontSize: 16,
    color: '#6b7280',
  },
  activeTabText: {
    color: '#6366f1',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  tabContent: {
    padding: 16,
  },
  addButton: {
    backgroundColor: '#6366f1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  chartCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 16,
  },
  chartPlaceholder: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 8,
  },
  chartText: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 8,
  },
  recordsList: {
    marginBottom: 20,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  recordCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  recordType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  recordDate: {
    fontSize: 12,
    color: '#6b7280',
  },
  recordValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#6366f1',
  },
  summaryCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 8,
  },
  summaryAmount: {
    fontSize: 32,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 8,
  },
  summarySubtext: {
    fontSize: 14,
    color: '#6b7280',
  },
  expensesList: {
    marginBottom: 20,
  },
  expenseCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  expenseLeft: {
    flex: 1,
  },
  expenseCategory: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  expenseDate: {
    fontSize: 12,
    color: '#6b7280',
  },
  expenseAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ef4444',
  },
  treatmentsList: {
    marginBottom: 20,
  },
  treatmentCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  treatmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  treatmentType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  treatmentResult: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ef4444',
    backgroundColor: '#fef2f2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  treatmentDetails: {
    fontSize: 12,
    color: '#6b7280',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 16,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
    marginRight: 8,
  },
  cancelButtonText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#6b7280',
  },
  saveButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#6366f1',
    marginLeft: 8,
  },
  saveButtonText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
  },
});

export default RecordScreen;