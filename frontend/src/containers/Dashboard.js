import {React, useState, useEffect} from "react";
import { update_profile } from "../redux/actions/profile";
import { delete_account } from "../redux/actions/auth";
import { get_health_advice } from "../redux/actions/service";
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';

const Dashboard = ({update_profile, profile, get_health_advice, healthAdvice, delete_account}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    age: "",
    weight: "",
    height: "",
    sleep_hours: "",
    calories_intake: "",
    exercise_duration: "",
    water_intake: "",
  });
  const [bmi, setBmi] = useState("");
  let [classification, setClassification] = useState("")


  /**
  * Deletes the user's account by invoking the delete_account action.
  */
  const deleteAccount = () => {
    delete_account();
    navigate('/'); // Redirects user to login page
  };

  const {
    first_name,
    last_name,
    age,
    weight,
    height,
    sleep_hours,
    calories_intake,
    exercise_duration,
    water_intake,
  } = formData;


  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    update_profile(
      first_name,
      last_name,
      age,
      weight,
      height,
      sleep_hours,
      calories_intake,
      exercise_duration,
      water_intake
    );
    };

  useEffect(() => {
    setFormData({
      first_name: profile.first_name || "",
      last_name: profile.last_name || "",
      age: profile.age || "",
      weight: profile.weight || "",
      height: profile.height || "",
      sleep_hours: profile.sleep_hours || "",
      calories_intake: profile.calories_intake || "",
      exercise_duration: profile.exercise_duration || "",
      water_intake: profile.water_intake || "",
    });
  }, [profile.first_name]);

  // A function to calculate users BMI
  const calculateBMI = async () => {
    const heightInMeters = height / 100;
    const bmiValue = weight / (heightInMeters * heightInMeters);
    setBmi(bmiValue.toFixed(2));
    if (bmiValue < 18.5) {
      classification = "Underweight";
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      classification = "Normal weight";
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      classification = "Overweight";
    } else {
      classification = "Obese";
    }
    setClassification(classification);
  };

  const generateHealthAdvice = () => {
    get_health_advice(
      age,
      weight,
      height,
      sleep_hours,
      calories_intake,
      exercise_duration,
      water_intake
    );
  };
  
  useEffect(() => {
    if (height && weight) {
        calculateBMI();
    } else {
        setBmi("");
        setClassification("");
    }
  }, [height, weight]);

  return (
    <div className="container mt-4">
      <div className="row align-items-center" style={{ minHeight: "80vh" }}>
        {/* Left Column: User Profile Data */}
        <div className="col-lg-6">
          <h1 className="mb-4">Dashboard</h1>
          <form onSubmit={onSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="first_name"
                  value={first_name}
                  onChange={onChange}
                  placeholder={`${profile.first_name}`}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="last_name"
                  value={last_name}
                  onChange={onChange}
                  placeholder= {`${profile.last_name}`}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="age" className="form-label">
                  Age
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="age"
                  name="age"
                  value={age}
                  onChange={onChange}
                  placeholder= {`${profile.age}`}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="weight" className="form-label">
                  Weight
                </label>
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    id="weight"
                    name="weight"
                    value={weight}
                    onChange={onChange}
                    placeholder= {`${profile.weight}`}
                  />
                  <span className="input-group-text">Kg</span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="height" className="form-label">
                  Height
                </label>
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    id="height"
                    name="height"
                    value={height}
                    onChange={onChange}
                    placeholder= {`${profile.height}`}
                  />
                  <span className="input-group-text">cm</span>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="sleepHours" className="form-label">
                  Sleep Hours
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="sleepHours"
                  name="sleep_hours"
                  value={sleep_hours}
                  onChange={onChange}
                  placeholder= {`${profile.sleep_hours}`}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="caloriesIntake" className="form-label">
                  Calories Intake
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="caloriesIntake"
                  name="calories_intake"
                  value={calories_intake}
                  onChange={onChange}
                  placeholder= {`${profile.calories_intake}`}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="exerciseDuration" className="form-label">
                  Exercise Duration
                </label>
                  <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    id="exerciseDuration"
                    name="exercise_duration"
                    value={exercise_duration}
                    onChange={onChange}
                    placeholder= {`${profile.exercise_duration}`}
                    helperText="Enter duration in minutes"
                  />
                    <span className="input-group-text">minutes</span>
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="waterIntake" className="form-label">
                Water Intake
              </label>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  id="waterIntake"
                  name="water_intake"
                  value={water_intake}
                  onChange={onChange}
                  placeholder= {`${profile.water_intake}`}
                />
                <span className="input-group-text">liters</span>
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-3">
              Update Profile
            </button>
          </form>
          <div className="row">
            <div className="col-md-6 mb-3">
                <button
                onClick={generateHealthAdvice}
                className="btn btn-success w-100 py-2"
              >
                Health Advice
              </button>
            </div>
            <div className="col-md-6 mb-3">
                <button
                onClick={deleteAccount}
                className="btn btn-danger w-100 py-2"
              >
                Delete Account
              </button>
            </div>
          </div>

        </div>
    {/* Right Column: Results and Health Advice */}
    <div className="col-lg-6 mt-4 mt-lg-0">
      {/* BMI Card */}
      <div className="card shadow-lg mb-4 border-0">
        <div className="card-body text-center bg-light rounded">
          <h3 className="card-title mb-3">Your BMI</h3>
          <h1 className="display-4 text-primary">{bmi ? bmi : "--"}</h1>
          <p className="card-text font-weight-bold text-secondary">
            Classification: <span className="text-dark">{classification || "N/A"}</span>
          </p>
        </div>
      </div>

      {/* Health Advice Card */}
      {healthAdvice ? (
        <div className="card shadow-lg border-0 mb-md-4">
          <div className="card-body bg-light rounded">
            <h4 className="card-title text-center text-success mb-4">
              Health Advice
            </h4>
            <p className="card-text text-dark text-justify">
              {healthAdvice}
            </p>
          </div>
        </div>
      ) : (
        <div className="card shadow-lg border-0 mb-md-4">
          <div className="card-body bg-light rounded text-center">
            <h5 className="text-muted">Need a Health Advice ?</h5>
            <p className="text-secondary">
              Click on <span className="text-success">Health Advice</span> to
              generate personalized suggestions based on given input.
            </p>
          </div>
        </div>
      )}
    </div>
  </div>
</div>  
);
};

// Mapping redux state to component properties
const mapStateToProps = (state) => ({
  profile: state.profile, // state.profile is mapped to the profile prop
  healthAdvice: state.service.health_advice,
});

export default connect(mapStateToProps,{update_profile,delete_account,get_health_advice})(Dashboard);