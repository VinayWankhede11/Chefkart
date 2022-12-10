import React, { useState } from "react";
import '../App.css'

function Datatable() {
  const [file,setFile]=useState();
  const [array,setArray]=useState([]);
  const [toggle,setToggle]=useState(0);

  const fileReader = new FileReader();

  const [open, setOpen] = useState('');

  const handleOpen = (str) => {
    setOpen(str);
  };

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const csvFileToArray = string => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

     const array = csvRows.map(i => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    setArray(array);
    console.log(array)
  };
  const sort =(type)=>{
    const arrays = [...array]
    arrays.sort((a,b)=>{  
      const tempa= a[open]
        const tempb=b[open]
        if(tempa>tempb){
          if (type==='ASC'){
            return 1;
          }
          else{
            return -1;
          }
        }
        else{
          if (type==='ASC'){
            return -1;
          }
          else{
            return 1;
          }
        }
      })
      setArray(arrays);
    }

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }
  };
  var x;
  
  const handleX0=()=>{
      x=0;
  }

  const headerKeys = Object.keys(Object.assign({}, ...array));

  return (
    <div style={{ textAlign: "center" }}>
      <h1>ChefKart Assignment </h1>
      <form>
        <input
          type={"file"}
          id={"csvFileInput"}
          accept={".csv"}
          onChange={handleOnChange}
        />

        <button
          onClick={(e) => {
            handleOnSubmit(e);
          }}
        >
          Display csv
        </button>
      </form>

      <br />

      <table>
        <thead>
          <tr key={"header"}>
            {headerKeys.map((key) => (
              <th>{key} 
            <div className="dropdown">
      <button onClick={()=>handleOpen(key)}>:</button>
      {open === key ? (
        <ul className="menu">
          <a className="menu-item">
            <button onClick={()=>sort('ASC')} >ASC</button>
          </a>
          <a className="menu-item">
            <button onClick={()=>sort('DSC')}>DSC</button>
          </a>
        </ul>
      ) : null}
    </div>
  </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {array.map((item) => (
            <tr key={item.id}>
              {Object.values(item).map((val) => (
                (val==='true' ? <td style={{color: 'green'}}>{val}</td>: (val ==='false' ? <td style={{color: 'red'}}>{val}</td>:<td>{val}</td>) ) 
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Datatable