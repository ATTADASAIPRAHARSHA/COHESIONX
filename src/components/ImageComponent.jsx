const ImageComponent = ({ Image }) => {
    return (
      <div
      className="absolute top-0 left-0 bottom-0 right-0 transistion-all"
        style={{
          backgroundImage: `url(./${Image}.png)`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '100%', // Example width
          height: 'auto', // Example height
        }}
      >
        {/* Your content here */}
      </div>
    );
  };
  
  export default ImageComponent;
  