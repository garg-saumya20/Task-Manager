import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Table from "react-bootstrap/Table";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SecurityUpdateGoodIcon from "@mui/icons-material/SecurityUpdateGood";

toast.configure();

const getLocalItems = () => {
  let task_list = localStorage.getItem("ToDoList");
  if (task_list) {
    return JSON.parse(localStorage.getItem("ToDoList"));
  } else {
    return [];
  }
};

function Todo() {
  const [list, setlist] = useState(getLocalItems());
  const [togglebtn, setToggleBtn] = useState(true);
  const [inpData, setInpData] = useState("");
  const [e_id, setid] = useState(null);
  const [addtoggle, setaddtoggle] = useState("Add");

  useEffect(() => {
    localStorage.setItem("ToDoList", JSON.stringify(list));
  }, [list]);

  const notify = (fla) => {
    if (fla == 1) {
      toast.info("Task Added Successfully....", {
        position: toast.POSITION.BOTTOM_LEFT
      });
    } else if (fla == 0) {
      toast.error("Please Write Something....", {
        position: toast.POSITION.BOTTOM_LEFT
      });
    } else if (fla == 2) {
      toast("Task Deleted Successfully....", {
        position: toast.POSITION.BOTTOM_LEFT
      });
    } else if (fla == 3 && list[0] == undefined) {
      //
    } else if (fla == 3 && list[0] != undefined) {
      toast("ToDo List Cleared Successfully....", {
        position: toast.POSITION.BOTTOM_LEFT
      });
    } else {
      toast("Task Updated Successfully....", {
        position: toast.POSITION.BOTTOM_LEFT
      });
    }
  };

  const add = () => {
    if (!inpData) {
      notify(0);
    } else if (inpData && !togglebtn) {
      //Update
      setlist(
        list.map((ele) => {
          if (ele.id == e_id) {
            return { ...ele, data: inpData };
          }
          return ele;
        })
      );
      setInpData("");
      notify(4);
      setToggleBtn(true);
    } else {
      //Add
      const id = new Date().getTime().toString();
      setlist([...list, { data: inpData, id: id }]);

      notify(1);
      setInpData("");
    }
  };

  //}

  const delet = (id) => {
    const newList = list.filter((elem) => elem.id !== id);
    setlist(newList);
    notify(2);
    if (!togglebtn) {
      setToggleBtn(true);
      setInpData("");
    }
  };

  const edit = (data, id) => {
    setInpData(data);
    setToggleBtn(false);
    setid(id);
  };

  const RemoveAll = () => {
    setlist([]);
    notify(3);
  };

  const renderlist = (list, index) => {
    {
      return (
        <tr key={index}>
          <td className="clrt">{index + 1}</td>
          <td className="clrt">{list.data}</td>
          <td className="icon-clr">
            <button className="" onClick={() => edit(list.data, list.id)}>
              <EditIcon />
            </button>
          </td>
          <td className="icon-clr">
            <button className="icon-clr" onClick={() => delet(list.id)}>
              <DeleteIcon />
            </button>
          </td>
        </tr>
      );
    }
  };

  return (
    <div className="container">
      <div className="container-1">
        <input
          className="inp-tag"
          type="text"
          placeholder="Add your ToDo here!✍"
          value={inpData}
          onChange={(event) => {
            setInpData(event.target.value);
          }}
        />
        {togglebtn ? (
          <button className="plus-btn" onClick={add}>
            <AddBoxIcon />
          </button>
        ) : (
          <button className="plus-btn" onClick={add}>
            <SecurityUpdateGoodIcon />
          </button>
        )}

        <div className="container-2">
          <button className=" clear-all-btn" onClick={RemoveAll}>
            CLEAR LIST
          </button>
        </div>
      </div>

      <div className="container-3">
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th className="clr-t">S.No</th>
              <th className="clr-t">Your-Task</th>
              <th className="clr-t">Edit</th>
              <th className="clr-t">Delete</th>
            </tr>
          </thead>
          <tbody>{list.map(renderlist)}</tbody>
        </Table>
      </div>

      <div className="footer">
        <p className="footer-txt">
          {" "}
          Designed and developed by Mr.Saumya Garg- All Rights Reserved ©2021{" "}
        </p>
      </div>
    </div>
  );
}

export default Todo;
