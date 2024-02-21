import { motion } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faXmark } from '@fortawesome/free-solid-svg-icons'

const HeroesListItem = ({ name, description, element, heroDel, heroUpd }) => {
  let elementClassName;

  switch (element) {
    case "fire":
      elementClassName = "bg-danger bg-gradient";
      break;
    case "water":
      elementClassName = "bg-primary bg-gradient";
      break;
    case "wind":
      elementClassName = "bg-grey bg-success";
      break;
    case "earth":
      elementClassName = "bg-secondary bg-gradient";
      break;
    default:
      elementClassName = "bg-warning bg-gradient";
  }

  const updateBtn = <FontAwesomeIcon icon={faPen} width={24} />
  const deleteBtn = <FontAwesomeIcon icon={faXmark} width={24}/>

  return (
    <motion.li
      // transition={{ duration: 0.5 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`card flex-row mb-4 shadow-lg text-white ${elementClassName}`}
    >
      <img
        src={require("../../assets/pngegg.png")}
        className="img-fluid w-25 d-inline"
        alt="unknown hero"
        style={{ objectFit: "cover" }}
      />
      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <p className="card-text">{description}</p>
      </div>
      <span>
        <button
          type="button"
          className="btn btn-outline-light bg-transparent border-0 p-0"
          onClick={heroUpd}
          aria-label="Update"
        >{updateBtn}</button>
        <button
          type="button"
          className="btn btn-outline-light bg-transparent border-0 p-0"
          onClick={heroDel}
          aria-label="Delete"
        >{deleteBtn}</button>
      </span>
    </motion.li>
  );
};

export default HeroesListItem;
