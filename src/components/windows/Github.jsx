import MacWindow from './MacWindow'
import GithubData from '../../assets/github.json'
import './github.scss'



const GitCard = ({data = {id:1,image:'',title:'',description:'',tags:[],repolink:'',demoLink:''}})=>{

    return <div className="card">
        <img src={data.image} alt="" />
        <h1>{data.title}</h1>
        <p className='description'>{data.description}</p>
        <div className="tags">
            {
                data.tags.map(tag =><p className='tag'>{tag}</p>)
            }
        </div>

        <div className="urls">
            <a href={data.repolink}>Repository</a>
            {data.demoLink && <a href=  {data.demoLink}>Demo link</a>}
        </div>




    </div>

}

const Github = ({ windowName, focusedWindow, setFocusedWindow, minimized, setMinimizedState, windowsState, setWindowsState, geometry, onGeometryChange, closing, onClose }) => {
  return (
    <MacWindow title="Projects" windowName={windowName} focusedWindow={focusedWindow} setFocusedWindow={setFocusedWindow} minimized={minimized} setMinimizedState={setMinimizedState} windowsState={windowsState} setWindowsState={setWindowsState} geometry={geometry} onGeometryChange={onGeometryChange} closing={closing} onClose={onClose}>

        <div className="cards">
            {GithubData.map(project =>{

                return  <GitCard  data={project}/>

            })}
        </div>
      
    </MacWindow>
  )
}

export default Github
