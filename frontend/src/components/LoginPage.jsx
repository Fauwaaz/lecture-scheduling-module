import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [inputs, setInputs] = useState({})

    const navigate = useNavigate()

    const handleChanges = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(document.getElementById('whoami').value == "default") {
            alert("Please select user")
        }

        if(document.getElementById('whoami').value == "admin") {
            axios
            .post("http://localhost:9000/admin/login", inputs)
            .then((res) => {
                alert(res.data.message);
                // console.log(res.data.user);
                sessionStorage.setItem("info", JSON.stringify(res.data.user))
                navigate("/admin/dashboard")
            })
            .catch((err) => {
                console.log('error : ',err);
                alert(err.response.data.message);
            });
            e.target.reset();
        }

        if(document.getElementById('whoami').value == "instructor") {
            console.log("instructor login");
            axios
            .post("http://localhost:9000/instructor/login", inputs)
            .then((res) => {
                alert(res.data.message);
                sessionStorage.setItem("info", JSON.stringify(res.data.user))
                navigate("/instructor/dashboard")
            })
            .catch((err) => {
                console.log('error : ',err);
                alert(err.response.data.message);
            });
            e.target.reset();
        }

    };



    return(
    <>
    <section className="bg-gray-50 dark:bg-gray-900">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <p className="text-xl font-medium leading-tight tracking-tight text-gray-900 md:text-2xl text-center dark:text-white pb-5">Felix Online Lecture Scheduling App</p>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-medium leading-tight tracking-tight text-gray-900 md:text-xl text-center dark:text-white">
                  Log in
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <select id="whoami" onChange={() => {

            }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="default">Select User</option>
                <option value="admin">Admin</option>
                <option value="instructor">Instructor</option>
            </select>

            <input required type="text" name="username" placeholder="Enter Username" onChange={handleChanges} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            <input required type="password" name="password" placeholder="Enter Password" onChange={handleChanges} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            <button type="submit" className="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 dark:border-gray-600 border-2">Submit</button>
        </form>
        </div>
        </div>
    </div>
    </section>
    </>
    )
}