import { useEffect, useState } from "react";
import "./App.css";
import { FaWindowClose } from "react-icons/fa";
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:4000/"

function App() {

  const [addSection, setAddSection] = useState(false);
  //for storing inputs temporary
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  })
  //retriew data
  const[dataList,setDataList] = useState([])

  //
  const handleOnChange = (e) =>{
    const {value, name} = e.target
    setFormData((previ)=>{
      return{
      ...previ,
      [name] : value
    }})
  }

  //stop refreshing page when clicking submit btn
  const handleSubmit = async(e) => {
    e.preventDefault()
    //posting to db through axios
    const data = await axios.post("/create",formData)
    console.log(data)
    //auto close the form after saving data
    if(data.data.success){
      setAddSection(false)
      alert(data.data.message)
    }
  }

  //retriewing saved data
  const getFetchData = async()=>{
    const data = await axios.get("/")
    if(data.data.success){
      setDataList(data.data)
      alert(data.data.message)
    }
  }

  useEffect(()=>{
    getFetchData()
  },[])

  return (
    <>
      <div className="container">
        <button className="btn btn-add" onClick={() => setAddSection(true)}>ADD</button>

        {addSection && (
          <div className="addContainer">
            <form onSubmit={handleSubmit}>
              <div className="closeBtn" onClick={() => setAddSection(false)}>
                <FaWindowClose />
              </div>
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" onChange={handleOnChange}/>

              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" onChange={handleOnChange}/>

              <label htmlFor="mobile">Mobile:</label>
              <input type="number" id="mobile" name="mobile" onChange={handleOnChange}/>

              <button className="btn">SUBMIT</button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
