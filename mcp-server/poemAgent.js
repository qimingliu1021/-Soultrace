import "dotenv/config";
import OpenAI from "openai";

// Initialize OpenAI client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_INSTRUCTIONS = `You are a skilled multimedia poet. You always craft verse that aligns to strict timing requirements for video journeys.

CRITICAL RULES:
- Output exactly 4 paragraphs (no more, no less).
- Each paragraph must contain 4-6 poetic lines.
- Maintain strong narrative flow across paragraphs following the provided journey context.
- Return only the poem content formatted as paragraphs separated by blank lines.`;

// Video Journey specific configuration
const VIDEO_JOURNEY_CONFIG = {
  totalSlides: 5,
  paragraphCount: 4, // 4 transitions between 5 slides
  paragraphDuration: 6, // seconds per paragraph
  cities: ["Chongqing", "New York", "Lincoln", "Shanghai"], // Based on your painting slides
};

// Poem genre definitions optimized for video journey
const POEM_GENRES = {
  videoJourney: {
    name: "Video Journey Poem",
    structure:
      "4 paragraphs, each 4-6 lines, synchronized with 6-second intervals",
    emotionalRange: ["journey", "exploration", "discovery", "reflection"],
    intensity: "moderate to deep",
    suitable: [
      "accompanying visual narratives",
      "city exploration",
      "cultural journey",
      "emotional progression",
    ],
    mood: ["contemplative", "adventurous", "reflective"],
    example:
      "Perfect for narrating a visual journey across different cities and cultures",
  },

  sonnet: {
    name: "Sonnet",
    structure: "14 lines adapted into 4 paragraphs (4-4-4-2 or 3-4-4-3 lines)",
    emotionalRange: ["love", "beauty", "contemplation", "philosophical"],
    intensity: "deep",
    suitable: [
      "expressing profound love",
      "philosophical reflection",
      "capturing beauty",
    ],
    mood: ["romantic", "contemplative", "elegant"],
    example: "Perfect for deep romantic feelings or philosophical musings",
  },

  ballad: {
    name: "Ballad",
    structure: "4 stanzas telling a story progression across cities",
    emotionalRange: ["storytelling", "adventure", "tragedy", "heroism"],
    intensity: "moderate to high",
    suitable: [
      "telling stories",
      "narrating adventures",
      "folk tales",
      "historical events",
    ],
    mood: ["narrative", "dramatic", "folk-like"],
    example: "Ideal for storytelling, adventures, or tales across cities",
  },

  freeVerse: {
    name: "Free Verse Journey",
    structure: "4 free-form paragraphs with flexible rhythm and flow",
    emotionalRange: ["any emotion", "personal expression", "modern themes"],
    intensity: "variable",
    suitable: [
      "raw emotion",
      "modern experiences",
      "personal stories",
      "experimental expression",
    ],
    mood: ["flexible", "contemporary", "personal"],
    example: "Great for raw, unfiltered emotional expression across locations",
  },

  ode: {
    name: "Ode to Cities",
    structure: "4 stanzas celebrating different aspects of the journey",
    emotionalRange: ["praise", "celebration", "admiration", "reverence"],
    intensity: "high",
    suitable: [
      "celebrating achievements",
      "praising cities/cultures",
      "expressing admiration",
    ],
    mood: ["celebratory", "reverent", "uplifting"],
    example:
      "Perfect for celebrating the beauty and diversity of different cities",
  },
};

console.log("poemAgent.js loaded successfully");

// Life situation to genre mapping for video journey
const LIFE_SITUATION_MAPPING = {
  "cultural exploration": ["videoJourney", "ode", "ballad"],
  "city journey": ["videoJourney", "freeVerse"],
  "travel adventure": ["ballad", "videoJourney"],
  "artistic discovery": ["ode", "freeVerse"],
  "contemplative journey": ["sonnet", "videoJourney"],
  "celebration of diversity": ["ode", "videoJourney"],
  "personal growth": ["freeVerse", "videoJourney"],
  "visual storytelling": ["videoJourney", "ballad"],
};

// Emotion to intensity mapping
const EMOTION_INTENSITY = {
  overwhelming: ["sonnet", "ode"],
  moderate: ["ballad", "videoJourney", "freeVerse"],
  light: ["videoJourney"],
  deep: ["sonnet", "freeVerse"],
  playful: ["videoJourney"],
  contemplative: ["sonnet", "freeVerse", "videoJourney"],
};

function selectPoemGenre({ emotion, situation, intensity, mood, purpose }) {
  let scores = {};

  // Initialize scores - prioritize videoJourney for video contexts
  Object.keys(POEM_GENRES).forEach((genre) => {
    scores[genre] = genre === "videoJourney" ? 1 : 0; // Give videoJourney a slight advantage
  });

  // Score based on life situation
  if (situation && LIFE_SITUATION_MAPPING[situation.toLowerCase()]) {
    LIFE_SITUATION_MAPPING[situation.toLowerCase()].forEach((genre) => {
      scores[genre] += 3;
    });
  }

  // Score based on emotion intensity
  if (intensity && EMOTION_INTENSITY[intensity.toLowerCase()]) {
    EMOTION_INTENSITY[intensity.toLowerCase()].forEach((genre) => {
      scores[genre] += 2;
    });
  }

  // Score based on emotional range match
  Object.keys(POEM_GENRES).forEach((genreKey) => {
    const genre = POEM_GENRES[genreKey];

    if (
      emotion &&
      genre.emotionalRange.some(
        (range) =>
          emotion.toLowerCase().includes(range) ||
          range.includes(emotion.toLowerCase())
      )
    ) {
      scores[genreKey] += 2;
    }

    if (
      mood &&
      genre.mood.some(
        (genreMood) =>
          mood.toLowerCase().includes(genreMood) ||
          genreMood.includes(mood.toLowerCase())
      )
    ) {
      scores[genreKey] += 2;
    }

    if (
      purpose &&
      genre.suitable.some(
        (suitability) =>
          purpose.toLowerCase().includes(suitability) ||
          suitability.includes(purpose.toLowerCase())
      )
    ) {
      scores[genreKey] += 3;
    }
  });

  // Find the highest scoring genre(s)
  const maxScore = Math.max(...Object.values(scores));
  const topGenres = Object.keys(scores).filter(
    (genre) => scores[genre] === maxScore
  );

  // Default to videoJourney for video contexts
  if (maxScore === 1) {
    return "videoJourney";
  }

  return topGenres[0];
}

function buildVideoJourneyPrompt(
  selectedGenre,
  { topic, emotion, situation, mood, tone, cities }
) {
  const genre = POEM_GENRES[selectedGenre];
  const cityList = cities || VIDEO_JOURNEY_CONFIG.cities;

  return `Write a ${genre.name.toLowerCase()} about "${topic}" that will accompany a video journey through these cities: ${cityList.join(
    ", "
  )}.

