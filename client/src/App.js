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

  //function for save/post data
  const handleSubmit = async(e) => {
    e.preventDefault() //stop refreshing page when clicking submit btn
    //posting to db through axios
    const data = await axios.post("/create",formData)
    console.log(data)
    //auto close the form after saving data
    if(data.data.success){
      setAddSection(false)
      alert(data.data.message)
      getFetchData() // auto render with new added data
    }
  }

  //function for retriewing saved data
  const getFetchData = async()=>{
    const data = await axios.get("/")
    console.log(data) //to check data retriewing from db to inspect console
    if(data.data.success){
      setDataList(data.data.data)
      // alert(data.data.message)
    }
  }

  useEffect(()=>{
    getFetchData()
  },[])

  // console.log(dataList) //to list retriewing data in inspect console

  //function for delete
  const handleDelete = async(id)=>{
    const data = await axios.delete("/delete/"+id)
    alert(data.data.message)
    if(data.data.success){
      getFetchData()
    }
  }

  return (
    <>
      <div className="container">
        <button className="btn btn-add" onClick={() => setAddSection(true)}>ADD</button>

        {/* add data section */}
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

        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th> </th>
              </tr>
            </thead>

            <tbody>
              { dataList[0] ? (
                dataList.map((el)=>{
                  return(
                    <tr>
                      <td>{el.name}</td>
                      <td>{el.email}</td>
                      <td>{el.mobile}</td>
                      <td>
                        <button className="btn btn-edit">Edit</button>
                        <button className="btn btn-delete" onClick={()=>handleDelete(el._id)}>Delete</button>
                      </td>
                    </tr>
                  )
                }))
                : (
                  <p style={{textAlign:"center"}}>No Data</p>
                )
              }
            </tbody>
          </table>
        </div>

      </div>
    </>
  );
}

export default App;
