import React from "react";

const Training = (props) => {
  return (
    <div id="training">
      <div className="container">
        <div className="section-title text-center">
          <h2>Training Videos</h2>
        </div>
        <div className="row">
          {props.data
            ? props.data.map((video, i) => (
                <div key={`video-${i}`} className="col-md-4 col-sm-6 mb-4">
                  <div className="card h-100 shadow-sm border-0">
                    <div className="ratio ratio-16x9">
                      <iframe
                        src={video.url}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{video.title}</h5>
                      {video.description && (
                        <p className="card-text">{video.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            : "Loading..."}
        </div>
      </div>
    </div>
  );
};

export default Training;