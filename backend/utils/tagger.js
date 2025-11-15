// backend/utils/tagger.js
// Rule-based tagger + priority + sentiment. Optional OpenAI fallback if OPENAI_KEY present.

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';
const OPENAI_MODEL = 'gpt-4o-mini'; // placeholder model name; change if needed

const KEYWORDS = {
  complaint: ['refund','not working','crash','complaint','broken','return','error','failed','delay','cancel'],
  question: ['how','when','where','what','help','support','how to','how do i','instructions'],
  request: ['feature','request','please add','can you add','would like','could you'],
  feedback: ['thanks','thank you','great','love','good','nice','improve']
};

function simpleSentiment(text){
  const t = (text||'').toLowerCase();
  if(/(refund|not working|crash|error|failed|delay|cancel|disappoint|angry|hate)/.test(t)) return 'negative';
  if(/(thank you|thanks|great|love|awesome|good|nice|happy)/.test(t)) return 'positive';
  return 'neutral';
}

function ruleTag(text){
  const t = (text||'').toLowerCase();
  const found = new Set();
  for(const [k,arr] of Object.entries(KEYWORDS)){
    for(const w of arr){
      if(t.includes(w)){ found.add(k); break; }
    }
  }
  if(found.has('complaint')) return 'complaint';
  if(found.has('request')) return 'request';
  if(found.has('question')) return 'question';
  if(found.has('feedback')) return 'feedback';
  return 'other';
}

function rulePriority(text){
  const t = (text||'').toLowerCase();
  if(/urgent|asap|immediately|payment failed|account blocked|data loss|security/.test(t)) return 'urgent';
  if(/refund|cancel|not working|error|failed|delay/.test(t)) return 'high';
  if(/please|request|could you|would like/.test(t)) return 'medium';
  return 'low';
}

async function openaiClassify(text){
  if(!process.env.OPENAI_KEY) return null;
  try{
    const prompt = `Classify the following customer message into JSON with keys: type, priority, sentiment.
type ∈ [question, request, complaint, feedback, other]
priority ∈ [low, medium, high, urgent]
sentiment ∈ [positive, neutral, negative]
Message: """${text.replace(/"/g,'\\"')}"""`;

    const body = {
      model: OPENAI_MODEL,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 200,
      temperature: 0
    };

    const res = await fetch(OPENAI_URL, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_KEY}`
      },
      body: JSON.stringify(body)
    });

    if(!res.ok) return null;
    const data = await res.json();
    const reply = data?.choices?.[0]?.message?.content || '';
    const jsonMatch = reply.match(/\{[\s\S]*\}/);
    const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(reply);
    return parsed;
  }catch(err){
    console.warn('OpenAI classify failed:', err.message || err);
    return null;
  }
}

async function tagAndPriority(text){
  const type = ruleTag(text);
  const priority = rulePriority(text);
  const sentiment = simpleSentiment(text);

  if(process.env.OPENAI_KEY){
    const ai = await openaiClassify(text);
    if(ai && ai.type && ai.priority && ai.sentiment){
      const allowedType = ['question','request','complaint','feedback','other'];
      const allowedPriority = ['low','medium','high','urgent'];
      const allowedSent = ['positive','neutral','negative'];
      return {
        type: allowedType.includes(ai.type) ? ai.type : type,
        priority: allowedPriority.includes(ai.priority) ? ai.priority : priority,
        sentiment: allowedSent.includes(ai.sentiment) ? ai.sentiment : sentiment
      };
    }
  }

  return { type, priority, sentiment };
}

module.exports = { tagAndPriority, ruleTag, rulePriority, simpleSentiment };
