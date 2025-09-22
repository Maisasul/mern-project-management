import React, { useState } from 'react'

const ProjectForm = ({ onSave, onClose, initialData }) => {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if(!name){
      setError("Prject name is requierd!");
      return;
    }

    setLoading(true);
    try {
      await onSave({name: name.trim(), description: description.trim() });
      onClose();
    } catch(err) {
      console.error('Error creating project:', err);
      setError("Failed to create project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formTitle = initialData ? 'Edit Project' : 'New Project';
  const buttonText = initialData ? 'Save Changes' : 'Create';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">{formTitle}</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={100}
          className="w-full border rounded p-2 mt-1"
          placeholder="Enter project name"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={500}
          rows="4"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
          placeholder="Enter project description"
        />
      </div>
      
      {error && <p className="text-red-500 text-sm">{error}</p>}
      
      <div className="flex w-full gap-3 mt-4">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 px-4 py-2 text-gray-600 bg-white rounded-md border border-gray-300 
          hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 
          transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md 
          hover:bg-blue-700 disabled:bg-blue-300 
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
          transition-colors duration-200"
        >
          {loading ? 'Saving...' : buttonText}
        </button>
      </div>
    </form>
  )
}

export default ProjectForm