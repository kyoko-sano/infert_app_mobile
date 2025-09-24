import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [tasks, setTasks] = useState([
    { id: 1, title: 'ホルモン注射', time: '09:00', completed: false, icon: '💉' },
    { id: 2, title: 'サプリメント', time: '12:00', completed: true, icon: '💊' },
    { id: 3, title: '病院予約', time: '14:30', completed: false, icon: '🏥' },
  ]);

  const [mood, setMood] = useState(3);
  const [symptoms, setSymptoms] = useState([]);

  const markedDates = {
    '2024-01-15': { marked: true, dotColor: '#6366f1', customStyles: { text: { color: '#6366f1' } } },
    '2024-01-18': { marked: true, dotColor: '#ef4444', customStyles: { text: { color: '#ef4444' } } },
    '2024-01-22': { marked: true, dotColor: '#10b981', customStyles: { text: { color: '#10b981' } } },
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const toggleSymptom = (symptom) => {
    setSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* カレンダーセクション */}
        <View style={styles.section}>
          <View style={styles.cycleInfo}>
            <Text style={styles.cycleText}>高温期 10日目</Text>
            <Text style={styles.cycleSubText}>次回予定: 1月28日</Text>
          </View>
          <Calendar
            onDayPress={(day) => setSelectedDate(day.dateString)}
            markedDates={markedDates}
            theme={{
              backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',
              textSectionTitleColor: '#6b7280',
              selectedDayBackgroundColor: '#6366f1',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#6366f1',
              dayTextColor: '#374151',
              textDisabledColor: '#d1d5db',
              arrowColor: '#6366f1',
              monthTextColor: '#374151',
              indicatorColor: '#6366f1',
            }}
          />
        </View>

        {/* 進捗ビジュアル */}
        <View style={styles.section}>
          <View style={styles.progressCard}>
            <Text style={styles.progressTitle}>今月の進捗</Text>
            <View style={styles.rocketContainer}>
              <Text style={styles.rocket}>🚀</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '65%' }]} />
              </View>
              <Text style={styles.progressText}>65% 完了</Text>
            </View>
          </View>
        </View>

        {/* パートナーメッセージ */}
        <View style={styles.section}>
          <View style={styles.messageCard}>
            <Ionicons name="heart" size={16} color="#ef4444" />
            <Text style={styles.messageText}>今日もお疲れさま！一緒に頑張ろう ❤️</Text>
          </View>
        </View>

        {/* 今日のタスク */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>今日やること</Text>
          {tasks.map((task) => (
            <TouchableOpacity
              key={task.id}
              style={[styles.taskCard, task.completed && styles.taskCompleted]}
              onPress={() => toggleTask(task.id)}
            >
              <View style={styles.taskLeft}>
                <Text style={styles.taskIcon}>{task.icon}</Text>
                <View>
                  <Text style={[styles.taskTitle, task.completed && styles.taskTitleCompleted]}>
                    {task.title}
                  </Text>
                  <Text style={styles.taskTime}>{task.time}</Text>
                </View>
              </View>
              <Ionicons
                name={task.completed ? 'checkmark-circle' : 'ellipse-outline'}
                size={24}
                color={task.completed ? '#10b981' : '#d1d5db'}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* 体調記録 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>今日の体調</Text>
          <View style={styles.moodCard}>
            <Text style={styles.moodLabel}>気分</Text>
            <View style={styles.moodSlider}>
              {[1, 2, 3, 4, 5].map((value) => (
                <TouchableOpacity
                  key={value}
                  style={[styles.moodButton, mood === value && styles.moodButtonActive]}
                  onPress={() => setMood(value)}
                >
                  <Text style={[styles.moodEmoji, mood === value && styles.moodEmojiActive]}>
                    {value === 1 ? '😢' : value === 2 ? '😔' : value === 3 ? '😐' : value === 4 ? '😊' : '😄'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.symptomsCard}>
            <Text style={styles.symptomsLabel}>症状</Text>
            <View style={styles.symptomsGrid}>
              {['出血', '腹痛', '頭痛', '吐き気', '眠気', '胸の張り'].map((symptom) => (
                <TouchableOpacity
                  key={symptom}
                  style={[styles.symptomButton, symptoms.includes(symptom) && styles.symptomButtonActive]}
                  onPress={() => toggleSymptom(symptom)}
                >
                  <Text style={[styles.symptomText, symptoms.includes(symptom) && styles.symptomTextActive]}>
                    {symptom}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* おすすめ情報 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>おすすめ情報</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>妊活サプリの選び方</Text>
              <Text style={styles.infoSubtitle}>専門医が解説</Text>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>ストレス管理のコツ</Text>
              <Text style={styles.infoSubtitle}>メンタルケア</Text>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  section: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  cycleInfo: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cycleText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  cycleSubText: {
    fontSize: 14,
    color: '#6b7280',
  },
  progressCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 16,
  },
  rocketContainer: {
    alignItems: 'center',
  },
  rocket: {
    fontSize: 40,
    marginBottom: 12,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#6b7280',
  },
  messageCard: {
    backgroundColor: '#fef2f2',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#ef4444',
  },
  messageText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 8,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  taskCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  taskCompleted: {
    opacity: 0.6,
  },
  taskLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#9ca3af',
  },
  taskTime: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  moodCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  moodLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 12,
  },
  moodSlider: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moodButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moodButtonActive: {
    backgroundColor: '#6366f1',
  },
  moodEmoji: {
    fontSize: 24,
  },
  moodEmojiActive: {
    transform: [{ scale: 1.2 }],
  },
  symptomsCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  symptomsLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 12,
  },
  symptomsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  symptomButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    marginRight: 8,
    marginBottom: 8,
  },
  symptomButtonActive: {
    backgroundColor: '#6366f1',
  },
  symptomText: {
    fontSize: 12,
    color: '#6b7280',
  },
  symptomTextActive: {
    color: '#ffffff',
  },
  infoCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    width: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  infoSubtitle: {
    fontSize: 12,
    color: '#6b7280',
  },
});

export default HomeScreen;