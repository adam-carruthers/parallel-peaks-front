import './notAllowedPage.css';

const NotAllowedPage = ({children}) => (
    <section className="pp-first-section bg-not-allowed">
        <div className="box-not-allowed">
            {children}
        </div>
    </section>
)

export default NotAllowedPage;