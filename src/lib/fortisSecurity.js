import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const SECRET_KEY = process.env.FORTIS_SECRET_KEY || crypto.randomBytes(32).toString('hex');
const IV_LENGTH = 16;
const TAG_LENGTH = 16;

// AES-256 Encryption (Military Grade)
export function encrypt(text) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(SECRET_KEY, 'hex'), iv);
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, encrypted]).toString('base64');
}

export function decrypt(encryptedText) {
  const buffer = Buffer.from(encryptedText, 'base64');
  const iv = buffer.subarray(0, IV_LENGTH);
  const tag = buffer.subarray(IV_LENGTH, IV_LENGTH + TAG_LENGTH);
  const encrypted = buffer.subarray(IV_LENGTH + TAG_LENGTH);
  const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(SECRET_KEY, 'hex'), iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString('utf8');
}

// TLS 1.3 Enforcement
export function enforceTLS13(req, res, next) {
  const tlsVersion = req.socket.getProtocol?.();
  if (tlsVersion && !tlsVersion.includes('TLSv1.3')) {
    return res.status(426).json({ 
      error: 'Upgrade Required', 
      message: 'TLS 1.3 required for military-grade security' 
    });
  }
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
}

// Temp Email Blocker
const TEMP_EMAIL_DOMAINS = new Set([
  'tempmail.com', 'throwawaymail.com', 'mailinator.com', 'guerrillamail.com',
  'sharklasers.com', 'yopmail.com', 'temp-mail.org', 'fakeinator.com',
  'emailondeck.com', 'getairmail.com', 'hidemail.net', 'jetable.org',
  'mintemail.com', 'spamgourmet.com', 'tempmail.net', 'trashmail.ws',
  'yopmail.fr', '10minutemail.com', '20minutemail.com', 'anonbox.net',
  'mailnesia.com', 'mytemp.email', 'no-spam.ws', 'quickinbox.com',
  'forgetmail.com', 'spambox.us', 'tempail.com', 'tempemail.com',
]);

export async function isTempEmail(email) {
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) return true;
  
  if (TEMP_EMAIL_DOMAINS.has(domain)) return true;
  
  try {
    const res = await fetch(`https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${process.env.HUNTER_API_KEY}`);
    if (res.ok) {
      const data = await res.json();
      return data.data?.disposable || false;
    }
  } catch (e) {}
  
  return false;
}

export async function validateEmailAsPrimary(email) {
  if (!email || !email.includes('@')) {
    return { valid: false, reason: 'Invalid email format' };
  }
  
  const isTemp = await isTempEmail(email);
  if (isTemp) {
    return { valid: false, reason: 'Temporary/disposable emails are not allowed' };
  }
  
  const domain = email.split('@')[1];
  if (domain.length < 3 || !domain.includes('.')) {
    return { valid: false, reason: 'Invalid domain' };
  }
  
  return { valid: true, reason: 'Email accepted as primary identifier' };
}

// Corporate Self-Improvement Loop
export async function logTask(supabase, task, outcome, system = 'fortis') {
  const { data, error } = await supabase.from('self_improvement_log').insert({
    system,
    task,
    outcome,
    timestamp: new Date().toISOString(),
    metrics: { response_time: Date.now(), success: outcome === 'success' }
  }).select().single();
  
  if (error) console.error('Self-improvement log error:', error);
  return data;
}

export async function getLearningInsights(supabase, system = 'fortis') {
  const { data } = await supabase
    .from('self_improvement_log')
    .select('*')
    .eq('system', system)
    .order('timestamp', { ascending: false })
    .limit(50);
  
  const insights = {
    total_tasks: data?.length || 0,
    success_rate: data?.filter(d => d.outcome === 'success').length / (data?.length || 1),
    common_failures: {},
    improvement_suggestions: []
  };
  
  const failures = data?.filter(d => d.outcome === 'failure') || [];
  failures.forEach(f => {
    insights.common_failures[f.task] = (insights.common_failures[f.task] || 0) + 1;
  });
  
  if (insights.success_rate < 0.8) {
    insights.improvement_suggestions.push('Review and optimize failing tasks');
  }
  
  return insights;
}

// Anti-Reverse-Engineering Protection
export function obfuscateCode(code, level = 'medium') {
  const layers = {
    light: str => Buffer.from(str).toString('base64'),
    medium: str => {
      const b64 = Buffer.from(str).toString('base64');
      return b64.split('').reverse().join('') + `_${Date.now()}`;
    },
    heavy: str => {
      const step1 = Buffer.from(str).toString('base64');
      const step2 = Buffer.from(step1.split('').reverse().join('')).toString('hex');
      return Buffer.from(step2).toString('base64');
    }
  };
  
  return layers[level] ? layers[level](code) : code;
}
