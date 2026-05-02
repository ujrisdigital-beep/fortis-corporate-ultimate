import { supabase } from '../src/lib/supabase';
import { encrypt } from '../src/lib/fortisSecurity';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data: alarms } = await supabase
      .from('alarm_logs')
      .select('*')
      .eq('system', 'fortis')
      .order('created_at', { ascending: false })
      .limit(50);
    return res.status(200).json(alarms || []);
  }

  if (req.method === 'POST') {
    const { level, message, system = 'fortis' } = req.body;
    
    if (!['low', 'medium', 'high'].includes(level)) {
      return res.status(400).json({ error: 'Invalid alarm level' });
    }

    const encryptedMessage = encrypt(message);
    
    const { data, error } = await supabase.from('alarm_logs').insert({
      level,
      system,
      message: encryptedMessage,
      resolved: false,
      created_at: new Date().toISOString()
    }).select().single();

    if (error) return res.status(500).json({ error: error.message });

    if (level === 'high') {
      await supabase.from('self_improvement_log').insert({
        system: 'fortis',
        task: 'high_alarm_triggered',
        outcome: 'failure',
        timestamp: new Date().toISOString(),
        metrics: { alarm_level: 'high', message }
      });
    }

    return res.status(201).json(data);
  }

  if (req.method === 'PUT') {
    const { id, resolved } = req.body;
    const { data, error } = await supabase
      .from('alarm_logs')
      .update({ resolved, resolved_at: resolved ? new Date().toISOString() : null })
      .eq('id', id)
      .select()
      .single();

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  res.setHeader('Allow', ['GET', 'POST', 'PUT']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
