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

const CommunityScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [modalVisible, setModalVisible] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '', tags: [] });

  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'ユーザー A',
      age: 32,
      stage: 'タイミング法',
      title: '初めての妊活で不安です',
      content: '妊活を始めて3ヶ月目です。まだ結果が出ず、不安になってきました。同じような経験をされた方はいらっしゃいますか？',
      reactions: { understand: 12, support: 8, pray: 15 },
      comments: 5,
      timestamp: '2時間前',
      tags: ['初心者', 'タイミング法', '不安'],
    },
    {
      id: 2,
      author: 'ユーザー B',
      age: 28,
      stage: '人工授精',
      title: 'パートナーとの温度差について',
      content: '夫が妊活にあまり積極的ではなく、温度差を感じています。どのように話し合えばよいでしょうか？',
      reactions: { understand: 25, support: 18, pray: 10 },
      comments: 12,
      timestamp: '5時間前',
      tags: ['パートナー', '人工授精', '相談'],
    },
    {
      id: 3,
      author: 'ユーザー C',
      age: 35,
      stage: '体外受精',
      title: '転院を検討中です',
      content: '現在の病院で1年間治療していますが、なかなか結果が出ません。転院された方の体験談を聞かせてください。',
      reactions: { understand: 18, support: 22, pray: 14 },
      comments: 8,
      timestamp: '1日前',
      tags: ['転院', '体外受精', '病院'],
    },
  ]);

  const filters = [
    { key: 'all', label: 'すべて' },
    { key: 'timing', label: 'タイミング法' },
    { key: 'iui', label: '人工授精' },
    { key: 'ivf', label: '体外受精' },
    { key: 'mental', label: 'メンタル' },
  ];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchText.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchText.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
                         post.tags.some(tag => tag.includes(selectedFilter));
    return matchesSearch && matchesFilter;
  });

  const renderReactionButton = (type, count, icon) => (
    <TouchableOpacity style={styles.reactionButton}>
      <Text style={styles.reactionIcon}>{icon}</Text>
      <Text style={styles.reactionCount}>{count}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* 検索・フィルター */}
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#6b7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="投稿を検索..."
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterButton,
                selectedFilter === filter.key && styles.filterButtonActive
              ]}
              onPress={() => setSelectedFilter(filter.key)}
            >
              <Text style={[
                styles.filterText,
                selectedFilter === filter.key && styles.filterTextActive
              ]}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* 投稿リスト */}
      <ScrollView style={styles.postsContainer}>
        {filteredPosts.map((post) => (
          <View key={post.id} style={styles.postCard}>
            <View style={styles.postHeader}>
              <View style={styles.authorInfo}>
                <Text style={styles.authorName}>{post.author}</Text>
                <Text style={styles.authorDetails}>
                  {post.age}歳 • {post.stage}
                </Text>
              </View>
              <Text style={styles.timestamp}>{post.timestamp}</Text>
            </View>

            <Text style={styles.postTitle}>{post.title}</Text>
            <Text style={styles.postContent}>{post.content}</Text>

            <View style={styles.tagsContainer}>
              {post.tags.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>#{tag}</Text>
                </View>
              ))}
            </View>

            <View style={styles.postActions}>
              <View style={styles.reactions}>
                {renderReactionButton('understand', post.reactions.understand, '😭')}
                {renderReactionButton('support', post.reactions.support, '💪')}
                {renderReactionButton('pray', post.reactions.pray, '🫶')}
              </View>
              
              <TouchableOpacity style={styles.commentButton}>
                <Ionicons name="chatbubble-outline" size={16} color="#6b7280" />
                <Text style={styles.commentCount}>{post.comments}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* 投稿作成ボタン */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={24} color="#ffffff" />
      </TouchableOpacity>

      {/* 投稿作成モーダル */}
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
                <Ionicons name="close" size={24} color="#6b7280" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>新しい投稿</Text>
              <TouchableOpacity>
                <Text style={styles.postButton}>投稿</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.titleInput}
              placeholder="タイトル"
              value={newPost.title}
              onChangeText={(text) => setNewPost({...newPost, title: text})}
            />

            <TextInput
              style={styles.contentInput}
              placeholder="内容を入力してください..."
              value={newPost.content}
              onChangeText={(text) => setNewPost({...newPost, content: text})}
              multiline
              numberOfLines={8}
              textAlignVertical="top"
            />

            <Text style={styles.anonymousNote}>
              ※ 投稿は匿名で行われます
            </Text>
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
  searchSection: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#374151',
  },
  filterContainer: {
    flexDirection: 'row',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: '#6366f1',
  },
  filterText: {
    fontSize: 14,
    color: '#6b7280',
  },
  filterTextActive: {
    color: '#ffffff',
  },
  postsContainer: {
    flex: 1,
    padding: 16,
  },
  postCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 2,
  },
  authorDetails: {
    fontSize: 12,
    color: '#6b7280',
  },
  timestamp: {
    fontSize: 12,
    color: '#9ca3af',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  postContent: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  tag: {
    backgroundColor: '#f0f9ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 12,
    color: '#0369a1',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reactions: {
    flexDirection: 'row',
  },
  reactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    backgroundColor: '#f9fafb',
    marginRight: 8,
  },
  reactionIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  reactionCount: {
    fontSize: 12,
    color: '#6b7280',
  },
  commentButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentCount: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginTop: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
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
  postButton: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6366f1',
  },
  titleInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  contentInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    height: 200,
    marginBottom: 16,
  },
  anonymousNote: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default CommunityScreen;