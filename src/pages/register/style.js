import { makeStyles } from "@material-ui/styles";
import homeLogo from "../../assets/home-logo.svg";
import back from "../../assets/back.svg";

const useRegisterStyle = makeStyles({
  root: {
    height: "100vh",
    background: `url('${back}')`,
    backgroundSize: "100%",
    backgroundRepeat: "repeat",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    width: "80%",
    height: "70%",
    borderRadius: 10,
    boxShadow: "2px 3px 13px 5px rgba(0,0,0,0.2)"
  },
  fullHeight: {
    height: "100%",
    overflowY: 'auto'
  },
  containerLogo: {
    height: "100%",
    width: "100%",
    background: `url('${homeLogo}')`,
    backgroundSize: "70%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: "10%"
  },
  footerContainer: {
    flexBasis: 0,
    justifyContent: 'space-between',
    padding: '0 5%',
    alignItems: 'self-start'
  },
  step:{ 
    
  }
});

export default useRegisterStyle;