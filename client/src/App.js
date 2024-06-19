import { useEffect, useState } from "react";
import "./App.css";
// import { FaWindowClose } from "react-icons/fa";
import axios from 'axios';
import FormTable from "./components/FormTable";


axios.defaults.baseURL = "http://localhost:4000/"

function App() {

  const [addSection, setAddSection] = useState(false); //for adding data

  const [editSection, setEditSection] = useState(false); //for editing data

  //for storing inputs temporary
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  })
  //for storing editing data temporary
  const [formDataEdit, setFormDataEdit] = useState({
    name: "",
    email: "",
    mobile: "",
    _id: ""
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
      //to set form empty after saving
      setFormData({
        name:"",
        email:"",
        mobile:""
      })
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

  //function for delete data
  const handleDelete = async(id)=>{
    const data = await axios.delete("/delete/"+id)
    
    if(data.data.success){
      getFetchData()
      alert(data.data.message)
    }
  }

  //function for edit data
  const handleUpdate = async(e)=>{
    e.preventDefault()
    const data = await axios.put("/update",formDataEdit)
    console.log(data.message)

    if(data.data.success){
      getFetchData()
      alert(data.data.message)
      setEditSection(false)
    }
  }

  const handleEditOnChange = async(e)=>{
    const {value, name} = e.target
    setFormDataEdit((previ)=>{
      return{
        ...previ,
        [name] : value
      }
    })
  }

  const handleEdit = (el)=>{
    setFormDataEdit(el)
    setEditSection(true)
  }

  return (
    <>
      <div className="container">
        <button className="btn btn-add" onClick={() => setAddSection(true)}>ADD</button>

        {/* add data section */}
        {addSection && (
          <FormTable
          handleSubmit={handleSubmit} 
          handleOnChange={handleOnChange}
          handleClose={()=>setAddSection(false)}
          rest={formData}
          />
        )}
        {editSection && (
          <FormTable
          handleSubmit={handleUpdate} 
          handleOnChange={handleEditOnChange}
          handleClose={()=>setEditSection(false)}
          rest={formDataEdit}
          />
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
                        <button className="btn btn-edit" onClick={()=>handleEdit(el)}>Edit</button>
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
