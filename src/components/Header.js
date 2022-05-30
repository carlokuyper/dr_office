const Header = () => {
    return(
        <div className="col-md-4, navigation">
            <a  href="/Appointments"><div className="logo-holder"><img className="logo-img" src="../logo.png"/></div></a>

            <button className="dropbtn"><a href="/">Login</a></button>
            <a  href="/Appointments"><div className="img-button-holder"><img className="img-button" src="../calendar.png"/><p className="header-text">Appointment</p></div></a>
            <a  href="/Doctors"><div className="img-button-holder"><img className="img-button" src="../dr.png"/><p className="header-text">Doctors</p></div></a>
            <a  href="/Patient"><div className="img-button-holder"><img className="img-button" src="../users.png"/><p className="header-text">Patient</p></div></a>
        </div>
    );
}

export default Header;
