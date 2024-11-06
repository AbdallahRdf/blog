import React, { useContext } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { ThemeContext } from '../../context/contexts';

const TextEditor = ({ content, handleEditorChange }) => {

  const { isDarkMode } = useContext(ThemeContext);

  return (
    <Editor
      value={content}
      onEditorChange={handleEditorChange}
      apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
      init={{
        skin: isDarkMode ? "oxide-dark" : "oxide",
        content_css: isDarkMode ? "dark" : "default",
          // plugins: [
          //   // Free core editing features:
          //   'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 
          //   'image', 'link', 'lists', 'media', 'searchreplace', 
          //   'table', 'visualblocks', 'wordcount'
          // ],
          // toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
          plugins: [
            // Free core editing features:
            'anchor', 'autolink', 'charmap', 'codesample', 'emoticons',
            'link', 'lists', 'searchreplace',
            'table', 'visualblocks', 'wordcount'
          ],
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
      }}
    />
  );
}

export default TextEditor;