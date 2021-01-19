import React from 'react';
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/src/styles/index.scss";

function Taginput() {
    const [tags, setTags] = React.useState(["Tag"])
    return (
      <ReactTagInput 
        tags={tags} 
        onChange={(newTags) => setTags(newTags)}
      />
    )
  }

  export default Taginput;