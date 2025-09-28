// Agent记忆系统
export interface UserMemory {
  userId: string;
  sessions: DivinationSession[];
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}

export interface DivinationSession {
  sessionId: string;
  timestamp: Date;
  userInput: {
    city: string;
    experience: string;
    difficulty: string;
    number: number;
  };
  hexagrams: {
    original: any;
    changed: any;
    mutual: any;
    opposite: any;
    inverted: any;
  };
  analysis: {
    summary: string;
    insights: string[];
    recommendations: string[];
  };
  context: string; // 会话上下文
}

export interface UserPreferences {
  language: 'zh' | 'en';
  analysisStyle: 'detailed' | 'concise';
  focusAreas: string[]; // 用户关注的领域
  recurringThemes: string[]; // 重复出现的主题
}

// 内存存储（实际应用中应该使用数据库）
const memoryStore = new Map<string, UserMemory>();

// 生成用户ID（基于浏览器指纹或用户输入）
export function generateUserId(userInput: { city: string; experience: string }): string {
  // 简单的用户标识生成，实际应用中可以使用更复杂的方法
  const identifier = `${userInput.city}_${userInput.experience.substring(0, 20)}`;
  return btoa(identifier).replace(/[^a-zA-Z0-9]/g, '').substring(0, 16);
}

// 获取用户记忆
export function getUserMemory(userId: string): UserMemory | null {
  return memoryStore.get(userId) || null;
}

// 保存用户记忆
export function saveUserMemory(userId: string, memory: UserMemory): void {
  memoryStore.set(userId, memory);
}

// 添加新的占卜会话
export function addDivinationSession(
  userId: string, 
  session: Omit<DivinationSession, 'sessionId' | 'timestamp'>
): void {
  const userMemory = getUserMemory(userId) || createNewUserMemory(userId);
  
  const newSession: DivinationSession = {
    ...session,
    sessionId: generateSessionId(),
    timestamp: new Date()
  };
  
  userMemory.sessions.push(newSession);
  userMemory.updatedAt = new Date();
  
  // 更新用户偏好（基于历史会话）
  updateUserPreferences(userMemory);
  
  saveUserMemory(userId, userMemory);
}

// 创建新用户记忆
function createNewUserMemory(userId: string): UserMemory {
  return {
    userId,
    sessions: [],
    preferences: {
      language: 'zh',
      analysisStyle: 'detailed',
      focusAreas: [],
      recurringThemes: []
    },
    createdAt: new Date(),
    updatedAt: new Date()
  };
}

// 生成会话ID
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// 更新用户偏好
function updateUserPreferences(userMemory: UserMemory): void {
  const sessions = userMemory.sessions;
  if (sessions.length === 0) return;
  
  // 分析重复出现的主题
  const themes = new Map<string, number>();
  const areas = new Map<string, number>();
  
  sessions.forEach(session => {
    // 分析困难中的主题
    const difficultyWords = session.userInput.difficulty.toLowerCase().split(/\s+/);
    difficultyWords.forEach(word => {
      if (word.length > 3) {
        themes.set(word, (themes.get(word) || 0) + 1);
      }
    });
    
    // 分析经历中的关注领域
    const experienceWords = session.userInput.experience.toLowerCase().split(/\s+/);
    experienceWords.forEach(word => {
      if (word.length > 3) {
        areas.set(word, (areas.get(word) || 0) + 1);
      }
    });
  });
  
  // 更新偏好
  userMemory.preferences.recurringThemes = Array.from(themes.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([theme]) => theme);
    
  userMemory.preferences.focusAreas = Array.from(areas.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([area]) => area);
}

// 获取用户历史上下文
export function getUserContext(userId: string, limit: number = 3): string {
  const userMemory = getUserMemory(userId);
  if (!userMemory || userMemory.sessions.length === 0) {
    return '这是用户的第一次占卜。';
  }
  
  const recentSessions = userMemory.sessions
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    .slice(0, limit);
  
  let context = `用户历史占卜记录（最近${recentSessions.length}次）：\n`;
  
  recentSessions.forEach((session, index) => {
    context += `${index + 1}. ${session.timestamp.toLocaleDateString()} - `;
    context += `城市: ${session.userInput.city}, `;
    context += `困难: ${session.userInput.difficulty.substring(0, 50)}...\n`;
    context += `   卦象: ${session.hexagrams.original.trad_chinese} (${session.hexagrams.original.english})\n`;
  });
  
  if (userMemory.preferences.recurringThemes.length > 0) {
    context += `\n用户经常关注的主题: ${userMemory.preferences.recurringThemes.join(', ')}\n`;
  }
  
  if (userMemory.preferences.focusAreas.length > 0) {
    context += `用户关注的领域: ${userMemory.preferences.focusAreas.join(', ')}\n`;
  }
  
  return context;
}

// 基于历史记录提供个性化建议
export function getPersonalizedInsights(userId: string, currentSituation: any): string[] {
  const userMemory = getUserMemory(userId);
  if (!userMemory || userMemory.sessions.length === 0) {
    return [];
  }
  
  const insights: string[] = [];
  
  // 分析历史模式
  const recentSessions = userMemory.sessions.slice(-3);
  const recurringThemes = userMemory.preferences.recurringThemes;
  
  if (recurringThemes.length > 0) {
    insights.push(`基于您之前关注的主题"${recurringThemes[0]}"，建议您...`);
  }
  
  // 分析发展趋势
  if (recentSessions.length >= 2) {
    const lastSession = recentSessions[recentSessions.length - 1];
    const previousSession = recentSessions[recentSessions.length - 2];
    
    if (lastSession.userInput.city === previousSession.userInput.city) {
      insights.push(`您似乎经常在${lastSession.userInput.city}寻求指导，这可能反映了您在该地的特殊经历。`);
    }
  }
  
  return insights;
}
