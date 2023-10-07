import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const [studentName, setStudentName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [motherName, setMotherName] = useState('');
    const [emailId, setEmailId] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState(false);
    const [clicked, setClicked] = useState(false); // State to track whether the button has been clicked
    const navigate = useNavigate();

    const validateForm = () => {
        // Add your validation logic here
        if (!studentName || !dateOfBirth || !gender || !fatherName || !motherName || !emailId || !phoneNumber || !address) {
            setError(true);
            return false;
        }
        return true;
    };

    const AddProduct = async () => {
        if (clicked) {
            return;
        }

        setClicked(true);

        if (!validateForm()) {
            return;
        }

        const newStudent = {
            studentName,
            dateOfBirth,
            gender,
            fatherName,
            motherName,
            emailId,
            phoneNumber,
            address,
        };

        try {
            const result = await fetch("http://localhost:5000/add-product", {
                method: 'POST',
                body: JSON.stringify(newStudent),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (result.ok) {
                console.log("Student added successfully");
                navigate("/");
            } else {
                console.error("Failed to add student");
            }
        } catch (error) {
            console.error("Error adding student:", error);
        }
    };

    return (
        <div className="product">
            <h1>Add Product</h1>
            <div className="form-group">
                <label htmlFor="studentName">Student Name:</label>
                <input
                    className="inputBox"
                    type="text"
                    id="studentName"
                    placeholder="Enter student name"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="dateOfBirth">Date of Birth:</label>
                <input
                    className="inputBox"
                    type="date"
                    id="dateOfBirth"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="gender">Gender:</label>
                <input
                    className="inputBox"
                    type="text"
                    id="gender"
                    placeholder="Enter gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="fatherName">Father's Name:</label>
                <input
                    className="inputBox"
                    type="text"
                    id="fatherName"
                    placeholder="Enter father's name"
                    value={fatherName}
                    onChange={(e) => setFatherName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="motherName">Mother's Name:</label>
                <input
                    className="inputBox"
                    type="text"
                    id="motherName"
                    placeholder="Enter mother's name"
                    value={motherName}
                    onChange={(e) => setMotherName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="emailId">Email Id:</label>
                <input
                    className="inputBox"
                    type="email"
                    id="emailId"
                    placeholder="Enter email ID"
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                    className="inputBox"
                    type="tel"
                    id="phoneNumber"
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="address">Address:</label>
                <input
                    className="inputBox"
                    type="text"
                    id="address"
                    placeholder="Enter address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>
            <button onClick={AddProduct} className="appButton" disabled={clicked}>
                {clicked ? "Adding..." : "Add"}
            </button>
        </div>
    )
}

export default AddProduct;
