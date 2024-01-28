const User = () => {
  return (
    <>
      <div className="min-h-full bg-gray-100 p-8">
        <header className="flex items-center gap-3 mb-10">
          <div
            className="h-6 w-6 bg-black rounded-full"
            aria-hidden="true"
          ></div>
          <h1 className="text-3xl font-bold">Account</h1>
        </header>
        <main className="bg-white shadow-md rounded-lg overflow-hidden">
          <section aria-labelledby="account-header" className="border-b p-6">
            <h2 id="account-header" className="text-2xl font-semibold mb-2">
              Account
            </h2>
            <p className="text-gray-600">Manage your account settings</p>
          </section>

          <section aria-labelledby="profile-header" className="border-b p-6">
            <h3 id="profile-header" className="text-lg font-semibold mb-4">
              Profile
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-4 flex items-center justify-center h-12 w-12 rounded-full bg-gray-300">
                  <span className="text-lg font-medium leading-none text-white">
                    AL
                  </span>
                </div>
                <div>
                  <p className="font-medium">Amanda Lee</p>
                </div>
              </div>
              <div>
                <span aria-hidden="true" className="text-gray-600">
                  &gt;
                </span>
              </div>
            </div>
          </section>

          <section aria-labelledby="username-header" className="border-b p-6">
            <h3 id="username-header" className="text-lg font-semibold mb-4">
              Username
            </h3>
            <div className="flex justify-between items-center">
              <p>amanda.lee</p>
              <span aria-hidden="true" className="text-gray-600">
                &gt;
              </span>
            </div>
          </section>

          <section aria-labelledby="email-header" className="p-6">
            <h3 id="email-header" className="text-lg font-semibold mb-4">
              Email addresses
            </h3>
            <div className="flex justify-between items-center mb-4">
              <p>amanda.lee@example.com</p>
              <span className="bg-blue-500 text-white py-1 px-3 text-xs rounded-full">
                Primary
              </span>
              <span aria-hidden="true" className="text-gray-600">
                &gt;
              </span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <p>alee@work.com</p>
              <span aria-hidden="true" className="text-gray-600">
                &gt;
              </span>
            </div>
            <button className="text-blue-600 hover:underline flex items-center">
              <span className="h-6 w-6 mr-1 flex items-center justify-center bg-blue-600 text-white rounded-full">
                +
              </span>
              Add email address
            </button>
          </section>
        </main>
      </div>

      <div className="flex justify-center items-start p-5 bg-gray-100 h-full">
        <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="md:flex">
            <div className="w-full p-4">
              <h1 className="text-3xl font-semibold text-gray-800">Account</h1>
              <p className="text-gray-600">Manage your account settings</p>

              <div className="mt-6 border-t-2 border-gray-200">
                <div className="mt-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Profile
                  </h2>
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center">
                      <div className="rounded-full h-12 w-12 overflow-hidden mr-4">
                        <div className="h-full w-full bg-gray-300 animate-pulse"></div>
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="text-lg text-gray-800">
                          Amanda Lee
                        </span>
                      </div>
                    </div>
                    <span className="text-gray-600 hover:text-gray-800 cursor-pointer">
                      &gt;
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Username
                  </h2>
                  <div className="p-4 flex justify-between items-center">
                    <span className="text-gray-800">amanda.lee</span>
                    <span className="text-gray-600 hover:text-gray-800 cursor-pointer">
                      &gt;
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Email addresses
                  </h2>
                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <span className="text-gray-800 break-all">
                        amanda.lee@example.com
                      </span>
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                        Primary
                      </span>
                    </div>
                    <span className="text-gray-600 hover:text-gray-800 cursor-pointer">
                      &gt;
                    </span>
                  </div>
                  <div className="p-4 flex justify-between items-center">
                    <span className="text-gray-800 break-all">
                      alee@work.com
                    </span>
                    <span className="text-gray-600 hover:text-gray-800 cursor-pointer">
                      &gt;
                    </span>
                  </div>
                  <div className="p-4 flex items-center text-blue-600 hover:text-blue-800 cursor-pointer">
                    <span className="mr-2">+</span>
                    <span>Add email address</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default User;
