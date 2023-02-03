import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../../store/session";
import "../homepage.css";

const DemoButton = () => {
  const history = useHistory()
  const dispatch = useDispatch();
  const demoLogin = async (e) => {
    e.preventDefault();
    await dispatch(login("demo@aa.io", "password"));
    history.push('/images')
  };

  return (
    <button onClick={demoLogin} className='demo-btn' id="demo-button">
      Demo Button
    </button>
  );
};

export default DemoButton;