CRITICAL REQUIREMENTS:
- Write EXACTLY 4 paragraphs (no more, no less)
- Each paragraph should be 4-6 lines long
- Each paragraph will display for exactly 6 seconds during the video
- The poem should flow as a journey through these locations
- Each paragraph can correspond to a transition or thematic element of the journey

Genre Requirements:
- Structure: ${genre.structure}
- Emotional Range: ${genre.emotionalRange.join(", ")}
- Suitable for: ${genre.suitable.join(", ")}

Context:
${emotion ? `- Emotion: ${emotion}` : ""}
${situation ? `- Life Situation: ${situation}` : ""}
${mood ? `- Desired Mood: ${mood}` : ""}
${tone ? `- Tone: ${tone}` : ""}
- Video Context: This poem will sync with a 30-second video (5 slides × 6 seconds each)
- Cities Featured: ${cityList.join(", ")}

Please create a ${genre.name.toLowerCase()} with exactly 4 paragraphs that captures the essence of "${topic}" while creating a poetic journey that complements the visual experience. Each paragraph should stand alone but contribute to the overall narrative arc.

Format your response as:
Paragraph 1: [4-6 lines]

Paragraph 2: [4-6 lines]

Paragraph 3: [4-6 lines]

Paragraph 4: [4-6 lines]`;
}

export async function generateVideoJourneyPoem({
  topic = "a journey through cities and souls",
  emotion = "contemplative",
  situation = "cultural exploration",
  intensity = "moderate",
  mood = "reflective",
  purpose = "visual storytelling",
  tone = "poetic",
  genre = null, // Allow manual genre override
  cities = null, // Allow custom city list
}) {
  if (!process.env.OPENAI_API_KEY) {
    return {
      poem: `Through cities bright and souls that gleam,
