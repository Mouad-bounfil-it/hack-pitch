export default function EntityCover({ entity }) {
  const coverURL = entity?.coverPhoto;

  if (!coverURL && false) {
    return (
      <div className="bg-blue-gray-50 h-52 border-b relative flex items-center justify-center">
        <p className="text-xs text-center text-blue-gray-500 uppercase">
          cover photo
        </p>
      </div>
    );
  }

  if (!coverURL) {
    return (
      <div
        className="bg-blue-gray-50 border-b relative"
        style={{
          height: 300,
        }}
      >
        <img
          className="w-full h-full object-cover"
          src="https://screendy-cdn.fra1.cdn.digitaloceanspaces.com/platfrom-v2/default-entity-cover-1615555080771.png"
          alt="profile cover"
        />
      </div>
    );
  }

  return (
    <div
      className="bg-blue-gray-50 border-b relative"
      style={{
        height: 300,
      }}
    >
      <img
        className="w-full h-full object-cover"
        src={coverURL}
        alt="profile cover"
      />
    </div>
  );
}
