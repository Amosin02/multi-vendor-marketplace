import { useState } from 'react';
export default function Login() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const account = { email, password };

    try {
      const response = await fetch('http://localhost:4001/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(account),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await response.json();

      if (data.user) {
        // location.assign('/home');
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-backgroundWhite flex flex-col items-center justify-center min-h-screen p-4">
      <header></header>
      <main className="bg-navbarGray p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
          Log In
        </h2>
        <form
          id="signupForm"
          className="signup-form space-y-6"
          onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email" className="block text-l text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              className="input-focus block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
          </div>
          <div className="input-group">
            <label
              htmlFor="password"
              className="block text-l text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              className="input-focus block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150">
            Login
          </button>
        </form>
      </main>
      <footer></footer>
    </div>
  );
}
