import React, { useState, useEffect } from 'react';
import MediaUpload from './MediaUpload';
import FortisLogo from './FortisLogo';
import { supabase } from '@/lib/supabaseClient';
import { FiSave, FiImage as FiImageIcon } from 'react-icons/fi';

export default function ProjectForm({ projectId, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    long_description: '',
    category: '',
    location: '',
    start_date: '',
    end_date: '',
    status: 'ongoing',
    budget: '',
    featured: false,
    logo_position: 'top-left',
  });
  const [media, setMedia] = useState([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (projectId && projectId !== 'new') {
      fetchProject();
    }
  }, [projectId]);

  const fetchProject = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single();

      if (error) throw error;
      setFormData(data);
      await fetchMedia();
    } catch (error) {
      console.error('Error fetching project:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMedia = async () => {
    try {
      const { data, error } = await supabase
        .from('project_media')
        .select('*')
        .eq('project_id', projectId)
        .order('display_order');

      if (!error) {
        setMedia(data || []);
      }
    } catch (error) {
      console.error('Error fetching media:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const generateSlug = (title) => {
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const slug = formData.slug || generateSlug(formData.title);
      const dataToSave = { ...formData, slug };

      if (!projectId || projectId === 'new') {
        const { data, error } = await supabase
          .from('projects')
          .insert([dataToSave])
          .select();
        
        if (error) throw error;
        alert('Project created successfully!');
        onSave?.(data?.[0]?.id);
      } else {
        const { error } = await supabase
          .from('projects')
          .update(dataToSave)
          .eq('id', projectId);
        
        if (error) throw error;
        alert('Project updated successfully!');
        onSave?.(projectId);
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Error saving project: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center py-12">Loading project...</div>;

  return (
    <form onSubmit={handleSave} className="space-y-8 bg-white p-8 rounded-lg shadow-lg">
      {/* Logo Preview */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8 text-center border-2 border-dashed border-green-300">
        <p className="text-sm text-gray-600 mb-4 font-medium">Logo Position Preview:</p>
        <div className="inline-block relative w-64 h-48 bg-gray-100 rounded border-2 border-gray-300 flex items-center justify-center">
          <FortisLogo size="sm" />
        </div>
      </div>

      {/* Logo Position */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-4">
          Logo Position on Media
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {['top-left', 'top-right', 'bottom-left', 'bottom-right', 'center', 'hidden'].map(pos => (
            <label key={pos} className="flex items-center cursor-pointer p-3 border rounded hover:bg-gray-50">
              <input
                type="radio"
                name="logo_position"
                value={pos}
                checked={formData.logo_position === pos}
                onChange={handleChange}
                className="mr-2 w-4 h-4 text-green-600"
              />
              <span className="text-sm capitalize font-medium">{pos.replace('-', ' ')}</span>
            </label>
          ))}
        </div>
      </div>

      <hr className="my-6" />

      {/* Title */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          Project Title *
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          placeholder="e.g., Water Infrastructure Project"
        />
      </div>

      {/* Description */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Short Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Brief summary of the project"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Long Description
          </label>
          <textarea
            name="long_description"
            value={formData.long_description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Detailed project information"
          />
        </div>
      </div>

      {/* Category and Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Select category</option>
            <option value="infrastructure">Infrastructure</option>
            <option value="energy">Energy</option>
            <option value="water">Water</option>
            <option value="agriculture">Agriculture</option>
            <option value="environment">Environment</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="e.g., Banjul, Gambia"
          />
        </div>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Start Date
          </label>
          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            End Date
          </label>
          <input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Status and Budget */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="planning">Planning</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Budget (USD)
          </label>
          <input
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="0.00"
            step="0.01"
          />
        </div>
      </div>

      {/* Featured */}
      <div className="flex items-center p-4 bg-gray-50 rounded-lg">
        <input
          type="checkbox"
          name="featured"
          checked={formData.featured}
          onChange={handleChange}
          className="w-5 h-5 text-green-600 focus:ring-green-500 border-gray-300 rounded cursor-pointer"
        />
        <label className="ml-3 block text-sm font-medium text-gray-700 cursor-pointer">
          Feature on homepage
        </label>
      </div>

      {/* Media Upload */}
      {projectId && projectId !== 'new' && (
        <div className="border-t pt-8">
          <h3 className="text-lg font-bold flex items-center gap-2 mb-6">
            <FiImageIcon className="text-green-600" />
            Project Media (with Logo Overlay)
          </h3>
          <MediaUpload projectId={projectId} onUploadComplete={fetchMedia} />

          {/* Uploaded Media */}
          {media.length > 0 && (
            <div className="mt-8">
              <h4 className="font-bold text-gray-900 mb-4">Uploaded Media</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {media.map(m => (
                  <div key={m.id} className="relative group">
                    {m.media_type === 'image' ? (
                      <img src={m.file_url} alt={m.file_name} className="w-full h-32 object-cover rounded border" />
                    ) : (
                      <div className="w-full h-32 bg-gray-900 rounded border flex items-center justify-center">
                        <FiImageIcon className="text-white" size={24} />
                      </div>
                    )}
                    <p className="text-xs mt-1 truncate text-gray-600">{m.file_name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Submit */}
      <div className="flex gap-4 pt-6 border-t">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50 font-bold"
        >
          <FiSave size={20} />
          {saving ? 'Saving...' : 'Save Project'}
        </button>
      </div>
    </form>
  );
}