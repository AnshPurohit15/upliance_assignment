import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

const UserForm = () => {
  const [formData, setFormData] = useState({
    id: Date.now(),
    name: "",
    address: "",
    email: "",
    phone: ""
  });

  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isDirty) {
        event.preventDefault();
        event.returnValue = "You have unsaved changes!";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  const handleChange = (e) => {
    setIsDirty(true);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userData", JSON.stringify(formData));
    setIsDirty(false);
    alert("Data saved!");
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h5">User Form</Typography>
      <TextField fullWidth name="name" label="Name" onChange={handleChange} sx={{ my: 1 }} />
      <TextField fullWidth name="address" label="Address" onChange={handleChange} sx={{ my: 1 }} />
      <TextField fullWidth name="email" label="Email" onChange={handleChange} sx={{ my: 1 }} />
      <TextField fullWidth name="phone" label="Phone" onChange={handleChange} sx={{ my: 1 }} />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>Save</Button>
    </Box>
  );
};

export default UserForm;
