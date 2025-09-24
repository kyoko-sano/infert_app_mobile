import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  TextInput,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = () => {
  const [profile, setProfile] = useState({
    name: 'ユーザー A',
    age: 32,
    stage: 'タイミング法',
    amh: '2.8',
    introduction: '妊活を始めて半年です。同じような状況の方と情報交換できればと思います。',
  });

  const [privacy, setPrivacy] = useState({
    shareWithPartner: true,
    showInCommunity: true,
    detailedReminders: false,
    shareWeight: false,
    shareMedication: true,
    shareDailyLog: false,
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [editingField, setEditingField] = useState('');
  const [tempValue, setTempValue] = useState('');

  const openEditModal = (field, currentValue) => {
    setEditingField(field);
    setTempValue(currentValue);
    setModalVisible(true);
  };

  const saveEdit = () => {
    setProfile({ ...profile, [editingField]: tempValue });
    setModalVisible(false);
    setEditingField('');
    setTempValue('');
  };

  const renderProfileItem = (label, value, field, icon) => (
    <TouchableOpacity 
      style={styles.profileItem}
      onPress={() => openEditModal(field, value)}
    >
      <View style={styles.profileItemLeft}>
        <Ionicons name={icon} size={20} color="#6b7280" />
        <View style={styles.profileItemContent}>
          <Text style={styles.profileItemLabel}>{label}</Text>
          <Text style={styles.profileItemValue}>{value}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#d1d5db" />
    </TouchableOpacity>
  );

  const renderPrivacyItem = (label, description, value, onValueChange) => (
    <View style={styles.privacyItem}>
      <View style={styles.privacyItemContent}>
        <Text style={styles.privacyItemLabel}>{label}</Text>
        <Text style={styles.privacyItemDescription}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#d1d5db', true: '#6366f1' }}
        thumbColor={value ? '#ffffff' : '#f3f4f6'}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* プロフィール画像・基本情報 */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={40} color="#6b7280" />
            </View>
            <TouchableOpacity style={styles.editAvatarButton}>
              <Ionicons name="camera" size={16} color="#6366f1" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{profile.name}</Text>
          <Text style={styles.userDetails}>
            {profile.age}歳 • {profile.stage}
          </Text>
        </View>

        {/* プロフィール詳細 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>プロフィール</Text>
          <View style={styles.profileCard}>
            {renderProfileItem('名前', profile.name, 'name', 'person-outline')}
            {renderProfileItem('年齢', `${profile.age}歳`, 'age', 'calendar-outline')}
            {renderProfileItem('治療段階', profile.stage, 'stage', 'medical-outline')}
            {renderProfileItem('AMH値', `${profile.amh} ng/mL`, 'amh', 'analytics-outline')}
            {renderProfileItem('自己紹介', profile.introduction, 'introduction', 'document-text-outline')}
          </View>
        </View>

        {/* パートナー連携 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>パートナー連携</Text>
          <View style={styles.partnerCard}>
            <View style={styles.partnerInfo}>
              <Ionicons name="heart" size={24} color="#ef4444" />
              <View style={styles.partnerDetails}>
                <Text style={styles.partnerName}>パートナー未連携</Text>
                <Text style={styles.partnerStatus}>招待コードを送信して連携</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.inviteButton}>
              <Text style={styles.inviteButtonText}>招待する</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* プライバシー設定 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>プライバシー設定</Text>
          <View style={styles.privacyCard}>
            {renderPrivacyItem(
              'パートナーと情報共有',
              '基本的な記録をパートナーと共有します',
              privacy.shareWithPartner,
              (value) => setPrivacy({ ...privacy, shareWithPartner: value })
            )}
            {renderPrivacyItem(
              'コミュニティに表示',
              '投稿時にプロフィール情報を表示します',
              privacy.showInCommunity,
              (value) => setPrivacy({ ...privacy, showInCommunity: value })
            )}
            {renderPrivacyItem(
              '詳細なリマインダー',
              'アラーム時に薬名などの詳細を表示します',
              privacy.detailedReminders,
              (value) => setPrivacy({ ...privacy, detailedReminders: value })
            )}
          </View>
        </View>

        {/* 共有設定詳細 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>パートナー共有設定</Text>
          <View style={styles.privacyCard}>
            {renderPrivacyItem(
              '体重情報',
              '体重の記録をパートナーと共有',
              privacy.shareWeight,
              (value) => setPrivacy({ ...privacy, shareWeight: value })
            )}
            {renderPrivacyItem(
              '薬・治療情報',
              '服薬記録や治療内容を共有',
              privacy.shareMedication,
              (value) => setPrivacy({ ...privacy, shareMedication: value })
            )}
            {renderPrivacyItem(
              '日別ログ',
              '体調や症状の日別記録を共有',
              privacy.shareDailyLog,
              (value) => setPrivacy({ ...privacy, shareDailyLog: value })
            )}
          </View>
        </View>

        {/* その他設定 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>その他</Text>
          <View style={styles.settingsCard}>
            <TouchableOpacity style={styles.settingItem}>
              <Ionicons name="notifications-outline" size={20} color="#6b7280" />
              <Text style={styles.settingText}>通知設定</Text>
              <Ionicons name="chevron-forward" size={20} color="#d1d5db" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.settingItem}>
              <Ionicons name="shield-outline" size={20} color="#6b7280" />
              <Text style={styles.settingText}>セキュリティ</Text>
              <Ionicons name="chevron-forward" size={20} color="#d1d5db" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.settingItem}>
              <Ionicons name="help-circle-outline" size={20} color="#6b7280" />
              <Text style={styles.settingText}>ヘルプ・サポート</Text>
              <Ionicons name="chevron-forward" size={20} color="#d1d5db" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.settingItem}>
              <Ionicons name="log-out-outline" size={20} color="#ef4444" />
              <Text style={[styles.settingText, { color: '#ef4444' }]}>ログアウト</Text>
              <Ionicons name="chevron-forward" size={20} color="#d1d5db" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* 編集モーダル */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButton}>キャンセル</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>編集</Text>
              <TouchableOpacity onPress={saveEdit}>
                <Text style={styles.saveButton}>保存</Text>
              </TouchableOpacity>
            </View>
            
            <TextInput
              style={[
                styles.editInput,
                editingField === 'introduction' && styles.multilineInput
              ]}
              value={tempValue}
              onChangeText={setTempValue}
              multiline={editingField === 'introduction'}
              numberOfLines={editingField === 'introduction' ? 4 : 1}
              placeholder="入力してください"
            />
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
  header: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editAvatarButton: {
    position: 'absolute',
    right: -4,
    bottom: -4,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 4,
  },
  userDetails: {
    fontSize: 16,
    color: '#6b7280',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  profileCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  profileItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileItemContent: {
    marginLeft: 12,
    flex: 1,
  },
  profileItemLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  profileItemValue: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  partnerCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  partnerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  partnerDetails: {
    marginLeft: 12,
    flex: 1,
  },
  partnerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 2,
  },
  partnerStatus: {
    fontSize: 14,
    color: '#6b7280',
  },
  inviteButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  inviteButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  privacyCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  privacyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  privacyItemContent: {
    flex: 1,
    marginRight: 16,
  },
  privacyItemLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 2,
  },
  privacyItemDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  settingsCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  settingText: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 12,
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    minHeight: 200,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
  },
  cancelButton: {
    fontSize: 16,
    color: '#6b7280',
  },
  saveButton: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6366f1',
  },
  editInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#374151',
  },
  multilineInput: {
    height: 120,
    textAlignVertical: 'top',
  },
});

export default ProfileScreen;