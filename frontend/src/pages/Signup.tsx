import { useState } from 'react';

const Signup = () => {
  const [name, setName] = useState('');
  const [firstPassword, setFirstPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let password = '';

    if (firstPassword !== secondPassword || !name || !email) {
      return;
    }

    password = firstPassword;
    const account = { name, email, password };

    const response = await fetch(`http://localhost:4001/api/auth/register`, {
      method: 'POST',
      body: JSON.stringify(account),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const data = await response.json();

    if (data.user) {
      location.assign('/home');
    }

    if (response.ok) {
      setError(null);
      setEmail('');
      setName('');
      setFirstPassword('');
      setSecondPassword('');
    }
  };

  return (
    <div className="bg-backgroundWhite flex flex-col items-center justify-center min-h-screen p-4">
      <header></header>
      <main className="bg-navbarGray p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
          Create Your Account
        </h2>
        <form className="signup-form space-y-6" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name" className="block text-l text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              placeholder="Enter your full name"
              className="input-focus block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
          </div>
          <div className="input-group">
            <label htmlFor="email" className="block text-l text-gray-700 mb-1">
              Email Address <div className="email error"></div>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              placeholder="name@example.com"
              className="input-focus block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
          </div>
          <div className="input-group">
            <label
              htmlFor="password"
              className="block text-l text-gray-700 mb-1">
              Password <div className="password error"></div>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setFirstPassword(e.target.value)}
              value={firstPassword}
              required
              placeholder="Must be at least 6 characters"
              className="input-focus block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
          </div>
          <div className="input-group">
            <label
              htmlFor="confirm-password"
              className="block text-l text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              onChange={(e) => setSecondPassword(e.target.value)}
              value={secondPassword}
              required
              placeholder="Re-enter your password"
              className={`input-focus block w-full px-4 py-2 border transition duration-150 rounded-lg
                ${
                  secondPassword.length > 0 && firstPassword !== secondPassword
                    ? 'border-red-500 bg-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300  focus:ring-blue-500 focus:border-blue-500'
                } 
                `}
            />
          </div>
          <button
            type="submit"
            disabled={firstPassword !== secondPassword}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150">
            Sign Up
          </button>
          <p
            id="message"
            className="margin-top: 15px; color: red; text-align: center;"></p>
          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a
              href="/Login"
              className="font-medium text-blue-600 hover:text-blue-500">
              Log In
            </a>
          </p>
        </form>
      </main>
      <footer></footer>
    </div>
  );
};

export default Signup;
