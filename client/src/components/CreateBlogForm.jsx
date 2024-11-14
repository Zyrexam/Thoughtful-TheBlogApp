import { useState } from 'react';

function CreateBlogForm() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    username: '',
    email: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // State for handling loading state

  // Handle changes for each form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate email format
  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, content, username, email } = formData;

    // Check if all fields are filled
    if (!title || !content || !username || !email) {
      setMessage("Please fill in all fields before submitting.");
      return;
    }

    // Validate email
    if (!isValidEmail(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    setLoading(true); // Start loading

    try {
      const response = await fetch('/api/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      setMessage(result.message); // Show success or error message based on response

      if (result.success) {
        // Reset form if needed
        setFormData({
          title: '',
          content: '',
          username: '',
          email: ''
        });
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Create a New Blog Post</h2>

      {message && <p className="text-red-500 mb-4">{message}</p>}

      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700">Blog Title:</label>
        <input
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter your Blog title here.."
          className="w-full p-2 border rounded mt-1"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="content" className="block text-gray-700">Blog Content:</label>
        <textarea
          name="content"
          id="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Write your Blog content here.."
          className="w-full p-2 border rounded mt-1"
          rows="4"
        ></textarea>
      </div>

      <div className="mb-4">
        <label htmlFor="username" className="block text-gray-700">Username:</label>
        <input
          type="text"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter your Username"
          className="w-full p-2 border rounded mt-1"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700">Email-Id:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your Email-id"
          className="w-full p-2 border rounded mt-1"
        />
      </div>

      <div className="text-center">
        <button
          type="submit"
          className={`bg-blue-500 text-white px-4 py-2 rounded ${loading ? 'bg-gray-400 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

export default CreateBlogForm;
