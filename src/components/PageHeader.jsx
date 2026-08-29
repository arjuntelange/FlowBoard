import "./PageHeader.css";

function PageHeader({ title, subtitle, searchQuery, setSearchQuery }) {
  return (
    <header className="page-header">
      <div className="page-info">
        <h2>
          <span className="title-accent"></span>
          {title}
        </h2>
        <p>{subtitle}</p>
      </div>

      <div className="page-search">
        <input
          type="text"
          placeholder="Search tasks... 🔍"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </header>
  );
}

export default PageHeader;
