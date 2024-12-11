import React, { useState } from "react";

const LoginPage = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8081/users/login", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      props.setPage("UserHome");
      setError("");
    } else if (response.status === 404) {
      setError("Login failed, Please try again");
    } else {
      setError("An error occurred. Please try again.");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen 
      bg-gradient-to-br from-blue-50 to-indigo-100 
      px-4 py-6">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-2xl 
          border border-gray-200 
          w-full max-w-md 
          transform transition-all duration-300 
          hover:scale-[1.01] hover:shadow-3xl"
      >
        <h2 className="text-3xl font-bold mb-6 text-center 
          text-gray-800 tracking-tight">
          Login
        </h2>
        
        {error && (
          <div className="bg-red-50 border border-red-200 
            text-red-600 px-4 py-3 rounded-lg 
            text-center mb-4 
            animate-pulse">
            {error}
          </div>
        )}
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium 
              text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-3 
                border border-gray-300 rounded-xl 
                focus:outline-none focus:ring-2 
                focus:ring-blue-500 focus:border-transparent 
                transition duration-300 
                placeholder-gray-400"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium 
              text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="w-full px-4 py-3 
                border border-gray-300 rounded-xl 
                focus:outline-none focus:ring-2 
                focus:ring-blue-500 focus:border-transparent 
                transition duration-300 
                placeholder-gray-400"
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full mt-6 bg-blue-600 text-white 
            py-3 px-4 rounded-xl 
            hover:bg-blue-700 active:bg-blue-800 
            transition duration-300 
            transform active:scale-95 
            font-semibold 
            shadow-md hover:shadow-lg"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
//   return (
//     <div style={styles.container}>
//       <form onSubmit={handleLogin} style={styles.form}>
//         <h2>Login</h2>
//         {error && <p style={styles.error}>{error}</p>}
//         <div style={styles.field}>
//           <label>Email</label>
//           <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//         </div>
//         <div style={styles.field}>
//           <label>Password</label>
//           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//         </div>
//         <button type="submit" style={styles.button}>
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     height: "100vh",
//     backgroundColor: "#f5f5f5",
//   },
//   form: {
//     backgroundColor: "#fff",
//     padding: "20px",
//     borderRadius: "8px",
//     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//     maxWidth: "400px",
//     width: "100%",
//   },
//   field: {
//     marginBottom: "15px",
//   },
//   error: {
//     color: "red",
//     marginBottom: "10px",
//   },
//   button: {
//     width: "100%",
//     padding: "10px",
//     backgroundColor: "#007BFF",
//     color: "#fff",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//   },
// };

// export default LoginPage;
