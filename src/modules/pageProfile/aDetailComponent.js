const ADetail = ({name, value, colBreakpoint="col-12 col-md"}) => (
    <div className={colBreakpoint}>
        <b>{name}:</b> <span className="font-sans-serif d-block d-md-inline-block">{value || "Not Given"}</span>
    </div>
)

export default ADetail;