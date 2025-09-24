import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const InfoScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    {
      id: 'hospitals',
      title: '病院・クリニック',
      icon: 'medical',
      color: '#ef4444',
      articles: [
        { id: 1, title: '都内の不妊治療専門クリニック比較', rating: 4.5, reviews: 128 },
        { id: 2, title: '初診時に聞くべき質問リスト', rating: 4.8, reviews: 95 },
        { id: 3, title: '転院のタイミングと注意点', rating: 4.3, reviews: 67 },
      ]
    },
    {
      id: 'medications',
      title: '薬・治療法',
      icon: 'medical-outline',
      color: '#3b82f6',
      articles: [
        { id: 1, title: 'ホルモン注射の副作用と対処法', rating: 4.6, reviews: 156 },
        { id: 2, title: '排卵誘発剤の種類と効果', rating: 4.4, reviews: 89 },
        { id: 3, title: '体外受精の流れと準備', rating: 4.7, reviews: 203 },
      ]
    },
    {
      id: 'supplements',
      title: 'サプリメント',
      icon: 'nutrition',
      color: '#10b981',
      articles: [
        { id: 1, title: '葉酸サプリの選び方', rating: 4.5, reviews: 234 },
        { id: 2, title: '男性向け妊活サプリ比較', rating: 4.2, reviews: 78 },
        { id: 3, title: 'CoQ10の効果と摂取量', rating: 4.3, reviews: 112 },
      ]
    },
    {
      id: 'advanced',
      title: '先進医療',
      icon: 'flask',
      color: '#8b5cf6',
      articles: [
        { id: 1, title: 'PGT-Aについて知っておくべきこと', rating: 4.4, reviews: 67 },
        { id: 2, title: '着床前診断の費用と成功率', rating: 4.1, reviews: 45 },
        { id: 3, title: '最新の不妊治療技術', rating: 4.6, reviews: 89 },
      ]
    },
    {
      id: 'lifestyle',
      title: '生活習慣',
      icon: 'heart',
      color: '#f59e0b',
      articles: [
        { id: 1, title: '妊活に良い食事とレシピ', rating: 4.7, reviews: 189 },
        { id: 2, title: 'ストレス管理とリラックス法', rating: 4.5, reviews: 145 },
        { id: 3, title: '運動と妊活の関係', rating: 4.3, reviews: 98 },
      ]
    },
    {
      id: 'relationship',
      title: '夫婦関係',
      icon: 'people',
      color: '#ec4899',
      articles: [
        { id: 1, title: 'パートナーとのコミュニケーション', rating: 4.8, reviews: 167 },
        { id: 2, title: '男性の妊活への参加方法', rating: 4.4, reviews: 123 },
        { id: 3, title: '妊活疲れの乗り越え方', rating: 4.6, reviews: 201 },
      ]
    },
  ];

  const renderCategoryCard = (category) => (
    <View key={category.id} style={styles.categorySection}>
      <View style={styles.categoryHeader}>
        <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
          <Ionicons name={category.icon} size={24} color={category.color} />
        </View>
        <Text style={styles.categoryTitle}>{category.title}</Text>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.articlesScroll}
      >
        {category.articles.map((article) => (
          <TouchableOpacity key={article.id} style={styles.articleCard}>
            <View style={styles.articleImagePlaceholder}>
              <Ionicons name="document-text" size={32} color="#9ca3af" />
            </View>
            <Text style={styles.articleTitle} numberOfLines={2}>
              {article.title}
            </Text>
            <View style={styles.articleMeta}>
              <View style={styles.rating}>
                <Ionicons name="star" size={12} color="#fbbf24" />
                <Text style={styles.ratingText}>{article.rating}</Text>
              </View>
              <Text style={styles.reviewCount}>({article.reviews})</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>情報・口コミ</Text>
          <Text style={styles.headerSubtitle}>
            妊活に役立つ情報と実際の体験談をチェック
          </Text>
        </View>

        <View style={styles.content}>
          {categories.map(renderCategoryCard)}
        </View>

        {/* 人気記事セクション */}
        <View style={styles.popularSection}>
          <Text style={styles.sectionTitle}>今週の人気記事</Text>
          <View style={styles.popularArticles}>
            <TouchableOpacity style={styles.popularArticleCard}>
              <View style={styles.popularRank}>
                <Text style={styles.rankNumber}>1</Text>
              </View>
              <View style={styles.popularContent}>
                <Text style={styles.popularTitle}>
                  初めての体外受精で知っておくべき10のこと
                </Text>
                <View style={styles.popularMeta}>
                  <Ionicons name="eye" size={12} color="#6b7280" />
                  <Text style={styles.viewCount}>2,456 views</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.popularArticleCard}>
              <View style={styles.popularRank}>
                <Text style={styles.rankNumber}>2</Text>
              </View>
              <View style={styles.popularContent}>
                <Text style={styles.popularTitle}>
                  男性不妊の検査と治療法について
                </Text>
                <View style={styles.popularMeta}>
                  <Ionicons name="eye" size={12} color="#6b7280" />
                  <Text style={styles.viewCount}>1,892 views</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.popularArticleCard}>
              <View style={styles.popularRank}>
                <Text style={styles.rankNumber}>3</Text>
              </View>
              <View style={styles.popularContent}>
                <Text style={styles.popularTitle}>
                  妊活中のストレス解消法とメンタルケア
                </Text>
                <View style={styles.popularMeta}>
                  <Ionicons name="eye" size={12} color="#6b7280" />
                  <Text style={styles.viewCount}>1,634 views</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
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
  header: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  content: {
    padding: 16,
  },
  categorySection: {
    marginBottom: 32,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
  },
  articlesScroll: {
    marginLeft: -16,
    paddingLeft: 16,
  },
  articleCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    width: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  articleImagePlaceholder: {
    height: 100,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  articleTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    lineHeight: 18,
  },
  articleMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 12,
    color: '#374151',
    marginLeft: 2,
  },
  reviewCount: {
    fontSize: 12,
    color: '#6b7280',
  },
  popularSection: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 16,
  },
  popularArticles: {
    gap: 12,
  },
  popularArticleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#6366f1',
  },
  popularRank: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  rankNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  popularContent: {
    flex: 1,
  },
  popularTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  popularMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewCount: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
  },
});

export default InfoScreen;