import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const T = {
  cream: '#FBF7F0', navy: '#1a365d', gold: '#D4AF37', red: '#DC2626',
  warning: '#F59E0B', success: '#10B981', muted: '#64748B',
};

export default function MasterAdminDashboard() {
  const [metrics, setMetrics] = useState({
    projects: 0,
    tourism: 0,
    revenue: 0,
    status: 'offline',
    users: 0,
    inquiries: 0
  });
  const [alarms, setAlarms] = useState([]);
  const [systemHealth, setSystemHealth] = useState({});

  useEffect(() => { loadMetrics(); loadAlarms(); }, []);

  async function loadMetrics() {
    try {
      const { data: projects } = await supabase.from('corporate_projects').select('*', { count: 'exact' });
      const { data: users } = await supabase.from('user_profiles').select('*', { count: 'exact' });
      const { data: inquiries } = await supabase.from('contact_inquiries').select('*', { count: 'exact' });

      setMetrics({
        projects: projects?.length || 0,
        tourism: projects?.filter(p => p.type === 'tourism').length || 0,
        revenue: projects?.reduce((sum, p) => sum + (p.value || 0), 0) || 0,
        users: users?.length || 0,
        inquiries: inquiries?.length || 0,
        status: 'online'
      });

      setSystemHealth({
        database: projects ? 'healthy' : 'degraded',
        api: users ? 'healthy' : 'offline',
        security: 'healthy'
      });
    } catch (e) {
      console.error('Metrics load error:', e);
    }
  }

  async function loadAlarms() {
    const { data } = await supabase
      .from('alarm_logs')
      .select('*')
      .eq('system', 'fortis')
      .order('created_at', { ascending: false })
      .limit(20);
    setAlarms(data || []);
  }

  async function triggerAlarm(level, system, message) {
    await supabase.from('alarm_logs').insert({
      level, system, message, resolved: false, created_at: new Date(),
      system: 'fortis'
    });
    loadAlarms();
  }

  function getStatusColor(status) {
    return status === 'online' || status === 'healthy' ? T.success : 
           status === 'degraded' ? T.warning : T.red;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-navy mb-8">FORTIS CORPORATE - Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {Object.entries(metrics).map(([key, value]) => (
            key !== 'status' && (
              <div key={key} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-700 capitalize">{key.replace('_', ' ')}</h3>
                <p className="text-3xl font-bold text-navy mt-2">
                  {typeof value === 'number' ? (key === 'revenue' ? `$${value.toLocaleString()}` : value) : value}
                </p>
              </div>
            )
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold text-navy mb-4">System Health</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(systemHealth).map(([key, status]) => (
              <div key={key} className="flex items-center justify-between p-4 border rounded">
                <span className="capitalize">{key.replace('_', ' ')}</span>
                <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: getStatusColor(status) + '20', color: getStatusColor(status) }}>
                  {status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-navy mb-4">Recent Alarms</h2>
          <div className="space-y-4">
            {alarms.map(alarm => (
              <div key={alarm.id} className="p-4 border rounded flex items-center justify-between">
                <div>
                  <span className={`px-2 py-1 rounded text-sm mr-2 ${
                    alarm.level === 'high' ? 'bg-red-100 text-red-800' :
                    alarm.level === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {alarm.level}
                  </span>
                  <span>{alarm.message}</span>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(alarm.created_at).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <button 
            onClick={() => triggerAlarm('low', 'fortis', 'Test alarm triggered')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Test Low Alarm
          </button>
          <button 
            onClick={() => triggerAlarm('medium', 'fortis', 'Medium priority issue')}
            className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
          >
            Test Medium Alarm
          </button>
          <button 
            onClick={() => triggerAlarm('high', 'fortis', 'Critical system failure')}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Test High Alarm
          </button>
        </div>
      </div>
    </div>
  );
}
