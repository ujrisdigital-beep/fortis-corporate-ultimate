import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { supabase } from '@/lib/supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import { FiUpload, FiX, FiPlay } from 'react-icons/fi';

export default function MediaUpload({ projectId, onUploadComplete }) {
  const [uploads, setUploads] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => {
      uploadFile(file);
    });
  }, [projectId]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
      'video/*': ['.mp4', '.webm', '.mov', '.avi'],
    },
    maxSize: 500 * 1024 * 1024, // 500MB
  });

  const uploadFile = async (file) => {
    setUploading(true);
    const fileId = uuidv4();
    const fileExt = file.name.split('.').pop();
    const fileName = `${projectId}/${fileId}.${fileExt}`;

    try {
      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('project-media')
        .upload(fileName, file);

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('project-media')
        .getPublicUrl(fileName);

      // Save metadata to database
      const mediaType = file.type.startsWith('video') ? 'video' : 'image';
      
      const { error: dbError } = await supabase
        .from('project_media')
        .insert([{
          project_id: projectId,
          media_type: mediaType,
          file_url: publicUrl,
          file_name: file.name,
          file_size: file.size,
          mime_type: file.type,
          display_order: uploads.length,
          show_logo_overlay: true,
        }]);

      if (dbError) throw dbError;

      setUploads(prev => [...prev, {
        id: fileId,
        name: file.name,
        url: publicUrl,
        type: mediaType,
        size: file.size,
      }]);

      setProgress(0);
      onUploadComplete?.();
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const removeFile = async (fileId, fileName) => {
    try {
      await supabase.storage
        .from('project-media')
        .remove([`${projectId}/${fileId}`]);

      setUploads(prev => prev.filter(f => f.id !== fileId));
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition ${
          isDragActive ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-500'
        }`}
      >
        <input {...getInputProps()} />
        <FiUpload className="mx-auto mb-4 text-gray-400" size={40} />
        <p className="text-gray-700 font-medium">
          {isDragActive
            ? 'Drop files here...'
            : 'Drag & drop media here, or click to select'}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Supported: Images (JPG, PNG, GIF, WebP), Videos (MP4, WebM, MOV, AVI)
        </p>
        <p className="text-xs text-gray-400 mt-1">Max size: 500MB per file</p>
      </div>

      {uploads.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {uploads.map(file => (
            <div key={file.id} className="relative group">
              {file.type === 'image' ? (
                <img src={file.url} alt={file.name} className="w-full h-40 object-cover rounded border border-gray-200" />
              ) : (
                <div className="w-full h-40 bg-gray-900 rounded border border-gray-200 flex items-center justify-center">
                  <FiPlay className="text-white" size={40} />
                </div>
              )}
              <button
                onClick={() => removeFile(file.id, file.name)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition"
              >
                <FiX size={16} />
              </button>
              <p className="text-xs mt-1 truncate text-gray-600">{file.name}</p>
            </div>
          ))}
        </div>
      )}

      {uploading && (
        <div className="flex items-center gap-3">
          <div className="animate-spin h-5 w-5 border-2 border-green-500 border-t-transparent rounded-full"></div>
          <p className="text-sm text-gray-600">Uploading... {progress}%</p>
        </div>
      )}
    </div>
  );
}