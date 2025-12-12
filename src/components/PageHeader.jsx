import './PageHeader.css'

export default function PageHeader({pageName, pageImage}){
    return (
        <div className="page-header">
            <h1>{pageName}</h1>
            <img src={pageImage} alt={`${pageImage} Image`} className='page-header-image'/>
        </div>
    )
}
