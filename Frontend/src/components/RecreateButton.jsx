import "./RecreateButton.css";

function RecreateButton({ onClick }) {

  return (

    <button

      className="recreate-button"

      onClick={onClick}

    >

      🔄 Recreate Schedule

    </button>

  );

}

export default RecreateButton;