We wander paths of light and dream.
Each street a story, each face a song,
In this journey where we all belong.

From ancient stones to modern towers,
We count our days not just in hours.
But in the moments, connections made,
Where human hearts are gently laid.

The lanterns float on evening air,
While distant music fills the square.
In every culture, every place,
We find reflections of our grace.

So let us journey, let us roam,
Through foreign lands to find our home.
For in each city, each new sight,
We discover our own inner light.`,
      meta: {
        model: "fallback",
        usedOpenAI: false,
        selectedGenre: "videoJourney",
        paragraphCount: 4,
        reason: "No API key available",
      },
    };
  }

  try {
    // Select genre optimized for video journey
    const selectedGenre =
      genre ||
      selectPoemGenre({
        emotion,
        situation,
        intensity,
        mood,
        purpose,
      });

    // Build the specialized video journey prompt
    const poemPrompt = buildVideoJourneyPrompt(selectedGenre, {
      topic,
      emotion,
      situation,
      mood,
      tone,
      cities,
    });

    const response = await client.responses.create({
      model: "gpt-5",
      instructions: SYSTEM_INSTRUCTIONS,
      input: poemPrompt,
      max_output_tokens: 5000,
    });

    const poemContent =
      response.output_text ??
      response.output
        ?.find((item) => item.type === "message")
        ?.content?.find((content) => content.type === "output_text")?.text;

    if (!poemContent) {
      throw new Error("OpenAI response missing poem content");
    }

    const paragraphs = poemContent
      .split("\n\n")
      .filter((p) => p.trim().length > 0);

    return {
      poem: poemContent,
      paragraphs: paragraphs,
      meta: {
        model: response.model,
        usedOpenAI: true,
        selectedGenre: selectedGenre,
        genreInfo: POEM_GENRES[selectedGenre],
        paragraphCount: paragraphs.length,
        expectedParagraphs: VIDEO_JOURNEY_CONFIG.paragraphCount,
        syncDuration: VIDEO_JOURNEY_CONFIG.paragraphDuration,
        cities: cities || VIDEO_JOURNEY_CONFIG.cities,
        responseId: response.id,
        tokens: response.usage,
        status: response.status,
      },
    };
  } catch (error) {
    console.error("[poemAgent] Error generating video journey poem:", error);

    // Fallback poem with exactly 4 paragraphs
    const fallbackGenre =
      genre ||
      selectPoemGenre({ emotion, situation, intensity, mood, purpose });

    return {
      poem: `In distant lands where dreams take flight,
Through Chongqing's glowing amber light.
We start our journey, hearts so free,
Across the vast and endless sea.

Through New York's towers reaching high,
To Lincoln's calm beneath the sky.
Each city holds a different tale,
Of human hearts that never fail.

Shanghai's rivers flow like gold,
While Chicago's stories yet untold.
We gather memories, line by line,
In this journey, yours and mine.

So let us wander, let us see,
What makes each place a mystery.
For in the end, we come to know,
It's love that makes our spirits glow.`,
      paragraphs: [
        "In distant lands where dreams take flight,\nThrough Chongqing's glowing amber light.\nWe start our journey, hearts so free,\nAcross the vast and endless sea.",
        "Through New York's towers reaching high,\nTo Lincoln's calm beneath the sky.\nEach city holds a different tale,\nOf human hearts that never fail.",
        "Shanghai's rivers flow like gold,\nWhile Chicago's stories yet untold.\nWe gather memories, line by line,\nIn this journey, yours and mine.",
        "So let us wander, let us see,\nWhat makes each place a mystery.\nFor in the end, we come to know,\nIt's love that makes our spirits glow.",
      ],
      meta: {
        model: "fallback",
        usedOpenAI: false,
        selectedGenre: fallbackGenre,
        paragraphCount: 4,
        expectedParagraphs: VIDEO_JOURNEY_CONFIG.paragraphCount,
        error: String(error),
      },
    };
  }
}

// Legacy function for backward compatibility
export async function generatePoem(options) {
  return generateVideoJourneyPoem(options);
}

// Export configuration and genre information
export {
  POEM_GENRES,
  LIFE_SITUATION_MAPPING,
  EMOTION_INTENSITY,
  VIDEO_JOURNEY_CONFIG,
};
