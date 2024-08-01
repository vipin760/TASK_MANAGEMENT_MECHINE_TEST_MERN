import React, { useEffect, useState } from "react";
import Container from "../container/Container";
import Card from "./Card";
import axios from "axios";
import { API_URL } from "../../Api";
import { toast } from "react-toastify";

const Home = () => {
  const [formData, setFormData] = useState({ title: "" });
  const [errors, setErrors] = useState({});
  const [data, setData] = useState([]);
  const [updateButton, setUpdateButton] = useState(false);

  const fetchData = async () => {
    try {
      await axios.get(`${API_URL}`).then((res) => {
        setData(res.data.data);
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setErrors({});
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const valErrors = {};
      if (!formData.title.trim()) {
        valErrors.title = "please enter title";
      }
      setErrors(valErrors);
      if (Object.keys(valErrors).length === 0) {
        await axios.post(`${API_URL}`, formData).then((data) => {
          formData.title = "";
          fetchData();
          console.log(data);
        });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}?id=${id}`).then((res) => {
        setUpdateButton(false);
        fetchData();
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const editTask = (data) => {
    setFormData(data);
    setUpdateButton(true);
  };

  const handleUpdate = async (e) => {
    try {
      e.preventDefault();
      const valErrors = {};
      if (!formData.title.trim()) {
        valErrors.title = "please enter title";
      }
      setErrors(valErrors);
      if (Object.keys(valErrors).length === 0) {
        await axios.put(`${API_URL}`, formData).then((res) => {
          setUpdateButton(false);
          formData.title = "";
          fetchData();
        });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <Container>
      <div className="w-full flex flex-col items-center">
        <h1 className="text-center text-2xl font-bold py-2">TASK MANAGER</h1>
        <div className="max-w-md border rounded-md p-3">
          <form action="" className="flex justify-center gap-1 p-2">
            <input
              type="text"
              placeholder="enter task here...."
              className="border max-w-sm px-1 rounded-md"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            {!updateButton ? (
              <button
                type="submit"
                onClick={handleSubmit}
                className="border w-16 rounded-md hover:bg-slate-900"
              >
                Add
              </button>
            ) : (
              <button
                type="submit"
                onClick={handleUpdate}
                className="border w-16 rounded-md hover:bg-slate-900"
              >
                Update
              </button>
            )}
          </form>
          {errors.title && (
            <p className="px-3 mb-2 text-orange-500">*{errors.title}</p>
          )}
          <Card data={data} handleDelete={handleDelete} editTask={editTask} />
        </div>
      </div>
    </Container>
  );
};

export default Home;
