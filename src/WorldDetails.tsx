import { useParams } from "react-router-dom";

async function WorldDetails() {
  const { id, worldName, story, genre, subgenre, ipTerms, tags } = useParams();
//   fetch the data from the api
  if (!id) {
        // return <div>Loading...</div>; 
        const response = await fetch(`https://api.storyprotocol.net/api/v1/assets/${id}`);
        const data = await response.json();
        console.log(data);
  }


  return (
    <div className="world-details">
      <h1>{worldName}</h1>
      <div className="world-info">
        <h2>World Details</h2>
        <p><strong>Genre:</strong> {genre}</p>
        <p><strong>Subgenre:</strong> {subgenre}</p>
        <p><strong>IP Terms:</strong> {ipTerms}</p>
        <div className="tags">
          <strong>Tags:</strong>
          {tags?.split(',').map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
      </div>
      <div className="world-story">
        <h2>Original Story</h2>
        <p>{story}</p>
      </div>
      <div className="fanfiction">
        <h2>Fanfiction</h2>
        {/* This section will be populated with fanfiction data */}
        <p>No fanfiction available for this world yet.</p>
      </div>
    </div>
  );
}

export default WorldDetails;
