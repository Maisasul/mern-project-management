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
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded p-2 mt-1"
          placeholder="Enter project name"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded p-2 mt-1"
        />
      </div>
      
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Saving..." : buttonText}
      </button>
    </form>
  )
}

export default ProjectForm