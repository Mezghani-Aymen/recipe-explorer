export default function SignIn() {
  return (
    <div className="flex items-center justify-center min-h-screen  ">
      <div className=" p-8 rounded-lg w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center mb-6 text-primary">Sign In</h1>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium ">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md  bg-transparent"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium ">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md  bg-transparent "
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 text-secondry border border-secondry font-semibold rounded-md hover:bg-secondry hover:text-customText focus:outline-none focus:ring-2   focus:ring-opacity-50"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
