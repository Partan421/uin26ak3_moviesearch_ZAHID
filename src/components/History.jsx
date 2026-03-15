import '../styles/Inputfelt.scss'

export default function History({history, setSearch}){
    
    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    if (!history || history.length === 0){
        return null
    }

    return(
        <label className='input'>
            Tidligere søk:
            <select onChange={handleChange}>
                <option value="">Velg et tidligere søk</option>
                {history?.map((item, i) => <option key={i} value={item}>{item}</option>)}
            </select>
        </label>
    )
}