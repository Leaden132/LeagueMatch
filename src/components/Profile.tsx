import React, { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

const Profile = () => {

    const { currentUser, logout } = useAuth()


    return (

        <section className="profile">
        <p>Email: {currentUser.email}</p>
        </section>
    )
}

export default Profile;