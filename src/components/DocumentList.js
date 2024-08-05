// src/components/DocumentList.js
import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const DocumentList = ({ documents, onSelect }) => {
  return (
    <List>
      {documents.map((doc, index) => (
        <ListItem button key={index} onClick={() => onSelect(doc)}>
          <ListItemText primary={doc.name} />
        </ListItem>
      ))}
    </List>
  );
};

export default DocumentList;
