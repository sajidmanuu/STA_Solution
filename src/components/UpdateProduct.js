import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
    const [studentName, setStudentName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [fatherName, setFatherName] = useState('');
    const [motherName, setMotherName] = useState('');
    const [emailId, setEmailId] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState(false);
    const [clicked, setClicked] = useState(false);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductDetails();
    }, []);

    const getProductDetails = async () => {
        try {
            let result = await fetch(`http://localhost:5000/product/${params.id}`);
            result = await result.json();
            setStudentName(result.studentName);
            setDateOfBirth(result.dateOfBirth);
            setGender(result.gender);
            setFatherName(result.fatherName);
            setMotherName(result.motherName);
            setEmailId(result.emailId);
            setPhoneNumber(result.phoneNumber);
            setAddress(result.address);
        } catch (error) {
            console.error("Error fetching product details:", error);
        }
    };

    const updateProduct = async () => {
        setClicked(true);

        // Perform validation here if needed

        const updatedStudent = {
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
            const result = await fetch(`http://localhost:5000/product/${params.id}`, {
                method: "PUT",
                body: JSON.stringify(updatedStudent),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (result.ok) {
                console.log("Student updated successfully");
                navigate("/");
            } else {
                console.error("Failed to update student");
            }
        } catch (error) {
            console.error("Error updating student:", error);
        }
    };

    return (
        <div className="product">
            <h1>Update Product</h1>
            <input
                className="inputBox"
                type="text"
                placeholder="Enter student name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
            />
            {/* Add similar input fields for other student properties */}
            <button onClick={updateProduct} className="appButton">
                Update Product
            </button>
        </div>
    );
};

export default UpdateProduct;
