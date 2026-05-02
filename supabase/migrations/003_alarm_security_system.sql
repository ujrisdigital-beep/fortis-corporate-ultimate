-- FORTIS CORPORATE ULTIMATE - Alarm & Security System

-- Alarm Logs Table
CREATE TABLE IF NOT EXISTS alarm_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  level TEXT CHECK (level IN ('low', 'medium', 'high')) NOT NULL,
  system TEXT NOT NULL DEFAULT 'fortis',
  message TEXT NOT NULL,
  resolved BOOLEAN DEFAULT false,
  resolved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Self Improvement Log
CREATE TABLE IF NOT EXISTS self_improvement_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  system TEXT NOT NULL DEFAULT 'fortis',
  task TEXT NOT NULL,
  outcome TEXT CHECK (outcome IN ('success', 'failure')) NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metrics JSONB DEFAULT '{}'::jsonb
);

-- Corporate Projects Table
CREATE TABLE IF NOT EXISTS corporate_projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  value DECIMAL(15,2) DEFAULT 0,
  status TEXT DEFAULT 'active',
  client TEXT,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact Inquiries Table
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Profiles (for authentication)
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'user',
  company TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE alarm_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE self_improvement_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE corporate_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies (admin only for alarms and self-improvement)
CREATE POLICY "Admin can view all alarms" ON alarm_logs
  FOR SELECT USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin can manage alarms" ON alarm_logs
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin can view self-improvement log" ON self_improvement_log
  FOR SELECT USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Public can view active projects" ON corporate_projects
  FOR SELECT USING (status = 'active');

CREATE POLICY "Admin can manage projects" ON corporate_projects
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Anyone can submit inquiries" ON contact_inquiries
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin can view inquiries" ON contact_inquiries
  FOR SELECT USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

-- Temp email blocking function
CREATE OR REPLACE FUNCTION block_temp_emails()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.email ~* '(tempmail\.com|mailinator\.com|yopmail\.com|throwawaymail\.com)' THEN
    RAISE EXCEPTION 'Temporary email addresses are not allowed';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_block_temp_emails
  BEFORE INSERT OR UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION block_temp_emails();

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_alarm_logs_system ON alarm_logs(system);
CREATE INDEX IF NOT EXISTS idx_alarm_logs_created_at ON alarm_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_self_improvement_system ON self_improvement_log(system);
CREATE INDEX IF NOT EXISTS idx_corporate_projects_type ON corporate_projects(type);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_status ON contact_inquiries(status);
