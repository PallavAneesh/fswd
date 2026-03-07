import React, { useState } from "react";

function InteractiveForm() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name === "" || email === "" || password === "") {
      setMessage("❌ All fields are required");
      return;
    }

    if (!email.includes("@")) {
      setMessage("❌ Enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setMessage("❌ Password must be at least 6 characters");
      return;
    }

    setMessage("✅ Form submitted successfully!");
  };

  return (
    <div style={{textAlign:"center", marginTop:"50px"}}>

      <h1>Interactive Form</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <br/><br/>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <br/><br/>

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <br/><br/>

        <button type="submit">Submit</button>

      </form>

      <h3>{message}</h3>

    </div>
  );
}

export default InteractiveForm;
