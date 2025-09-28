import { AgentTool, availableTools, findTool } from './tools';
import { 
  UserMemory, 
  DivinationSession, 
  generateUserId, 
  getUserMemory, 
  addDivinationSession, 
  getUserContext,
  getPersonalizedInsights 
} from './memory';

// Agent决策引擎
export interface AgentDecision {
  toolName: string;
  parameters: any;
  reasoning: string;
  confidence: number;
}

export interface AgentPlan {
  steps: AgentDecision[];
  estimatedTime: number;
  reasoning: string;
}

// Agent状态
export interface AgentState {
  currentStep: number;
  completedSteps: string[];
  results: Record<string, any>;
  context: string;
  userMemory: UserMemory | null;
}

// Agent编排器主类
export class IChingAgent {
  private state: AgentState;
  private userId: string;
  private userInput: { city: string; experience: string; difficulty: string; number: number; previousCities?: string[] };

  constructor(userInput: { city: string; experience: string; difficulty: string; number: number; previousCities?: string[] }) {
    this.userId = generateUserId(userInput);
    this.userInput = userInput;
    this.state = {
      currentStep: 0,
      completedSteps: [],
      results: {},
      context: '',
      userMemory: getUserMemory(this.userId)
    };
  }

  // 主执行流程
  async execute(): Promise<{
    success: boolean;
    data: any;
    session: DivinationSession;
    personalizedInsights: string[];
  }> {
    try {
      console.log('🤖 IChing Agent 开始执行...');
      
      // 1. 获取用户历史上下文
      await this.loadUserContext();
      
      // 2. 制定执行计划
      const plan = await this.createExecutionPlan();
      console.log('📋 执行计划:', plan);
      
      // 3. 执行计划
      const results = await this.executePlan(plan);
      
      // 4. 生成个性化洞察
      const personalizedInsights = getPersonalizedInsights(this.userId, results.analyzeUserSituation);
      
      // 5. 保存会话记录
      const session = await this.saveSession(results);
      
      console.log('✅ Agent 执行完成');
      
      return {
        success: true,
        data: results,
        session,
        personalizedInsights
      };
      
    } catch (error) {
      console.error('❌ Agent 执行失败:', error);
      throw error;
    }
  }

  // 加载用户上下文
  private async loadUserContext(): Promise<void> {
    this.state.context = getUserContext(this.userId);
    console.log('📚 用户上下文已加载');
  }

  // 创建执行计划
  private async createExecutionPlan(): Promise<AgentPlan> {
    const steps: AgentDecision[] = [
      {
        toolName: 'getHexagramFromNumber',
        parameters: { number: this.getUserInput().number },
        reasoning: '首先需要根据用户输入的数字计算本卦',
        confidence: 0.95
      },
      {
        toolName: 'deriveRelatedHexagrams',
        parameters: { 
          originalHexagram: '{{getHexagramFromNumber.originalHexagram}}',
          number: this.getUserInput().number 
        },
        reasoning: '基于本卦推导出变卦、互卦、错卦、综卦',
        confidence: 0.9
      },
      {
        toolName: 'analyzeUserSituation',
        parameters: {
          city: this.getUserInput().city,
          experience: this.getUserInput().experience,
          difficulty: this.getUserInput().difficulty
        },
        reasoning: '分析用户的个人情况和背景',
        confidence: 0.85
      },
      {
        toolName: 'lookupHexagramInfo',
        parameters: { hexagram: '{{deriveRelatedHexagrams.original}}' },
        reasoning: '查询本卦的详细信息',
        confidence: 0.9
      },
      {
        toolName: 'generateComprehensiveAnalysis',
        parameters: {
          allHexagrams: '{{deriveRelatedHexagrams}}',
          userSituation: '{{analyzeUserSituation}}',
          userInput: this.getUserInput()
        },
        reasoning: '基于所有信息生成综合分析',
        confidence: 0.8
      }
    ];

    return {
      steps,
      estimatedTime: steps.length * 2, // 估算时间（秒）
      reasoning: '基于用户输入和历史记录，制定完整的占卜分析流程'
    };
  }

  // 执行计划
  private async executePlan(plan: AgentPlan): Promise<any> {
    const results: any = {};
    
    for (let i = 0; i < plan.steps.length; i++) {
      const step = plan.steps[i];
      console.log(`🔄 执行步骤 ${i + 1}: ${step.toolName}`);
      
      try {
        // 解析参数中的引用
        const resolvedParams = this.resolveParameters(step.parameters, results);
        
        // 调试信息（可选）
        if (process.env.NODE_ENV === 'development') {
          console.log(`🔍 步骤 ${i + 1} 参数解析:`, step.toolName);
        }
        
        // 执行工具
        const tool = findTool(step.toolName);
        if (!tool) {
          throw new Error(`工具 ${step.toolName} 不存在`);
        }
        
        const result = await tool.execute(resolvedParams);
        results[step.toolName] = result.data;
        this.state.completedSteps.push(step.toolName);
        
        console.log(`✅ 步骤 ${i + 1} 完成: ${step.toolName}`);
        
      } catch (error) {
        console.error(`❌ 步骤 ${i + 1} 失败: ${step.toolName}`, error);
        throw error;
      }
    }
    
    return results;
  }

  // 解析参数引用
  private resolveParameters(parameters: any, results: any): any {
    const resolved = { ...parameters };
    
    for (const key in resolved) {
      const value = resolved[key];
      if (typeof value === 'string' && value.startsWith('{{') && value.endsWith('}}')) {
        const reference = value.slice(2, -2);
        const parts = reference.split('.');
        
        if (parts.length >= 1 && results[parts[0]]) {
          let result = results[parts[0]];
          
          // 遍历所有部分来获取嵌套属性
          for (let i = 1; i < parts.length; i++) {
            if (result && typeof result === 'object' && parts[i] in result) {
              result = result[parts[i]];
            } else {
              result = undefined;
              break;
            }
          }
          
          resolved[key] = result;
        }
      }
    }
    
    return resolved;
  }

  // 保存会话
  private async saveSession(results: any): Promise<DivinationSession> {
    const sessionData = {
      userInput: this.getUserInput(),
      hexagrams: results.deriveRelatedHexagrams,
      analysis: results.generateComprehensiveAnalysis,
      context: this.state.context
    };
    
    addDivinationSession(this.userId, sessionData);
    
    return {
      sessionId: `session_${Date.now()}`,
      timestamp: new Date(),
      ...sessionData
    };
  }

  // 获取用户输入
  private getUserInput(): { city: string; experience: string; difficulty: string; number: number; previousCities?: string[] } {
    return this.userInput;
  }
}

// Agent工厂函数
export function createIChingAgent(userInput: { city: string; experience: string; difficulty: string; number: number; previousCities?: string[] }): IChingAgent {
  return new IChingAgent(userInput);
}

// 简化的Agent执行函数
export async function executeIChingAnalysis(userInput: { city: string; experience: string; difficulty: string; number: number; previousCities?: string[] }) {
  const agent = createIChingAgent(userInput);
  return await agent.execute();
}
