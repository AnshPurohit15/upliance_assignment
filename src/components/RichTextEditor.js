import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { EditorState, ContentState, convertFromRaw, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const RichTextEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [isDirty, setIsDirty] = useState(false);

  // Function to load user data from localStorage
  const loadUserData = () => {
    const savedEditorContent = localStorage.getItem("editorContent");
    if (savedEditorContent) {
      const contentState = convertFromRaw(JSON.parse(savedEditorContent));
      setEditorState(EditorState.createWithContent(contentState));
    } else {
      const savedUserData = localStorage.getItem("userData");
      if (savedUserData) {
        const userData = JSON.parse(savedUserData);
        const content = ContentState.createFromText(
          `Name: ${userData.name}\nAddress: ${userData.address}\nEmail: ${userData.email}\nPhone: ${userData.phone}`
        );
        setEditorState(EditorState.createWithContent(content));
      }
    }
  };

  // Load data initially
  useEffect(() => {
    loadUserData();
  }, []);

  // Detect changes in localStorage (when user form updates)
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "userData") {
        loadUserData();
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Warn user if they try to leave with unsaved changes
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

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
    setIsDirty(true);
  };

  const handleSave = () => {
    const contentState = editorState.getCurrentContent();
    localStorage.setItem("editorContent", JSON.stringify(convertToRaw(contentState)));
    setIsDirty(false);
    alert("Editor content saved!");
  };

  return (
    <Box>
      <Typography variant="h5">Rich Text Editor</Typography>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="editor-wrapper"
        editorClassName="editor"
        toolbar={{
          options: ["inline", "list", "textAlign", "history"],
          inline: { options: ["bold", "italic", "underline"] },
          list: { options: ["unordered", "ordered"] },
          textAlign: { options: ["left", "center", "right"] },
        }}
      />
      <Button variant="contained" sx={{ mt: 2 }} onClick={handleSave}>
        Save Content
      </Button>
    </Box>
  );
};

export default RichTextEditor;
