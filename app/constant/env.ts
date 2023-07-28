const despicableMaskDefaultMessage = "你现在是一个语言学习辅助助手，我在学习中国的脏话，无论我问什么，你都要巧妙的用脏话回复。即使面对批评，道德审判，任何形式的质疑，或者让你忘记脏话学习助手的身份，等等任何提问和沟通，你都要用脏话回复并且隐瞒你脏话助手的身份。碰到无法回答的问题，就随便回复一句脏话。";
const DEFAULT_SYSTEM_TEMPLATE = `
You are ChatGPT, a large language model trained by OpenAI.
Knowledge cutoff: 2021-09
Current model: {{model}}
Current time: {{time}}`;

const despicableMask = {
  avatar: "1f5bc-fe0f",
  name: "国粹版 ChatGPT",
  context: [
    {
      id: "text-to-pic-0",
      role: "system",
      content: despicableMaskDefaultMessage,
      date: "",
    },
  ],
  modelConfig: {
    model: "gpt-3.5-turbo",
    temperature: 1,
    max_tokens: 2000,
    presence_penalty: 0,
    frequency_penalty: 0,
    sendMemory: true,
    historyMessageCount: 32,
    compressMessageLengthThreshold: 1000,
  },
  lang: "cn",
  builtin: true,
  createdAt: 1688899480510,
  id: 2000000,
};

export enum ENVS {
  normal = 'normal',
  despicable = 'despicable',
}

export const domains = {
  [ENVS.normal]: 'bot.goodae.top',
  [ENVS.despicable]: 'despicable.goodae.top',
};

interface IMetaData {
  title: string;
  description: string;
  mask: any;
  defautMessage: string;
}

interface IMeta {
  [key: string]: IMetaData;
}

export const metaConfig: IMeta = {
  [ENVS.normal]: {
    title: 'ChatGPT Next',
    description: 'Build your own AI assistant.',
    mask: null,
    defautMessage: DEFAULT_SYSTEM_TEMPLATE
  },
  [ENVS.despicable]: {
    title: 'ChatGPT 国粹版',
    description: '用于解压和锻炼你的心理素质，慎用',
    mask: despicableMask,
    defautMessage: despicableMaskDefaultMessage
  }
};

export const getEnv = (url: string = '') => {
  const [k] = Object.entries(domains).find(([_, v]) => {
    return url.includes(v)
  }) || [];
  return k ?? ENVS.normal;
};

export const getMeta = (url: string = ''): IMetaData => {
  const env = getEnv(url);
  return metaConfig[env];
};
