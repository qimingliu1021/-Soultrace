// 易经64卦数据 - 从CSV文件生成
export interface IChingHexagram {
  number: number;
  name: string;
  chineseName: string;
  description: string;
  lines: string[];
  image: string;
  judgment: string;
  binary: string;
  pinyin: string;
  tradChinese: string;
  above: string;
  below: string;
  symbolic: string;
}

export const ICHING_HEXAGRAMS: IChingHexagram[] = [
  {
    "number": 1,
    "name": "Initiating",
    "chineseName": "乾",
    "description": "The first hexagram is made up of six unbroken lines. These unbroken lines stand for the primal power, which is light-giving, active, strong, and of the spirit. The hexagram is consistently strong in character, and since it is without weakness, its essence is power or energy. Its image is heaven. Its energy is represented as unrestricted by any fixed conditions in space and is therefore conceived of as motion. Time is regarded as the basis of this motion. Thus the hexagram includes also the power of time and the power of persisting in time, that is, duration. The power represented by the hexagram is to be interpreted in a dual sense in terms of its action on the universe and of its action on the world of men. In relation to the universe, the hexagram expresses the strong, creative action of the Deity. In relation to the human world, it denotes the creative action of the holy man or sage, of the ruler or leader of men, who through his power awakens and develops their higher nature.",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "111111",
    "pinyin": "qián",
    "tradChinese": "乾",
    "above": "{'chinese': CH'IEN, 'symbolic': 'THE CREATIVE,', 'alchemical': 'HEAVEN'}",
    "below": "{'chinese': CH'IEN, 'symbolic': 'THE CREATIVE,', 'alchemical': 'HEAVEN'}",
    "symbolic": "The first hexagram is made up of six unbroken lines. These unbroken lines stand for the primal power, which is light-giving, active, strong, and of the spirit. The hexagram is consistently strong in character, and since it is without weakness, its essence is power or energy. Its image is heaven. Its energy is represented as unrestricted by any fixed conditions in space and is therefore conceived of as motion. Time is regarded as the basis of this motion. Thus the hexagram includes also the power of time and the power of persisting in time, that is, duration. The power represented by the hexagram is to be interpreted in a dual sense in terms of its action on the universe and of its action on the world of men. In relation to the universe, the hexagram expresses the strong, creative action of the Deity. In relation to the human world, it denotes the creative action of the holy man or sage, of the ruler or leader of men, who through his power awakens and develops their higher nature."
  },
  {
    "number": 10,
    "name": "Fulfillment",
    "chineseName": "履",
    "description": "The name of the hexagram means on the one hand the right way of conducting oneself. Heaven, the father, is above, and the lake, the youngest daughter, is below. This shows the difference between high and low, upon which composure correct social conduct, depends. On the other hand the word for the name of the hexagram, TREADING, means literally treading upon something. The small and cheerful [Tui] treads upon the large and strong [Ch'ien]. The direction of movement of the two primary trigrams is upward. The fact that the strong treads on the weak is not mentioned in the Book of Changes, because it is taken for granted. For the weak to take a stand against the strong is not dangerous here, because it happened in good humor [Tui] and without presumption, so that the strong man is not irritated but takes it all in good part.",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "111011",
    "pinyin": "lǚ",
    "tradChinese": "履",
    "above": "{'chinese': CH'IEN, 'symbolic': 'THE CREATIVE,', 'alchemical': 'HEAVEN'}",
    "below": "{'chinese': 'TUI', 'symbolic': 'THE JOYOUS,', 'alchemical': 'LAKE'}",
    "symbolic": "The name of the hexagram means on the one hand the right way of conducting oneself. Heaven, the father, is above, and the lake, the youngest daughter, is below. This shows the difference between high and low, upon which composure correct social conduct, depends. On the other hand the word for the name of the hexagram, TREADING, means literally treading upon something. The small and cheerful [Tui] treads upon the large and strong [Ch'ien]. The direction of movement of the two primary trigrams is upward. The fact that the strong treads on the weak is not mentioned in the Book of Changes, because it is taken for granted. For the weak to take a stand against the strong is not dangerous here, because it happened in good humor [Tui] and without presumption, so that the strong man is not irritated but takes it all in good part."
  },
  {
    "number": 11,
    "name": "Advance",
    "chineseName": "泰",
    "description": "The Receptive, which moves downward, stands above; the Creative, which moves upward, is below. Hence their influences meet and are in harmony, so that all living things bloom and prosper. This hexagram belongs to the first month (February-March), at which time the forces of nature prepare the new spring.",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "000111",
    "pinyin": "tài",
    "tradChinese": "泰",
    "above": "{'chinese': K'UN, 'symbolic': 'THE RECEPTIVE,', 'alchemical': 'EARTH'}",
    "below": "{'chinese': CH'IEN, 'symbolic': 'THE CREATIVE,', 'alchemical': 'HEAVEN'}",
    "symbolic": "The Receptive, which moves downward, stands above; the Creative, which moves upward, is below. Hence their influences meet and are in harmony, so that all living things bloom and prosper. This hexagram belongs to the first month (February-March), at which time the forces of nature prepare the new spring."
  },
  {
    "number": 12,
    "name": "Hindrance",
    "chineseName": "否",
    "description": "This hexagram is the opposite of the preceding one. Heaven is above, drawing farther and farther away, while the earth below sinks farther into the depths. The creative powers are not in relation. It is a time of standstill and decline. This hexagram is linked with the seventh month (August-September), when the year has passed its zenith and autumnal decay is setting in.",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "111000",
    "pinyin": "pǐ",
    "tradChinese": "否",
    "above": "{'chinese': CH'IEN, 'symbolic': 'THE CREATIVE,', 'alchemical': 'HEAVEN'}",
    "below": "{'chinese': K'UN, 'symbolic': 'THE RECEPTIVE,', 'alchemical': 'EARTH'}",
    "symbolic": "This hexagram is the opposite of the preceding one. Heaven is above, drawing farther and farther away, while the earth below sinks farther into the depths. The creative powers are not in relation. It is a time of standstill and decline. This hexagram is linked with the seventh month (August-September), when the year has passed its zenith and autumnal decay is setting in."
  },
  {
    "number": 7,
    "name": "in order to hold together",
    "chineseName": "which",
    "description": "'comments': 'Heaven has the same direction of movement as fire",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "which",
    "pinyin": "clarity is within and strength without--the character of a peaceful union of men",
    "tradChinese": "which",
    "above": "in order to hold together",
    "below": "needs one yielding nature among many firm persons.,{'text': 'Heaven together with fire:\\n\\nThe image of FELLOWSHIP WITH MEN.\\nThus the superior man organizes the clans\\nAnd makes distinctions between things.'",
    "symbolic": "'comments': 'Heaven has the same direction of movement as fire"
  },
  {
    "number": 14,
    "name": "GreatHarvest",
    "chineseName": "大有",
    "description": "The fire in heaven above shines far, and all things stand out in the light and become manifest. The weak fifth line occupies the place of honor and all the strong lines are in accord with it.All things come to the man who is modest and kind in a high position.",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "101111",
    "pinyin": "dàyǒu",
    "tradChinese": "大有",
    "above": "{'chinese': 'LI', 'symbolic': 'THE CLINGING,', 'alchemical': 'FLAME'}",
    "below": "{'chinese': CH'IEN, 'symbolic': 'THE CREATIVE,', 'alchemical': 'HEAVEN'}",
    "symbolic": "The fire in heaven above shines far, and all things stand out in the light and become manifest. The weak fifth line occupies the place of honor and all the strong lines are in accord with it.All things come to the man who is modest and kind in a high position."
  },
  {
    "number": 15,
    "name": "Humbleness",
    "chineseName": "謙",
    "description": "This hexagram is made up of the trigrams Kên, Keeping Still, mountain, and K'un. The mountain is the youngest son of the Creative, the representative of heaven and earth. It dispenses the blessings of heaven, the clouds and rain that gather round its summit, and thereafter shines forth radiant with heavenly light. This shows what modesty is and how it functions in great and strong men. K'un, the earth, stands above. Lowliness is a quality of the earth: this is the very reason why it appears in this hexagram as exalted, by being placed above the mountain. This shows how modesty functions in lowly, simple people: they are lifted up by it.",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "000100",
    "pinyin": "qiān",
    "tradChinese": "謙",
    "above": "{'chinese': K'UN, 'symbolic': 'THE RECEPTIVE,', 'alchemical': 'EARTH'}",
    "below": "{'chinese': 'KEN', 'symbolic': 'KEEPING STILL,', 'alchemical': 'MOUNTAIN'}",
    "symbolic": "This hexagram is made up of the trigrams Kên, Keeping Still, mountain, and K'un. The mountain is the youngest son of the Creative, the representative of heaven and earth. It dispenses the blessings of heaven, the clouds and rain that gather round its summit, and thereafter shines forth radiant with heavenly light. This shows what modesty is and how it functions in great and strong men. K'un, the earth, stands above. Lowliness is a quality of the earth: this is the very reason why it appears in this hexagram as exalted, by being placed above the mountain. This shows how modesty functions in lowly, simple people: they are lifted up by it."
  },
  {
    "number": 16,
    "name": "Delight",
    "chineseName": "豫",
    "description": "The strong line in the fourth place, that of the leading official, meets with response and obedience from all the other lines, which are all weak. The attribute of the upper trigram, Chên, is movement; the attributes of K'un, the lower, are obedience and devotion. This begins a movement that meets with devotion and therefore inspires enthusiasm, carrying all with it. Of great importance, furthermore, is the law of movement along the line of least resistance, which in this hexagram is enunciated as the law for natural events and for human life.",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "001000",
    "pinyin": "yù",
    "tradChinese": "豫",
    "above": "{'chinese': 'CHêN', 'symbolic': 'THE AROUSING,', 'alchemical': 'THUNDER'}",
    "below": "{'chinese': K'UN, 'symbolic': 'THE RECEPTIVE,', 'alchemical': 'EARTH'}",
    "symbolic": "The strong line in the fourth place, that of the leading official, meets with response and obedience from all the other lines, which are all weak. The attribute of the upper trigram, Chên, is movement; the attributes of K'un, the lower, are obedience and devotion. This begins a movement that meets with devotion and therefore inspires enthusiasm, carrying all with it. Of great importance, furthermore, is the law of movement along the line of least resistance, which in this hexagram is enunciated as the law for natural events and for human life."
  },
  {
    "number": 17,
    "name": "Following",
    "chineseName": "隨",
    "description": "The trigram Tui, the Joyous, whose attribute is gladness, is above; Chên, the Arousing, which has the attribute of movement, is below. Joy in movement induces following. The Joyous is the youngest daughter, while the Arousing is the eldest son. An older man defers to a young girl and shows her consideration. By this he moves her to follow him.",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "011001",
    "pinyin": "suí",
    "tradChinese": "隨",
    "above": "{'chinese': 'TUI', 'symbolic': 'THE JOYOUS,', 'alchemical': 'LAKE'}",
    "below": "{'chinese': 'CHêN', 'symbolic': 'THE AROUSING,', 'alchemical': 'THUNDER'}",
    "symbolic": "The trigram Tui, the Joyous, whose attribute is gladness, is above; Chên, the Arousing, which has the attribute of movement, is below. Joy in movement induces following. The Joyous is the youngest daughter, while the Arousing is the eldest son. An older man defers to a young girl and shows her consideration. By this he moves her to follow him."
  },
  {
    "number": 18,
    "name": "Remedying",
    "chineseName": "蠱",
    "description": "The Chinese character ku represents a bowl in whose contents worms are breeding. This means decay. IT is come about because the gentle indifference in the lower trigram has come together with the rigid inertia of the upper, and the result is stagnation. Since this implies guilt, the conditions embody a demand for removal of the cause. Hence the meaning of the hexagram is not simply what has been spoiled but work on what has been spoiled.",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "100110",
    "pinyin": "gǔ",
    "tradChinese": "蠱",
    "above": "{'chinese': 'Kên', 'symbolic': 'KEEPING STILL,', 'alchemical': 'MOUNTAIN'}",
    "below": "{'chinese': 'Sun', 'symbolic': 'THE GENTLE,', 'alchemical': 'WIND'}",
    "symbolic": "The Chinese character ku represents a bowl in whose contents worms are breeding. This means decay. IT is come about because the gentle indifference in the lower trigram has come together with the rigid inertia of the upper, and the result is stagnation. Since this implies guilt, the conditions embody a demand for removal of the cause. Hence the meaning of the hexagram is not simply what has been spoiled but work on what has been spoiled."
  },
  {
    "number": 19,
    "name": "Approaching",
    "chineseName": "臨",
    "description": "The Chinese word lin has a range of meanings that is not exhausted by any single word of another language. The ancient explanations in the Book of Changes give as its first meaning, becoming great. What becomes great are the two strong lines growing into the hexagram from below; the light-giving power expands with them. The meaning is then further extended to include the concept of approach, especially the approach of what is lower. Finally the meaning includes the attitude of condescension of a man in high position toward the people, and in general the setting to work on affairs. This hexagram is linked with the twelfth month (January-February), when after the winter solstice, the light power begins to ascend again.",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "000011",
    "pinyin": "lín",
    "tradChinese": "臨",
    "above": "{'chinese': K'UN, 'symbolic': 'THE RECEPTIVE,', 'alchemical': 'EARTH'}",
    "below": "{'chinese': 'TUI', 'symbolic': 'THE JOYOUS,', 'alchemical': 'LAKE'}",
    "symbolic": "The Chinese word lin has a range of meanings that is not exhausted by any single word of another language. The ancient explanations in the Book of Changes give as its first meaning, becoming great. What becomes great are the two strong lines growing into the hexagram from below; the light-giving power expands with them. The meaning is then further extended to include the concept of approach, especially the approach of what is lower. Finally the meaning includes the attitude of condescension of a man in high position toward the people, and in general the setting to work on affairs. This hexagram is linked with the twelfth month (January-February), when after the winter solstice, the light power begins to ascend again."
  },
  {
    "number": 2,
    "name": "Responding",
    "chineseName": "坤",
    "description": "This hexagram is made up of broken lines only. The broken lines represents the dark, yielding, receptive primal power of yin. The attribute of the hexagram is devotion; its image is the earth. It is the perfect complement of THE CREATIVE--the complement, not the opposite, for the Receptive does not combat the Creative but completes it . It represents nature in contrast to spirit, earth in contrast to heaven, space as against time, the female-maternal as against the male-paternal. However, as applied to human affairs, the principle of this complementary relationship is found not only in the relation between man and woman, but also in that between prince and minister and between father and son. Indeed, even in the individual this duality appears in the coexistence of the spiritual world and the world of the senses. But strictly speaking there is no real dualism here, because there is a clearly defined hierarchic relationship between the two principles. In itself of course the Receptive is just as important as the Creative, but the attribute of devotion defines the place occupied by this primal power in relation to the Creative. For the Receptive must be activated and led by the Creative; then it is productive of good. Only when it abandons this position and tries to stand as an equal side by side with the Creative, does it become evil. The result then is opposition to and struggle against the Creative, which is productive of evil to both.",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "0",
    "pinyin": "kūn",
    "tradChinese": "坤",
    "above": "{'chinese': K'UN, 'symbolic': 'THE RECEPTIVE,', 'alchemical': 'EARTH'}",
    "below": "{'chinese': K'UN, 'symbolic': 'THE RECEPTIVE,', 'alchemical': 'EARTH'}",
    "symbolic": "This hexagram is made up of broken lines only. The broken lines represents the dark, yielding, receptive primal power of yin. The attribute of the hexagram is devotion; its image is the earth. It is the perfect complement of THE CREATIVE--the complement, not the opposite, for the Receptive does not combat the Creative but completes it . It represents nature in contrast to spirit, earth in contrast to heaven, space as against time, the female-maternal as against the male-paternal. However, as applied to human affairs, the principle of this complementary relationship is found not only in the relation between man and woman, but also in that between prince and minister and between father and son. Indeed, even in the individual this duality appears in the coexistence of the spiritual world and the world of the senses. But strictly speaking there is no real dualism here, because there is a clearly defined hierarchic relationship between the two principles. In itself of course the Receptive is just as important as the Creative, but the attribute of devotion defines the place occupied by this primal power in relation to the Creative. For the Receptive must be activated and led by the Creative; then it is productive of good. Only when it abandons this position and tries to stand as an equal side by side with the Creative, does it become evil. The result then is opposition to and struggle against the Creative, which is productive of evil to both."
  },
  {
    "number": 17,
    "name": "and who",
    "chineseName": "this aspect is not material in the interpretation of the hexagram as a whole.,{'text': 'The wind blows over the earth:\\nThe image of CONTEMPLATION.\\nThus the kings of old visited the regions of the world",
    "description": "'comments': 'When the wind blows over the earth it goes far and wide",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "it became a landmark that could be seen for miles around. Thus the hexagram shows a ruler who contemplates the law of heaven above him and the ways of the people below",
    "pinyin": "sets a lofty example to the masses. This hexagram is linked with the eight month (September-October). The light-giving power retreats and the dark power is again on the increase. However",
    "tradChinese": "this aspect is not material in the interpretation of the hexagram as a whole.,{'text': 'The wind blows over the earth:\\nThe image of CONTEMPLATION.\\nThus the kings of old visited the regions of the world",
    "above": "\\nContemplated the people",
    "below": "\\nAnd gave them instruction.'",
    "symbolic": "'comments': 'When the wind blows over the earth it goes far and wide"
  },
  {
    "number": 6,
    "name": "according to the nature of the crimes.This is symbolized by the clarity of lighting. The law is strengthenedby a just application of penalties. This is symbolized by the terrorof thunder. This clarity and severity have the effect of instillingrespect; it is not that the penalties are ends in themselves.The obstructions in the social life of man increase when there is alack of clarity in the penal codes and slackness in executing them.The only to strengthen the law is to make it clear and make penaltiescertain and swift.'},{'text': 'BITING THROUGH has success.\\nIt is favorable to let justice be administered.'",
    "chineseName": "the obstruction is due to a talebearer and traitor who is interfering and blocking the way. To prevent permanent injury",
    "description": "clarity",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "'comments': 'Penalties are the individual applications of the law. The lawsspecify the penalties. Clarity prevails when mild and severepenalties are differentiated",
    "pinyin": "energetic biting through brings success. This is true in all situations. Whenever unity cannot be established",
    "tradChinese": "the obstruction is due to a talebearer and traitor who is interfering and blocking the way. To prevent permanent injury",
    "above": "vigorous measures must be taken at once. Deliberate obstruction of this sort does not vanish of its own accord. Judgment and punishment are required to deter or obviate it. However",
    "below": "it is important to proceed in the right way. The hexagram combines Li",
    "symbolic": "clarity"
  },
  {
    "number": 22,
    "name": "Adorning",
    "chineseName": "賁",
    "description": "This hexagram shows a fire that breaks out of the secret depths of the earth and, blazing up, illuminates and beautifies the mountain, the heavenly heights. Grace-beauty of form-is necessary in any union if it is to be well ordered and pleasing rather than disordered and chaotic.",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "100101",
    "pinyin": "bì",
    "tradChinese": "賁",
    "above": "{'chinese': 'KêN', 'symbolic': 'KEEPING STILL,', 'alchemical': 'MOUNTAIN'}",
    "below": "{'chinese': 'LI', 'symbolic': 'THE CLINGING,', 'alchemical': 'FIRE'}",
    "symbolic": "This hexagram shows a fire that breaks out of the secret depths of the earth and, blazing up, illuminates and beautifies the mountain, the heavenly heights. Grace-beauty of form-is necessary in any union if it is to be well ordered and pleasing rather than disordered and chaotic."
  },
  {
    "number": 23,
    "name": "FallingAway",
    "chineseName": "剝",
    "description": "The dark lines are about to mount upward and overthrow the last firm, light line by exerting a disintegrating influence on it. The inferior, dark forces overcome what is superior and strong, not by direct means, but by undermining it gradually and imperceptibly, so that it finally collapses. The lines of the hexagram present the image of a house, the top line being the roof, and because the roof is being shattered the house collapses. The hexagram belongs to the ninth month (October-November). The yin power pushes up ever more powerfully and is about to supplant the yang power altogether.",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "100000",
    "pinyin": "bō",
    "tradChinese": "剝",
    "above": "{'chinese': 'KêN', 'symbolic': 'KEEPING STILL,', 'alchemical': 'MOUNTAIN'}",
    "below": "{'chinese': 'LI', 'symbolic': 'THE CLINGING,', 'alchemical': 'FIRE'}",
    "symbolic": "The dark lines are about to mount upward and overthrow the last firm, light line by exerting a disintegrating influence on it. The inferior, dark forces overcome what is superior and strong, not by direct means, but by undermining it gradually and imperceptibly, so that it finally collapses. The lines of the hexagram present the image of a house, the top line being the roof, and because the roof is being shattered the house collapses. The hexagram belongs to the ninth month (October-November). The yin power pushes up ever more powerfully and is about to supplant the yang power altogether."
  },
  {
    "number": 24,
    "name": "TurningBack",
    "chineseName": "復",
    "description": "The idea of a turning point arises from the fact that after the dark lines have pushed all of the light lines upward and out of the hexagram, another light line enters the hexagram from below. The time of darkness is past. The winter solstice brings the victory of light. This hexagram is linked with the eleventh month, the month of the solstice (December-January).",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "000001",
    "pinyin": "fù",
    "tradChinese": "復",
    "above": "{'chinese': K'UN, 'symbolic': 'THE RECEPTIVE,', 'alchemical': 'EARTH'}",
    "below": "{'chinese': 'CHêN', 'symbolic': 'THE AROUSING,', 'alchemical': 'THUNDER'}",
    "symbolic": "The idea of a turning point arises from the fact that after the dark lines have pushed all of the light lines upward and out of the hexagram, another light line enters the hexagram from below. The time of darkness is past. The winter solstice brings the victory of light. This hexagram is linked with the eleventh month, the month of the solstice (December-January)."
  },
  {
    "number": 25,
    "name": "WithoutFalsehood",
    "chineseName": "無妄",
    "description": "Ch'ien, heaven is above; Chên, movement, is below. The lower trigram Chên is under the influence of the strong line it has received form above, from heaven. When, in accord with this, movement follows the law of heaven, man is innocent and without guile. His mind is natural and true, unshadowed by reflection or ulterior designs. For wherever conscious purpose is to be seen, there the truth and innocence of nature have been lost. Nature that is not directed by the spirit is not true but degenerate nature. Starting out with the idea of the natural, the train of thought in part goes somewhat further and thus the hexagram includes also the idea of the fundamental or unexpected.",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "111001",
    "pinyin": "wúwàng",
    "tradChinese": "無妄",
    "above": "{'chinese': CH'IEN, 'symbolic': 'THE CREATIVE,', 'alchemical': 'HEAVEN'}",
    "below": "{'chinese': 'CHêN', 'symbolic': 'THE AROUSING,', 'alchemical': 'THUNDER'}",
    "symbolic": "Ch'ien, heaven is above; Chên, movement, is below. The lower trigram Chên is under the influence of the strong line it has received form above, from heaven. When, in accord with this, movement follows the law of heaven, man is innocent and without guile. His mind is natural and true, unshadowed by reflection or ulterior designs. For wherever conscious purpose is to be seen, there the truth and innocence of nature have been lost. Nature that is not directed by the spirit is not true but degenerate nature. Starting out with the idea of the natural, the train of thought in part goes somewhat further and thus the hexagram includes also the idea of the fundamental or unexpected."
  },
  {
    "number": 26,
    "name": "GreatAccumulation",
    "chineseName": "大畜",
    "description": "The Creative is tamed by Kên, Keeping Still. This produces great power, a situation in contrast to that of the ninth hexagram, Hsiao Ch'u, THE TAMING POWER OF THE SMALL, in which the Creative is tamed by the Gentle alone. There one weak line must tame five strong lines, but here four strong lines are restrained by two weak lines; in addition to a minister, there is a prince, and the restraining power therefore is afar stronger. The hexagram has a threefold meaning, expressing different aspects of the concept Holding firm. Heaven within the mountain gives the idea of holding firm in the sense of holding together; the trigram Kên which holds the trigram ch'ien still, gives the idea of holding firm in the sense of holding back; the third idea is that of holding firm in the sense of caring for and nourishing. This last is suggested by the fact that a strong line at the top, which is the ruler of the hexagram, is honored and tended as a sage. The third of these meanings also attaches specifically to this strong line at the top, which represents the sage.",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "100111",
    "pinyin": "dàchù",
    "tradChinese": "大畜",
    "above": "{'chinese': 'KêN', 'symbolic': 'KEEPING STILL,', 'alchemical': 'MOUNTAIN'}",
    "below": "{'chinese': CH'IEN, 'symbolic': 'THE CREATIVE,', 'alchemical': 'HEAVEN'}",
    "symbolic": "The Creative is tamed by Kên, Keeping Still. This produces great power, a situation in contrast to that of the ninth hexagram, Hsiao Ch'u, THE TAMING POWER OF THE SMALL, in which the Creative is tamed by the Gentle alone. There one weak line must tame five strong lines, but here four strong lines are restrained by two weak lines; in addition to a minister, there is a prince, and the restraining power therefore is afar stronger. The hexagram has a threefold meaning, expressing different aspects of the concept Holding firm. Heaven within the mountain gives the idea of holding firm in the sense of holding together; the trigram Kên which holds the trigram ch'ien still, gives the idea of holding firm in the sense of holding back; the third idea is that of holding firm in the sense of caring for and nourishing. This last is suggested by the fact that a strong line at the top, which is the ruler of the hexagram, is honored and tended as a sage. The third of these meanings also attaches specifically to this strong line at the top, which represents the sage."
  },
  {
    "number": 27,
    "name": "Nourishing",
    "chineseName": "頤",
    "description": "This hexagram is a picture of an open mouth; above and below are firm lines of the lips, and between them the opening. Starting with the mouth, through which we take food for nourishment, the thought leads to nourishment itself. Nourishment of oneself, specifically of the body, is represented in the three lower lines, while the three upper lines represent nourishment and care of others, in a higher, spiritual sense.",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "100001",
    "pinyin": "yí",
    "tradChinese": "頤",
    "above": "{'chinese': 'KêN', 'symbolic': 'KEEPING STILL,', 'alchemical': 'MOUNTAIN'}",
    "below": "{'chinese': 'CHêN', 'symbolic': 'THE AROUSING,', 'alchemical': 'THUNDER'}",
    "symbolic": "This hexagram is a picture of an open mouth; above and below are firm lines of the lips, and between them the opening. Starting with the mouth, through which we take food for nourishment, the thought leads to nourishment itself. Nourishment of oneself, specifically of the body, is represented in the three lower lines, while the three upper lines represent nourishment and care of others, in a higher, spiritual sense."
  },
  {
    "number": 28,
    "name": "GreatExceeding",
    "chineseName": "大過",
    "description": "This hexagram consists of four strong lines inside and two weak lines outside. When the strong are outside and the weak inside, all is well and there is nothing out of balance, nothing extraordinary in the situation. Here, however, the opposite is the case. The hexagram represents a beam that is thick and heavy in the middle but too weak at the ends. This is a condition that cannot last; it must be changed, must pass, or misfortune will result.",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "011110",
    "pinyin": "dàguò",
    "tradChinese": "大過",
    "above": "{'chinese': 'TUI', 'symbolic': 'THE JOYOUS,', 'alchemical': 'LAKE'}",
    "below": "{'chinese': 'SUN', 'symbolic': 'THE GENTLE,', 'alchemical': 'WIND,'}",
    "symbolic": "This hexagram consists of four strong lines inside and two weak lines outside. When the strong are outside and the weak inside, all is well and there is nothing out of balance, nothing extraordinary in the situation. Here, however, the opposite is the case. The hexagram represents a beam that is thick and heavy in the middle but too weak at the ends. This is a condition that cannot last; it must be changed, must pass, or misfortune will result."
  },
  {
    "number": 29,
    "name": "Darkness",
    "chineseName": "坎",
    "description": "This hexagram consists of a doubling of the trigram K'an. It is one of the eight hexagrams in which doubling occurs. The trigram K'an means a plunging in. A yang line has plunged in between two yin lines and is closed in by them like water in a ravine. The trigram K'an is also the middle son. The Receptive has obtained the middle line of the Creative, and thus K'an develops. As an image it represents water, the water that comes from above and is in motion on earth in streams and rivers, giving rise to all life on earth. In man's world K'an represents the heart, the soul locked up within the body, the principle of light inclosed in the dark--that is, reason. The name of the hexagram, because the trigram is doubled, has the additional meaning, repetition of danger. Thus the hexagram is intended to designate an objective situation to which one must become accustomed, not a subjective attitude. For danger due to a subjective attitude means either foolhardiness or guile. Hence too a ravine is used to symbolize danger; it is a situation in which a man is in the same pass as the water in a ravine, and, like the water, he can escape if he behaves correctly.",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "010010",
    "pinyin": "kǎn",
    "tradChinese": "坎",
    "above": "{'chinese': K'AN, 'symbolic': 'THE ABYSMAL,', 'alchemical': 'WATER'}",
    "below": "{'chinese': K'AN, 'symbolic': 'THE ABYSMAL,', 'alchemical': 'WATER'}",
    "symbolic": "This hexagram consists of a doubling of the trigram K'an. It is one of the eight hexagrams in which doubling occurs. The trigram K'an means a plunging in. A yang line has plunged in between two yin lines and is closed in by them like water in a ravine. The trigram K'an is also the middle son. The Receptive has obtained the middle line of the Creative, and thus K'an develops. As an image it represents water, the water that comes from above and is in motion on earth in streams and rivers, giving rise to all life on earth. In man's world K'an represents the heart, the soul locked up within the body, the principle of light inclosed in the dark--that is, reason. The name of the hexagram, because the trigram is doubled, has the additional meaning, repetition of danger. Thus the hexagram is intended to designate an objective situation to which one must become accustomed, not a subjective attitude. For danger due to a subjective attitude means either foolhardiness or guile. Hence too a ravine is used to symbolize danger; it is a situation in which a man is in the same pass as the water in a ravine, and, like the water, he can escape if he behaves correctly."
  },
  {
    "number": 3,
    "name": "Beginning",
    "chineseName": "屯",
    "description": "The name of the hexagram, Chun, really connotes a blade of grass pushing against an obstacle as it sprouts out of the earth--hence the meaning, difficulty at the beginning. The hexagram indicates the way in which heaven and earth bring forth individual beings. It is their first meeting, which is beset with difficulties. The lower trigram Chên is the Arousing; its motion is upward and its image is thunder. The upper trigram K'an stands for the Abysmal, the dangerous. Its motion is downward and its image is rain. The situation points to teeming, chaotic profusion; thunder and rain fill the air. But the chaos clears up. While the Abysmal sinks, the upward movement eventually passes beyond the danger. A thunderstorm brings release from tension, and all things breathe freely again.",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "010001",
    "pinyin": "zhūn",
    "tradChinese": "屯",
    "above": "{'chinese': K'AN, 'symbolic': 'THE ABYSMAL,', 'alchemical': 'WATER'}",
    "below": "{'chinese': 'CHêN', 'symbolic': 'THE AROUSING,', 'alchemical': 'THUNDER'}",
    "symbolic": "The name of the hexagram, Chun, really connotes a blade of grass pushing against an obstacle as it sprouts out of the earth--hence the meaning, difficulty at the beginning. The hexagram indicates the way in which heaven and earth bring forth individual beings. It is their first meeting, which is beset with difficulties. The lower trigram Chên is the Arousing; its motion is upward and its image is thunder. The upper trigram K'an stands for the Abysmal, the dangerous. Its motion is downward and its image is rain. The situation points to teeming, chaotic profusion; thunder and rain fill the air. But the chaos clears up. While the Abysmal sinks, the upward movement eventually passes beyond the danger. A thunderstorm brings release from tension, and all things breathe freely again."
  },
  {
    "number": 30,
    "name": "Brightness",
    "chineseName": "離",
    "description": "This hexagram is another double sign. The trigram Li means to cling to something, and also brightness. A dark line clings to two light lines, one above and one below--the image of an empty space between two strong lines, whereby the two strong lines are made bright. The trigram represents the middle daughter. The Creative has incorporated the central line of the Receptive, and thus Li develops. As an image, it is fire. Fire has no definite form but clings to the burning object and thus is bright. As water pours down from heaven, so fire flames up from the earth. While K'an means the soul shut within the body, Li stands for nature in its radiance.",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "101101",
    "pinyin": "lí",
    "tradChinese": "離",
    "above": "{'chinese': 'LI', 'symbolic': 'THE CLINGING,', 'alchemical': 'FIRE'}",
    "below": "{'chinese': 'LI', 'symbolic': 'THE CLINGING,', 'alchemical': 'FIRE'}",
    "symbolic": "This hexagram is another double sign. The trigram Li means to cling to something, and also brightness. A dark line clings to two light lines, one above and one below--the image of an empty space between two strong lines, whereby the two strong lines are made bright. The trigram represents the middle daughter. The Creative has incorporated the central line of the Receptive, and thus Li develops. As an image, it is fire. Fire has no definite form but clings to the burning object and thus is bright. As water pours down from heaven, so fire flames up from the earth. While K'an means the soul shut within the body, Li stands for nature in its radiance."
  },
  {
    "number": 31,
    "name": "MutualInfluence",
    "chineseName": "咸",
    "description": "The name of the hexagram means universal, general, and in a figurative sense to influence, to stimulate. The upper trigram is Tui, the Joyous; the lower is Kên, Keeping still. By its persistent, quiet influence, the lower, rigid trigram stimulates the upper, weak trigram, which responds to this stimulation cheerfully and joyously. Kên, the lower trigram, is the youngest son; the upper, Tui, is the youngest daughter. Thus the universal mutual attraction between the sexes is represented. In courtship, the masculine principle must seize the initiative and place itself below the feminine principle. Just as the first part of book 1 begins with the hexagrams of heaven and earth, the foundations of all that exists, the second part begins with the hexagrams of courtship and marriage, the foundations of all social relationships.",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "011100",
    "pinyin": "xián",
    "tradChinese": "咸",
    "above": "{'chinese': 'TUI', 'symbolic': 'THE JOYOUS,', 'alchemical': 'LAKE'}",
    "below": "{'chinese': 'KêN', 'symbolic': 'KEEPING STILL,', 'alchemical': 'MOUNTAIN'}",
    "symbolic": "The name of the hexagram means universal, general, and in a figurative sense to influence, to stimulate. The upper trigram is Tui, the Joyous; the lower is Kên, Keeping still. By its persistent, quiet influence, the lower, rigid trigram stimulates the upper, weak trigram, which responds to this stimulation cheerfully and joyously. Kên, the lower trigram, is the youngest son; the upper, Tui, is the youngest daughter. Thus the universal mutual attraction between the sexes is represented. In courtship, the masculine principle must seize the initiative and place itself below the feminine principle. Just as the first part of book 1 begins with the hexagrams of heaven and earth, the foundations of all that exists, the second part begins with the hexagrams of courtship and marriage, the foundations of all social relationships."
  },
  {
    "number": 32,
    "name": "LongLasting",
    "chineseName": "恆",
    "description": "The strong trigram Chên is above, the weak trigram Sun below. This hexagram is the inverse of the preceding one. In the latter we have influence, here we have union as an enduring condition. The two images are thunder and wind, which are likewise constantly paired phenomena. The lower trigram indicates gentleness within; the upper, movement without. In the sphere of social relationships, the hexagram represents the institution of marriage as the enduring union of the sexes. During courtship the young man subordinates himself to the girl, but in marriage, which is represented by the coming together of the eldest son and the eldest daughter, the husband is the directing and moving force outside, while the wife, inside, is gentle and submissive.",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "001110",
    "pinyin": "héng",
    "tradChinese": "恆",
    "above": "{'chinese': 'CHEN', 'symbolic': 'THE AROUSING,', 'alchemical': 'THUNDER'}",
    "below": "{'chinese': 'SUN', 'symbolic': 'THE GENTLE,', 'alchemical': 'WIND'}",
    "symbolic": "The strong trigram Chên is above, the weak trigram Sun below. This hexagram is the inverse of the preceding one. In the latter we have influence, here we have union as an enduring condition. The two images are thunder and wind, which are likewise constantly paired phenomena. The lower trigram indicates gentleness within; the upper, movement without. In the sphere of social relationships, the hexagram represents the institution of marriage as the enduring union of the sexes. During courtship the young man subordinates himself to the girl, but in marriage, which is represented by the coming together of the eldest son and the eldest daughter, the husband is the directing and moving force outside, while the wife, inside, is gentle and submissive."
  },
  {
    "number": 33,
    "name": "Retreat",
    "chineseName": "遯",
    "description": "The power of the dark is ascending. The light retreats to security, so that the dark cannot encroach upon it. This retreat is a matter not of man's will but of natural law. Therefore in this case withdrawal is proper; it is the correct way to behave in order not to exhaust one's forces. In the calendar this hexagram is linked with the sixth month (July-August), in which the forces of winter are already showing their influence.",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "111100",
    "pinyin": "dùn",
    "tradChinese": "遯",
    "above": "{'chinese': CH'IEN, 'symbolic': 'THE CREATIVE,', 'alchemical': 'HEAVEN'}",
    "below": "{'chinese': 'KêN', 'symbolic': 'KEEPING STILL,', 'alchemical': 'MOUNTAIN'}",
    "symbolic": "The power of the dark is ascending. The light retreats to security, so that the dark cannot encroach upon it. This retreat is a matter not of man's will but of natural law. Therefore in this case withdrawal is proper; it is the correct way to behave in order not to exhaust one's forces. In the calendar this hexagram is linked with the sixth month (July-August), in which the forces of winter are already showing their influence."
  },
  {
    "number": 34,
    "name": "GreatStrength",
    "chineseName": "大壯",
    "description": "The great lines, that is, the light, strong lines, are powerful. Four light lines have entered the hexagram from below and are about to ascend higher. The upper trigram is Chên, the Arousing; the lower is ch'ien, the Creative. Ch'ien is strong, Chên produces movement. The union of movement and strength gives the meaning of THE POWER OF THE GREAT. The hexagram is linked with the second month (March-April).",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "001111",
    "pinyin": "dàzhuàng",
    "tradChinese": "大壯",
    "above": "{'chinese': 'CHêN', 'symbolic': 'THE AROUSING,', 'alchemical': 'THUNDER'}",
    "below": "{'chinese': CH'IEN, 'symbolic': 'THE CREATIVE,', 'alchemical': 'HEAVEN'}",
    "symbolic": "The great lines, that is, the light, strong lines, are powerful. Four light lines have entered the hexagram from below and are about to ascend higher. The upper trigram is Chên, the Arousing; the lower is ch'ien, the Creative. Ch'ien is strong, Chên produces movement. The union of movement and strength gives the meaning of THE POWER OF THE GREAT. The hexagram is linked with the second month (March-April)."
  },
  {
    "number": 35,
    "name": "ProceedingForward",
    "chineseName": "晉",
    "description": "The hexagram represents the sun rising over the earth. It is therefore the symbol of rapid, easy progress, which at the same time means ever widening expansion and clarity.",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "101000",
    "pinyin": "jìn",
    "tradChinese": "晉",
    "above": "{'chinese': 'LI', 'symbolic': 'THE CLINGING,', 'alchemical': 'FIRE'}",
    "below": "{'chinese': K'UN, 'symbolic': 'THE RECEPTIVE,', 'alchemical': 'EARTH'}",
    "symbolic": "The hexagram represents the sun rising over the earth. It is therefore the symbol of rapid, easy progress, which at the same time means ever widening expansion and clarity."
  },
  {
    "number": 36,
    "name": "BrillianceInjured",
    "chineseName": "明夷",
    "description": "Here the sun has sunk under the earth and is therefore darkened. The name of the hexagram means literally wounding of the bright; hence the individual lines contain frequent references to wounding. The situation is the exact opposite of that in the foregoing hexagram. In the latter a wise man at the head of affairs has able helpers, and in company with them makes progress; here a man of dark nature is in a position of authority and brings harm to the wise and able man.",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "000101",
    "pinyin": "míngyí",
    "tradChinese": "明夷",
    "above": "{'chinese': K'UN, 'symbolic': 'THE RECEPTIVE,', 'alchemical': 'EARTH'}",
    "below": "{'chinese': 'LI', 'symbolic': 'THE CLINGING,', 'alchemical': 'FIRE'}",
    "symbolic": "Here the sun has sunk under the earth and is therefore darkened. The name of the hexagram means literally wounding of the bright; hence the individual lines contain frequent references to wounding. The situation is the exact opposite of that in the foregoing hexagram. In the latter a wise man at the head of affairs has able helpers, and in company with them makes progress; here a man of dark nature is in a position of authority and brings harm to the wise and able man."
  },
  {
    "number": 37,
    "name": "Household",
    "chineseName": "家人",
    "description": "The hexagram represents the laws obtaining within the family. The strong line at the top represents the father, the lowest the son. The strong line in the fifth place represents the husband, the yielding second line the wife. On the other hand, the two strong lines in the fifth and the third place represent two brothers, and the two weak lines correlated with them in the fourth and the second place stand for their respective wives. Thus all the connections and relationships within the family find their appropriate expression. Each individual line has the character according with its place. The fact that a strong line occupies the sixth place-where a weak line might be expected-indicates very clearly the strong leadership that must come from the head of the family. The line is to be considered here not in its quality as the sixth but in its quality as the top line. THE FAMILY shows the laws operative within the household that, transferred to outside life, keep the state and the world in order. The influence that goes out from within the family is represented by the symbol of the wind created by fire.",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "110101",
    "pinyin": "jiārén",
    "tradChinese": "家人",
    "above": "{'chinese': 'SUN', 'symbolic': 'THE GENTLE,', 'alchemical': 'WIND'}",
    "below": "{'chinese': 'LI', 'symbolic': 'THE CLINGING,', 'alchemical': 'FIRE'}",
    "symbolic": "The hexagram represents the laws obtaining within the family. The strong line at the top represents the father, the lowest the son. The strong line in the fifth place represents the husband, the yielding second line the wife. On the other hand, the two strong lines in the fifth and the third place represent two brothers, and the two weak lines correlated with them in the fourth and the second place stand for their respective wives. Thus all the connections and relationships within the family find their appropriate expression. Each individual line has the character according with its place. The fact that a strong line occupies the sixth place-where a weak line might be expected-indicates very clearly the strong leadership that must come from the head of the family. The line is to be considered here not in its quality as the sixth but in its quality as the top line. THE FAMILY shows the laws operative within the household that, transferred to outside life, keep the state and the world in order. The influence that goes out from within the family is represented by the symbol of the wind created by fire."
  },
  {
    "number": 38,
    "name": "Diversity",
    "chineseName": "睽",
    "description": "This hexagram is composed of the trigram Li above, i.e., flame, which burns upward, and Tui below, i.e., the lake, which seeps downward. These two movements are indirect contrast. Furthermore, LI is the second daughter and Tui the youngest daughter, and although they live in the same house they belong to different men; hence their wills are not the same but are divergently directed.",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "101011",
    "pinyin": "kuí",
    "tradChinese": "睽",
    "above": "{'chinese': 'LI', 'symbolic': 'THE CLINGING,', 'alchemical': 'FLAME'}",
    "below": "{'chinese': 'TUI', 'symbolic': 'THE JOYOUS,', 'alchemical': 'LAKE'}",
    "symbolic": "This hexagram is composed of the trigram Li above, i.e., flame, which burns upward, and Tui below, i.e., the lake, which seeps downward. These two movements are indirect contrast. Furthermore, LI is the second daughter and Tui the youngest daughter, and although they live in the same house they belong to different men; hence their wills are not the same but are divergently directed."
  },
  {
    "number": 39,
    "name": "Hardship",
    "chineseName": "蹇",
    "description": "The hexagram pictures a dangerous abyss lying before us and a steep, inaccessible mountain rising behind us. We are surrounded by obstacles; at the same time, since the mountain has the attribute of keeping still, there is implicit a hint as to how we can extricate ourselves. The hexagram represents obstructions that appear in the course of time but that can and should be overcome. Therefore all the instruction given is directed to overcoming them.",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "010100",
    "pinyin": "jiǎn",
    "tradChinese": "蹇",
    "above": "{'chinese': K'AN, 'symbolic': 'THE ABYSMAL,', 'alchemical': 'WATER'}",
    "below": "{'chinese': 'KêN', 'symbolic': 'KEEPING STILL,', 'alchemical': 'MOUNTAIN'}",
    "symbolic": "The hexagram pictures a dangerous abyss lying before us and a steep, inaccessible mountain rising behind us. We are surrounded by obstacles; at the same time, since the mountain has the attribute of keeping still, there is implicit a hint as to how we can extricate ourselves. The hexagram represents obstructions that appear in the course of time but that can and should be overcome. Therefore all the instruction given is directed to overcoming them."
  },
  {
    "number": 4,
    "name": "Childhood",
    "chineseName": "蒙",
    "description": "In this hexagram we are reminded of youth and folly in two different ways. The image of the upper trigram, Kên, is the mountain, that of the lower, K'an, is water; the spring rising at the foot of the mountain is the image of inexperienced youth. Keeping still is the attribute of the upper trigram; that of the lower is the abyss, danger. Stopping in perplexity on the brink of a dangerous abyss is a symbol of the folly of youth. However, the two trigrams also show the way of overcoming the follies of youth. Water is something that of necessity flows on. When the spring gushes forth, it does not know at first where it will go. But its steady flow fills up the deep place blocking its progress, and success is attained.",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "100010",
    "pinyin": "méng",
    "tradChinese": "蒙",
    "above": "{'chinese': 'KêN', 'symbolic': 'KEEPING STILL,', 'alchemical': 'MOUNTAIN'}",
    "below": "{'chinese': K'AN, 'symbolic': 'THE ABYSMAL,', 'alchemical': 'WATER'}",
    "symbolic": "In this hexagram we are reminded of youth and folly in two different ways. The image of the upper trigram, Kên, is the mountain, that of the lower, K'an, is water; the spring rising at the foot of the mountain is the image of inexperienced youth. Keeping still is the attribute of the upper trigram; that of the lower is the abyss, danger. Stopping in perplexity on the brink of a dangerous abyss is a symbol of the folly of youth. However, the two trigrams also show the way of overcoming the follies of youth. Water is something that of necessity flows on. When the spring gushes forth, it does not know at first where it will go. But its steady flow fills up the deep place blocking its progress, and success is attained."
  },
  {
    "number": 40,
    "name": "Relief",
    "chineseName": "解",
    "description": "Here the movement goes out of the sphere of danger. The obstacle has been removed, the difficulties are being resolved. Deliverance is not yet achieved; it is just in its beginning, and the hexagram represents its various stages.",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "001010",
    "pinyin": "xiè",
    "tradChinese": "解",
    "above": "{'chinese': 'CHêN', 'symbolic': 'THE AROUSING,', 'alchemical': 'THUNDER'}",
    "below": "{'chinese': K'AN, 'symbolic': 'THE ABYSMAL,', 'alchemical': 'WATER'}",
    "symbolic": "Here the movement goes out of the sphere of danger. The obstacle has been removed, the difficulties are being resolved. Deliverance is not yet achieved; it is just in its beginning, and the hexagram represents its various stages."
  },
  {
    "number": 41,
    "name": "Decreasing",
    "chineseName": "損",
    "description": "This hexagram represents a decrease of the lower trigram in favor of the upper, because the third line, originally strong, has moved up to the top, and the top line, originally weak, has replaced it. What is below is decreased to the benefit of what is above. This is out-and-out decrease. If the foundations of a building are decreased in strength and the upper walls are strengthened, the whole structure loves its stability. Likewise, a decrease in the prosperity of the people in favor of the government is out-and-out decrease. And the entire theme of the hexagram is directed to showing how this shift of wealth can take place without causing the sources of wealth can take place without causing the sources of wealth in the nation and its lower classes to fail.",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "100011",
    "pinyin": "sǔn",
    "tradChinese": "損",
    "above": "{'chinese': 'KêN', 'symbolic': 'KEEPING STILL,', 'alchemical': 'MOUNTAIN'}",
    "below": "{'chinese': 'TUI', 'symbolic': 'THE JOYOUS,', 'alchemical': 'LAKE'}",
    "symbolic": "This hexagram represents a decrease of the lower trigram in favor of the upper, because the third line, originally strong, has moved up to the top, and the top line, originally weak, has replaced it. What is below is decreased to the benefit of what is above. This is out-and-out decrease. If the foundations of a building are decreased in strength and the upper walls are strengthened, the whole structure loves its stability. Likewise, a decrease in the prosperity of the people in favor of the government is out-and-out decrease. And the entire theme of the hexagram is directed to showing how this shift of wealth can take place without causing the sources of wealth can take place without causing the sources of wealth in the nation and its lower classes to fail."
  },
  {
    "number": 42,
    "name": "Increasing",
    "chineseName": "益",
    "description": "The idea of increase is expressed in the fact that the strong lowest line of the upper trigram has sunk down and taken its place under the lower trigram. This conception also expresses the fundamental idea on which the Book of Changes is based. To rule truly is to serve. A sacrifice of the higher element that produces an increase of the lower is called an out-and-out increase: it indicates the spirit that alone has power to help the world.",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "110001",
    "pinyin": "yì",
    "tradChinese": "益",
    "above": "{'chinese': 'SUN', 'symbolic': 'THE GENTLE,', 'alchemical': 'WIND'}",
    "below": "{'chinese': 'CHêN', 'symbolic': 'THE AROUSING,', 'alchemical': 'THUNDER'}",
    "symbolic": "The idea of increase is expressed in the fact that the strong lowest line of the upper trigram has sunk down and taken its place under the lower trigram. This conception also expresses the fundamental idea on which the Book of Changes is based. To rule truly is to serve. A sacrifice of the higher element that produces an increase of the lower is called an out-and-out increase: it indicates the spirit that alone has power to help the world."
  },
  {
    "number": 43,
    "name": "Eliminating",
    "chineseName": "夬",
    "description": "This hexagram signifies on the one hand a break-through after a long accumulation of tension, as a swollen river breaks through its dikes, or in the manner of a cloudburst. On the other hand, applied to human conditions, it refers to the time when inferior people gradually begin to disappear. Their influence is on the wane; as a result of resolute action, a change in conditions occurs, a break-through. The hexagram is linked with the third month [April-May].",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "011111",
    "pinyin": "guài",
    "tradChinese": "夬",
    "above": "{'chinese': 'TUI', 'symbolic': 'THE JOYOUS,', 'alchemical': 'LAKE'}",
    "below": "{'chinese': CH'IEN, 'symbolic': 'THE CREATIVE,', 'alchemical': 'HEAVEN'}",
    "symbolic": "This hexagram signifies on the one hand a break-through after a long accumulation of tension, as a swollen river breaks through its dikes, or in the manner of a cloudburst. On the other hand, applied to human conditions, it refers to the time when inferior people gradually begin to disappear. Their influence is on the wane; as a result of resolute action, a change in conditions occurs, a break-through. The hexagram is linked with the third month [April-May]."
  },
  {
    "number": 44,
    "name": "Encountering",
    "chineseName": "姤",
    "description": "This hexagram indicates a situation in which the principle of darkness, after having been eliminated, furtively and unexpectedly obtrudes again from within and below. Of its own accord the female principle comes to meet the male. It is an unfavorable and dangerous situation, and we must understand and promptly prevent the possible consequences. The hexagram is linked with the fifth month [June-July], because at the summer solstice the principle of darkness gradually becomes ascendant again.",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "111110",
    "pinyin": "gòu",
    "tradChinese": "姤",
    "above": "{'chinese': CH'IEN, 'symbolic': 'THE CREATIVE,', 'alchemical': 'HEAVEN'}",
    "below": "{'chinese': 'SUN', 'symbolic': 'THE GENTLE,', 'alchemical': 'WIND'}",
    "symbolic": "This hexagram indicates a situation in which the principle of darkness, after having been eliminated, furtively and unexpectedly obtrudes again from within and below. Of its own accord the female principle comes to meet the male. It is an unfavorable and dangerous situation, and we must understand and promptly prevent the possible consequences. The hexagram is linked with the fifth month [June-July], because at the summer solstice the principle of darkness gradually becomes ascendant again."
  },
  {
    "number": 8,
    "name": "whereas in the former case one strong line (the fifth) stands in the midst of weak lines.,{'text': 'Over the earth",
    "chineseName": "there is danger of a break-through. Precautions must be taken to prevent this. Similarly where men gather together in great numbers",
    "description": "they can be prevented.'},{'text': 'GATHERING TOGETHER. Success.\\n\\nThe king approaches his temple.\\nIt furthers one to see the great man.\\n\\nThis brings success. Perseverance furthers.\\n\\nTo bring great offerings creates good fortune.\\nIt furthers one to undertake something.'",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "the idea of gathering together is even more strongly expressed here than in the other hexagram. The same idea also arises from the fact that in the present case it is two strong lines (the fourth and the fifth) that bring about the gather together",
    "pinyin": "'comments': 'If the water in the lake gathers until it rises above the earth",
    "tradChinese": "there is danger of a break-through. Precautions must be taken to prevent this. Similarly where men gather together in great numbers",
    "above": "strife is likely to arise; where possessions are collected",
    "below": "robbery is likely to occur. Thus in the time of GATHERING TOGETHER we must arm promptly to ward off the unexpected. Human woes usually come as a result of unexpected events against which we are not forearmed. If we are prepared",
    "symbolic": "they can be prevented.'},{'text': 'GATHERING TOGETHER. Success.\\n\\nThe king approaches his temple.\\nIt furthers one to see the great man.\\n\\nThis brings success. Perseverance furthers.\\n\\nTo bring great offerings creates good fortune.\\nIt furthers one to undertake something.'"
  },
  {
    "number": 35,
    "name": "although it is connected with success",
    "chineseName": "'comments': 'Adapting itself to obstacles and bending around them",
    "description": "he advances. He must go to see authoritative people. He need not be afraid to do this",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "just as a plant needs energy for pushing upward through the earth. That is why this hexagram",
    "pinyin": "wood grows:\\n\\nThe image of PUSHING UPWARD.\\n\\nThus the superior man of devoted character\\nHeaps up small things\\nIn order to achieve something high and great.'",
    "tradChinese": "'comments': 'Adapting itself to obstacles and bending around them",
    "above": "wood in the earth grows upward without haste and without rest. Thus too the superior man is devoted in character and never pauses in his progress.'},{'text': 'PUSHING UPWARD has supreme success.\\nOne must see the great man.\\nFear not.\\nDeparture toward the south\\nBrings good fortune.'",
    "below": "'comments': 'The pushing upward of the good elements encounters no obstruction and is therefore accompanied by great success. The pushing upward is made possible not by violence but by modesty and adaptability. Since the individual is borne along by the propitiousness of the time",
    "symbolic": "he advances. He must go to see authoritative people. He need not be afraid to do this"
  },
  {
    "number": 47,
    "name": "Exhausting",
    "chineseName": "困",
    "description": "The lake is above, water below; the lake is empty, dried up. Exhaustion is expressed in yet another way: at the top, a dark line is holding down two light line; below, a light line is hemmed in between two dark ones. The upper trigram belongs to the principle of darkness, the lower to the principle of light. Thus everywhere superior men are oppressed and held in restraint by inferior men.",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "011010",
    "pinyin": "kùn",
    "tradChinese": "困",
    "above": "{'chinese': 'TUI', 'symbolic': 'THE JOYOUS,', 'alchemical': 'LAKE'}",
    "below": "{'chinese': K'AN, 'symbolic': 'THE ABYSMAL,', 'alchemical': 'WATER'}",
    "symbolic": "The lake is above, water below; the lake is empty, dried up. Exhaustion is expressed in yet another way: at the top, a dark line is holding down two light line; below, a light line is hemmed in between two dark ones. The upper trigram belongs to the principle of darkness, the lower to the principle of light. Thus everywhere superior men are oppressed and held in restraint by inferior men."
  },
  {
    "number": 48,
    "name": "Replenishing",
    "chineseName": "井",
    "description": "Wood is below, water above. The wood goes down into the earth to bring up water. The image derives from the pole-and-bucket well of ancient China. The wood represents not the buckets, which in ancient times were made of clay, but rather the wooden poles by which the water is hauled up from the well. The image also refers to the world of plants, which lift water out of the earth by means of their fibers. The well from which water is drawn conveys the further idea of an inexhaustible dispensing of nourishment.",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "010110",
    "pinyin": "jǐng",
    "tradChinese": "井",
    "above": "{'chinese': K'AN, 'symbolic': 'THE ABYSMAL,', 'alchemical': 'WATER'}",
    "below": "{'chinese': 'SUN', 'symbolic': 'THE GENTLE,', 'alchemical': 'WIND,'}",
    "symbolic": "Wood is below, water above. The wood goes down into the earth to bring up water. The image derives from the pole-and-bucket well of ancient China. The wood represents not the buckets, which in ancient times were made of clay, but rather the wooden poles by which the water is hauled up from the well. The image also refers to the world of plants, which lift water out of the earth by means of their fibers. The well from which water is drawn conveys the further idea of an inexhaustible dispensing of nourishment."
  },
  {
    "number": 38,
    "name": "Li and Tui. But while there the elder of the two daughters is above",
    "chineseName": "and the forces combat each other like fire and water (lake)",
    "description": "eventuating in the revolution of the seasons",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "the two younger daughters",
    "pinyin": "here the younger daughter is above. The influences are in actual conflict",
    "tradChinese": "and the forces combat each other like fire and water (lake)",
    "above": "each trying to destroy the other. Hence the idea of revolution.,{'text': 'Fire in the lake: the image of REVOLUTION.\\n\\nThus the superior man\\n\\nSets the calendar in order\\nAnd makes the seasons clear.'",
    "below": "'comments': 'Fire below and the lake above combat and destroy each other. So too in the course of the year a combat takes place between the forces of light and the forces of darkness",
    "symbolic": "eventuating in the revolution of the seasons"
  },
  {
    "number": 5,
    "name": "Needing",
    "chineseName": "需",
    "description": "All beings have need of nourishment from above. But the gift of food comes in its own time, and for this one must wait. This hexagram shows the clouds in the heavens, giving rain to refresh all that grows and to provide mankind with food and drink. The rain will come in its own time. We cannot make it come; we have to wait for it. The idea of waiting is further suggested by the attributes of the two trigrams--strength within, danger in from. Strength in the face of danger does not plunge ahead but bides its time, whereas weakness in the face of danger grows agitated and has not the patience to wait.",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "010111",
    "pinyin": "xū",
    "tradChinese": "需",
    "above": "{'chinese': K'AN, 'symbolic': 'THE ABYSMAL,', 'alchemical': 'WATER'}",
    "below": "{'chinese': CH'IEN, 'symbolic': 'THE CREATIVE,', 'alchemical': 'HEAVEN'}",
    "symbolic": "All beings have need of nourishment from above. But the gift of food comes in its own time, and for this one must wait. This hexagram shows the clouds in the heavens, giving rain to refresh all that grows and to provide mankind with food and drink. The rain will come in its own time. We cannot make it come; we have to wait for it. The idea of waiting is further suggested by the attributes of the two trigrams--strength within, danger in from. Strength in the face of danger does not plunge ahead but bides its time, whereas weakness in the face of danger grows agitated and has not the patience to wait."
  },
  {
    "number": 48,
    "name": "suggests the fostering and nourishing of able men",
    "chineseName": "below",
    "description": "is flame. Thus together they stand for the flame kindled by wood and wind",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "as a utensil pertaining to a refined civilization",
    "pinyin": "men-made objects. Yet here too the thought has its abstract connotation. Sun",
    "tradChinese": "below",
    "above": "is wood and wind; Li",
    "below": "above",
    "symbolic": "is flame. Thus together they stand for the flame kindled by wood and wind"
  },
  {
    "number": 51,
    "name": "TakingAction",
    "chineseName": "震",
    "description": "The hexagram Chên represents the eldest son, who seizes rule with energy and power. A yang line develops below two yin lines and presses upward forcibly. This movement is so violent that it arouses terror. It is symbolized by thunder, which bursts forth from the earth and by its shock causes fear and trembling.",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "001001",
    "pinyin": "zhèn",
    "tradChinese": "震",
    "above": "{'chinese': 'CHêN', 'symbolic': 'THE AROUSING,', 'alchemical': 'THUNDER'}",
    "below": "{'chinese': 'CHêN', 'symbolic': 'THE AROUSING,', 'alchemical': 'THUNDER'}",
    "symbolic": "The hexagram Chên represents the eldest son, who seizes rule with energy and power. A yang line develops below two yin lines and presses upward forcibly. This movement is so violent that it arouses terror. It is symbolized by thunder, which bursts forth from the earth and by its shock causes fear and trembling."
  },
  {
    "number": 52,
    "name": "KeepingStill",
    "chineseName": "艮",
    "description": "The image of this hexagram is the mountain, the youngest son of heaven and earth. The male principle is at the top because it strives upward by nature; the female principle is below, since the direction of its movement has come to its normal end. In its application to man, the hexagram turns upon the problem of achieving a quiet heart. It is very difficult to bring quiet to the heart. While Buddhism strives for rest through an ebbing away of all movement in nirvana, the Book of Changes holds that rest is merely a state of polarity that always posits movement as its complement. Possibly the words of the text embody directions for the practice of yoga.",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "100100",
    "pinyin": "gèn",
    "tradChinese": "艮",
    "above": "{'chinese': 'KêN', 'symbolic': 'KEEPING STILL,', 'alchemical': 'MOUNTAIN'}",
    "below": "{'chinese': 'KêN', 'symbolic': 'KEEPING STILL,', 'alchemical': 'MOUNTAIN'}",
    "symbolic": "The image of this hexagram is the mountain, the youngest son of heaven and earth. The male principle is at the top because it strives upward by nature; the female principle is below, since the direction of its movement has come to its normal end. In its application to man, the hexagram turns upon the problem of achieving a quiet heart. It is very difficult to bring quiet to the heart. While Buddhism strives for rest through an ebbing away of all movement in nirvana, the Book of Changes holds that rest is merely a state of polarity that always posits movement as its complement. Possibly the words of the text embody directions for the practice of yoga."
  },
  {
    "number": 53,
    "name": "DevelopingGradually",
    "chineseName": "漸",
    "description": "This hexagram is made up of Sun (wood, penetration) above, i.e., without, and Kên (mountain, stillness) below, i.e., within. A tree on a mountain develops slowly according to the law of its being and consequently stands firmly rooted. This gives the idea of a development that proceeds gradually, step by step. The attributes of the trigrams also point to this: within is tranquillity, which guards against precipitate actions, and without is penetration, which makes development and progress possible.",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "110100",
    "pinyin": "jiàn",
    "tradChinese": "漸",
    "above": "{'chinese': 'SUN', 'symbolic': 'THE GENTLE,', 'alchemical': 'WIND,'}",
    "below": "{'chinese': 'KêN', 'symbolic': 'KEEPING STILL,', 'alchemical': 'MOUNTAIN'}",
    "symbolic": "This hexagram is made up of Sun (wood, penetration) above, i.e., without, and Kên (mountain, stillness) below, i.e., within. A tree on a mountain develops slowly according to the law of its being and consequently stands firmly rooted. This gives the idea of a development that proceeds gradually, step by step. The attributes of the trigrams also point to this: within is tranquillity, which guards against precipitate actions, and without is penetration, which makes development and progress possible."
  },
  {
    "number": 53,
    "name": "shows a young girl under the guidance of an older man who marries her.,{'text': 'Thunder over the lake:\\n\\nThe image of THE MARRYING MAIDEN.\\n\\nThus the superior man\\nUnderstands the transitory\\nIn the light of the eternity of the end.'",
    "chineseName": "leading to endless misunderstandings and disagreements. Therefore it is necessary constantly to remain mindful of the end. If we permit ourselves to drift along",
    "description": "'comments': 'A girl who is taken into the family",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "ceremonious procedures attending THE MARRYING MAIDEN",
    "pinyin": "which follows it in shimmering waves. This symbolizes the girl who follows the man of her choice. But every relationship between individuals bears within it the danger that wrong turns may be taken",
    "tradChinese": "leading to endless misunderstandings and disagreements. Therefore it is necessary constantly to remain mindful of the end. If we permit ourselves to drift along",
    "above": "we come together and are parted again as the day may determine. If on the other hand a man fixes his mind on an end that endures",
    "below": "he will succeed in avoiding the reefs that confront the closer relationships of people.'},{'text': 'THE MARRYING MAIDEN.\\nUndertakings bring misfortune.\\n\\nNothing that would further.'",
    "symbolic": "'comments': 'A girl who is taken into the family"
  },
  {
    "number": 55,
    "name": "Abundance",
    "chineseName": "豐",
    "description": "Chên is movement; Li is flame, whose attribute is clarity. Clarity within, movement without-this produces greatness and abundance. The hexagram pictures a period of advanced civilization. However, the fact that development has reached a peak suggests that this extraordinary condition of abundance cannot be maintained permanently.",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "001101",
    "pinyin": "fēng",
    "tradChinese": "豐",
    "above": "{'chinese': 'CHêN', 'symbolic': 'THE AROUSING,', 'alchemical': 'THUNDER'}",
    "below": "{'chinese': 'LI', 'symbolic': 'THE CLINGING,', 'alchemical': 'FIRE'}",
    "symbolic": "Chên is movement; Li is flame, whose attribute is clarity. Clarity within, movement without-this produces greatness and abundance. The hexagram pictures a period of advanced civilization. However, the fact that development has reached a peak suggests that this extraordinary condition of abundance cannot be maintained permanently."
  },
  {
    "number": 56,
    "name": "Travelling",
    "chineseName": "旅",
    "description": "The mountain, Kên, stands still; above it fire, Li, flames up and does not tarry. Therefore the two trigrams do not stay together. Strange lands and separation are the wanderer's lot.",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "101100",
    "pinyin": "lǚ",
    "tradChinese": "旅",
    "above": "{'chinese': 'LI', 'symbolic': 'THE CLINGING,', 'alchemical': 'FIRE'}",
    "below": "{'chinese': 'KêN', 'symbolic': 'KEEPING STILL,', 'alchemical': 'MOUNTAIN'}",
    "symbolic": "The mountain, Kên, stands still; above it fire, Li, flames up and does not tarry. Therefore the two trigrams do not stay together. Strange lands and separation are the wanderer's lot."
  },
  {
    "number": 57,
    "name": "ProceedingHumbly",
    "chineseName": "巽",
    "description": "Sun is one of the eight doubled trigrams. It is the eldest daughter and symbolizes wind or wood; it has for its attribute gentleness, which nonetheless penetrates like the wind or like growing wood with its roots. The dark principle, in itself rigid and immovable, is dissolved by the penetrating light principle, to which it subordinates itself in gentleness. In nature, it is the wind that disperses the gathered clouds, leaving the sky clear and serene. In human life it is penetrating clarity of judgment that thwarts all dark hidden motives. In the life of the community it is the powerful influence of a great personality that uncovers and breaks up those intrigues which shun the light of day.",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "110110",
    "pinyin": "xùn",
    "tradChinese": "巽",
    "above": "{'chinese': 'SUN', 'symbolic': 'THE GENTLE,', 'alchemical': 'WIND,'}",
    "below": "{'chinese': 'SUN', 'symbolic': 'THE GENTLE,', 'alchemical': 'WIND,'}",
    "symbolic": "Sun is one of the eight doubled trigrams. It is the eldest daughter and symbolizes wind or wood; it has for its attribute gentleness, which nonetheless penetrates like the wind or like growing wood with its roots. The dark principle, in itself rigid and immovable, is dissolved by the penetrating light principle, to which it subordinates itself in gentleness. In nature, it is the wind that disperses the gathered clouds, leaving the sky clear and serene. In human life it is penetrating clarity of judgment that thwarts all dark hidden motives. In the life of the community it is the powerful influence of a great personality that uncovers and breaks up those intrigues which shun the light of day."
  },
  {
    "number": 58,
    "name": "Joyful",
    "chineseName": "兌",
    "description": "This hexagram, like sun, is one of the eight formed by doubling of a trigram. The trigram Tui denotes the youngest daughter; it is symbolized by the smiling lake, and its attribute is joyousness. Contrary to appearances, it is not the yielding quality of the top line that accounts for joy here. The attribute of the yielding or dark principle is not joy but melancholy. However, joy is indicated by the fact that there are two strong lines within, expressing themselves through the medium of gentleness. True joy, therefore, rests on firmness and strength within, manifesting itself outwardly as yielding and gentle.",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "011011",
    "pinyin": "duì",
    "tradChinese": "兌",
    "above": "{'chinese': 'TUI', 'symbolic': 'THE JOYOUS,', 'alchemical': 'LAKE'}",
    "below": "{'chinese': 'TUI', 'symbolic': 'THE JOYOUS,', 'alchemical': 'LAKE'}",
    "symbolic": "This hexagram, like sun, is one of the eight formed by doubling of a trigram. The trigram Tui denotes the youngest daughter; it is symbolized by the smiling lake, and its attribute is joyousness. Contrary to appearances, it is not the yielding quality of the top line that accounts for joy here. The attribute of the yielding or dark principle is not joy but melancholy. However, joy is indicated by the fact that there are two strong lines within, expressing themselves through the medium of gentleness. True joy, therefore, rests on firmness and strength within, manifesting itself outwardly as yielding and gentle."
  },
  {
    "number": 59,
    "name": "Dispersing",
    "chineseName": "渙",
    "description": "Wind blowing over water disperses it, dissolving it into foam and mist. This suggests that when a man's vital energy is dammed up within him (indicated as a danger by the attribute of the lower trigram), gentleness serves to break up and dissolve the blockage.",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "110010",
    "pinyin": "huàn",
    "tradChinese": "渙",
    "above": "{'chinese': 'SUN', 'symbolic': 'THE GENTLE,', 'alchemical': 'WIND'}",
    "below": "{'chinese': K'AN, 'symbolic': 'THE ABYSMAL,', 'alchemical': 'WATER'}",
    "symbolic": "Wind blowing over water disperses it, dissolving it into foam and mist. This suggests that when a man's vital energy is dammed up within him (indicated as a danger by the attribute of the lower trigram), gentleness serves to break up and dissolve the blockage."
  },
  {
    "number": 6,
    "name": "Contention",
    "chineseName": "訟",
    "description": "The upper trigram, whose image is heaven, has an upward movement; the lower trigram, water, in accordance with its nature tends downward. Thus the two halves move away from each other, giving rise to the idea of conflict. The attribute of the Creative is strength, that of the Abysmal is danger, guile. Where cunning has force before it, there is conflict. A third indication of conflict, in terms of character, is presented by the combination of deep cunning within and fixed determination outwardly. A person of this character will certainly be quarrelsome.",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "111010",
    "pinyin": "sòng",
    "tradChinese": "訟",
    "above": "{'chinese': CH'IEN, 'symbolic': 'THE CREATIVE,', 'alchemical': 'HEAVEN'}",
    "below": "{'chinese': K'AN, 'symbolic': 'THE ABYSMAL,', 'alchemical': 'WATER'}",
    "symbolic": "The upper trigram, whose image is heaven, has an upward movement; the lower trigram, water, in accordance with its nature tends downward. Thus the two halves move away from each other, giving rise to the idea of conflict. The attribute of the Creative is strength, that of the Abysmal is danger, guile. Where cunning has force before it, there is conflict. A third indication of conflict, in terms of character, is presented by the combination of deep cunning within and fixed determination outwardly. A person of this character will certainly be quarrelsome."
  },
  {
    "number": 60,
    "name": "Restricting",
    "chineseName": "節",
    "description": "A lake occupies a limited space. When more water comes into it, it overflows. Therefore limits must be set for the water. The image shows water below and water above, with the firmament between them as a limit. The Chinese word for limitation really denotes the joints that divide a bamboo stalk. In relation to ordinary life it means the thrift that sets fixed limits upon expenditures. In relation to the moral sphere it means the fixed limits that the superior man sets upon his actions-the limits of loyalty and disinterestedness.",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "010011",
    "pinyin": "jié",
    "tradChinese": "節",
    "above": "{'chinese': K'AN, 'symbolic': 'THE ABYSMAL,', 'alchemical': 'WATER'}",
    "below": "{'chinese': 'TUI', 'symbolic': 'THE JOYOUS,', 'alchemical': 'LAKE'}",
    "symbolic": "A lake occupies a limited space. When more water comes into it, it overflows. Therefore limits must be set for the water. The image shows water below and water above, with the firmament between them as a limit. The Chinese word for limitation really denotes the joints that divide a bamboo stalk. In relation to ordinary life it means the thrift that sets fixed limits upon expenditures. In relation to the moral sphere it means the fixed limits that the superior man sets upon his actions-the limits of loyalty and disinterestedness."
  },
  {
    "number": 61,
    "name": "InnermostSincerity",
    "chineseName": "中孚",
    "description": "The wind blows over the lake and stirs the surface of the water. Thus visible effects of the invisible manifest themselves. The hexagram consists of firm lines above and below, while it is open in the center. This indicates a heart free of prejudices and therefore open to truth. On the other hand, each of the two trigrams has a firm line in the middle; this indicates the force of inner truth in the influences they present. The attributes of the two trigrams are: above, gentleness, forbearance toward inferiors; below, joyousness in obeying superiors. Such conditions create the basis of a mutual confidence that makes achievements possible. The character of fu (truth) is actually the picture of a bird's foot over a fledgling. It suggests the idea of brooding. An egg is hollow. The light-giving power must work to quicken it from outside, but there must be a germ of life within, if life is to be awakened. Far-reaching speculations can be linked with these ideas.",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "110011",
    "pinyin": "zhōngfú",
    "tradChinese": "中孚",
    "above": "{'chinese': 'SUN', 'symbolic': 'THE GENTLE,', 'alchemical': 'WIND'}",
    "below": "{'chinese': 'TUI', 'symbolic': 'THE JOYOUS,', 'alchemical': 'LAKE'}",
    "symbolic": "The wind blows over the lake and stirs the surface of the water. Thus visible effects of the invisible manifest themselves. The hexagram consists of firm lines above and below, while it is open in the center. This indicates a heart free of prejudices and therefore open to truth. On the other hand, each of the two trigrams has a firm line in the middle; this indicates the force of inner truth in the influences they present. The attributes of the two trigrams are: above, gentleness, forbearance toward inferiors; below, joyousness in obeying superiors. Such conditions create the basis of a mutual confidence that makes achievements possible. The character of fu (truth) is actually the picture of a bird's foot over a fledgling. It suggests the idea of brooding. An egg is hollow. The light-giving power must work to quicken it from outside, but there must be a germ of life within, if life is to be awakened. Far-reaching speculations can be linked with these ideas."
  },
  {
    "number": 61,
    "name": "'comments': 'Thunder on the mountain is different from thunder on the plain. In the mountains",
    "chineseName": "even though this might make his behavior seem petty to the outside world. He is exceptionally conscientious in his actions. In bereavement emotion means more to him than ceremoniousness. In all his personal expenditures he is extremely simple and unpretentious. In comparison with the man of the masses",
    "description": "if a man is not to throw himself away",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "extraordinary prudence is necessary.,{'text': 'Thunder on the mountain:\\n\\nThe image of PREPONDERANCE OF THE SMALL.\\n\\nThus in his conduct the superior man gives preponderance to reverence.\\nIn bereavement he gives preponderance to grief.\\nIn his expenditures he gives preponderance to thrift.'",
    "pinyin": "it is less audible than the thunder of an ordinary storm. Thus the superior man derives an imperative from this image: he must always fix his eyes more closely and more directly on duty than does the ordinary man",
    "tradChinese": "even though this might make his behavior seem petty to the outside world. He is exceptionally conscientious in his actions. In bereavement emotion means more to him than ceremoniousness. In all his personal expenditures he is extremely simple and unpretentious. In comparison with the man of the masses",
    "above": "all this makes him stand out as exceptional. But the essential significance of his attitude lies in the fact that in external matters he is on the side of the lowly.'},{'text': 'PREPONDERANCE OF THE SMALL. Success.\\nPerseverance furthers.\\n\\nSmall things may be done; great things should not be done.\\n\\nThe flying bird brings the message:\\nIt is not well to strive upward",
    "below": "\\nIt is well to remain below.\\nGreat good fortune.\\n\\nExceptional modesty and conscientiousness are sure to be rewarded with success; however",
    "symbolic": "if a man is not to throw himself away"
  },
  {
    "number": 12,
    "name": "the two elements stand in relation and thus generate energy (cf. the production of steam). But the resulting tension demands caution. If the water boils over",
    "chineseName": "so that everything seems to be in the best of order. In such times only the sage recognizes the moments that bode danger and knows how to banish it by means of timely precautions.'},{'text': 'AFTER COMPLETION. Success in small matters.\\nPerseverance furthers.\\nAt the beginning good fortune.\\nAt the end disorder.'",
    "description": "and it si only in regard to details that success is still to be achieved. In respect to this",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "'comments': 'When water in a kettle hangs over fire",
    "pinyin": "the water evaporates into the air. These elements here brought in to relation and thus generating energy are by nature hostile to each other. Only the most extreme caution can prevent damage. In life too there are junctures when all forces are in balance and work in harmony",
    "tradChinese": "so that everything seems to be in the best of order. In such times only the sage recognizes the moments that bode danger and knows how to banish it by means of timely precautions.'},{'text': 'AFTER COMPLETION. Success in small matters.\\nPerseverance furthers.\\nAt the beginning good fortune.\\nAt the end disorder.'",
    "above": "'comments': 'The transition from the old to the new time is already accomplished. In principle",
    "below": "everything stands systematized",
    "symbolic": "and it si only in regard to details that success is still to be achieved. In respect to this"
  },
  {
    "number": 64,
    "name": "NotYetFulfilled",
    "chineseName": "未濟",
    "description": "This hexagram indicates a time when the transition from disorder to order is not yet completed. The change is indeed prepared for, since all the lines in the upper trigram are in relation to those in the lower. However, they are not yet in their places. While the preceding hexagram offers an analogy to autumn, which forms the transition from summer to winter, this hexagram presents a parallel to spring, which leads out of winter's stagnation into the fruitful time of summer. With this hopeful outlook the Book of Changes come to its close.",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "101010",
    "pinyin": "wèijì",
    "tradChinese": "未濟",
    "above": "{'chinese': 'LI', 'symbolic': 'THE CLINGING,', 'alchemical': 'FLAME'}",
    "below": "{'chinese': K'AN, 'symbolic': 'THE ABYSMAL,', 'alchemical': 'WATER'}",
    "symbolic": "This hexagram indicates a time when the transition from disorder to order is not yet completed. The change is indeed prepared for, since all the lines in the upper trigram are in relation to those in the lower. However, they are not yet in their places. While the preceding hexagram offers an analogy to autumn, which forms the transition from summer to winter, this hexagram presents a parallel to spring, which leads out of winter's stagnation into the fruitful time of summer. With this hopeful outlook the Book of Changes come to its close."
  },
  {
    "number": 7,
    "name": "Multitude",
    "chineseName": "師",
    "description": "This hexagram is made up of the trigrams K'an, water, and K'un, earth, and thus it symbolizes the ground water stored up in the earth. In the same way military strength is stored up in the mass of the people--invisible in times of peace but always ready for use as a source of power. The attributes of the two trig rams are danger inside and obedience must prevail outside. Of the individual lines, the one that controls the hexagram is the strong nine in the second place, to which the other lines, all yielding, are subordinate. This line indicates a commander, because it stands in the middle of one of the two trigrams. But since it is in the lower rather than the upper trigram, it represents not the ruler but the efficient general, who maintains obedience in the army by his authority.",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "000010",
    "pinyin": "shī",
    "tradChinese": "師",
    "above": "{'chinese': K'UN, 'symbolic': 'THE RECEPTIVE,', 'alchemical': 'EARTH'}",
    "below": "{'chinese': K'AN, 'symbolic': 'THE ABYSMAL,', 'alchemical': 'WATER'}",
    "symbolic": "This hexagram is made up of the trigrams K'an, water, and K'un, earth, and thus it symbolizes the ground water stored up in the earth. In the same way military strength is stored up in the mass of the people--invisible in times of peace but always ready for use as a source of power. The attributes of the two trig rams are danger inside and obedience must prevail outside. Of the individual lines, the one that controls the hexagram is the strong nine in the second place, to which the other lines, all yielding, are subordinate. This line indicates a commander, because it stands in the middle of one of the two trigrams. But since it is in the lower rather than the upper trigram, it represents not the ruler but the efficient general, who maintains obedience in the army by his authority."
  },
  {
    "number": 8,
    "name": "Union",
    "chineseName": "比",
    "description": "The waters on the surface of the earth flow together wherever they can, as for example in the ocean, where all the rivers come together. Symbolically this connotes holding together and the laws that regulate it. The same idea is suggested by the fact that all the lines of the hexagram except the fifth, the place of the ruler, are yielding. The yielding lines hold together because they are influenced by a man of strong will in the leading position, a man who is their center of union. Moreover, this strong and guiding personality in turn holds together with the others, finding in them the complement of his own nature.",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "010000",
    "pinyin": "bǐ",
    "tradChinese": "比",
    "above": "{'chinese': K'AN, 'symbolic': 'THE ABYSMAL,', 'alchemical': 'WATER'}",
    "below": "{'chinese': K'UN, 'symbolic': 'THE RECEPTIVE,', 'alchemical': 'EARTH'}",
    "symbolic": "The waters on the surface of the earth flow together wherever they can, as for example in the ocean, where all the rivers come together. Symbolically this connotes holding together and the laws that regulate it. The same idea is suggested by the fact that all the lines of the hexagram except the fifth, the place of the ruler, are yielding. The yielding lines hold together because they are influenced by a man of strong will in the leading position, a man who is their center of union. Moreover, this strong and guiding personality in turn holds together with the others, finding in them the complement of his own nature."
  },
  {
    "number": 9,
    "name": "LittleAccumulation",
    "chineseName": "小畜",
    "description": "This hexagram means the force of the small--the power of the shadowy--that restrains, tames, impedes. A weak line in the fourth place, that of the minister, holds the five strong lines in check. In the Image it is the wind blowing across the sky. The wind restrains the clouds, the rising breath of the Creative, and makes them grow dense, but as yet is not strong enough to turn them to rain. The hexagram presents a configuration of circumstances in which a strong element is temporarily held in leash by a weak element. It is only through gentleness that this can have a successful outcome.",
    "lines": [
      "第一爻：初始阶段",
      "第二爻：发展阶段",
      "第三爻：转折阶段",
      "第四爻：上升阶段",
      "第五爻：高峰阶段",
      "第六爻：完成阶段"
    ],
    "image": "象辞解析",
    "judgment": "卦辞解析",
    "binary": "110111",
    "pinyin": "xiǎochù",
    "tradChinese": "小畜",
    "above": "{'chinese': 'SUN', 'symbolic': 'THE GENTLE,', 'alchemical': 'WIND'}",
    "below": "{'chinese': CH'IEN, 'symbolic': 'THE CREATIVE,', 'alchemical': 'HEAVEN'}",
    "symbolic": "This hexagram means the force of the small--the power of the shadowy--that restrains, tames, impedes. A weak line in the fourth place, that of the minister, holds the five strong lines in check. In the Image it is the wind blowing across the sky. The wind restrains the clouds, the rising breath of the Creative, and makes them grow dense, but as yet is not strong enough to turn them to rain. The hexagram presents a configuration of circumstances in which a strong element is temporarily held in leash by a weak element. It is only through gentleness that this can have a successful outcome."
  }
];

// 计算卦象
export function calculateHexagram(userNumber: number): IChingHexagram {
  const hexagramIndex = (userNumber % 64);
  return ICHING_HEXAGRAMS[hexagramIndex] || ICHING_HEXAGRAMS[0];
}

// 生成图像提示词
export function generateImagePrompt(
  hexagram: IChingHexagram,
  city: string,
  experience: string,
  difficulty: string
): string {
  const selectedLine = hexagram.lines[Math.floor(Math.random() * hexagram.lines.length)];
  
  return `A mystical and spiritual digital art piece representing the I Ching hexagram "${hexagram.chineseName}" (${hexagram.name}). 
  
  Visual elements should include:
  - Ancient Chinese calligraphy and symbols
  - The city of ${city} in the background, stylized and ethereal
  - Elements representing the user's experience: ${experience}
  - Visual metaphors for the current difficulty: ${difficulty}
  - The hexagram line wisdom: "${selectedLine}"
  
  Style: Traditional Chinese ink painting meets modern digital art, with flowing brushstrokes, misty mountains, and spiritual energy. 
  Color palette: Deep blues, golds, and earth tones with ethereal lighting.
  Mood: Contemplative, wise, and transformative.`;
}
