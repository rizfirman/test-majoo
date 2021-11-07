import { useState, useEffect } from "react";
import {
  AddModal,
  EditModalPending,
  EditModalFinish,
  Table,
} from "./components";
import moment from "moment";
import { useDispatch} from "react-redux";
import { fetchFinishData, fetchPendingData } from "./redux/action";

const App = () => {
  const [finishList, setFinishList] = useState([]);
  const [pendingList, setPendingList] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [getId, setGetId] = useState();
  const [modal, setModal] = useState(false);
  const [editModalPending, setEditModalPending] = useState(false);
  const [editModalFinish, setEditModalFInish] = useState(false);
  const [checked, setChecked] = useState(0);
  const [loading, setLoading] = useState(true);

  const [sort, setSort] = useState(false);

  const dispatch = useDispatch();
  
  const toggle = () => {
    setModal(!modal);
    setTitle("");
    setDescription("");
  };

  const toggleEditPending = () => {
    setEditModalPending(!editModalPending);
  };

  const toggleEditFinish = () => {
    setEditModalFInish(!editModalFinish);
  };

  const onChangeSwitch = () => {
    // if button is switching, data.status = 1
    if (checked === 0) {
      setChecked(1);
    } else {
      setChecked(0);
    }
    console.log(checked);
  };

  const handleEditModeFinishList = (id) => {
    toggleEditFinish();
    setGetId(id);
    const editData = finishList.find((data) => data.id === id);
    setTitle(editData.title);
    setDescription(editData.description);
    setChecked(editData.status);
  };
  const handleEditModePendingList = (id) => {
   

    setGetId(id);
    toggleEditPending();
    const editData = pendingList.find((data) => data.id === id);
    setTitle(editData.title);
    setDescription(editData.description);
    setChecked(editData.status);
  };

  const handleDeletePendingList = (id) => {
    const pendingDataFromLocalStorage = JSON.parse(
      localStorage.getItem("pendingData")
    );
    const newPendingData = pendingDataFromLocalStorage.filter(
      (data) => data.id !== id
    );
    localStorage.setItem("pendingData", JSON.stringify(newPendingData));
    setPendingList(newPendingData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "description") {
      setDescription(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      id: Math.floor(Math.random() * 100),
      title,
      description,
      status: 0,
      createdAt: moment().format("YYYY-MM-DD hh:mm "),
    };
    console.log(typeof data.createdAt);
    const pendingDataFromLocalStorage = JSON.parse(
      localStorage.getItem("pendingData")
    );
    const newPendingData = [...pendingDataFromLocalStorage, data];

  
    const newPendingDataAscending = newPendingData.sort((a, b) => {
      return (
        moment(a.createdAt).format("YYYYMMDD") -
        moment(b.createdAt).format("YYYYMMDD")
      );
    });

    localStorage.setItem(
      "pendingData",
      JSON.stringify(newPendingDataAscending)
    );
    setPendingList(newPendingDataAscending);
    toggle();
  };

  const handleSubmitEditPending = async () => {
  
    if (checked === 1) {
      const pendingDataFromLocalStorage = JSON.parse(
        localStorage.getItem("pendingData")
      );
      const finishDataFromLocalStorage = JSON.parse(
        localStorage.getItem("finishData")
      );
      const newPendingData = pendingDataFromLocalStorage.filter(
        (data) => data.id !== getId
      );
      const newFinishData = [
        ...finishDataFromLocalStorage,
        {
          id: getId,
          title: title,
          description: description,
          status: checked,
          createdAt: moment().format("YYYY-MM-DD hh:mm "),
        },
      ];
      localStorage.setItem("pendingData", JSON.stringify(newPendingData));
      localStorage.setItem("finishData", JSON.stringify(newFinishData));
      setFinishList(newFinishData);
      setPendingList(newPendingData);
      toggleEditPending();
    } else {
      const newPendingData = pendingList.map((data) => {
        if (data.id === getId) {
          return {
            id: getId,
            title: title,
            description: description,
            status: checked,
            createdAt: moment().format("YYYY-MM-DD hh:mm "),
          };
        } else {
          return data;
        }
      });
      localStorage.setItem("pendingData", JSON.stringify(newPendingData));
      setPendingList(newPendingData);
      toggleEditPending();
    }
  };
  const handleSubmitEditFinish = () => {
  
    if (checked === 0) {
      const pendingDataFromLocalStorage = JSON.parse(
        localStorage.getItem("pendingData")
      );
      const finishDataFromLocalStorage = JSON.parse(
        localStorage.getItem("finishData")
      );
      const newFinishData = finishDataFromLocalStorage.filter(
        (data) => data.id !== getId
      );
      const newPendingData = [
        ...pendingDataFromLocalStorage,
        {
          id: getId,
          title: title,
          description: description,
          status: checked,
          createdAt: moment().format("YYYY-MM-DD hh:mm "),
        },
      ];
      localStorage.setItem("finishData", JSON.stringify(newFinishData));
      localStorage.setItem("pendingData", JSON.stringify(newPendingData));
      setFinishList(newFinishData);
      setPendingList(newPendingData);
      toggleEditFinish();
    } else {
      const newFinishData = finishList.map((data) => {
        if (data.id === getId) {
          return {
            id: getId,
            title: title,
            description: description,
            status: checked,
            createdAt: moment().format("YYYY-MM-DD hh:mm "),
          };
        } else {
          return data;
        }
      });
      localStorage.setItem("finishData", JSON.stringify(newFinishData));
      setFinishList(newFinishData);
      toggleEditFinish();
    }
  };

  useEffect(() => {
   setLoading(true);
      dispatch(fetchPendingData());
      dispatch(fetchFinishData());

      setFinishList(
        localStorage.getItem("finishData")
          ? JSON.parse(localStorage.getItem("finishData"))
          : []
      );
      setPendingList(
        localStorage.getItem("pendingData")
          ? JSON.parse(localStorage.getItem("pendingData"))
          : []
      );
      setLoading(false);
  }, [dispatch]);

  return (
    <div className="App container mb-5">
      {loading ? (
        <>
          <h1>loading ...</h1>
        </>
      ) : (
        <>
          <div className="d-flex justify-content-center">
            <header className="App-header mt-5">
              <h1>To-do-List App</h1>
            </header>
          </div>
          <div className="d-flex justify-content-center mt-5">
            <button className="btn btn-dark" onClick={toggle}>
              Add To-Do-List
            </button>
          </div>

          <Table
            name="Finish List"
            response={finishList}
            handleEditMode={handleEditModeFinishList}
            thead={thead}
          />
          <Table
            name="Pending List"
            response={pendingList}
            handleEditMode={handleEditModePendingList}
            thead={thead}
            handleDeleteMode={handleDeletePendingList}
          />
          <AddModal
            isOpen={modal}
            toggle={toggle}
            handleChange={handleChange}
            onClick={handleSubmit}
          />
          <EditModalPending
            isOpen={editModalPending}
            toggle={toggleEditPending}
            title={title}
            description={description}
            handleChange={handleChange}
            onClick={handleSubmitEditPending}
            onChangeSwitch={onChangeSwitch}
            checked={checked}
           
          />
          <EditModalFinish
            isOpen={editModalFinish}
            toggle={toggleEditFinish}
            title={title}
            description={description}
            handleChange={handleChange}
            onClick={handleSubmitEditFinish}
            onChangeSwitch={onChangeSwitch}
            checked={checked}
          />
        </>
      )}
    </div>
  );
};

export default App;

const thead = ["Title", "Description", "Created at", "Action"];
